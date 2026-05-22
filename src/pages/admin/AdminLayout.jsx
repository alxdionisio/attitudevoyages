import React, { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import "./Admin.css";

const AdminLayout = () => {
  const [user, setUser] = useState(undefined); // undefined=loading, null=guest
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/api/admin/me", { credentials: "include" })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data && data.ok) setUser(data.user);
        else setUser(null);
      })
      .catch(() => setUser(null));
  }, []);

  useEffect(() => {
    if (user === null) navigate("/admin/login", { replace: true });
  }, [user, navigate]);

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST", credentials: "include" });
    setUser(null);
    navigate("/admin/login", { replace: true });
  };

  if (user === undefined) {
    return <div className="admin-loading">Chargement…</div>;
  }
  if (user === null) return null;

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <span className="admin-brand-label">Attitude Voyages</span>
          <span className="admin-brand-role">Back-office</span>
        </div>
        <nav className="admin-nav">
          <NavLink to="/admin/dashboard" end className="admin-nav-link">
            Tableau de bord
          </NavLink>
          <NavLink to="/admin/bookings" className="admin-nav-link">
            Rendez-vous
          </NavLink>
          <NavLink to="/admin/messages" className="admin-nav-link">
            Messages
          </NavLink>
          <NavLink to="/admin/availability" className="admin-nav-link">
            Disponibilités
          </NavLink>
          <NavLink to="/admin/audit" className="admin-nav-link">
            Journal
          </NavLink>
        </nav>
        <div className="admin-user">
          <div className="admin-user-info">
            <span className="admin-user-name">{user.displayName || "Admin"}</span>
            <span className="admin-user-email">{user.email}</span>
          </div>
          <button type="button" onClick={handleLogout} className="admin-logout">
            Déconnexion
          </button>
        </div>
      </aside>
      <main className="admin-main">
        <Outlet context={{ user }} />
      </main>
    </div>
  );
};

export default AdminLayout;
