import { jsonResponse, errorResponse, handleOptions } from "../../../_lib/cors.js";
import { getAdminFromRequest } from "../../../_lib/auth.js";
import { logAdminAction } from "../../../_lib/audit.js";

export const onRequestOptions = ({ request }) => handleOptions(request);

const HHMM_RE = /^([01]?\d|2[0-3]):([0-5]\d)$/;

// PATCH /api/admin/rules/:id  body: { day_of_week?, start_time?, end_time?, is_active? }
export const onRequestPatch = async ({ request, params, env }) => {
  const admin = await getAdminFromRequest(request, env);
  if (!admin) return errorResponse("Non authentifié", 401, request);

  const id = parseInt(params.id, 10);
  if (!Number.isFinite(id)) return errorResponse("ID invalide", 400, request);

  let body;
  try {
    body = await request.json();
  } catch {
    return errorResponse("JSON invalide", 400, request);
  }

  // Récup état actuel pour audit
  const current = await env.DB.prepare(
    `SELECT day_of_week, start_time, end_time, is_active FROM availability_rules WHERE id = ?1`
  )
    .bind(id)
    .first();
  if (!current) return errorResponse("Règle introuvable", 404, request);

  const next = {
    day_of_week: body.day_of_week !== undefined ? parseInt(body.day_of_week, 10) : current.day_of_week,
    start_time: body.start_time !== undefined ? String(body.start_time).trim() : current.start_time,
    end_time: body.end_time !== undefined ? String(body.end_time).trim() : current.end_time,
    is_active: body.is_active === undefined ? current.is_active : body.is_active ? 1 : 0,
  };

  if (next.day_of_week < 0 || next.day_of_week > 6) {
    return errorResponse("day_of_week doit être 0–6", 422, request);
  }
  if (!HHMM_RE.test(next.start_time) || !HHMM_RE.test(next.end_time)) {
    return errorResponse("Heures invalides (format HH:MM)", 422, request);
  }
  if (next.start_time >= next.end_time) {
    return errorResponse("L'heure de fin doit être après l'heure de début", 422, request);
  }

  try {
    await env.DB.prepare(
      `UPDATE availability_rules
          SET day_of_week = ?1, start_time = ?2, end_time = ?3, is_active = ?4
        WHERE id = ?5`
    )
      .bind(next.day_of_week, next.start_time, next.end_time, next.is_active, id)
      .run();
    await logAdminAction(env, request, admin, "rule.update", "rule", id, {
      before: current,
      after: next,
    });
    return jsonResponse({ ok: true }, {}, request);
  } catch (err) {
    console.error("[admin/rules/:id:patch]", err);
    return errorResponse("Erreur serveur", 500, request);
  }
};

export const onRequestDelete = async ({ request, params, env }) => {
  const admin = await getAdminFromRequest(request, env);
  if (!admin) return errorResponse("Non authentifié", 401, request);

  const id = parseInt(params.id, 10);
  if (!Number.isFinite(id)) return errorResponse("ID invalide", 400, request);

  const current = await env.DB.prepare(
    `SELECT day_of_week, start_time, end_time, is_active FROM availability_rules WHERE id = ?1`
  )
    .bind(id)
    .first();
  if (!current) return errorResponse("Règle introuvable", 404, request);

  try {
    await env.DB.prepare(`DELETE FROM availability_rules WHERE id = ?1`).bind(id).run();
    await logAdminAction(env, request, admin, "rule.delete", "rule", id, { deleted: current });
    return jsonResponse({ ok: true }, {}, request);
  } catch (err) {
    console.error("[admin/rules/:id:delete]", err);
    return errorResponse("Erreur serveur", 500, request);
  }
};
