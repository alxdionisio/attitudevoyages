import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SEO from "../components/SEO";
import "./Pages.css";

const NotFoundPage = () => {
  return (
    <div className="page-wrapper page-wrapper--cream">
      <SEO
        title="Page introuvable"
        description="La page que vous recherchez n'existe pas ou a été déplacée. Retournez à l'accueil ou découvrez nos destinations."
        noindex
      />
      <div className="page-container" style={{ paddingTop: "8rem", paddingBottom: "8rem" }}>
        <motion.section
          className="not-found"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="not-found-code" aria-hidden="true">
            404
          </p>
          <h1 className="not-found-title">Page introuvable</h1>
          <p className="not-found-description">
            La page que vous recherchez n'existe pas ou a été déplacée.
            Retournez à l'accueil pour continuer votre visite.
          </p>
          <div className="not-found-actions">
            <Link to="/" className="not-found-btn not-found-btn--primary">
              Retour à l'accueil
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </Link>
            <Link to="/destinations" className="not-found-btn not-found-btn--secondary">
              Voir nos offres
            </Link>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default NotFoundPage;
