import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import SEO from "../components/SEO";
import Breadcrumb from "../components/Breadcrumb";
import "./Pages.css";

const faqByCategory = [
  {
    category: "Réservations et voyages",
    items: [
      {
        question: "Comment réserver un voyage ?",
        answer: "Vous pouvez nous contacter par téléphone (04 66 37 48 63), par e-mail ou via le formulaire de contact. Nous vous proposerons un rendez-vous pour échanger sur votre projet, vos envies et votre budget, puis nous vous présenterons des offres adaptées. La réservation est formalisée par la signature du bulletin d'inscription et le versement d'un acompte selon les conditions du forfait.",
      },
      {
        question: "Proposez-vous des voyages sur mesure ?",
        answer: "Oui, c'est notre spécialité. Nous construisons avec vous un itinéraire adapté à vos envies, votre budget et votre rythme. Chaque voyage est unique : destinations, hébergements, activités et durée sont définis ensemble. Nous prenons le temps de comprendre vos attentes pour vous proposer des prestations personnalisées.",
      },
      {
        question: "Quand dois-je payer et comment ?",
        answer: "Lors de la réservation, un acompte est demandé (montant et pourcentage selon le forfait). Le solde est dû selon le calendrier indiqué sur votre contrat ; le dernier versement ne peut être inférieur à 30 % du prix et est effectué à la remise des documents de voyage. Les modalités de paiement (chèque, virement, carte) vous sont précisées par notre équipe.",
      },
    ],
  },
  {
    category: "Agence et garanties",
    items: [
      {
        question: "Êtes-vous une agence agréée ?",
        answer: "Oui. Attitude Voyages est une agence de voyage immatriculée au registre des opérateurs de voyage et de séjour (Licence IM 030 100 020). Nous disposons d'une garantie financière et d'une assurance responsabilité civile professionnelle (RCP HISCOX) pour protéger nos clients. Nous avons également souscrit une protection contre l'insolvabilité (Atradius) conformément au Code du tourisme.",
      },
      {
        question: "Qui est responsable de l'exécution du voyage ?",
        answer: "Attitude Voyages est entièrement responsable de la bonne exécution du forfait dans son ensemble. En cas de problème avant ou pendant le voyage, nous sommes votre interlocuteur et nous nous chargeons de faire le lien avec les prestataires (transport, hébergement, etc.) pour trouver une solution.",
      },
    ],
  },
  {
    category: "Pratique",
    items: [
      {
        question: "Où se trouve votre agence et quels sont vos horaires ?",
        answer: "Notre agence est située au 1 Rue des Rolliers, 30820 Caveirac (Larche de la Vaunage). Nous vous accueillons du lundi au vendredi de 9h30 à 12h et de 14h à 18h. Samedi et dimanche : fermé. Nous vous conseillons de prendre rendez-vous pour un échange plus confortable, via notre page Contact ou par téléphone au 04 66 37 48 63.",
      },
      {
        question: "Comment prendre rendez-vous ?",
        answer: "Vous pouvez prendre rendez-vous directement en ligne via la section « Prendre rendez-vous » sur notre site (outil Calendly intégré à la page Contact), ou nous appeler au 04 66 37 48 63. Indiquez-nous vos disponibilités et l'objet de votre visite (projet de voyage, devis, conseil), nous vous proposerons un créneau adapté.",
      },
    ],
  },
  {
    category: "Annulations et assurances",
    items: [
      {
        question: "Quelles sont vos conditions d'annulation ?",
        answer: "Les conditions d'annulation dépendent du forfait, des prestataires et de la date d'annulation. Elles sont détaillées dans votre contrat et dans nos Conditions générales de vente (CGV). En résumé : vous pouvez résoudre le contrat sans frais dans certains cas (modification importante du forfait par nous, circonstances exceptionnelles) ; dans les autres cas, des frais de résolution peuvent s'appliquer. Nous vous recommandons de souscrire une assurance annulation pour couvrir les imprévus (maladie, accident, etc.). Nous vous détaillons les options au moment de la réservation.",
      },
      {
        question: "Que se passe-t-il si vous annulez le voyage ?",
        answer: "Si, avant le départ, nous sommes contraints d'annuler le voyage ou le séjour (par exemple nombre insuffisant de participants ou force majeure), nous vous en informons par tout moyen permettant d'obtenir un accusé de réception. Vous obtenez le remboursement immédiat et sans pénalité des sommes versées, et une indemnité au moins égale à la pénalité que vous auriez supportée si l'annulation était venue de vous à cette date. Nous pouvons aussi vous proposer un voyage ou séjour de substitution si vous l'acceptez.",
      },
    ],
  },
];

const FAQPage = () => {
  const [openId, setOpenId] = useState(null);

  return (
    <div className="page-wrapper page-wrapper--cream">
      <SEO
        title="FAQ"
        description="Foire aux questions Attitude Voyages : réservations, voyages sur mesure, agence agréée, rendez-vous et horaires à Caveirac."
        canonical="/faq"
        breadcrumbs={[{ label: "Accueil", path: "/" }, { label: "FAQ", path: "/faq" }]}
      />
      <div className="page-container" style={{ paddingBottom: "6rem" }}>
        <Breadcrumb items={[{ label: "Accueil", path: "/" }, { label: "FAQ" }]} />
        <motion.header
          className="page-header"
          style={{ marginBottom: "2.5rem" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="page-subtitle">Aide</span>
          <h1 className="page-title">Foire aux questions</h1>
          <p className="page-description">
            Retrouvez les réponses aux questions les plus fréquentes sur nos voyages, réservations et agence.
          </p>
        </motion.header>

        <motion.div
          className="faq-page"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.4 }}
        >
          {faqByCategory.map((cat, catIndex) => (
            <section key={catIndex} className="faq-category">
              <h2 className="faq-category-title">{cat.category}</h2>
              <ul className="faq-list">
                {cat.items.map((item, itemIndex) => {
                  const id = `faq-${catIndex}-${itemIndex}`;
                  const isOpen = openId === id;
                  return (
                    <li key={itemIndex} className="faq-item">
                      <button
                        type="button"
                        className="faq-question"
                        onClick={() => setOpenId(isOpen ? null : id)}
                        aria-expanded={isOpen}
                        aria-controls={id + "-answer"}
                        id={id}
                      >
                        <span>{item.question}</span>
                        <span className={`faq-icon ${isOpen ? "faq-icon--open" : ""}`} aria-hidden="true">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                      </button>
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            id={id + "-answer"}
                            className="faq-answer-wrap"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                          >
                            <div className="faq-answer">
                              <p>{item.answer}</p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}
        </motion.div>

        <motion.div
          className="faq-cta"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <p>Vous n'avez pas trouvé la réponse à votre question ?</p>
          <Link to="/contact" className="btn-primary" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", textDecoration: "none" }}>
            Nous contacter
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default FAQPage;
