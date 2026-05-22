import React, { useEffect, useState } from "react";
import "./Admin.css";

const DAYS_FR = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];

const AdminAvailability = () => {
  const [data, setData] = useState(null);
  const [newOverride, setNewOverride] = useState({
    date: "",
    override_type: "blocked",
    start_time: "",
    end_time: "",
    note: "",
  });
  const [busy, setBusy] = useState(false);

  const load = () => {
    setData(null);
    fetch("/api/admin/availability", { credentials: "include" })
      .then((r) => r.json())
      .then((d) => setData(d.ok ? d : { rules: [], overrides: [] }))
      .catch(() => setData({ rules: [], overrides: [] }));
  };

  useEffect(() => {
    load();
  }, []);

  const addOverride = async (e) => {
    e.preventDefault();
    if (!newOverride.date) return;
    setBusy(true);
    try {
      await fetch("/api/admin/availability", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date: newOverride.date,
          override_type: newOverride.override_type,
          start_time: newOverride.start_time || null,
          end_time: newOverride.end_time || null,
          note: newOverride.note || null,
        }),
      });
      setNewOverride({ date: "", override_type: "blocked", start_time: "", end_time: "", note: "" });
      load();
    } finally {
      setBusy(false);
    }
  };

  const removeOverride = async (id) => {
    await fetch(`/api/admin/availability/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    load();
  };

  return (
    <div className="admin-page">
      <header className="admin-page-header">
        <h1 className="admin-page-title">Disponibilités</h1>
        <p className="admin-page-sub">
          Règles hebdomadaires (édition prochaine) et exceptions ponctuelles.
        </p>
      </header>

      {data === null ? (
        <p className="admin-loading">Chargement…</p>
      ) : (
        <>
          <section className="admin-section">
            <h2 className="admin-section-title">Plages horaires hebdomadaires</h2>
            <p className="admin-section-sub admin-muted">
              Ces règles définissent vos horaires d'ouverture par défaut. L'édition se fait directement
              dans la base D1 pour cette version. À venir : édition depuis cet écran.
            </p>
            <div className="admin-rules-grid">
              {[1, 2, 3, 4, 5, 6, 0].map((dow) => {
                const dayRules = data.rules.filter((r) => r.day_of_week === dow);
                return (
                  <div key={dow} className="admin-rule-day">
                    <h3>{DAYS_FR[dow]}</h3>
                    {dayRules.length === 0 ? (
                      <p className="admin-muted">Fermé</p>
                    ) : (
                      <ul>
                        {dayRules.map((r) => (
                          <li key={r.id}>
                            {r.start_time.slice(0, 5)} → {r.end_time.slice(0, 5)}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          <section className="admin-section">
            <h2 className="admin-section-title">Bloquer une date / une plage</h2>
            <form onSubmit={addOverride} className="admin-override-form">
              <div className="admin-form-row">
                <label>
                  <span className="admin-label">Date</span>
                  <input
                    type="date"
                    required
                    value={newOverride.date}
                    onChange={(e) => setNewOverride({ ...newOverride, date: e.target.value })}
                  />
                </label>
                <label>
                  <span className="admin-label">Type</span>
                  <select
                    value={newOverride.override_type}
                    onChange={(e) => setNewOverride({ ...newOverride, override_type: e.target.value })}
                  >
                    <option value="blocked">Bloquer</option>
                    <option value="custom">Plage exceptionnelle</option>
                  </select>
                </label>
              </div>
              <div className="admin-form-row">
                <label>
                  <span className="admin-label">Début (HH:MM)</span>
                  <input
                    type="time"
                    value={newOverride.start_time}
                    onChange={(e) => setNewOverride({ ...newOverride, start_time: e.target.value })}
                    placeholder="(vide = toute la journée)"
                  />
                </label>
                <label>
                  <span className="admin-label">Fin (HH:MM)</span>
                  <input
                    type="time"
                    value={newOverride.end_time}
                    onChange={(e) => setNewOverride({ ...newOverride, end_time: e.target.value })}
                  />
                </label>
              </div>
              <label>
                <span className="admin-label">Note (optionnelle)</span>
                <input
                  type="text"
                  value={newOverride.note}
                  onChange={(e) => setNewOverride({ ...newOverride, note: e.target.value })}
                  placeholder="Ex : vacances, jour férié, formation"
                  maxLength={200}
                />
              </label>
              <button type="submit" disabled={busy} className="admin-btn admin-btn--primary">
                {busy ? "Ajout…" : "Ajouter cette exception"}
              </button>
            </form>

            <h3 className="admin-section-subtitle">Exceptions actives</h3>
            {data.overrides.length === 0 ? (
              <p className="admin-empty">Aucune exception programmée.</p>
            ) : (
              <ul className="admin-overrides-list">
                {data.overrides.map((o) => (
                  <li key={o.id} className="admin-override-row">
                    <span>
                      <strong>
                        {new Intl.DateTimeFormat("fr-FR", {
                          weekday: "long",
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        }).format(new Date(`${o.date}T12:00:00`))}
                      </strong>
                      {" "}
                      {o.start_time && o.end_time
                        ? `${o.start_time}–${o.end_time}`
                        : "(toute la journée)"}
                      {" "}
                      <span className={`admin-badge admin-badge--${o.override_type}`}>
                        {o.override_type === "blocked" ? "Bloqué" : "Plage exceptionnelle"}
                      </span>
                      {o.note && <em className="admin-muted"> — {o.note}</em>}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeOverride(o.id)}
                      className="admin-btn admin-btn--ghost admin-btn--danger"
                    >
                      Supprimer
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </>
      )}
    </div>
  );
};

export default AdminAvailability;
