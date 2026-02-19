import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SEO from "../components/SEO";
import Breadcrumb from "../components/Breadcrumb";
import "./Pages.css";

const CGVPage = () => {
  return (
    <div className="page-wrapper page-wrapper--cream">
      <SEO
        title="Conditions Générales de Vente"
        description="Conditions générales de vente des voyages et forfaits proposés par Attitude Voyages. Droits des voyageurs et obligations (Code du tourisme)."
        canonical="/cgv"
        breadcrumbs={[{ label: "Accueil", path: "/" }, { label: "CGV", path: "/cgv" }]}
      />
      <div className="page-container legal-page">
        <Breadcrumb items={[{ label: "Accueil", path: "/" }, { label: "CGV" }]} />
        <motion.article
          className="legal-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="legal-title">Conditions Générales de Vente</h1>
          <p className="legal-intro">
            Conformément à l'article R.211-12 du Code du tourisme, les brochures et contrats de voyage proposés par Attitude Voyages comportent les conditions générales suivantes (articles R.211-3 à R.211-11 du Code du tourisme).
          </p>

          <section className="legal-section">
            <h2>Formulaire d'information standard – Droits essentiels (directive UE 2015/2302)</h2>
            <p>
              Référence :{" "}
              <a href="https://www.legifrance.gouv.fr/affichCode.do?cidTexte=LEGITEXT000006074073" target="_blank" rel="noopener noreferrer">
                Code du tourisme
              </a>
            </p>
            <ul className="legal-list">
              <li>Les voyageurs recevront toutes les informations essentielles sur le forfait avant de conclure le contrat de voyage à forfait.</li>
              <li>L'organisateur ainsi que le détaillant sont responsables de la bonne exécution de tous les services de voyage compris dans le contrat.</li>
              <li>Les voyageurs reçoivent un numéro de téléphone d'urgence ou les coordonnées d'un point de contact pour joindre l'organisateur ou le détaillant.</li>
              <li>Les voyageurs peuvent céder leur forfait à une autre personne, moyennant un préavis raisonnable et éventuellement sous réserve de frais supplémentaires.</li>
              <li>Le prix du forfait ne peut être augmenté que si des coûts spécifiques augmentent (ex. carburants) et si cette possibilité est prévue au contrat, et ne peut pas être modifié moins de vingt jours avant le début. Si la majoration dépasse 8 %, le voyageur peut résoudre le contrat. En cas de baisse des coûts, le voyageur a droit à une réduction de prix.</li>
              <li>Les voyageurs peuvent résoudre le contrat sans frais et être intégralement remboursés si un élément essentiel du forfait subit une modification importante. En cas d'annulation par le professionnel avant le départ, remboursement et dédommagement possibles.</li>
              <li>Résolution sans frais en cas de circonstances exceptionnelles (ex. problèmes graves pour la sécurité au lieu de destination).</li>
              <li>Résolution à tout moment avant le début du forfait moyennant des frais de résolution appropriés et justifiables.</li>
              <li>Si, après le début du forfait, des éléments importants ne peuvent être fournis comme prévu, des prestations de remplacement appropriées seront proposées sans supplément de prix.</li>
              <li>Résolution sans frais si les services ne sont pas exécutés conformément au contrat, que cela perturbe considérablement le forfait et que l'organisateur ne remédie pas au problème. Droit à une réduction de prix et/ou à un dédommagement en cas d'inexécution ou mauvaise exécution.</li>
              <li>L'organisateur ou le détaillant doit apporter une aide si le voyageur est en difficulté.</li>
              <li>En cas d'insolvabilité de l'organisateur ou du détaillant, les montants versés seront remboursés. Si l'insolvabilité survient après le début du forfait et si le transport est compris, le rapatriement des voyageurs est garanti.</li>
            </ul>
            <p>
              <strong>Protection contre l'insolvabilité :</strong> ATTITUDE VOYAGES a souscrit une protection auprès de Atradius Credit et Caution. Contact : 159 rue Anatole France, 92596 Levallois-Perret. Les voyageurs peuvent s'adresser à cet organisme si des services leur sont refusés en raison de l'insolvabilité d'ATTITUDE VOYAGES.
            </p>
          </section>

          <section className="legal-section">
            <h2>Forfait au sens de la directive (UE) 2015/2302</h2>
            <p>
              La combinaison de services de voyage qui vous est proposée constitue un forfait au sens de la directive (UE) 2015/2302 et de l'article L.211-2 II du Code du tourisme. Vous bénéficiez de tous les droits applicables aux forfaits, tels que transposés dans le Code du tourisme. L'entreprise ATTITUDE VOYAGES est entièrement responsable de la bonne exécution du forfait. Elle dispose d'une protection pour rembourser vos paiements et, si le transport est compris, pour assurer votre rapatriement en cas d'insolvabilité.
            </p>
          </section>

          <section className="legal-section">
            <h2>Conditions générales (extraits Code du tourisme)</h2>
            <p>
              Conformément aux articles L.211-7 et L.211-17 du Code du tourisme, les dispositions des articles R.211-3 à R.211-11 ne s'appliquent pas aux opérations de réservation ou de vente de titres de transport n'entrant pas dans le cadre d'un forfait touristique.
            </p>
            <p>
              La brochure, le devis, la proposition, le programme de l'organisateur constituent l'information préalable (art. R.211-5). À défaut de dispositions contraires au recto du document, les caractéristiques, conditions particulières et prix indiqués dans la brochure, le devis ou la proposition seront contractuels dès la signature du bulletin d'inscription. En l'absence de brochure/devis/programme, le présent document constitue l'information préalable et sera caduc faute de signature dans un délai de 24 heures à compter de son émission.
            </p>
            <p>
              En cas de cession de contrat, le cédant et/ou le cessionnaire sont tenus d'acquitter les frais qui en résultent. Les pièces justificatives seront fournies si ces frais excèdent les montants affichés ou mentionnés dans les documents contractuels.
            </p>
            <p>
              <strong>Assurance Responsabilité Civile Professionnelle :</strong> ATTITUDE VOYAGES a souscrit auprès de HISCOX (HISCOX DIRECT – TSA 49007 – 60477 Compiègne Cedex) un contrat d'assurance garantissant sa Responsabilité Civile Professionnelle.
            </p>
            <p>
              Les articles R.211-3 à R.211-11 du Code du tourisme précisent notamment : les documents à remettre (R.211-3), les informations précontractuelles (R.211-4), l'engagement du vendeur (R.211-5), les clauses obligatoires du contrat écrit (R.211-6), la cession du contrat (R.211-7), la révision des prix (R.211-8), les modifications essentielles et annulation par le vendeur (R.211-9, R.211-10), et les prestations de remplacement ou titres de transport de retour en cas d'impossibilité après le départ (R.211-11). Le texte intégral est consultable sur{" "}
              <a href="https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000042782963" target="_blank" rel="noopener noreferrer">
                Légifrance
              </a>.
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

export default CGVPage;
