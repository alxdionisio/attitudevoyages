import { test } from "node:test";
import assert from "node:assert/strict";
import { onRequestPost } from "../functions/api/bookings.js";
import { computeAvailability } from "../functions/_lib/slots.js";

// Faux D1 : ouvert tous les jours 09:30-12:00, aucune réservation existante.
function fakeEnv() {
  const inserted = [];
  const DB = {
    prepare(sql) {
      const stmt = {
        bind: () => stmt,
        first: async () =>
          sql.includes("consultation_types")
            ? { id: "ct", name: "Premier contact", duration_minutes: 30 }
            : null,
        all: async () => ({
          results: sql.includes("availability_rules")
            ? [0, 1, 2, 3, 4, 5, 6].map((d) => ({
                day_of_week: d,
                start_time: "09:30",
                end_time: "12:00",
              }))
            : [],
        }),
        run: async () => {
          if (sql.includes("INSERT INTO bookings")) inserted.push(sql);
        },
      };
      return stmt;
    },
  };
  return { env: { DB }, inserted };
}

function post(env, startAt) {
  const request = new Request("https://attitude-voyages.fr/api/bookings", {
    method: "POST",
    body: JSON.stringify({
      consultationTypeId: "ct",
      startAt,
      firstName: "Jean",
      lastName: "Dupont",
      email: "jean@example.com",
      phone: "0466374863",
      consent: true,
    }),
  });
  return onRequestPost({ request, env });
}

async function firstOpenSlot(env) {
  const days = await computeAvailability(env, 30);
  return days.find((d) => d.slots.length > 0).slots[0].startAt;
}

test("un créneau proposé par /api/availability est accepté", async () => {
  const { env, inserted } = fakeEnv();
  const res = await post(env, await firstOpenSlot(env));
  assert.equal(res.status, 201);
  assert.equal(inserted.length, 1);
});

test("un créneau hors disponibilités est refusé", async () => {
  const { env, inserted } = fakeEnv();
  // 6 h avant l'ouverture : en pleine nuit, mais toujours dans le futur.
  const offHours = new Date(
    Date.parse(await firstOpenSlot(env)) - 6 * 3_600_000
  ).toISOString();
  const res = await post(env, offHours);
  assert.equal(res.status, 409);
  assert.equal(inserted.length, 0);
});
