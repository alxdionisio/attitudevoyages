/**
 * CORS et helpers JSON pour les Pages Functions.
 * Les requêtes proviennent du même domaine (SPA + Functions servies par CF Pages),
 * donc CORS est minimal — on prévoit juste les previews CF (*.pages.dev).
 */

const ALLOWED_ORIGINS = [
  "https://attitude-voyages.fr",
  "https://www.attitude-voyages.fr",
  // Previews CF Pages : *.attitude-voyages.pages.dev (autorisées dynamiquement)
];

export function corsHeaders(request) {
  const origin = request.headers.get("Origin") || "";
  const allow =
    ALLOWED_ORIGINS.includes(origin) || origin.endsWith(".pages.dev")
      ? origin
      : ALLOWED_ORIGINS[0];
  return {
    "Access-Control-Allow-Origin": allow,
    "Access-Control-Allow-Methods": "GET,POST,PATCH,DELETE,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Max-Age": "86400",
    Vary: "Origin",
  };
}

export function jsonResponse(data, init = {}, request = null) {
  return new Response(JSON.stringify(data), {
    status: init.status ?? 200,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      ...(request ? corsHeaders(request) : {}),
      ...(init.headers || {}),
    },
  });
}

export function errorResponse(message, status = 400, request = null) {
  return jsonResponse({ ok: false, error: message }, { status }, request);
}

export function handleOptions(request) {
  return new Response(null, { status: 204, headers: corsHeaders(request) });
}
