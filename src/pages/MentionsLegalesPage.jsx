import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SEO from "../components/SEO";
import Breadcrumb from "../components/Breadcrumb";
import "./Pages.css";

const MentionsLegalesPage = () => {
  return (
    <div className="page-wrapper page-wrapper--cream">
      <SEO
        title="Mentions légales"
        description="Mentions légales du site Attitude Voyages : éditeur, hébergement, propriété intellectuelle, responsabilité (LCEN)."
        canonical="/mentions-legales"
        breadcrumbs={[{ label: "Accueil", path: "/" }, { label: "Mentions légales", path: "/mentions-legales" }]}
      />
      <div className="page-container legal-page">
        <Breadcrumb items={[{ label: "Accueil", path: "/" }, { label: "Mentions légales" }]} />
        <motion.article
          className="legal-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="legal-title">Mentions légales</h1>
          <p className="legal-intro">
            Conformément aux dispositions des articles 6-III et 19 de la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l'économie numérique (LCEN), les présentes mentions légales sont portées à la connaissance des utilisateurs du site Attitude Voyages.
          </p>

          <section className="legal-section">
            <h2>Éditeur du site</h2>
            <p>
              <strong>Attitude Voyages</strong><br />
              1 Rue des Rolliers<br />
              30820 Caveirac<br />
              France
            </p>
            <p>
              SIRET : 51168923400017<br />
              Licence IM (Immatriculation Tourisme) : 030 100 020
            </p>
          </section>

          <section className="legal-section">
            <h2>Hébergement</h2>
            <p>
              Ce site est hébergé par <strong>GitHub, Inc.</strong> (GitHub Pages) :<br />
              88 Colin P. Kelly Jr. Street<br />
              San Francisco, CA 94107<br />
              États-Unis
            </p>
            <p>
              Site web : <a href="https://pages.github.com" target="_blank" rel="noopener noreferrer">pages.github.com</a>
            </p>
          </section>

          <section className="legal-section">
            <h2>Nom de domaine et DNS</h2>
            <p>
              Le nom de domaine est géré et les services DNS sont fournis par <strong>Gandi SAS</strong> :<br />
              63-65 boulevard Masséna<br />
              75013 Paris<br />
              France
            </p>
            <p>
              Site web : <a href="https://www.gandi.net" target="_blank" rel="noopener noreferrer">www.gandi.net</a>
            </p>
          </section>

          <section className="legal-section">
            <h2>Propriété intellectuelle</h2>
            <p>
              L'ensemble du contenu de ce site (textes, images, graphismes, logo, structure, etc.) est protégé par le droit d'auteur et le droit des marques. Toute reproduction ou représentation totale ou partielle sans autorisation préalable est interdite.
            </p>
          </section>

          <section className="legal-section">
            <h2>Contact</h2>
            <p>
              Pour toute question relative aux mentions légales ou au site :<br />
              Téléphone : 04 66 37 48 63<br />
              Adresse : 1 Rue des Rolliers, 30820 Caveirac
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

export default MentionsLegalesPage;
