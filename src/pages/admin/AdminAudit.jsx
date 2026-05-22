import React, { useEffect, useState } from "react";
import "./Admin.css";

const ACTION_LABEL = {
  "booking.status.confirmed": "RDV confirmé",
  "booking.status.cancelled": "RDV annulé",
  "booking.status.completed": "RDV terminé",
  "booking.status.no_show": "RDV : client absent",
  "booking.status.pending": "RDV remis en attente",
  "booking.delete": "RDV supprimé",
  "override.create": "Exception créée",
  "override.delete": "Exception supprimée",
  "rule.create": "Plage horaire créée",
  "rule.update": "Plage horaire modifiée",
  "rule.delete": "Plage horaire supprimée",
};

const RESOURCE_LABEL = {
  booking: "Réservation",
  override: "Exception",
  rule: "Plage horaire",
  message: "Message",
};

const AdminAudit = () => {
  const [entries, setEntries] = useState(null);
  const [filterAction, setFilterAction] = useState("");

  useEffect(() => {
    const q = filterAction ? `?action=${encodeURIComponent(filterAction)}` : "";
    setEntries(null);
    fetch(`/api/admin/audit-log${q}`, { credentials: "include" })
      .then((r) => r.json())
      .then((d) => setEntries(d.ok ? d.entries : []))
      .catch(() => setEntries([]));
  }, [filterAction]);

  return (
    <div className="admin-page">
      <header className="admin-page-header">
        <h1 className="admin-page-title">Journal d'activité</h1>
        <p className="admin-page-sub">Historique des actions admin (200 dernières)</p>
        <div className="admin-toolbar">
          <select
            value={filterAction}
            onChange={(e) => setFilterAction(e.target.value)}
            className="admin-select"
          >
            <option value="">Toutes actions</option>
            <optgroup label="Réservations">
              <option value="booking.status.confirmed">Confirmations</option>
              <option value="booking.status.cancelled">Annulations</option>
              <option value="booking.status.completed">Marqués terminés</option>
              <option value="booking.delete">Suppressions</option>
            </optgroup>
            <optgroup label="Disponibilités">
              <option value="override.create">Exceptions créées</option>
              <option value="rule.create">Plages créées</option>
              <option value="rule.update">Plages modifiées</option>
            </optgroup>
          </select>
        </div>
      </header>

      {entries === null && <p className="admin-loading">Chargement…</p>}
      {entries && entries.length === 0 && (
        <p className="admin-empty">Aucune action enregistrée pour ce filtre.</p>
      )}
      {entries && entries.length > 0 && (
        <ol className="admin-audit-list">
          {entries.map((e) => (
            <li key={e.id} className="admin-audit-entry">
              <time className="admin-audit-time">
                {new Intl.DateTimeFormat("fr-FR", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                }).format(new Date(e.created_at + "Z"))}
              </time>
              <div className="admin-audit-body">
                <span className="admin-audit-action">
                  {ACTION_LABEL[e.action] || e.action}
                </span>
                <span className="admin-audit-meta">
                  {e.user_email || "(système)"} ·{" "}
                  {RESOURCE_LABEL[e.resource_type] || e.resource_type}
                  {e.resource_id ? ` #${e.resource_id.slice(0, 8)}` : ""}
                </span>
                {e.metadata && (
                  <details className="admin-audit-details">
                    <summary>Détails</summary>
                    <pre>{JSON.stringify(e.metadata, null, 2)}</pre>
                  </details>
                )}
              </div>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
};

export default AdminAudit;
