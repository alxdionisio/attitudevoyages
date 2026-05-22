import React, { useEffect, useState } from "react";
import "./Admin.css";

const AdminMessages = () => {
  const [messages, setMessages] = useState(null);

  useEffect(() => {
    fetch("/api/admin/messages", { credentials: "include" })
      .then((r) => r.json())
      .then((d) => setMessages(d.ok ? d.messages : []))
      .catch(() => setMessages([]));
  }, []);

  return (
    <div className="admin-page">
      <header className="admin-page-header">
        <h1 className="admin-page-title">Messages de contact</h1>
        <p className="admin-page-sub">{messages?.length ?? "—"} messages</p>
      </header>

      {messages === null && <p className="admin-loading">Chargement…</p>}
      {messages && messages.length === 0 && (
        <p className="admin-empty">Aucun message pour l'instant.</p>
      )}
      {messages && messages.length > 0 && (
        <div className="admin-messages">
          {messages.map((m) => (
            <article key={m.id} className="admin-message-card">
              <header className="admin-message-header">
                <div>
                  <h3 className="admin-message-from">{m.nom}</h3>
                  <a href={`mailto:${m.email}`} className="admin-message-email">{m.email}</a>
                </div>
                <time className="admin-message-time">
                  {new Intl.DateTimeFormat("fr-FR", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  }).format(new Date(m.created_at))}
                </time>
              </header>
              {m.sujet && <p className="admin-message-subject">{m.sujet}</p>}
              <p className="admin-message-body">{m.message}</p>
              <footer className="admin-message-footer">
                <a href={`mailto:${m.email}?subject=Re: ${encodeURIComponent(m.sujet || "Votre message")}`}>
                  Répondre par email →
                </a>
              </footer>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminMessages;
