/**
 * Mini-validateurs (sans dep) pour les payloads JSON entrants.
 * On vise du Zod-like sans installer Zod côté Workers (size matters).
 */

const EMAIL_RE = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const PHONE_RE = /^[+0-9 .()\-]{8,30}$/;

export function validateContact(body) {
  const errors = [];
  const nom = trimStr(body.nom);
  const email = trimStr(body.email).toLowerCase();
  const sujet = trimStr(body.sujet);
  const message = trimStr(body.message);
  const honeypot = trimStr(body.website);

  if (honeypot) errors.push("honeypot");
  if (nom.length < 2 || nom.length > 100) errors.push("Nom invalide");
  if (!EMAIL_RE.test(email)) errors.push("Email invalide");
  if (message.length < 5) errors.push("Message trop court");
  if (message.length > 4000) errors.push("Message trop long");
  if (sujet.length > 200) errors.push("Sujet trop long");

  return errors.length
    ? { ok: false, errors }
    : { ok: true, value: { nom, email, sujet: sujet || null, message } };
}

export function validateBooking(body) {
  const errors = [];
  const consultationTypeId = trimStr(body.consultationTypeId);
  const startAt = trimStr(body.startAt);
  const firstName = trimStr(body.firstName);
  const lastName = trimStr(body.lastName);
  const email = trimStr(body.email).toLowerCase();
  const phone = trimStr(body.phone);
  const message = trimStr(body.message);
  const consent = body.consent === true || body.consent === "on" || body.consent === "true";
  const honeypot = trimStr(body.website);

  if (honeypot) errors.push("honeypot");
  if (!consultationTypeId) errors.push("Type de rdv manquant");
  if (!isIsoDate(startAt)) errors.push("Date de rdv invalide");
  if (firstName.length < 2 || firstName.length > 80) errors.push("Prénom invalide");
  if (lastName.length < 2 || lastName.length > 80) errors.push("Nom invalide");
  if (!EMAIL_RE.test(email)) errors.push("Email invalide");
  if (!PHONE_RE.test(phone)) errors.push("Téléphone invalide");
  if (message && message.length > 2000) errors.push("Message trop long");
  if (!consent) errors.push("Consentement requis");

  return errors.length
    ? { ok: false, errors }
    : {
        ok: true,
        value: {
          consultationTypeId,
          startAt,
          firstName,
          lastName,
          email,
          phone,
          message: message || null,
        },
      };
}

export function validateAdminLogin(body) {
  const errors = [];
  const email = trimStr(body.email).toLowerCase();
  const password = String(body.password ?? "");
  if (!EMAIL_RE.test(email)) errors.push("Email invalide");
  if (password.length < 8) errors.push("Mot de passe trop court");
  return errors.length
    ? { ok: false, errors }
    : { ok: true, value: { email, password } };
}

// ─── helpers ────────────────────────────────────────────────────────
function trimStr(v) {
  return typeof v === "string" ? v.trim() : "";
}

function isIsoDate(s) {
  if (typeof s !== "string" || s.length < 16) return false;
  const d = new Date(s);
  return !Number.isNaN(d.getTime());
}
