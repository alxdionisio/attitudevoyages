-- Audit log — traque toutes les actions sensibles de l'admin
-- pour pouvoir répondre à "qui a annulé ce RDV, et quand ?"

CREATE TABLE IF NOT EXISTS admin_audit_log (
  id              INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id         TEXT REFERENCES admin_users(id),
  user_email      TEXT,                              -- copie au moment de l'action (admin peut être supprimé après)
  action          TEXT NOT NULL,                     -- ex: 'booking.cancel', 'rule.create'
  resource_type   TEXT NOT NULL,                     -- 'booking' | 'rule' | 'override' | 'message'
  resource_id     TEXT,                              -- id de l'enregistrement touché
  metadata        TEXT,                              -- JSON: anciens/nouveaux valeurs
  ip_address      TEXT,
  user_agent      TEXT,
  created_at      TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_audit_created ON admin_audit_log(created_at);
CREATE INDEX IF NOT EXISTS idx_audit_action ON admin_audit_log(action);
CREATE INDEX IF NOT EXISTS idx_audit_resource ON admin_audit_log(resource_type, resource_id);
