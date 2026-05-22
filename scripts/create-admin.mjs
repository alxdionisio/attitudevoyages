#!/usr/bin/env node
/**
 * Crée (ou met à jour) un compte admin dans la base D1.
 * Usage :
 *   node scripts/create-admin.mjs <email> <password> [displayName]
 *   node scripts/create-admin.mjs <email> <password> [displayName] --remote
 *
 * Le hash PBKDF2-SHA256 est généré localement puis inséré via Wrangler D1.
 * Sans --remote, écrit dans la D1 locale (sandbox dev).
 */

import { spawnSync } from "node:child_process";
import { webcrypto } from "node:crypto";
import { argv } from "node:process";

const args = argv.slice(2);
const remote = args.includes("--remote");
const positional = args.filter((a) => !a.startsWith("--"));
const [email, password, displayName] = positional;

if (!email || !password) {
  console.error("Usage: node scripts/create-admin.mjs <email> <password> [displayName] [--remote]");
  process.exit(1);
}
if (password.length < 12) {
  console.error("Mot de passe trop court (12 caractères minimum).");
  process.exit(1);
}

// ── PBKDF2-SHA256 (compat avec functions/_lib/auth.js)
const PBKDF2_ITER = 100_000;
const PBKDF2_SALT_LEN = 16;
const PBKDF2_HASH_LEN = 32;

const enc = new TextEncoder();

const salt = webcrypto.getRandomValues(new Uint8Array(PBKDF2_SALT_LEN));
const key = await webcrypto.subtle.importKey(
  "raw",
  enc.encode(password),
  { name: "PBKDF2" },
  false,
  ["deriveBits"]
);
const hashBuf = await webcrypto.subtle.deriveBits(
  { name: "PBKDF2", salt, iterations: PBKDF2_ITER, hash: "SHA-256" },
  key,
  PBKDF2_HASH_LEN * 8
);
const passwordHash = `pbkdf2$${PBKDF2_ITER}$${Buffer.from(salt).toString("base64")}$${Buffer.from(hashBuf).toString("base64")}`;

// ── UUID v4
const id = webcrypto.randomUUID();

const sql = `INSERT INTO admin_users (id, email, password_hash, display_name, is_active)
  VALUES ('${id}', '${email.toLowerCase().replace(/'/g, "''")}', '${passwordHash}',
          ${displayName ? `'${displayName.replace(/'/g, "''")}'` : "NULL"}, 1)
  ON CONFLICT(email) DO UPDATE SET password_hash = excluded.password_hash,
                                    display_name = excluded.display_name,
                                    is_active = 1;`;

const target = remote ? "--remote" : "--local";
console.log(`→ Création / mise à jour du compte admin ${email} (${remote ? "remote" : "local"})…`);

const result = spawnSync(
  "npx",
  ["wrangler", "d1", "execute", "attitude_voyages", target, `--command=${sql}`],
  { stdio: "inherit" }
);

if (result.status !== 0) {
  console.error("Échec de l'exécution Wrangler. Vérifie ta connexion (wrangler login) et database_id dans wrangler.toml.");
  process.exit(result.status ?? 1);
}

console.log(`✔ Admin ${email} prêt. Connecte-toi sur /admin/login.`);
