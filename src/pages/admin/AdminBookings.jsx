import React, { useEffect, useState } from "react";
import "./Admin.css";

const STATUSES = [
  { value: "", label: "Tous statuts" },
  { value: "confirmed", label: "Confirmés" },
  { value: "pending", label: "En attente" },
  { value: "cancelled", label: "Annulés" },
  { value: "completed", label: "Terminés" },
  { value: "no_show", label: "Absents" },
];

const STATUS_LABEL = {
  confirmed: "Confirmé",
  pending: "En attente",
  cancelled: "Annulé",
  completed: "Terminé",
  no_show: "Absent",
};

const AdminBookings = () => {
  const [bookings, setBookings] = useState(null);
  const [filter, setFilter] = useState("confirmed");
  const [busyId, setBusyId] = useState(null);

  const load = () => {
    setBookings(null);
    const q = filter ? `?status=${filter}` : "";
    fetch(`/api/admin/bookings${q}`, { credentials: "include" })
      .then((r) => r.json())
      .then((d) => setBookings(d.ok ? d.bookings : []))
      .catch(() => setBookings([]));
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  const updateStatus = async (id, status) => {
    setBusyId(id);
    try {
      await fetch(`/api/admin/bookings/${id}`, {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      load();
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div className="admin-page">
      <header className="admin-page-header">
        <h1 className="admin-page-title">Rendez-vous</h1>
        <div className="admin-toolbar">
          <select value={filter} onChange={(e) => setFilter(e.target.value)} className="admin-select">
            {STATUSES.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
        </div>
      </header>

      {bookings === null && <p className="admin-loading">Chargement…</p>}
      {bookings && bookings.length === 0 && (
        <p className="admin-empty">Aucune réservation pour ce filtre.</p>
      )}
      {bookings && bookings.length > 0 && (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Date & heure</th>
                <th>Client</th>
                <th>Type</th>
                <th>Contact</th>
                <th>Statut</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b.id}>
                  <td>
                    {new Intl.DateTimeFormat("fr-FR", {
                      timeZone: "Europe/Paris",
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    }).format(new Date(b.start_at))}
                  </td>
                  <td>
                    <strong>{b.client_first_name} {b.client_last_name}</strong>
                    {b.client_message && (
                      <details className="admin-msg-details">
                        <summary>Message</summary>
                        <p>{b.client_message}</p>
                      </details>
                    )}
                  </td>
                  <td>{b.type_name} <span className="admin-muted">({b.duration_minutes}m)</span></td>
                  <td>
                    <a href={`mailto:${b.client_email}`}>{b.client_email}</a><br />
                    <a href={`tel:${b.client_phone}`}>{b.client_phone}</a>
                  </td>
                  <td>
                    <span className={`admin-badge admin-badge--${b.status}`}>
                      {STATUS_LABEL[b.status] || b.status}
                    </span>
                  </td>
                  <td className="admin-actions">
                    {b.status === "confirmed" && (
                      <>
                        <button
                          type="button"
                          disabled={busyId === b.id}
                          onClick={() => updateStatus(b.id, "completed")}
                          className="admin-btn admin-btn--ghost"
                        >
                          Marquer fait
                        </button>
                        <button
                          type="button"
                          disabled={busyId === b.id}
                          onClick={() => updateStatus(b.id, "cancelled")}
                          className="admin-btn admin-btn--ghost admin-btn--danger"
                        >
                          Annuler
                        </button>
                      </>
                    )}
                    {b.status === "pending" && (
                      <button
                        type="button"
                        disabled={busyId === b.id}
                        onClick={() => updateStatus(b.id, "confirmed")}
                        className="admin-btn admin-btn--primary"
                      >
                        Confirmer
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminBookings;
