import { jsonResponse, errorResponse, handleOptions } from "../../../_lib/cors.js";
import { getAdminFromRequest } from "../../../_lib/auth.js";

export const onRequestOptions = ({ request }) => handleOptions(request);

export const onRequestDelete = async ({ request, params, env }) => {
  const admin = await getAdminFromRequest(request, env);
  if (!admin) return errorResponse("Non authentifié", 401, request);

  const id = params.id;
  if (!id) return errorResponse("ID manquant", 400, request);

  try {
    const result = await env.DB.prepare(
      `DELETE FROM availability_overrides WHERE id = ?1`
    )
      .bind(id)
      .run();
    if (result.meta?.changes === 0) {
      return errorResponse("Override introuvable", 404, request);
    }
  } catch (err) {
    console.error("[admin/availability/:id]", err);
    return errorResponse("Erreur serveur", 500, request);
  }

  return jsonResponse({ ok: true }, {}, request);
};
