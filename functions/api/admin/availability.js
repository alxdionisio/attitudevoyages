import { jsonResponse, errorResponse, handleOptions } from "../../_lib/cors.js";
import { getAdminFromRequest } from "../../_lib/auth.js";
import { logAdminAction } from "../../_lib/audit.js";

export const onRequestOptions = ({ request }) => handleOptions(request);

// GET /api/admin/availability → rules + overrides
export const onRequestGet = async ({ request, env }) => {
  const admin = await getAdminFromRequest(request, env);
  if (!admin) return errorResponse("Non authentifié", 401, request);

  try {
    const [rules, overrides] = await Promise.all([
      env.DB.prepare(
        `SELECT id, day_of_week, start_time, end_time, is_active
           FROM availability_rules ORDER BY day_of_week, start_time`
      ).all(),
      env.DB.prepare(
        `SELECT id, date, start_time, end_time, override_type, note
           FROM availability_overrides
          WHERE date >= date('now')
          ORDER BY date ASC LIMIT 200`
      ).all(),
    ]);
    return jsonResponse(
      {
        ok: true,
        rules: rules.results ?? [],
        overrides: overrides.results ?? [],
      },
      {},
      request
    );
  } catch (err) {
    console.error("[admin/availability:get]", err);
    return errorResponse("Erreur serveur", 500, request);
  }
};

// POST /api/admin/availability → create override (blocked or custom)
// Body: { date: 'YYYY-MM-DD', override_type: 'blocked'|'custom', start_time?, end_time?, note? }
export const onRequestPost = async ({ request, env }) => {
  const admin = await getAdminFromRequest(request, env);
  if (!admin) return errorResponse("Non authentifié", 401, request);

  let body;
  try {
    body = await request.json();
  } catch {
    return errorResponse("JSON invalide", 400, request);
  }

  const date = String(body.date || "").trim();
  const type = String(body.override_type || "blocked").trim();
  const startTime = body.start_time ? String(body.start_time).trim() : null;
  const endTime = body.end_time ? String(body.end_time).trim() : null;
  const note = body.note ? String(body.note).trim().slice(0, 200) : null;

  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return errorResponse("Date invalide", 422, request);
  }
  if (!["blocked", "custom"].includes(type)) {
    return errorResponse("Type d'override invalide", 422, request);
  }
  if (type === "custom" && (!startTime || !endTime)) {
    return errorResponse("Plage horaire requise pour un override custom", 422, request);
  }

  try {
    const result = await env.DB.prepare(
      `INSERT INTO availability_overrides
         (date, start_time, end_time, override_type, note)
       VALUES (?1, ?2, ?3, ?4, ?5)`
    )
      .bind(date, startTime, endTime, type, note)
      .run();
    const id = result.meta?.last_row_id;
    await logAdminAction(env, request, admin, "override.create", "override", id, {
      date,
      start_time: startTime,
      end_time: endTime,
      override_type: type,
      note,
    });
    return jsonResponse({ ok: true, id }, { status: 201 }, request);
  } catch (err) {
    console.error("[admin/availability:post]", err);
    return errorResponse("Erreur serveur", 500, request);
  }
};
