import React from "react";
import { motion } from "framer-motion";
import { equipe } from "../data/equipe";
import "./EquipeSection.css";

const EquipeSection = () => {
  return (
    <section className="equipe-section" aria-labelledby="equipe-title">
      <div className="page-container">
        <motion.div
          className="equipe-header"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
        >
          <span className="equipe-eyebrow">L'équipe</span>
          <h2 id="equipe-title" className="equipe-title">
            Annie &amp; Jade,
            <br />
            vos conseillères voyage
          </h2>
          <p className="equipe-lede">
            Deux passionnées, immatriculées Atout France (licence&nbsp;IM&nbsp;030&nbsp;100&nbsp;020),
            qui composent vos itinéraires sur la base de leurs propres voyages
            et de plus de quinze ans d'expérience terrain.
          </p>
        </motion.div>

        <div className="equipe-grid">
          {equipe.map((membre, i) => (
            <motion.article
              key={membre.id}
              className="equipe-card"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              itemScope
              itemType="https://schema.org/Person"
            >
              <div className="equipe-photo-wrap">
                <img
                  src={membre.photo}
                  alt={membre.photoAlt}
                  width="400"
                  height="400"
                  loading="lazy"
                  decoding="async"
                  className="equipe-photo"
                  itemProp="image"
                />
              </div>
              <div className="equipe-info">
                <h3 className="equipe-nom">
                  <span itemProp="name">
                    {membre.prenom} {membre.nom.startsWith("TODO") ? "" : membre.nom}
                  </span>
                </h3>
                <p className="equipe-role" itemProp="jobTitle">{membre.role}</p>
                <p className="equipe-meta">
                  <strong>{membre.anneesExperience}&nbsp;ans</strong> d'expérience &middot;{" "}
                  Langues&nbsp;: {membre.languesParlees.join(", ")}
                </p>
                <p className="equipe-bio" itemProp="description">{membre.bio}</p>
                <div className="equipe-expertise">
                  <span className="equipe-expertise-label">
                    Destinations de prédilection
                  </span>
                  <ul className="equipe-expertise-list">
                    {membre.destinationsExpertes.map((d) => (
                      <li key={d}>{d}</li>
                    ))}
                  </ul>
                </div>
                {membre.citation && !membre.citation.startsWith("TODO") && (
                  <blockquote className="equipe-citation">
                    « {membre.citation} »
                  </blockquote>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EquipeSection;
