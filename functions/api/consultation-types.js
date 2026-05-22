import { jsonResponse, errorResponse, handleOptions } from "../_lib/cors.js";

export const onRequestOptions = ({ request }) => handleOptions(request);

export const onRequestGet = async ({ request, env }) => {
  try {
    const { results } = await env.DB.prepare(
      `SELECT id, slug, name, description, duration_minutes, price_label, sort_order
         FROM consultation_types
        WHERE is_active = 1
        ORDER BY sort_order ASC, name ASC`
    ).all();
    return jsonResponse({ ok: true, types: results ?? [] }, {}, request);
  } catch (err) {
    console.error("[consultation-types] db error", err);
    return errorResponse("Erreur serveur", 500, request);
  }
};
