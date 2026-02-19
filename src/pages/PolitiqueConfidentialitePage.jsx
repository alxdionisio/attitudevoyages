import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SEO from "../components/SEO";
import Breadcrumb from "../components/Breadcrumb";
import "./Pages.css";

const PolitiqueConfidentialitePage = () => {
  return (
    <div className="page-wrapper page-wrapper--cream">
      <SEO
        title="Politique de confidentialité"
        description="Politique de confidentialité d'Attitude Voyages : données collectées, cookies, GA4, droits RGPD et contact."
        canonical="/politique-confidentialite"
        breadcrumbs={[{ label: "Accueil", path: "/" }, { label: "Politique de confidentialité", path: "/politique-confidentialite" }]}
      />
      <div className="page-container legal-page">
        <Breadcrumb items={[{ label: "Accueil", path: "/" }, { label: "Politique de confidentialité" }]} />
        <motion.article
          className="legal-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="legal-title">Politique de confidentialité</h1>
          <p className="legal-intro">
            Attitude Voyages (1 Rue des Rolliers, 30820 Caveirac) s'engage à protéger la vie privée des utilisateurs de son site. Cette politique décrit les données que nous collectons, leur utilisation et vos droits.
          </p>

          <section className="legal-section">
            <h2>Responsable du traitement</h2>
            <p>
              Le responsable du traitement des données est Attitude Voyages, 1 Rue des Rolliers, 30820 Caveirac. Pour toute question : 04 66 37 48 63.
            </p>
          </section>

          <section className="legal-section">
            <h2>Données collectées</h2>
            <p>
              Nous pouvons collecter les données que vous nous communiquez volontairement (formulaire de contact, prise de rendez-vous, demande de devis) : nom, prénom, adresse e-mail, numéro de téléphone, sujet et contenu du message.
            </p>
            <p>
              Lors de votre navigation, des données techniques (adresse IP, type de navigateur, pages visitées, date et heure) peuvent être enregistrées par notre hébergeur (GitHub Pages) ou par des services tiers. Nous utilisons <strong>Google Analytics 4 (GA4)</strong> pour la mesure d'audience, uniquement après votre consentement donné via le bandeau cookies. Les données collectées par GA4 sont traitées conformément à la politique de confidentialité de Google et à la réglementation en vigueur.
            </p>
          </section>

          <section className="legal-section">
            <h2>Finalités et base légale</h2>
            <p>
              Vos données sont utilisées pour : répondre à vos demandes de contact ou de devis, gérer la prise de rendez-vous, améliorer nos services et, le cas échéant, vous envoyer des informations sur nos offres (avec votre consentement). Le traitement repose sur votre consentement, l'exécution de mesures précontractuelles ou contractuelles, ou notre intérêt légitime (ex. sécurisation du site).
            </p>
          </section>

          <section className="legal-section">
            <h2>Durée de conservation</h2>
            <p>
              Les données de contact et de demande sont conservées le temps nécessaire à la relation commerciale et aux obligations légales (ex. comptabilité). Au-delà, elles sont supprimées ou anonymisées. Les données de navigation (logs) sont conservées selon les durées applicables chez notre hébergeur.
            </p>
          </section>

          <section className="legal-section">
            <h2>Destinataires et transferts</h2>
            <p>
              Les données peuvent être traitées par Attitude Voyages et, le cas échéant, par des prestataires techniques (hébergement, outil de prise de rendez-vous) dans le cadre strict de leurs missions. Le site est hébergé sur GitHub Pages (États-Unis) ; les transferts sont encadrés par les clauses contractuelles types ou mécanismes reconnus par la Commission européenne.
            </p>
          </section>

          <section className="legal-section">
            <h2>Vos droits</h2>
            <p>
              Conformément au Règlement général sur la protection des données (RGPD) et à la loi « informatique et libertés », vous disposez d'un droit d'accès, de rectification, d'effacement, de limitation du traitement, de portabilité et d'opposition. Vous pouvez exercer ces droits en nous contactant à l'adresse ou au numéro indiqués ci-dessus. Vous avez également le droit d'introduire une réclamation auprès de la CNIL (<a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer">www.cnil.fr</a>).
            </p>
          </section>

          <section className="legal-section">
            <h2>Cookies et mesure d'audience (Google Analytics 4)</h2>
            <p>
              Le site peut utiliser des cookies ou technologies similaires strictement nécessaires au fonctionnement (ex. session). La mesure d'audience est assurée par <strong>Google Analytics 4 (GA4)</strong> : les cookies et données associés ne sont activés qu'après votre consentement, via le bandeau d'information affiché sur le site. Vous pouvez accepter ou refuser le suivi à tout moment depuis ce bandeau ; vous pouvez également gérer les cookies via les paramètres de votre navigateur.
            </p>
          </section>

          <section className="legal-section">
            <h2>Modifications</h2>
            <p>
              Cette politique peut être mise à jour. La version en vigueur est celle publiée sur cette page. Dernière mise à jour : février 2026.
            </p>
          </section>

          <p className="legal-back">
            <Link to="/">← Retour à l'accueil</Link>
          </p>
        </motion.article>
      </div>
    </div>
  );
};

export default PolitiqueConfidentialitePage;
