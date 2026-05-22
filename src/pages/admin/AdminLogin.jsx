import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Admin.css";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        navigate("/admin/dashboard", { replace: true });
      } else {
        setError(data.error || "Identifiants invalides.");
      }
    } catch {
      setError("Erreur réseau. Réessayez.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="admin-login-wrap">
      <div className="admin-login-card">
        <h1 className="admin-login-title">Back-office</h1>
        <p className="admin-login-sub">Attitude Voyages — accès restreint</p>
        <form onSubmit={handleSubmit} className="admin-login-form" noValidate>
          <label>
            <span className="admin-label">Email</span>
            <input
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label>
            <span className="admin-label">Mot de passe</span>
            <input
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          {error && <p className="admin-error">{error}</p>}
          <button type="submit" disabled={submitting} className="admin-btn admin-btn--primary">
            {submitting ? "Connexion…" : "Se connecter"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
