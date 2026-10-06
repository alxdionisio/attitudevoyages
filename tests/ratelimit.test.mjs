import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { DatabaseSync } from "node:sqlite";
import { checkRateLimit } from "../functions/_lib/ratelimit.js";
import { onRequestPost as login } from "../functions/api/admin/login.js";

// D1 minimal au-dessus d'un vrai SQLite en mémoire, avec les vraies migrations :
// le format de date de `datetime('now')` fait partie de ce qu'on teste.
function realEnv() {
  const db = new DatabaseSync(":memory:");
  for (const f of ["0001_init.sql", "0003_rate_limits.sql"]) {
    db.exec(readFileSync(new URL(`../migrations/${f}`, import.meta.url), "utf8"));
  }
  const DB = {
    prepare(sql) {
      let params = [];
      const args = () =>
        params.length
          ? [Object.fromEntries(params.map((v, i) => [i + 1, v]))]
          : [];
      const stmt = {
        bind: (...a) => ((params = a), stmt),
        all: async () => ({ results: db.prepare(sql).all(...args()) }),
        first: async () => db.prepare(sql).get(...args()) ?? null,
        run: async () => void db.prepare(sql).run(...args()),
      };
      return stmt;
    },
  };
  return { DB };
}

function req(ip, body) {
  return new Request("https://attitude-voyages.fr/api/x", {
    method: "POST",
    headers: { "CF-Connecting-IP": ip },
    body: JSON.stringify(body ?? {}),
  });
}

test("checkRateLimit bloque la 6e requête 'contact' d'une même IP", async () => {
  const env = realEnv();
  for (let i = 0; i < 5; i++) {
    assert.equal((await checkRateLimit(env, req("1.1.1.1"), "contact")).ok, true);
  }
  const sixth = await checkRateLimit(env, req("1.1.1.1"), "contact");
  assert.equal(sixth.ok, false);
  assert.ok(sixth.retryAfterSeconds > 3500 && sixth.retryAfterSeconds <= 3600);
  // Une autre IP n'est pas affectée.
  assert.equal((await checkRateLimit(env, req("2.2.2.2"), "contact")).ok, true);
});

test("la connexion admin est bloquée après 10 échecs depuis une même IP", async () => {
  const env = realEnv();
  const attempt = () =>
    login({
      request: req("3.3.3.3", { email: "x@example.com", password: "mauvais-mot-de-passe" }),
      env,
    });
  for (let i = 0; i < 10; i++) assert.equal((await attempt()).status, 401);
  assert.equal((await attempt()).status, 429);
});
