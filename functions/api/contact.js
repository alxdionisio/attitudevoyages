import { jsonResponse, errorResponse, handleOptions } from "../_lib/cors.js";
import { validateContact } from "../_lib/validate.js";
import { sendEmail, renderContactNotification } from "../_lib/email.js";

export const onRequestOptions = ({ request }) => handleOptions(request);

export const onRequestPost = async ({ request, env }) => {
  let body;
  try {
    body = await request.json();
  } catch {
    return errorResponse("JSON invalide", 400, request);
  }

  const result = validateContact(body);
  if (!result.ok) {
    return errorResponse(result.errors[0], 422, request);
  }
  const { nom, email, sujet, message } = result.value;

  const id = crypto.randomUUID();
  const ip = request.headers.get("CF-Connecting-IP") || null;
  const userAgent = request.headers.get("User-Agent") || null;

  try {
    await env.DB.prepare(
      `INSERT INTO contact_messages (id, nom, email, sujet, message, ip_address, user_agent)
       VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7)`
    )
      .bind(id, nom, email, sujet, message, ip, userAgent)
      .run();
  } catch (err) {
    console.error("[contact] db insert failed", err);
    return errorResponse("Erreur lors de l'enregistrement", 500, request);
  }

  // Email de notification (test : heyarlow@gmail.com — voir wrangler.toml)
  const recipient = env.TEST_RECIPIENT_EMAIL || env.ADMIN_EMAIL;
  const { html, text } = renderContactNotification({ nom, email, sujet, message });

  try {
    await sendEmail(env, {
      to: recipient,
      subject: sujet
        ? `[Contact] ${sujet} — ${nom}`
        : `[Contact] Nouveau message de ${nom}`,
      html,
      text,
      replyTo: email,
    });
  } catch (err) {
    console.error("[contact] email failed", err);
    // On ne fail pas la requête : le message est stocké en DB.
  }

  return jsonResponse(
    { ok: true, id, message: "Message reçu, nous vous répondons rapidement." },
    { status: 201 },
    request
  );
};
