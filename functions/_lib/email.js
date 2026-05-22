/**
 * Helpers d'envoi d'email via l'API Brevo (ex-Sendinblue).
 * Docs : https://developers.brevo.com/reference/sendtransacemail
 *
 * Configuration requise :
 *   - BREVO_API_KEY    (secret) → "xkeysib-..."
 *   - BREVO_FROM_EMAIL (var)    → "noreply@attitude-voyages.fr"
 *   - BREVO_FROM_NAME  (var)    → "Attitude Voyages"
 *
 * En l'absence de BREVO_API_KEY (preview, local dev), on log dans la console
 * Pages au lieu d'échouer — utile pour itérer sans clé.
 */

const BREVO_ENDPOINT = "https://api.brevo.com/v3/smtp/email";

function parseAddress(spec) {
  if (typeof spec !== "string") return null;
  // Accepte "Name <email@x>" ou juste "email@x"
  const match = spec.match(/^\s*(?:"?([^"<]+?)"?\s+)?<?([^\s<>]+@[^\s<>]+)>?\s*$/);
  if (!match) return null;
  return { name: (match[1] || "").trim() || undefined, email: match[2].trim() };
}

export async function sendEmail(env, { to, subject, html, text, replyTo, attachments }) {
  const fromEmail = env.BREVO_FROM_EMAIL || "noreply@attitude-voyages.fr";
  const fromName = env.BREVO_FROM_NAME || "Attitude Voyages";

  if (!env.BREVO_API_KEY) {
    console.log("[email:dry-run] →", to, "|", subject);
    if (text) console.log(text.slice(0, 500));
    return { ok: true, dryRun: true };
  }

  const recipients = (Array.isArray(to) ? to : [to])
    .map((addr) => parseAddress(addr))
    .filter(Boolean);

  if (recipients.length === 0) {
    return { ok: false, error: "no valid recipient" };
  }

  const payload = {
    sender: { name: fromName, email: fromEmail },
    to: recipients,
    subject,
    htmlContent: html,
    textContent: text,
    ...(replyTo
      ? { replyTo: parseAddress(replyTo) || { email: replyTo } }
      : {}),
    ...(attachments ? { attachment: attachments } : {}),
  };

  const res = await fetch(BREVO_ENDPOINT, {
    method: "POST",
    headers: {
      "api-key": env.BREVO_API_KEY,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    console.error("[email] brevo error", res.status, body);
    return { ok: false, status: res.status, error: body };
  }
  const data = await res.json().catch(() => ({}));
  return { ok: true, id: data.messageId || data["message-id"] || null };
}

// ─── Templates ──────────────────────────────────────────────────────

const BRAND = {
  name: "Attitude Voyages",
  url: "https://attitude-voyages.fr",
  phone: "04 66 37 48 63",
  email: "contact@attitude-voyages.fr",
  address: "1 Rue des Rolliers, 30820 Caveirac",
  color: "#5c3a28",
};

function shell(innerHtml) {
  return `<!doctype html>
<html lang="fr">
<head><meta charset="utf-8" /></head>
<body style="margin:0;padding:0;background:#faf6f1;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#2a1d15;line-height:1.6;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#faf6f1;padding:32px 16px;">
    <tr><td align="center">
      <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:12px;border:1px solid rgba(92,58,40,0.12);overflow:hidden;">
        <tr><td style="background:${BRAND.color};padding:24px 32px;color:#faf6f1;font-family:Georgia,serif;font-size:22px;letter-spacing:0.02em;">
          ${BRAND.name}
        </td></tr>
        <tr><td style="padding:32px;">
          ${innerHtml}
        </td></tr>
        <tr><td style="padding:20px 32px;background:#f3ece2;color:#6b5b50;font-size:13px;line-height:1.6;">
          ${BRAND.name} &middot; ${BRAND.address}<br />
          ${BRAND.phone} &middot; <a href="mailto:${BRAND.email}" style="color:${BRAND.color};">${BRAND.email}</a><br />
          <a href="${BRAND.url}" style="color:${BRAND.color};">${BRAND.url}</a>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

// ─── Contact form notification → admin/test ─────────────────────────
export function renderContactNotification({ nom, email, sujet, message }) {
  const safeSujet = sujet ? escapeHtml(sujet) : "(sans sujet)";
  const html = shell(`
    <h1 style="font-family:Georgia,serif;font-size:20px;margin:0 0 16px;color:${BRAND.color};">
      Nouveau message du site
    </h1>
    <p style="margin:0 0 8px;"><strong>De&nbsp;:</strong> ${escapeHtml(nom)} &lt;${escapeHtml(email)}&gt;</p>
    <p style="margin:0 0 16px;"><strong>Sujet&nbsp;:</strong> ${safeSujet}</p>
    <p style="margin:0 0 8px;color:#6b5b50;font-size:12px;text-transform:uppercase;letter-spacing:0.08em;">Message</p>
    <div style="background:#faf6f1;padding:16px;border-radius:8px;white-space:pre-wrap;">${escapeHtml(message)}</div>
    <p style="margin-top:24px;font-size:13px;color:#6b5b50;">
      Répondez directement à cet email pour contacter ${escapeHtml(nom)}.
    </p>
  `);
  const text = `Nouveau message du site Attitude Voyages

De : ${nom} <${email}>
Sujet : ${sujet || "(sans sujet)"}

${message}

—
Répondez directement à cet email pour contacter ${nom}.`;
  return { html, text };
}

// ─── Booking confirmation → client ──────────────────────────────────
export function renderBookingConfirmation({ firstName, startAt, durationMinutes, typeName }) {
  const startParis = formatParisLong(startAt);
  const html = shell(`
    <h1 style="font-family:Georgia,serif;font-size:22px;margin:0 0 16px;color:${BRAND.color};">
      Votre rendez-vous est confirmé
    </h1>
    <p style="margin:0 0 16px;">Bonjour ${escapeHtml(firstName)},</p>
    <p style="margin:0 0 16px;">Nous avons bien enregistré votre rendez-vous&nbsp;:</p>
    <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 0 20px;border-collapse:collapse;width:100%;">
      <tr><td style="padding:8px 0;border-bottom:1px solid rgba(92,58,40,0.12);font-size:14px;color:#6b5b50;">Type</td><td style="padding:8px 0;border-bottom:1px solid rgba(92,58,40,0.12);text-align:right;">${escapeHtml(typeName)}</td></tr>
      <tr><td style="padding:8px 0;border-bottom:1px solid rgba(92,58,40,0.12);font-size:14px;color:#6b5b50;">Date</td><td style="padding:8px 0;border-bottom:1px solid rgba(92,58,40,0.12);text-align:right;">${escapeHtml(startParis)}</td></tr>
      <tr><td style="padding:8px 0;font-size:14px;color:#6b5b50;">Durée</td><td style="padding:8px 0;text-align:right;">${durationMinutes}&nbsp;min</td></tr>
    </table>
    <p style="margin:0 0 16px;">L'agence se trouve au <strong>${BRAND.address}</strong>. Si vous préférez un échange téléphonique, indiquez-le-nous en réponse à ce mail.</p>
    <p style="margin:0 0 8px;">Besoin de modifier ou d'annuler&nbsp;? Appelez-nous au <strong>${BRAND.phone}</strong> ou répondez à ce mail.</p>
    <p style="margin-top:24px;color:#6b5b50;font-size:14px;">À très vite,<br />Annie &amp; Jade</p>
  `);
  const text = `Bonjour ${firstName},

Votre rendez-vous est confirmé :
  Type   : ${typeName}
  Date   : ${startParis}
  Durée  : ${durationMinutes} min

Agence : ${BRAND.address}
Tel    : ${BRAND.phone}

Pour modifier ou annuler, répondez à ce mail.

À très vite,
Annie & Jade — Attitude Voyages`;
  return { html, text };
}

// ─── Booking notification → admin/test ──────────────────────────────
export function renderBookingNotification({ firstName, lastName, email, phone, startAt, durationMinutes, typeName, message }) {
  const startParis = formatParisLong(startAt);
  const html = shell(`
    <h1 style="font-family:Georgia,serif;font-size:20px;margin:0 0 16px;color:${BRAND.color};">
      Nouveau rendez-vous réservé
    </h1>
    <p style="margin:0 0 16px;"><strong>${escapeHtml(firstName)} ${escapeHtml(lastName)}</strong> a réservé un créneau&nbsp;:</p>
    <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 0 16px;border-collapse:collapse;width:100%;">
      <tr><td style="padding:6px 0;color:#6b5b50;font-size:14px;">Type</td><td style="padding:6px 0;text-align:right;">${escapeHtml(typeName)} (${durationMinutes} min)</td></tr>
      <tr><td style="padding:6px 0;color:#6b5b50;font-size:14px;">Quand</td><td style="padding:6px 0;text-align:right;">${escapeHtml(startParis)}</td></tr>
      <tr><td style="padding:6px 0;color:#6b5b50;font-size:14px;">Email</td><td style="padding:6px 0;text-align:right;"><a href="mailto:${escapeHtml(email)}" style="color:${BRAND.color};">${escapeHtml(email)}</a></td></tr>
      <tr><td style="padding:6px 0;color:#6b5b50;font-size:14px;">Téléphone</td><td style="padding:6px 0;text-align:right;"><a href="tel:${escapeHtml(phone)}" style="color:${BRAND.color};">${escapeHtml(phone)}</a></td></tr>
    </table>
    ${message ? `<p style="margin:0 0 8px;color:#6b5b50;font-size:12px;text-transform:uppercase;letter-spacing:0.08em;">Message</p>
    <div style="background:#faf6f1;padding:14px;border-radius:8px;white-space:pre-wrap;">${escapeHtml(message)}</div>` : ""}
  `);
  const text = `Nouveau RDV — ${firstName} ${lastName}

Type   : ${typeName} (${durationMinutes} min)
Quand  : ${startParis}
Email  : ${email}
Tel    : ${phone}
${message ? `\nMessage:\n${message}\n` : ""}`;
  return { html, text };
}

// ─── Utils ──────────────────────────────────────────────────────────
function escapeHtml(s) {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function formatParisLong(iso) {
  return new Intl.DateTimeFormat("fr-FR", {
    timeZone: "Europe/Paris",
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(iso));
}
