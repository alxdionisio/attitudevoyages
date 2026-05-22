-- Attitude Voyages — initial D1 schema
-- Cloudflare D1 = SQLite (no btree_gist, no triggers as in Postgres).
-- Times are stored as TEXT in 'HH:MM' (24h) or ISO-8601 for timestamps.

-- =============================================================
-- Types de consultation / rendez-vous
-- =============================================================
CREATE TABLE IF NOT EXISTS consultation_types (
  id                TEXT PRIMARY KEY,             -- uuid v4 string
  slug              TEXT NOT NULL UNIQUE,
  name              TEXT NOT NULL,
  description       TEXT,
  duration_minutes  INTEGER NOT NULL CHECK (duration_minutes BETWEEN 15 AND 240),
  price_label       TEXT,                          -- "Gratuit", "Sur devis", etc.
  is_active         INTEGER NOT NULL DEFAULT 1,
  sort_order        INTEGER NOT NULL DEFAULT 0,
  created_at        TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Seed values (idempotent via INSERT OR IGNORE)
INSERT OR IGNORE INTO consultation_types (id, slug, name, description, duration_minutes, price_label, sort_order) VALUES
  ('ct-001-premier-contact',
   'premier-contact',
   'Premier contact',
   'Échange d''environ 30 min pour comprendre vos envies, votre budget et le type de voyage qui vous correspond.',
   30, 'Sans engagement', 1),
  ('ct-002-devis-detaille',
   'devis-detaille',
   'Devis détaillé sur mesure',
   'Vous avez déjà une idée précise. Une heure pour construire ensemble votre itinéraire et un devis chiffré.',
   60, 'Sans engagement', 2),
  ('ct-003-bilan-retour',
   'bilan-retour-voyage',
   'Bilan retour de voyage',
   'Pour les clients de l''agence — retour d''expérience et préparation du prochain voyage.',
   45, 'Réservé clients', 3);

-- =============================================================
-- Règles de disponibilité hebdomadaires
-- day_of_week : 0=dimanche … 6=samedi (standard JS)
-- start_time / end_time en heure locale Europe/Paris.
-- =============================================================
CREATE TABLE IF NOT EXISTS availability_rules (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  day_of_week INTEGER NOT NULL CHECK (day_of_week BETWEEN 0 AND 6),
  start_time  TEXT NOT NULL,
  end_time    TEXT NOT NULL,
  is_active   INTEGER NOT NULL DEFAULT 1,
  created_at  TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Default seed (mardi → vendredi, 9h30-12h + 14h-18h ; pas de lundi/samedi/dimanche)
INSERT INTO availability_rules (day_of_week, start_time, end_time, is_active)
SELECT 2, '09:30', '12:00', 1
WHERE NOT EXISTS (SELECT 1 FROM availability_rules WHERE day_of_week = 2 AND start_time = '09:30');

INSERT INTO availability_rules (day_of_week, start_time, end_time, is_active)
SELECT 2, '14:00', '18:00', 1
WHERE NOT EXISTS (SELECT 1 FROM availability_rules WHERE day_of_week = 2 AND start_time = '14:00');

INSERT INTO availability_rules (day_of_week, start_time, end_time, is_active)
SELECT 3, '09:30', '12:00', 1
WHERE NOT EXISTS (SELECT 1 FROM availability_rules WHERE day_of_week = 3 AND start_time = '09:30');

INSERT INTO availability_rules (day_of_week, start_time, end_time, is_active)
SELECT 3, '14:00', '18:00', 1
WHERE NOT EXISTS (SELECT 1 FROM availability_rules WHERE day_of_week = 3 AND start_time = '14:00');

INSERT INTO availability_rules (day_of_week, start_time, end_time, is_active)
SELECT 4, '09:30', '12:00', 1
WHERE NOT EXISTS (SELECT 1 FROM availability_rules WHERE day_of_week = 4 AND start_time = '09:30');

INSERT INTO availability_rules (day_of_week, start_time, end_time, is_active)
SELECT 4, '14:00', '18:00', 1
WHERE NOT EXISTS (SELECT 1 FROM availability_rules WHERE day_of_week = 4 AND start_time = '14:00');

INSERT INTO availability_rules (day_of_week, start_time, end_time, is_active)
SELECT 5, '09:30', '12:00', 1
WHERE NOT EXISTS (SELECT 1 FROM availability_rules WHERE day_of_week = 5 AND start_time = '09:30');

INSERT INTO availability_rules (day_of_week, start_time, end_time, is_active)
SELECT 5, '14:00', '18:00', 1
WHERE NOT EXISTS (SELECT 1 FROM availability_rules WHERE day_of_week = 5 AND start_time = '14:00');

-- =============================================================
-- Overrides ponctuels (vacances, jours fériés, créneaux exceptionnels)
-- override_type : 'blocked' (retire de la dispo) | 'custom' (remplace la règle du jour)
-- Si override_type='blocked' avec start_time/end_time NULL → toute la journée bloquée.
-- =============================================================
CREATE TABLE IF NOT EXISTS availability_overrides (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  date          TEXT NOT NULL,                    -- YYYY-MM-DD
  start_time    TEXT,
  end_time      TEXT,
  override_type TEXT NOT NULL DEFAULT 'blocked'
                CHECK (override_type IN ('blocked','custom')),
  note          TEXT,
  created_at    TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_overrides_date ON availability_overrides(date);

-- =============================================================
-- Réservations
-- start_at / end_at : ISO-8601 UTC (computed server-side from local time)
-- status : 'pending' (créé, en attente de confirmation client),
--          'confirmed' (validé), 'cancelled', 'no_show', 'completed'
-- =============================================================
CREATE TABLE IF NOT EXISTS bookings (
  id                    TEXT PRIMARY KEY,
  consultation_type_id  TEXT NOT NULL REFERENCES consultation_types(id),
  start_at              TEXT NOT NULL,            -- ISO UTC
  end_at                TEXT NOT NULL,            -- ISO UTC
  status                TEXT NOT NULL DEFAULT 'confirmed'
                        CHECK (status IN ('pending','confirmed','cancelled','no_show','completed')),
  client_first_name     TEXT NOT NULL,
  client_last_name      TEXT NOT NULL,
  client_email          TEXT NOT NULL,
  client_phone          TEXT NOT NULL,
  client_message        TEXT,
  cancellation_reason   TEXT,
  source                TEXT DEFAULT 'website',
  ip_address            TEXT,                     -- pour rate limit / anti-abuse (optionnel)
  created_at            TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at            TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_bookings_start_at ON bookings(start_at);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_bookings_email ON bookings(client_email);

-- =============================================================
-- Messages de contact (formulaire libre)
-- =============================================================
CREATE TABLE IF NOT EXISTS contact_messages (
  id          TEXT PRIMARY KEY,
  nom         TEXT NOT NULL,
  email       TEXT NOT NULL,
  sujet       TEXT,
  message     TEXT NOT NULL,
  status      TEXT NOT NULL DEFAULT 'new'
              CHECK (status IN ('new','read','replied','archived','spam')),
  ip_address  TEXT,
  user_agent  TEXT,
  created_at  TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_contact_messages_status ON contact_messages(status);
CREATE INDEX IF NOT EXISTS idx_contact_messages_created ON contact_messages(created_at);

-- =============================================================
-- Admin users + sessions
-- password_hash : PBKDF2-SHA-256, format 'pbkdf2$<iter>$<salt-b64>$<hash-b64>'
-- =============================================================
CREATE TABLE IF NOT EXISTS admin_users (
  id              TEXT PRIMARY KEY,
  email           TEXT NOT NULL UNIQUE,
  password_hash   TEXT NOT NULL,
  display_name    TEXT,
  is_active       INTEGER NOT NULL DEFAULT 1,
  last_login_at   TEXT,
  created_at      TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS admin_sessions (
  id          TEXT PRIMARY KEY,                  -- session id (sent in cookie)
  user_id     TEXT NOT NULL REFERENCES admin_users(id) ON DELETE CASCADE,
  expires_at  TEXT NOT NULL,
  user_agent  TEXT,
  ip_address  TEXT,
  created_at  TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_admin_sessions_user ON admin_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_admin_sessions_expires ON admin_sessions(expires_at);
