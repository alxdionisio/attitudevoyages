import { jsonResponse, errorResponse, handleOptions } from "../_lib/cors.js";
import { validateBooking } from "../_lib/validate.js";
import { generateBookingId } from "../_lib/slots.js";
import {
  sendEmail,
  renderBookingConfirmation,
  renderBookingNotification,
} from "../_lib/email.js";

export const onRequestOptions = ({ request }) => handleOptions(request);

export const onRequestPost = async ({ request, env }) => {
  let body;
  try {
    body = await request.json();
  } catch {
    return errorResponse("JSON invalide", 400, request);
  }

  const result = validateBooking(body);
  if (!result.ok) return errorResponse(result.errors[0], 422, request);
  const {
    consultationTypeId,
    startAt,
    firstName,
    lastName,
    email,
    phone,
    message,
  } = result.value;

  // 1. Récupérer le type de consultation
  let consultationType;
  try {
    consultationType = await env.DB.prepare(
      `SELECT id, name, duration_minutes FROM consultation_types
        WHERE id = ?1 AND is_active = 1 LIMIT 1`
    )
      .bind(consultationTypeId)
      .first();
  } catch (err) {
    console.error("[bookings] db lookup error", err);
    return errorResponse("Erreur serveur", 500, request);
  }
  if (!consultationType) {
    return errorResponse("Type de consultation invalide", 404, request);
  }

  const startMs = new Date(startAt).getTime();
  if (!Number.isFinite(startMs)) {
    return errorResponse("Date invalide", 422, request);
  }
  const endIso = new Date(
    startMs + consultationType.duration_minutes * 60_000
  ).toISOString();
  const startIso = new Date(startMs).toISOString();

  // 2. Vérifier qu'il n'y a pas de conflit avec une réservation existante
  let conflict;
  try {
    conflict = await env.DB.prepare(
      `SELECT id FROM bookings
        WHERE status IN ('pending','confirmed')
          AND start_at < ?1
          AND end_at > ?2
        LIMIT 1`
    )
      .bind(endIso, startIso)
      .first();
  } catch (err) {
    console.error("[bookings] conflict check error", err);
    return errorResponse("Erreur serveur", 500, request);
  }
  if (conflict) {
    return errorResponse(
      "Ce créneau vient d'être réservé, merci d'en choisir un autre.",
      409,
      request
    );
  }

  // 3. Créer le booking
  const id = generateBookingId();
  const ip = request.headers.get("CF-Connecting-IP") || null;
  try {
    await env.DB.prepare(
      `INSERT INTO bookings
        (id, consultation_type_id, start_at, end_at, status,
         client_first_name, client_last_name, client_email, client_phone,
         client_message, source, ip_address)
       VALUES (?1, ?2, ?3, ?4, 'confirmed', ?5, ?6, ?7, ?8, ?9, 'website', ?10)`
    )
      .bind(
        id,
        consultationType.id,
        startIso,
        endIso,
        firstName,
        lastName,
        email,
        phone,
        message,
        ip
      )
      .run();
  } catch (err) {
    console.error("[bookings] insert error", err);
    return errorResponse("Impossible de créer la réservation", 500, request);
  }

  // 4. Envoi des emails (best-effort, on ne fail pas la requête)
  const clientEmail = renderBookingConfirmation({
    firstName,
    startAt: startIso,
    durationMinutes: consultationType.duration_minutes,
    typeName: consultationType.name,
  });
  const adminEmail = renderBookingNotification({
    firstName,
    lastName,
    email,
    phone,
    startAt: startIso,
    durationMinutes: consultationType.duration_minutes,
    typeName: consultationType.name,
    message,
  });

  const adminRecipient = env.TEST_RECIPIENT_EMAIL || env.ADMIN_EMAIL;

  await Promise.all([
    sendEmail(env, {
      to: email,
      subject: `Votre rendez-vous Attitude Voyages — ${formatShortDate(startIso)}`,
      html: clientEmail.html,
      text: clientEmail.text,
      replyTo: env.ADMIN_EMAIL,
    }).catch((err) => console.error("[bookings] client email", err)),
    sendEmail(env, {
      to: adminRecipient,
      subject: `[Nouveau RDV] ${firstName} ${lastName} — ${formatShortDate(startIso)}`,
      html: adminEmail.html,
      text: adminEmail.text,
      replyTo: email,
    }).catch((err) => console.error("[bookings] admin email", err)),
  ]);

  return jsonResponse(
    {
      ok: true,
      booking: {
        id,
        startAt: startIso,
        endAt: endIso,
        type: consultationType.name,
        durationMinutes: consultationType.duration_minutes,
      },
    },
    { status: 201 },
    request
  );
};

function formatShortDate(iso) {
  return new Intl.DateTimeFormat("fr-FR", {
    timeZone: "Europe/Paris",
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(iso));
}
