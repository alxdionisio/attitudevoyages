import React, { useMemo } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { getVilleBySlug } from "../data/villes";
import { getBaseUrl } from "../config/site";
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

  const { nom, distance, cp, accroche } = ville;
  const breadcrumbItems = [
    { label: "Accueil", path: "/" },
    { label: `Agence de voyages à ${nom}`, path: `/agence-voyages/${ville.slug}` },
  ];

  const localJsonLd = useMemo(() => {
    const baseUrl = getBaseUrl();
    return {
      "@context": "https://schema.org",
      "@type": "TravelAgency",
      name: `Attitude Voyages — Agence de voyage près de ${nom}`,
      url: `${baseUrl}/agence-voyages/${ville.slug}`,
      telephone: "+33 4 66 37 48 63",
      address: {
        "@type": "PostalAddress",
        streetAddress: "1 Rue des Rolliers",
        addressLocality: "Caveirac",
        postalCode: "30820",
        addressRegion: "Occitanie",
        addressCountry: "FR",
      },
      areaServed: {
        "@type": "City",
        name: nom,
        postalCode: cp,
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 43.826,
        longitude: 4.266,
      },
    };
  }, [ville]);

  const distanceText = distance === 0
    ? "directement à Caveirac"
    : `à seulement ${distance} km de ${nom}`;

  return (
    <div className="page-wrapper page-wrapper--cream">
      <SEO
        title={`Agence de voyages à ${nom}`}
        description={`Attitude Voyages, votre agence de voyage ${distanceText}. Voyages sur mesure, circuits et séjours. Annie & Jade vous accueillent à Caveirac (${cp ? "Gard" : "30"}) pour préparer votre prochain voyage.`}
        canonical={`/agence-voyages/${ville.slug}`}
        breadcrumbs={breadcrumbItems}
        jsonLd={[localJsonLd]}
      />
      <section className="agence-ville-hero">
        <div className="agence-ville-hero-bg">
          <img
            src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=1920&auto=format&fit=crop"
            alt={`Voyage et évasion — agence de voyage près de ${nom}`}
            width="1920"
            height="1280"
            loading="eager"
            fetchpriority="high"
            decoding="async"
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
            <p>{accroche}</p>
            <p>
              Nous sommes <strong>Annie & Jade</strong>, un duo passionné par le voyage et les relations humaines. Fortes de plusieurs années d'expertise, nous avons perfectionné l'art de concevoir des <strong>voyages uniques sur mesure</strong>, en respectant vos envies et vos budgets.
            </p>
            {distance > 0 && (
              <p>
                Notre agence se situe au <strong>1 Rue des Rolliers, 30820 Caveirac</strong>, {distanceText}. {distance <= 10
                  ? "Vous pouvez nous rejoindre en quelques minutes en voiture."
                  : `Comptez environ ${Math.round(distance * 1.5)} minutes en voiture depuis ${nom}.`}
              </p>
            )}
            {distance === 0 && (
              <p>
                Notre agence se situe au <strong>1 Rue des Rolliers, 30820 Caveirac</strong>, au cœur de la Vaunage. Nous sommes ouvertes du lundi au vendredi, de 9h30 à 12h et de 14h à 18h.
              </p>
            )}
          </section>

          <section className="legal-section">
            <h2>Nos services pour les habitants de {nom}</h2>
            <p>
              Que vous habitiez à {nom}{cp ? ` (${cp})` : ""} ou dans les environs, nous serons ravies de vous accueillir pour :
            </p>
            <ul>
              <li>Concevoir un <strong>voyage sur mesure</strong> adapté à vos envies et votre budget</li>
              <li>Vous présenter nos <strong>offres du moment</strong> : circuits Sri Lanka, séjours Bali, Albanie tout inclus, croisières</li>
              <li>Organiser vos <strong>vacances en famille</strong>, en couple ou entre amis</li>
              <li>Vous conseiller sur les <strong>formalités</strong> (visa, assurances, santé) pour votre destination</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>Pourquoi choisir Attitude Voyages ?</h2>
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
              <Link to="/reservation" className="agence-ville-btn agence-ville-btn--secondary">
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
