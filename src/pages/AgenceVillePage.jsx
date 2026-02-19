import React from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { getVilleBySlug } from "../data/villes";
import SEO from "../components/SEO";
import Breadcrumb from "../components/Breadcrumb";
import "./Pages.css";

const VALEURS = [
  {
    title: "Voyages sur mesure",
    text: "Chaque séjour est conçu selon vos envies, votre budget et votre rythme.",
  },
  {
    title: "Écoute et conseil",
    text: "Nous vous accompagnons de l'idée du voyage jusqu'au retour.",
  },
  {
    title: "Expertise et garanties",
    text: "Agence agréée, garantie financière et assurance RC pro.",
  },
  {
    title: "Tourisme responsable",
    text: "Rencontres authentiques et respect des cultures et de l'environnement.",
  },
];

const AgenceVillePage = () => {
  const { villeSlug } = useParams();
  const ville = getVilleBySlug(villeSlug);

  if (!ville) return <Navigate to="/" replace />;

  const { nom } = ville;
  const breadcrumbItems = [
    { label: "Accueil", path: "/" },
    { label: `Agence de voyages à ${nom}`, path: `/agence-voyages/${ville.slug}` },
  ];

  return (
    <div className="page-wrapper page-wrapper--cream">
      <SEO
        title={`Agence de voyages à ${nom}`}
        description={`Attitude Voyages, votre agence de voyage à ${nom} et alentours. Voyages sur mesure, circuits et séjours. Annie & Jade vous accueillent à Caveirac pour préparer votre prochain voyage.`}
        canonical={`/agence-voyages/${ville.slug}`}
        breadcrumbs={[
          { label: "Accueil", path: "/" },
          { label: `Agence de voyages à ${nom}`, path: `/agence-voyages/${ville.slug}` },
        ]}
      />
      <section className="agence-ville-hero">
        <div className="agence-ville-hero-bg">
          <img
            src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=1920&auto=format&fit=crop"
            alt={`Voyage et évasion - agence à ${nom}`}
          />
          <div className="agence-ville-hero-overlay" />
        </div>
        <div className="agence-ville-hero-content">
          <motion.span
            className="agence-ville-hero-subtitle"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Votre agence de voyage
          </motion.span>
          <motion.h1
            className="agence-ville-hero-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            Agence de voyages à {nom}
          </motion.h1>
        </div>
      </section>

      <div className="page-container legal-page">
        <Breadcrumb items={breadcrumbItems} />
        <motion.article
          className="legal-content agence-ville-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <section className="legal-section">
            <h2>Votre agence de voyage près de {nom}</h2>
            <p>
              Nous sommes <strong>Annie & Jade</strong>, un duo passionné par le voyage et les relations humaines. Fortes de plusieurs années d'expertise, nous avons perfectionné l'art de concevoir des <strong>voyages uniques sur mesure</strong>, en respectant vos envies et vos budgets.
            </p>
            <p>
              Que vous habitiez à {nom}, à Caveirac ou dans les environs, nous serons ravis de vous accueillir à l'agence pour vous présenter nos offres du moment, nos circuits ou discuter de votre projet de voyage.
            </p>
          </section>

          <section className="legal-section">
            <h2>Nos valeurs et services</h2>
            <div className="agence-ville-valeurs">
              {VALEURS.map((v, i) => (
                <div key={i} className="agence-ville-valeur">
                  <h3>{v.title}</h3>
                  <p>{v.text}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="legal-section agence-ville-cta">
            <p>
              Vous souhaitez préparer un voyage depuis {nom} ou les alentours ? Prenez rendez-vous ou contactez-nous pour un devis personnalisé.
            </p>
            <div className="agence-ville-cta-buttons">
              <Link to="/contact" className="agence-ville-btn agence-ville-btn--primary">
                Nous contacter
              </Link>
              <Link to="/contact#rdv" className="agence-ville-btn agence-ville-btn--secondary">
                Prendre rendez-vous
              </Link>
            </div>
          </section>
          <p className="legal-back">
            <Link to="/">← Retour à l'accueil</Link>
          </p>
        </motion.article>
      </div>
    </div>
  );
};

export default AgenceVillePage;
