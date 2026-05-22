import { jsonResponse, errorResponse, handleOptions } from "../../_lib/cors.js";
import { getAdminFromRequest } from "../../_lib/auth.js";

export const onRequestOptions = ({ request }) => handleOptions(request);

export const onRequestGet = async ({ request, env }) => {
  const admin = await getAdminFromRequest(request, env);
  if (!admin) return errorResponse("Non authentifié", 401, request);

  const url = new URL(request.url);
  const limit = Math.min(parseInt(url.searchParams.get("limit") || "100", 10) || 100, 500);
  const action = url.searchParams.get("action");
  const resource = url.searchParams.get("resource");

  const where = [];
  const params = [];
  if (action) {
    where.push(`action = ?${params.length + 1}`);
    params.push(action);
  }
  if (resource) {
    where.push(`resource_type = ?${params.length + 1}`);
    params.push(resource);
  }
  const whereClause = where.length ? `WHERE ${where.join(" AND ")}` : "";
  params.push(limit);

  try {
    const { results } = await env.DB.prepare(
      `SELECT id, user_email, action, resource_type, resource_id, metadata, ip_address, created_at
         FROM admin_audit_log
         ${whereClause}
        ORDER BY created_at DESC
        LIMIT ?${params.length}`
    )
      .bind(...params)
      .all();

    // Parse metadata JSON pour confort côté client
    const entries = (results ?? []).map((row) => ({
      ...row,
      metadata: row.metadata ? safeJson(row.metadata) : null,
    }));

    return jsonResponse({ ok: true, entries }, {}, request);
  } catch (err) {
    console.error("[admin/audit-log:get]", err);
    return errorResponse("Erreur serveur", 500, request);
  }
};

function safeJson(s) {
  try {
    return JSON.parse(s);
  } catch {
    return s;
  }
}
