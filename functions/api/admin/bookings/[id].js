import { jsonResponse, errorResponse, handleOptions } from "../../../_lib/cors.js";
import { getAdminFromRequest } from "../../../_lib/auth.js";
import { logAdminAction } from "../../../_lib/audit.js";

export const onRequestOptions = ({ request }) => handleOptions(request);

export const onRequestPatch = async ({ request, params, env }) => {
  const admin = await getAdminFromRequest(request, env);
  if (!admin) return errorResponse("Non authentifié", 401, request);

  const id = params.id;
  if (!id) return errorResponse("ID manquant", 400, request);

  let body;
  try {
    body = await request.json();
  } catch {
    return errorResponse("JSON invalide", 400, request);
  }

  const allowed = ["pending", "confirmed", "cancelled", "no_show", "completed"];
  const status = String(body.status || "").trim();
  if (!allowed.includes(status)) {
    return errorResponse("Statut invalide", 422, request);
  }
  const reason =
    typeof body.cancellation_reason === "string"
      ? body.cancellation_reason.trim().slice(0, 500)
      : null;

  try {
    const before = await env.DB.prepare(
      `SELECT status, cancellation_reason FROM bookings WHERE id = ?1`
    )
      .bind(id)
      .first();
    if (!before) return errorResponse("Réservation introuvable", 404, request);

    const result = await env.DB.prepare(
      `UPDATE bookings
          SET status = ?1,
              cancellation_reason = COALESCE(?2, cancellation_reason),
              updated_at = datetime('now')
        WHERE id = ?3`
    )
      .bind(status, reason, id)
      .run();
    if (result.meta?.changes === 0) {
      return errorResponse("Réservation introuvable", 404, request);
    }
    await logAdminAction(env, request, admin, `booking.status.${status}`, "booking", id, {
      before,
      after: { status, cancellation_reason: reason ?? before.cancellation_reason },
    });
  } catch (err) {
    console.error("[admin/bookings/:id] update error", err);
    return errorResponse("Erreur serveur", 500, request);
  }

  return jsonResponse({ ok: true }, {}, request);
};

export const onRequestDelete = async ({ request, params, env }) => {
  const admin = await getAdminFromRequest(request, env);
  if (!admin) return errorResponse("Non authentifié", 401, request);

  const id = params.id;
  if (!id) return errorResponse("ID manquant", 400, request);

  try {
    const before = await env.DB.prepare(
      `SELECT id, client_first_name, client_last_name, client_email, start_at, status
         FROM bookings WHERE id = ?1`
    )
      .bind(id)
      .first();
    if (!before) return errorResponse("Réservation introuvable", 404, request);

    const result = await env.DB.prepare(
      `DELETE FROM bookings WHERE id = ?1`
    )
      .bind(id)
      .run();
    if (result.meta?.changes === 0) {
      return errorResponse("Réservation introuvable", 404, request);
    }
    await logAdminAction(env, request, admin, "booking.delete", "booking", id, { deleted: before });
  } catch (err) {
    console.error("[admin/bookings/:id] delete error", err);
    return errorResponse("Erreur serveur", 500, request);
  }

  return jsonResponse({ ok: true }, {}, request);
};
