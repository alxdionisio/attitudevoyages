import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import Hero from "../components/Hero";
import Offres from "../components/Offres";
import APropos from "../components/APropos";
import RendezVous from "../components/RendezVous";
import Contact from "../components/Contact";
import AgenceVillesSection from "../components/AgenceVillesSection";
import SEO from "../components/SEO";

const sectionVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.4, 0, 0.2, 1] },
  }),
};

const HomePage = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash === "#rendez-vous" || location.hash === "#offres" || location.hash === "#contact" || location.hash === "#a-propos") {
      const id = location.hash.slice(1);
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 100);
      }
    }
  }, [location.hash]);

  return (
    <>
      <SEO
        title="Accueil"
        description="Attitude Voyages, agence de voyage à Caveirac. Voyages sur mesure, circuits et séjours d'exception. Découvrez nos offres et prenez rendez-vous."
        canonical="/"
      />
      <Hero />
      <motion.div
        id="offres"
        custom={0}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={sectionVariants}
      >
        <Offres />
      </motion.div>
      <motion.div
        id="a-propos"
        custom={1}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={sectionVariants}
      >
        <APropos />
      </motion.div>
      <motion.div
        id="rendez-vous"
        custom={2}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={sectionVariants}
      >
        <RendezVous />
      </motion.div>
      <motion.div
        id="contact"
        custom={3}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={sectionVariants}
      >
        <Contact />
      </motion.div>
      <motion.div
        custom={4}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={sectionVariants}
      >
        <AgenceVillesSection />
      </motion.div>
    </>
  );
};

export default HomePage;
