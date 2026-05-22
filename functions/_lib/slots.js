/**
 * Calcul des créneaux disponibles à partir des règles, overrides et
 * réservations existantes. Tout est exprimé en heure Europe/Paris ; le
 * stockage des bookings reste en UTC ISO-8601.
 */

const PARIS_TZ = "Europe/Paris";
const SLOT_INCREMENT_MIN = 30;

export async function computeAvailability(env, durationMinutes) {
  const horizonDays = parseInt(env.BOOKING_HORIZON_DAYS || "60", 10);
  const leadMinutes = parseInt(env.BOOKING_LEAD_MINUTES || "720", 10);

  const fromDate = new Date();
  const toDate = new Date(fromDate.getTime() + horizonDays * 86_400_000);
  const fromIso = fromDate.toISOString();
  const toIso = toDate.toISOString();
  const fromDay = isoDate(fromDate);
  const toDay = isoDate(toDate);

  const [rulesRes, overridesRes, bookingsRes] = await Promise.all([
    env.DB.prepare(`SELECT * FROM availability_rules WHERE is_active = 1`).all(),
    env.DB.prepare(
      `SELECT * FROM availability_overrides WHERE date >= ?1 AND date <= ?2`
    )
      .bind(fromDay, toDay)
      .all(),
    env.DB.prepare(
      `SELECT start_at, end_at, status FROM bookings
        WHERE status IN ('pending','confirmed')
          AND start_at >= ?1 AND start_at <= ?2`
    )
      .bind(fromIso, toIso)
      .all(),
  ]);

  return buildDays({
    rules: rulesRes.results ?? [],
    overrides: overridesRes.results ?? [],
    bookings: bookingsRes.results ?? [],
    durationMinutes,
    fromDate,
    horizonDays,
    leadMinutes,
  });
}

function buildDays({
  rules,
  overrides,
  bookings,
  durationMinutes,
  fromDate,
  horizonDays,
  leadMinutes,
}) {
  const minBookableAt = fromDate.getTime() + leadMinutes * 60_000;
  const days = [];

  for (let i = 0; i < horizonDays; i++) {
    const day = new Date(fromDate.getTime() + i * 86_400_000);
    const date = isoDate(day);
    const dow = parisDayOfWeek(day);

    const dayOverrides = overrides.filter((o) => o.date === date);
    const fullyBlocked = dayOverrides.some(
      (o) =>
        o.override_type === "blocked" && !o.start_time && !o.end_time
    );
    if (fullyBlocked) {
      days.push({ date, slots: [] });
      continue;
    }

    const customWindows = dayOverrides
      .filter((o) => o.override_type === "custom" && o.start_time && o.end_time)
      .map((o) => ({ start: o.start_time, end: o.end_time }));
    const ruleWindows = rules
      .filter((r) => r.day_of_week === dow)
      .map((r) => ({ start: r.start_time, end: r.end_time }));
    const windows = customWindows.length > 0 ? customWindows : ruleWindows;

    if (windows.length === 0) {
      days.push({ date, slots: [] });
      continue;
    }

    const slots = [];
    for (const w of windows) {
      const startMin = parseHHMM(w.start);
      const endMin = parseHHMM(w.end);
      let cursor = startMin;
      while (cursor + durationMinutes <= endMin) {
        const slotStart = parisDateAt(day, cursor);
        const slotEnd = new Date(slotStart.getTime() + durationMinutes * 60_000);

        if (slotStart.getTime() < minBookableAt) {
          cursor += SLOT_INCREMENT_MIN;
          continue;
        }

        const blockedBySubWindow = dayOverrides.some(
          (o) =>
            o.override_type === "blocked" &&
            o.start_time &&
            o.end_time &&
            cursor < parseHHMM(o.end_time) &&
            cursor + durationMinutes > parseHHMM(o.start_time)
        );
        if (blockedBySubWindow) {
          cursor += SLOT_INCREMENT_MIN;
          continue;
        }

        const conflict = bookings.some((b) => {
          const bs = new Date(b.start_at).getTime();
          const be = new Date(b.end_at).getTime();
          return slotStart.getTime() < be && slotEnd.getTime() > bs;
        });
        if (conflict) {
          cursor += SLOT_INCREMENT_MIN;
          continue;
        }

        slots.push({
          startAt: slotStart.toISOString(),
          endAt: slotEnd.toISOString(),
          label: formatHHMM(cursor),
        });
        cursor += SLOT_INCREMENT_MIN;
      }
    }

    days.push({ date, slots });
  }

  return days;
}

// ─── Time helpers (zone Europe/Paris-aware) ─────────────────────────
function isoDate(d) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: PARIS_TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(d);
}

function parisDayOfWeek(d) {
  const w = new Intl.DateTimeFormat("en-US", {
    timeZone: PARIS_TZ,
    weekday: "short",
  }).format(d);
  return { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 }[w] ?? 0;
}

function parseHHMM(s) {
  const [h, m] = s.split(":");
  return Number(h) * 60 + Number(m);
}

function formatHHMM(minutes) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${String(h).padStart(2, "0")}h${m === 0 ? "" : String(m).padStart(2, "0")}`;
}

function parisDateAt(day, minutesFromMidnight) {
  const dateStr = isoDate(day);
  const hh = Math.floor(minutesFromMidnight / 60);
  const mm = minutesFromMidnight % 60;
  const naive = `${dateStr}T${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}:00`;
  return new Date(`${naive}${parisOffsetForDate(dateStr)}`);
}

function parisOffsetForDate(yyyyMmDd) {
  const probe = new Date(`${yyyyMmDd}T12:00:00Z`);
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: PARIS_TZ,
    timeZoneName: "shortOffset",
  }).formatToParts(probe);
  const tzName = parts.find((p) => p.type === "timeZoneName")?.value ?? "GMT+1";
  const m = tzName.match(/GMT([+-]?\d+)(?::(\d+))?/);
  if (!m) return "+01:00";
  const sign = m[1].startsWith("-") ? "-" : "+";
  const h = String(Math.abs(parseInt(m[1], 10))).padStart(2, "0");
  const min = (m[2] ?? "00").padStart(2, "0");
  return `${sign}${h}:${min}`;
}

// ─── UID pour bookings ──────────────────────────────────────────────
export function generateBookingId() {
  // 16 random bytes → 22 chars base64url
  const buf = crypto.getRandomValues(new Uint8Array(16));
  let bin = "";
  for (let i = 0; i < buf.length; i++) bin += String.fromCharCode(buf[i]);
  return btoa(bin)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}
