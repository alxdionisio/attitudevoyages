-- Rate limiting basique stocké en D1.
-- Stratégie: fenêtre glissante 1h.
-- Pour chaque (bucket, ip), on stocke les N derniers timestamps.

CREATE TABLE IF NOT EXISTS rate_limit_events (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  bucket      TEXT NOT NULL,                    -- ex: 'contact', 'booking'
  ip          TEXT NOT NULL,
  created_at  TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_rl_bucket_ip ON rate_limit_events(bucket, ip);
CREATE INDEX IF NOT EXISTS idx_rl_created ON rate_limit_events(created_at);
