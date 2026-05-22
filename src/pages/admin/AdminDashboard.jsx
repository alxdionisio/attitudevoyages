import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Admin.css";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    Promise.all([
      fetch("/api/admin/bookings?status=confirmed", { credentials: "include" })
        .then((r) => r.json())
        .catch(() => ({ bookings: [] })),
      fetch("/api/admin/messages?status=new", { credentials: "include" })
        .then((r) => r.json())
        .catch(() => ({ messages: [] })),
    ]).then(([b, m]) => {
      const now = Date.now();
      const upcoming = (b.bookings || []).filter(
        (x) => new Date(x.start_at).getTime() > now
      );
      setStats({
        upcomingCount: upcoming.length,
        nextBooking: upcoming.sort((a, b) => a.start_at.localeCompare(b.start_at))[0] || null,
        newMessages: (m.messages || []).length,
      });
    });
  }, []);

  return (
    <div className="admin-page">
      <header className="admin-page-header">
        <h1 className="admin-page-title">Tableau de bord</h1>
        <p className="admin-page-sub">Vue d'ensemble de l'activité</p>
      </header>

      {!stats ? (
        <p className="admin-loading">Chargement…</p>
      ) : (
        <>
          <div className="admin-kpis">
            <div className="admin-kpi">
              <span className="admin-kpi-label">RDV à venir</span>
              <span className="admin-kpi-value">{stats.upcomingCount}</span>
            </div>
            <div className="admin-kpi">
              <span className="admin-kpi-label">Messages non lus</span>
              <span className="admin-kpi-value">{stats.newMessages}</span>
            </div>
          </div>

          {stats.nextBooking && (
            <section className="admin-next-rdv">
              <h2 className="admin-section-title">Prochain rendez-vous</h2>
              <div className="admin-next-rdv-card">
                <div>
                  <p className="admin-next-rdv-name">
                    {stats.nextBooking.client_first_name} {stats.nextBooking.client_last_name}
                  </p>
                  <p className="admin-next-rdv-meta">
                    {stats.nextBooking.type_name} · {stats.nextBooking.duration_minutes} min
                  </p>
                </div>
                <div className="admin-next-rdv-date">
                  {new Intl.DateTimeFormat("fr-FR", {
                    timeZone: "Europe/Paris",
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    hour: "2-digit",
                    minute: "2-digit",
                  }).format(new Date(stats.nextBooking.start_at))}
                </div>
              </div>
            </section>
          )}

          <div className="admin-shortcuts">
            <Link to="/admin/bookings" className="admin-shortcut">
              Voir tous les rendez-vous →
            </Link>
            <Link to="/admin/messages" className="admin-shortcut">
              Voir les messages →
            </Link>
            <Link to="/admin/availability" className="admin-shortcut">
              Gérer les disponibilités →
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminDashboard;
