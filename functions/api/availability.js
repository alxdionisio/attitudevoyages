import { jsonResponse, errorResponse, handleOptions } from "../_lib/cors.js";
import { computeAvailability } from "../_lib/slots.js";

export const onRequestOptions = ({ request }) => handleOptions(request);

export const onRequestGet = async ({ request, env }) => {
  const url = new URL(request.url);
  const typeId = url.searchParams.get("type");
  if (!typeId) return errorResponse("Paramètre 'type' manquant", 400, request);

  let consultationType;
  try {
    consultationType = await env.DB.prepare(
      `SELECT id, name, duration_minutes FROM consultation_types
        WHERE id = ?1 AND is_active = 1 LIMIT 1`
    )
      .bind(typeId)
      .first();
  } catch (err) {
    console.error("[availability] db error", err);
    return errorResponse("Erreur serveur", 500, request);
  }

  if (!consultationType) {
    return errorResponse("Type de consultation introuvable", 404, request);
  }

  const days = await computeAvailability(env, consultationType.duration_minutes);

  return jsonResponse(
    {
      ok: true,
      consultationType: {
        id: consultationType.id,
        name: consultationType.name,
        durationMinutes: consultationType.duration_minutes,
      },
      days,
    },
    {
      headers: {
        // Cache court : les dispos changent rarement minute par minute
        "Cache-Control": "public, max-age=60, s-maxage=60",
      },
    },
    request
  );
};
