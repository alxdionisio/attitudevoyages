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
  const ip = request.headers.get("CF-Connecting-IP") || "unknown";
  const limit = customLimit ?? DEFAULTS[bucket] ?? 10;
  const cutoff = new Date(Date.now() - WINDOW_MS).toISOString();

  try {
    // Compte les events récents
    const { results } = await env.DB.prepare(
      `SELECT created_at FROM rate_limit_events
        WHERE bucket = ?1 AND ip = ?2 AND created_at > ?3
        ORDER BY created_at ASC`
    )
      .bind(bucket, ip, cutoff)
      .all();

    const events = results ?? [];
    if (events.length >= limit) {
      const oldest = new Date(events[0].created_at + "Z").getTime();
      const retryAfter = Math.max(
        1,
        Math.ceil((oldest + WINDOW_MS - Date.now()) / 1000)
      );
      return { ok: false, retryAfterSeconds: retryAfter };
    }

    // Insert un nouvel event
    await env.DB.prepare(
      `INSERT INTO rate_limit_events (bucket, ip) VALUES (?1, ?2)`
    )
      .bind(bucket, ip)
      .run();

    // Lazy purge (1 fois sur 20 environ)
    if (Math.random() < 0.05) {
      await env.DB.prepare(
        `DELETE FROM rate_limit_events WHERE created_at < ?1`
      )
        .bind(cutoff)
        .run();
    }

    return { ok: true };
  } catch (err) {
    // En cas d'erreur DB, on laisse passer plutôt que de tout bloquer.
    console.error("[ratelimit] db error", err);
    return { ok: true };
  }
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
