import { jsonResponse, errorResponse, handleOptions } from "../../_lib/cors.js";
import { validateAdminLogin } from "../../_lib/validate.js";
import {
  verifyPassword,
  generateSessionId,
  buildSessionCookie,
} from "../../_lib/auth.js";

export const onRequestOptions = ({ request }) => handleOptions(request);

export const onRequestPost = async ({ request, env }) => {
  let body;
  try {
    body = await request.json();
  } catch {
    return errorResponse("JSON invalide", 400, request);
  }

  const result = validateAdminLogin(body);
  if (!result.ok) return errorResponse(result.errors[0], 422, request);
  const { email, password } = result.value;

  let user;
  try {
    user = await env.DB.prepare(
      `SELECT id, email, password_hash, display_name, is_active
         FROM admin_users WHERE email = ?1 LIMIT 1`
    )
      .bind(email)
      .first();
  } catch (err) {
    console.error("[admin/login] db error", err);
    return errorResponse("Erreur serveur", 500, request);
  }

  if (!user || !user.is_active) {
    // Délai uniforme pour ne pas leak l'existence d'un email
    await sleep(150);
    return errorResponse("Identifiants invalides", 401, request);
  }

  const valid = await verifyPassword(password, user.password_hash);
  if (!valid) {
    await sleep(150);
    return errorResponse("Identifiants invalides", 401, request);
  }

  // Créer la session
  const sessionId = generateSessionId();
  const expiresAt = new Date(Date.now() + 7 * 86_400_000).toISOString();
  const ua = request.headers.get("User-Agent") || null;
  const ip = request.headers.get("CF-Connecting-IP") || null;

  try {
    await env.DB.prepare(
      `INSERT INTO admin_sessions (id, user_id, expires_at, user_agent, ip_address)
       VALUES (?1, ?2, ?3, ?4, ?5)`
    )
      .bind(sessionId, user.id, expiresAt, ua, ip)
      .run();
    await env.DB.prepare(
      `UPDATE admin_users SET last_login_at = datetime('now') WHERE id = ?1`
    )
      .bind(user.id)
      .run();
  } catch (err) {
    console.error("[admin/login] session insert error", err);
    return errorResponse("Erreur serveur", 500, request);
  }

  return jsonResponse(
    {
      ok: true,
      user: { email: user.email, displayName: user.display_name },
    },
    {
      headers: {
        "Set-Cookie": buildSessionCookie(sessionId),
      },
    },
    request
  );
};

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}
