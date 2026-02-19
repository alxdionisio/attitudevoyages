import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { villes } from "../data/villes";
import "./AgenceVillesSection.css";

const AgenceVillesSection = () => {
  return (
    <section className="agence-villes-section" id="agence-villes">
      <div className="page-container">
        <h2 className="agence-villes-title">
          Agence de voyages près de chez vous
        </h2>
        <p className="agence-villes-intro">
          Attitude Voyages vous accompagne pour vos projets de voyage, que vous soyez à Nîmes, Caveirac ou dans les communes alentour.
        </p>
        <motion.div
          className="agence-villes-grid"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5 }}
        >
          {villes.map((ville) => (
            <Link
              key={ville.slug}
              to={`/agence-voyages/${ville.slug}`}
              className="agence-villes-link"
            >
              Agence de voyages à {ville.nom}
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AgenceVillesSection;
