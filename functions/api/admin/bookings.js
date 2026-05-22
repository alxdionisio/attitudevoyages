import { jsonResponse, errorResponse, handleOptions } from "../../_lib/cors.js";
import { getAdminFromRequest } from "../../_lib/auth.js";

export const onRequestOptions = ({ request }) => handleOptions(request);

export const onRequestGet = async ({ request, env }) => {
  const admin = await getAdminFromRequest(request, env);
  if (!admin) return errorResponse("Non authentifié", 401, request);

  const url = new URL(request.url);
  const status = url.searchParams.get("status"); // optional filter
  const from = url.searchParams.get("from");      // optional ISO date
  const to = url.searchParams.get("to");

  const where = [];
  const params = [];
  if (status) {
    where.push(`b.status = ?${params.length + 1}`);
    params.push(status);
  }
  if (from) {
    where.push(`b.start_at >= ?${params.length + 1}`);
    params.push(from);
  }
  if (to) {
    where.push(`b.start_at <= ?${params.length + 1}`);
    params.push(to);
  }
  const whereClause = where.length ? `WHERE ${where.join(" AND ")}` : "";

  try {
    const { results } = await env.DB.prepare(
      `SELECT b.id, b.start_at, b.end_at, b.status,
              b.client_first_name, b.client_last_name,
              b.client_email, b.client_phone, b.client_message,
              b.created_at, ct.name AS type_name, ct.duration_minutes
         FROM bookings b
         JOIN consultation_types ct ON ct.id = b.consultation_type_id
         ${whereClause}
        ORDER BY b.start_at DESC
        LIMIT 500`
    )
      .bind(...params)
      .all();
    return jsonResponse({ ok: true, bookings: results ?? [] }, {}, request);
  } catch (err) {
    console.error("[admin/bookings] db error", err);
    return errorResponse("Erreur serveur", 500, request);
  }
};
