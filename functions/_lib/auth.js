/**
 * Auth admin : PBKDF2-SHA256 password hashing + session cookie.
 * Tout fonctionne avec Web Crypto API (compat Workers/Pages Functions).
 */

const PBKDF2_ITER = 100_000;
const PBKDF2_SALT_LEN = 16;
const PBKDF2_HASH_LEN = 32;

const enc = new TextEncoder();
const dec = new TextDecoder();

// ─── Base64 helpers ─────────────────────────────────────────────────
function b64encode(buf) {
  const bytes = new Uint8Array(buf);
  let bin = "";
  for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
  return btoa(bin);
}
function b64decode(str) {
  const bin = atob(str);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return bytes.buffer;
}

// ─── Password hashing (PBKDF2) ──────────────────────────────────────
export async function hashPassword(password) {
  const salt = crypto.getRandomValues(new Uint8Array(PBKDF2_SALT_LEN));
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(password),
    { name: "PBKDF2" },
    false,
    ["deriveBits"]
  );
  const hashBuf = await crypto.subtle.deriveBits(
    { name: "PBKDF2", salt, iterations: PBKDF2_ITER, hash: "SHA-256" },
    key,
    PBKDF2_HASH_LEN * 8
  );
  return `pbkdf2$${PBKDF2_ITER}$${b64encode(salt.buffer)}$${b64encode(hashBuf)}`;
}

export async function verifyPassword(password, stored) {
  if (!stored || !stored.startsWith("pbkdf2$")) return false;
  const [, iterStr, saltB64, hashB64] = stored.split("$");
  const iterations = parseInt(iterStr, 10);
  if (!Number.isFinite(iterations) || iterations < 10_000) return false;
  const salt = new Uint8Array(b64decode(saltB64));
  const expected = new Uint8Array(b64decode(hashB64));
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(password),
    { name: "PBKDF2" },
    false,
    ["deriveBits"]
  );
  const hashBuf = await crypto.subtle.deriveBits(
    { name: "PBKDF2", salt, iterations, hash: "SHA-256" },
    key,
    expected.length * 8
  );
  const actual = new Uint8Array(hashBuf);
  return timingSafeEqual(actual, expected);
}

function timingSafeEqual(a, b) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a[i] ^ b[i];
  return diff === 0;
}

// ─── Session token (random 32 bytes, base64url) ─────────────────────
export function generateSessionId() {
  const buf = crypto.getRandomValues(new Uint8Array(32));
  return b64encode(buf.buffer)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

// ─── Cookie helpers ─────────────────────────────────────────────────
const SESSION_COOKIE_NAME = "av_admin_session";
const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 jours

export function buildSessionCookie(sessionId, { maxAge = SESSION_MAX_AGE } = {}) {
  const parts = [
    `${SESSION_COOKIE_NAME}=${sessionId}`,
    "Path=/",
    "HttpOnly",
    "Secure",
    "SameSite=Lax",
    `Max-Age=${maxAge}`,
  ];
  return parts.join("; ");
}

export function clearSessionCookie() {
  return `${SESSION_COOKIE_NAME}=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0`;
}

export function readSessionId(request) {
  const cookieHeader = request.headers.get("Cookie") || "";
  for (const part of cookieHeader.split(";")) {
    const [name, ...rest] = part.trim().split("=");
    if (name === SESSION_COOKIE_NAME) return rest.join("=");
  }
  return null;
}

// ─── DB lookup pour récupérer l'admin connecté ──────────────────────
export async function getAdminFromRequest(request, env) {
  const sid = readSessionId(request);
  if (!sid) return null;

  const session = await env.DB.prepare(
    `SELECT s.id, s.user_id, s.expires_at, u.email, u.display_name, u.is_active
       FROM admin_sessions s
       JOIN admin_users u ON u.id = s.user_id
      WHERE s.id = ?1
      LIMIT 1`
  )
    .bind(sid)
    .first();

  if (!session) return null;
  if (new Date(session.expires_at).getTime() < Date.now()) return null;
  if (!session.is_active) return null;

  return {
    sessionId: sid,
    userId: session.user_id,
    email: session.email,
    displayName: session.display_name,
  };
}

export async function deleteSession(env, sessionId) {
  await env.DB.prepare(`DELETE FROM admin_sessions WHERE id = ?1`)
    .bind(sessionId)
    .run();
}

export { SESSION_COOKIE_NAME };
