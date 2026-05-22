import React, { useEffect, useState } from "react";
import "./Admin.css";

const DAYS_FR = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
const DAYS_ORDER = [1, 2, 3, 4, 5, 6, 0]; // Lundi → Dimanche

const AdminAvailability = () => {
  const [data, setData] = useState(null);
  const [editingRule, setEditingRule] = useState(null);
  const [newRule, setNewRule] = useState({ day_of_week: 1, start_time: "09:00", end_time: "12:00" });
  const [busy, setBusy] = useState(false);
  const [newOverride, setNewOverride] = useState({
    date: "",
    override_type: "blocked",
    start_time: "",
    end_time: "",
    note: "",
  });

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

  // ─── Rules CRUD ─────────────────────────────────────────────
  const addRule = async (e) => {
    e.preventDefault();
    setBusy(true);
    try {
      await fetch("/api/admin/rules", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newRule),
      });
      load();
      setNewRule({ day_of_week: 1, start_time: "09:00", end_time: "12:00" });
    } finally {
      setBusy(false);
    }
  };

  const saveEditingRule = async () => {
    if (!editingRule) return;
    setBusy(true);
    try {
      await fetch(`/api/admin/rules/${editingRule.id}`, {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          day_of_week: editingRule.day_of_week,
          start_time: editingRule.start_time,
          end_time: editingRule.end_time,
          is_active: editingRule.is_active,
        }),
      });
      setEditingRule(null);
      load();
    } finally {
      setBusy(false);
    }
  };

  const toggleRule = async (rule) => {
    await fetch(`/api/admin/rules/${rule.id}`, {
      method: "PATCH",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ is_active: !rule.is_active }),
    });
    load();
  };

  const removeRule = async (id) => {
    if (!confirm("Supprimer cette plage horaire ?")) return;
    await fetch(`/api/admin/rules/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    load();
  };

  // ─── Overrides CRUD ─────────────────────────────────────────
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
          Plages horaires hebdomadaires et exceptions ponctuelles.
        </p>
      </header>

      {data === null ? (
        <p className="admin-loading">Chargement…</p>
      ) : (
        <>
          <section className="admin-section">
            <h2 className="admin-section-title">Plages horaires hebdomadaires</h2>
            <p className="admin-section-sub admin-muted">
              Ajoutez plusieurs plages par jour si vous coupez (ex&nbsp;: matin
              9h30–12h, après-midi 14h–18h). Désactivez une plage sans la
              supprimer pour la garder en mémoire.
            </p>

            <div className="admin-rules-grid">
              {DAYS_ORDER.map((dow) => {
                const dayRules = data.rules.filter((r) => r.day_of_week === dow);
                return (
                  <div key={dow} className="admin-rule-day">
                    <h3>{DAYS_FR[dow]}</h3>
                    {dayRules.length === 0 ? (
                      <p className="admin-muted">Fermé</p>
                    ) : (
                      <ul className="admin-rule-list">
                        {dayRules.map((r) =>
                          editingRule?.id === r.id ? (
                            <li key={r.id} className="admin-rule-edit">
                              <input
                                type="time"
                                value={editingRule.start_time}
                                onChange={(e) =>
                                  setEditingRule({ ...editingRule, start_time: e.target.value })
                                }
                              />
                              <span>→</span>
                              <input
                                type="time"
                                value={editingRule.end_time}
                                onChange={(e) =>
                                  setEditingRule({ ...editingRule, end_time: e.target.value })
                                }
                              />
                              <button
                                type="button"
                                onClick={saveEditingRule}
                                className="admin-btn admin-btn--primary"
                                disabled={busy}
                              >
                                OK
                              </button>
                              <button
                                type="button"
                                onClick={() => setEditingRule(null)}
                                className="admin-btn admin-btn--ghost"
                              >
                                ✕
                              </button>
                            </li>
                          ) : (
                            <li key={r.id} className={`admin-rule-item ${!r.is_active ? "admin-rule-item--off" : ""}`}>
                              <span className="admin-rule-time">
                                {r.start_time.slice(0, 5)} → {r.end_time.slice(0, 5)}
                              </span>
                              <div className="admin-rule-actions">
                                <button
                                  type="button"
                                  onClick={() => toggleRule(r)}
                                  className="admin-btn admin-btn--ghost"
                                  title={r.is_active ? "Désactiver" : "Activer"}
                                >
                                  {r.is_active ? "Pause" : "Réactiver"}
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setEditingRule({ ...r })}
                                  className="admin-btn admin-btn--ghost"
                                >
                                  Modifier
                                </button>
                                <button
                                  type="button"
                                  onClick={() => removeRule(r.id)}
                                  className="admin-btn admin-btn--ghost admin-btn--danger"
                                >
                                  ✕
                                </button>
                              </div>
                            </li>
                          )
                        )}
                      </ul>
                    )}
                  </div>
                );
              })}
            </div>

            <form onSubmit={addRule} className="admin-override-form" style={{ marginTop: "1.5rem" }}>
              <h3 className="admin-section-subtitle" style={{ marginTop: 0 }}>Ajouter une plage</h3>
              <div className="admin-form-row admin-form-row--three">
                <label>
                  <span className="admin-label">Jour</span>
                  <select
                    value={newRule.day_of_week}
                    onChange={(e) => setNewRule({ ...newRule, day_of_week: parseInt(e.target.value, 10) })}
                  >
                    {DAYS_ORDER.map((dow) => (
                      <option key={dow} value={dow}>{DAYS_FR[dow]}</option>
                    ))}
                  </select>
                </label>
                <label>
                  <span className="admin-label">Début</span>
                  <input
                    type="time"
                    required
                    value={newRule.start_time}
                    onChange={(e) => setNewRule({ ...newRule, start_time: e.target.value })}
                  />
                </label>
                <label>
                  <span className="admin-label">Fin</span>
                  <input
                    type="time"
                    required
                    value={newRule.end_time}
                    onChange={(e) => setNewRule({ ...newRule, end_time: e.target.value })}
                  />
                </label>
              </div>
              <button type="submit" disabled={busy} className="admin-btn admin-btn--primary">
                {busy ? "Ajout…" : "Ajouter la plage"}
              </button>
            </form>
          </section>

          <section className="admin-section">
            <h2 className="admin-section-title">Exceptions (vacances, jours fériés)</h2>
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
