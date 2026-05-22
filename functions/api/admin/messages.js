import { jsonResponse, errorResponse, handleOptions } from "../../_lib/cors.js";
import { getAdminFromRequest } from "../../_lib/auth.js";

export const onRequestOptions = ({ request }) => handleOptions(request);

export const onRequestGet = async ({ request, env }) => {
  const admin = await getAdminFromRequest(request, env);
  if (!admin) return errorResponse("Non authentifié", 401, request);

  const url = new URL(request.url);
  const status = url.searchParams.get("status");

  let query = `SELECT id, nom, email, sujet, message, status, created_at
                 FROM contact_messages`;
  const params = [];
  if (status) {
    query += ` WHERE status = ?1`;
    params.push(status);
  }
  query += ` ORDER BY created_at DESC LIMIT 200`;

  try {
    const { results } = await env.DB.prepare(query)
      .bind(...params)
      .all();
    return jsonResponse({ ok: true, messages: results ?? [] }, {}, request);
  } catch (err) {
    console.error("[admin/messages]", err);
    return errorResponse("Erreur serveur", 500, request);
  }
};
