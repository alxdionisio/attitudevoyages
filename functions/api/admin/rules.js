import { jsonResponse, errorResponse, handleOptions } from "../../_lib/cors.js";
import { getAdminFromRequest } from "../../_lib/auth.js";
import { logAdminAction } from "../../_lib/audit.js";

export const onRequestOptions = ({ request }) => handleOptions(request);

const HHMM_RE = /^([01]?\d|2[0-3]):([0-5]\d)$/;

// POST /api/admin/rules  body: { day_of_week, start_time, end_time, is_active? }
export const onRequestPost = async ({ request, env }) => {
  const admin = await getAdminFromRequest(request, env);
  if (!admin) return errorResponse("Non authentifié", 401, request);

  let body;
  try {
    body = await request.json();
  } catch {
    return errorResponse("JSON invalide", 400, request);
  }

  const dow = parseInt(body.day_of_week, 10);
  const start = String(body.start_time || "").trim();
  const end = String(body.end_time || "").trim();
  const active = body.is_active === false ? 0 : 1;

  if (!Number.isInteger(dow) || dow < 0 || dow > 6) {
    return errorResponse("day_of_week doit être 0–6", 422, request);
  }
  if (!HHMM_RE.test(start) || !HHMM_RE.test(end)) {
    return errorResponse("Heures invalides (format HH:MM)", 422, request);
  }
  if (start >= end) {
    return errorResponse("L'heure de fin doit être après l'heure de début", 422, request);
  }

  try {
    const result = await env.DB.prepare(
      `INSERT INTO availability_rules (day_of_week, start_time, end_time, is_active)
       VALUES (?1, ?2, ?3, ?4)`
    )
      .bind(dow, start, end, active)
      .run();
    const id = result.meta?.last_row_id;
    await logAdminAction(env, request, admin, "rule.create", "rule", id, {
      day_of_week: dow,
      start_time: start,
      end_time: end,
      is_active: active,
    });
    return jsonResponse({ ok: true, id }, { status: 201 }, request);
  } catch (err) {
    console.error("[admin/rules:post]", err);
    return errorResponse("Erreur serveur", 500, request);
  }
};
