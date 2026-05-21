import React from "react";
import { motion } from "framer-motion";
import { temoignages, aggregateRating } from "../data/temoignages";
import "./Temoignages.css";

const StarRating = ({ note }) => (
  <span className="temoignage-stars" aria-label={`Note ${note} sur 5`}>
    {Array.from({ length: 5 }).map((_, i) => (
      <svg
        key={i}
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill={i < note ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="1.5"
        aria-hidden="true"
      >
        <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    ))}
  </span>
);

const formatDate = (yyyyMm) => {
  if (!yyyyMm) return "";
  const [y, m] = yyyyMm.split("-");
  const mois = [
    "janvier", "février", "mars", "avril", "mai", "juin",
    "juillet", "août", "septembre", "octobre", "novembre", "décembre",
  ];
  const mIdx = parseInt(m, 10) - 1;
  if (mIdx < 0 || mIdx > 11) return yyyyMm;
  return `${mois[mIdx]} ${y}`;
};

const Temoignages = ({ variant = "default" }) => {
  const isHomepage = variant === "homepage";

  return (
    <section
      className={`temoignages-section temoignages-section--${variant}`}
      aria-labelledby="temoignages-title"
    >
      <div className="page-container">
        <motion.div
          className="temoignages-header"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
        >
          <span className="temoignages-eyebrow">Ils nous ont fait confiance</span>
          <h2 id="temoignages-title" className="temoignages-title">
            {isHomepage
              ? "Ce que nos voyageurs en disent"
              : "Les retours de nos clients"}
          </h2>
          {aggregateRating && (
            <div
              className="temoignages-aggregate"
              aria-label={`Note moyenne ${aggregateRating.noteMoyenne} sur 5 sur ${aggregateRating.nombreAvis} avis`}
            >
              <StarRating note={Math.round(aggregateRating.noteMoyenne)} />
              <strong>{aggregateRating.noteMoyenne.toFixed(1)}/5</strong>
              <span>·</span>
              <span>{aggregateRating.nombreAvis} avis clients</span>
            </div>
          )}
        </motion.div>

        <div className="temoignages-grid">
          {temoignages.map((t, i) => (
            <motion.figure
              key={t.id}
              className="temoignage-card"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
            >
              <StarRating note={t.note} />
              <blockquote className="temoignage-texte">
                <p>« {t.texte} »</p>
              </blockquote>
              <figcaption className="temoignage-meta">
                <span className="temoignage-auteur">{t.auteur}</span>
                <span className="temoignage-contexte">
                  {t.destination} · {t.typeVoyage} · {formatDate(t.date)}
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </div>

        <p className="temoignages-disclaimer">
          Témoignages collectés par e-mail et via la fiche Google Business
          Profile de l'agence. Identités publiées avec accord du client.
        </p>
      </div>
    </section>
  );
};

export default Temoignages;
