/**
 * Rate limiting très simple — fenêtre glissante d'1h par IP par bucket.
 *
 * Limites par défaut :
 *   - 'contact' : 5 messages / IP / heure
 *   - 'booking' : 5 réservations / IP / heure
 *
 * On purge les entrées >1h à chaque appel (lazy GC) pour éviter une table
 * qui grossit indéfiniment.
 */

const WINDOW_MS = 60 * 60 * 1000;

const DEFAULTS = {
  contact: 5,
  booking: 5,
};

/**
 * @returns {Promise<{ok: true} | {ok: false, retryAfterSeconds: number}>}
 */
export async function checkRateLimit(env, request, bucket, customLimit) {
  const rl = await peekRateLimit(env, request, bucket, customLimit);
  if (rl.ok) await recordRateLimitEvent(env, request, bucket);
  return rl;
}

/**
 * Vérifie la limite sans consommer de tentative (ex. login : seuls les échecs
 * sont enregistrés, via recordRateLimitEvent).
 * @returns {Promise<{ok: true} | {ok: false, retryAfterSeconds: number}>}
 */
export async function peekRateLimit(env, request, bucket, customLimit) {
  const ip = clientIp(request);
  const limit = customLimit ?? DEFAULTS[bucket] ?? 10;

  try {
    // Le seuil est calculé en SQL : `created_at` est au format SQLite
    // ('YYYY-MM-DD HH:MM:SS'), non comparable à un ISO JS ('…T…Z').
    const { results } = await env.DB.prepare(
      `SELECT created_at FROM rate_limit_events
        WHERE bucket = ?1 AND ip = ?2 AND created_at > datetime('now', '-1 hour')
        ORDER BY created_at ASC`
    )
      .bind(bucket, ip)
      .all();

    const events = results ?? [];
    if (events.length >= limit) {
      const oldest = new Date(
        events[0].created_at.replace(" ", "T") + "Z"
      ).getTime();
      const retryAfter = Math.max(
        1,
        Math.ceil((oldest + WINDOW_MS - Date.now()) / 1000)
      );
      return { ok: false, retryAfterSeconds: retryAfter };
    }
    return { ok: true };
  } catch (err) {
    // En cas d'erreur DB, on laisse passer plutôt que de tout bloquer.
    console.error("[ratelimit] db error", err);
    return { ok: true };
  }
}

export async function recordRateLimitEvent(env, request, bucket) {
  try {
    await env.DB.prepare(
      `INSERT INTO rate_limit_events (bucket, ip) VALUES (?1, ?2)`
    )
      .bind(bucket, clientIp(request))
      .run();

    // Lazy purge (1 fois sur 20 environ)
    if (Math.random() < 0.05) {
      await env.DB.prepare(
        `DELETE FROM rate_limit_events WHERE created_at < datetime('now', '-1 hour')`
      ).run();
    }
  } catch (err) {
    console.error("[ratelimit] db error", err);
  }
}

function clientIp(request) {
  return request.headers.get("CF-Connecting-IP") || "unknown";
}

export function tooManyRequests(retryAfter, request) {
  return new Response(
    JSON.stringify({
      ok: false,
      error: "Trop de requêtes. Veuillez réessayer dans quelques minutes.",
      retryAfter,
    }),
    {
      status: 429,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Retry-After": String(retryAfter),
        "Cache-Control": "no-store",
        "Access-Control-Allow-Origin": request?.headers?.get("Origin") || "*",
        "Access-Control-Allow-Credentials": "true",
      },
    }
  );
}
