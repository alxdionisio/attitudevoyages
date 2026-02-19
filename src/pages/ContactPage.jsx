import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { InlineWidget } from "react-calendly";
import { CALENDLY_URL } from "../config/calendly";
import { FORMSPREE_ENDPOINT } from "../config/contact";
import SEO from "../components/SEO";
import Breadcrumb from "../components/Breadcrumb";
import "./Pages.css";

const faqData = [
  {
    question: "Comment réserver un voyage ?",
    answer: "Contactez-nous par téléphone, email ou via le formulaire. Nous vous proposerons un rendez-vous pour échanger sur votre projet et vous présenter nos offres sur mesure.",
  },
  {
    question: "Proposez-vous des voyages sur mesure ?",
    answer: "Oui, c'est notre spécialité. Nous construisons avec vous un itinéraire adapté à vos envies, votre budget et votre rythme. Chaque voyage est unique.",
  },
  {
    question: "Quelles sont vos conditions d'annulation ?",
    answer: "Les conditions varient selon les prestataires et la période. Nous vous détaillons les options d'assurance annulation et les conditions au moment de la réservation.",
  },
  {
    question: "Êtes-vous une agence agréée ?",
    answer: "Oui, Attitude Voyages est une agence de voyage agréée, titulaire d'une garantie financière et d'une assurance responsabilité civile professionnelle.",
  },
  {
    question: "Où se trouve votre agence ?",
    answer: "Notre agence est située au 1 Rue des Rolliers, 30820 Caveirac (Larche de la Vaunage). Nous vous accueillons du lundi au vendredi de 9h30 à 12h et de 14h à 18h. Samedi et dimanche : fermé.",
  },
];

const ContactPage = () => {
  const location = useLocation();
  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    sujet: "",
    message: "",
  });
  const [openFaq, setOpenFaq] = useState(null);
  const [submitStatus, setSubmitStatus] = useState(null); // "loading" | "success" | "error"
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    if (location.hash === "#rdv") {
      const el = document.getElementById("rdv");
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
      }
    }
  }, [location.hash]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!FORMSPREE_ENDPOINT) {
      setSubmitStatus("error");
      setSubmitError("Formulaire de contact non configuré (VITE_FORMSPREE_FORM_ID manquant).");
      return;
    }
    setSubmitStatus("loading");
    setSubmitError("");
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nom: formData.nom,
          email: formData.email,
          _subject: formData.sujet,
          message: formData.message,
        }),
      });
      if (res.ok) {
        setSubmitStatus("success");
        setFormData({ nom: "", email: "", sujet: "", message: "" });
      } else {
        const data = await res.json().catch(() => ({}));
        setSubmitStatus("error");
        setSubmitError(data.error || "L'envoi a échoué. Réessayez plus tard.");
      }
    } catch (err) {
      setSubmitStatus("error");
      setSubmitError("Erreur réseau. Vérifiez votre connexion et réessayez.");
    }
  };

  return (
    <div className="page-wrapper page-wrapper--cream">
      <SEO
        title="Contact"
        description="Contactez Attitude Voyages à Caveirac. Formulaire, prise de rendez-vous en ligne ou téléphone. Réponse rapide à vos demandes de voyage et devis."
        canonical="/contact"
        breadcrumbs={[{ label: "Accueil", path: "/" }, { label: "Contact", path: "/contact" }]}
      />
      <div className="page-container" style={{ paddingBottom: "6rem" }}>
        <Breadcrumb items={[{ label: "Accueil", path: "/" }, { label: "Contact" }]} />
        <motion.header
          className="page-header page-header--large"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="page-subtitle">Contactez-nous</span>
          <h1 className="page-title">Une question ?<br />Parlons-en !</h1>
          <p className="page-description">
            Posez-nous toutes vos questions, réservez un rendez-vous ou demandez un devis.
            Notre équipe vous répond rapidement.
          </p>
        </motion.header>

        <div className="contact-layout">
          <div className="contact-layout__main">
            <motion.div
              className="contact-form-card"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              {submitStatus === "success" ? (
                <div className="contact-form-success">
                  <div className="contact-form-success-icon" aria-hidden="true">
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                  </div>
                  <h2>Message envoyé</h2>
                  <p className="contact-form-success-text">
                    Merci pour votre message ! Nous vous répondrons à l'adresse indiquée.
                  </p>
                </div>
              ) : (
                <>
                  <h2>Nous écrire</h2>
                  <p>Remplissez le formulaire ci-dessous, nous vous répondrons rapidement.</p>
                  <form onSubmit={handleSubmit} className="contact-form">
                    <input
                      type="text"
                      name="nom"
                      placeholder="Votre nom *"
                      value={formData.nom}
                      onChange={handleChange}
                      required
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="Votre email *"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                    <input
                      type="text"
                      name="sujet"
                      placeholder="Sujet *"
                      value={formData.sujet}
                      onChange={handleChange}
                      required
                    />
                    <textarea
                      name="message"
                      placeholder="Votre message *"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      required
                    />
                    <button
                      type="submit"
                      className="contact-form-submit"
                      disabled={submitStatus === "loading"}
                    >
                      {submitStatus === "loading" ? "Envoi en cours…" : "Envoyer"}
                      {submitStatus !== "loading" && (
                        <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      )}
                    </button>
                    {submitStatus === "error" && submitError && (
                      <p className="contact-form-message contact-form-message--error">{submitError}</p>
                    )}
                  </form>
                </>
              )}
            </motion.div>

          </div>

          <div className="contact-layout__faq">
            <motion.div
              className="contact-faq-card"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <h2>Questions fréquentes</h2>
              <div>
                {faqData.map((item, index) => (
                  <div
                    key={index}
                    className={`contact-faq-item ${openFaq === index ? "is-open" : ""}`}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(openFaq === index ? null : index)}
                      className="contact-faq-question"
                    >
                      <span>{item.question}</span>
                      <span className="contact-faq-chevron">
                        <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </span>
                    </button>
                    <AnimatePresence>
                      {openFaq === index && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="contact-faq-answer"
                        >
                          <p>{item.answer}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Section Prendre RDV – Calendly (date puis créneaux disponibles) */}
        <motion.section
          id="rdv"
          className="contact-rdv-section"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="contact-rdv-title">Prendre rendez-vous</h2>
          <div className="contact-rdv-grid">
            <div className="contact-rdv-intro">
              <p className="contact-rdv-desc">
              Choisissez une date puis un créneau parmi les disponibilités affichées.
              Discutons de votre projet de voyage autour d'un café à l'agence.
            </p>
              <p className="contact-rdv-intro-text">
                Si toutefois vous préférez nous appeler, voici le numéro pour nous joindre :{" "}
                <a href="tel:+33466374863" className="contact-rdv-phone-link">04 66 37 48 63</a>
              </p>
            </div>
            <div className="contact-rdv-widget-wrap">
              <InlineWidget
                url={CALENDLY_URL}
                styles={{ height: "700px", width: "100%" }}
                locale="fr"
              />
            </div>
          </div>
        </motion.section>

        <motion.div
          className="contact-map-wrap"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <iframe
            src="https://www.google.com/maps?q=1+Rue+des+Rolliers,+30820+Caveirac,+France&z=15&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Carte Attitude Voyages - 1 Rue des Rolliers, 30820 Caveirac"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default ContactPage;
