import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SEO from "../components/SEO";
import Breadcrumb from "../components/Breadcrumb";
import "./Pages.css";

const fadeInUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: [0.4, 0, 0.2, 1] },
  }),
};

const stats = [
  { value: "17", label: "Années d'engagement" },
  { value: "2500+", label: "Voyageurs accompagnés" },
  { value: "85+", label: "Destinations" },
];

const valeurs = [
  {
    icon: (
      <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    ),
    title: "Création de séjours mémorables",
    text: "Nous imaginons chaque voyage comme une expérience unique, conçue pour laisser des souvenirs impérissables.",
  },
  {
    icon: (
      <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM14 18a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2zM6 18a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2z" />
      </svg>
    ),
    title: "Des aventures qui vous ressemblent",
    text: "Nos itinéraires sont personnalisés selon vos envies et vos rêves, pour que chaque aventure reflète votre personnalité.",
  },
  {
    icon: (
      <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Écoute et disponibilité",
    text: "Notre équipe est toujours à votre écoute pour comprendre vos attentes et vous accompagner à chaque étape de votre projet.",
  },
  {
    icon: (
      <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0h.5a2.5 2.5 0 002.5-2.5V3.935M12 12a2 2 0 104 0 2 2 0 00-4 0z" />
      </svg>
    ),
    title: "Respect et authenticité",
    text: "Nous privilégions des rencontres authentiques et un tourisme responsable, dans le respect des cultures et de l'environnement.",
  },
];

const AProposPage = () => {
  return (
    <div className="page-wrapper page-wrapper--cream">
      <SEO
        title="À propos"
        description="Découvrez Attitude Voyages : Annie & Jade, votre agence à Caveirac. Voyages sur mesure, expertise et accompagnement personnalisé depuis des années."
        canonical="/a-propos"
        breadcrumbs={[{ label: "Accueil", path: "/" }, { label: "À propos", path: "/a-propos" }]}
      />
      <section className="apropos-hero">
        <div className="apropos-hero-bg">
          <img
            src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1920&auto=format&fit=crop"
            alt="Voyage inoubliable - nature et évasion"
          />
          <div className="apropos-hero-overlay" />
        </div>
        <div className="apropos-hero-content">
          <motion.span
            className="apropos-hero-subtitle"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Notre histoire
          </motion.span>
          <motion.h1
            className="apropos-hero-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            Attitude Voyages,<br />votre partenaire voyage
          </motion.h1>
        </div>
      </section>

      <section className="apropos-content-section">
        <div className="page-container">
          <Breadcrumb items={[{ label: "Accueil", path: "/" }, { label: "À propos" }]} />
        <motion.div
            className="apropos-intro"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="apropos-intro-title">Créer des expériences</h2>
            <p className="apropos-intro-text">
              Nous sommes Annie & Jade, un duo de femmes passionnées par le voyage et les relations humaines.
              Fortes de plusieurs années d'expertise, nous avons perfectionné l'art de concevoir des voyages uniques sur mesure,
              en respectant vos envies et vos budgets.
              Nous serons ravis de vous accueillir à l'agence pour vous présenter nos offres du moment, nos circuits ou discuter de votre projet.
            </p>
          </motion.div>
          <div className="apropos-grid">
            
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={{
                visible: { transition: { staggerChildren: 0.1 } },
              }}
              style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
            >
              <motion.p variants={fadeInUp} custom={0} className="apropos-text-lead">
                Nos convictions ne sont pas que des mots ; elles sont le fondement de chacune des
                aventures que nous proposons.
              </motion.p>
              <motion.p variants={fadeInUp} custom={1} className="apropos-text-p">
              Grâce à un engagement fort depuis 17 ans maintenant,
              la durabilité, l'authenticité et la satisfaction du client sont nos maîtres mots.
                Nous veillons à ce que chaque voyage que vous faites soit à la hauteur de vos rêves.
              </motion.p>
              <motion.div variants={fadeInUp} custom={2} className="apropos-stats">
                {stats.map((stat) => (
                  <div key={stat.label}>
                    <div className="apropos-stat-value">{stat.value}</div>
                    <div className="apropos-stat-label">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="apropos-images">
                <div className="apropos-image-main">
                  <img
                    src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=800&auto=format&fit=crop"
                    alt="Voyage inoubliable - montagnes et lacs"
                  />
                </div>
                <div className="apropos-badge">
                  <svg fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span>Agence de confiance</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="apropos-valeurs-section">
        <div className="page-container">
          <motion.h2
            className="apropos-valeurs-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Nos Engagements
          </motion.h2>
          <div className="apropos-valeurs-grid">
            {valeurs.map((v, i) => (
              <motion.div
                key={v.title}
                className="apropos-valeur-card"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="apropos-valeur-icon">{v.icon}</div>
                <h3>{v.title}</h3>
                <p>{v.text}</p>
              </motion.div>
            ))}
          </div>
          <motion.div
            className="apropos-cta-wrap"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <Link to="/contact" className="apropos-cta">
              Nous contacter
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AProposPage;
