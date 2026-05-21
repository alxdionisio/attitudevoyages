/**
 * Témoignages clients — affichés sur la page d'accueil et /a-propos.
 *
 * TODO (Annie & Jade) : remplacer ces verbatims par 5 à 10 vrais témoignages
 * clients (idéalement issus de votre fiche Google Business Profile ou de
 * messages reçus par e-mail).
 *
 * Chaque témoignage alimente aussi le JSON-LD Review qui rentre dans le
 * schéma TravelAgency (signal de confiance E-E-A-T).
 *
 * IMPORTANT — Google n'accepte plus les Review schemas auto-déclarés depuis
 * 2023 pour les rich results, mais les LLMs (ChatGPT, Perplexity) les lisent
 * encore pour évaluer la réputation. Demandez le consentement écrit du client
 * avant d'afficher son prénom + initiale du nom.
 *
 * Format prénom : "Sophie L." (RGPD friendly).
 * Format date : "YYYY-MM" suffit (mois du voyage ou mois du témoignage).
 */

export const temoignages = [
  {
    id: 1,
    auteur: "TODO — Sophie L.",
    destination: "TODO — Bali, Indonésie",
    date: "2025-09", // TODO — mois de voyage (YYYY-MM)
    note: 5,
    texte:
      "TODO — verbatim client (3 à 5 lignes). Conseil : conserver le ton authentique, ne pas trop reformuler. Demandez : « Que retenez-vous de votre voyage ? Que diriez-vous à un proche qui hésite à passer par une agence ? »",
    typeVoyage: "Voyage de noces",
  },
  {
    id: 2,
    auteur: "TODO — Marc D.",
    destination: "TODO — Sri Lanka",
    date: "2025-07",
    note: 5,
    texte:
      "TODO — verbatim client. Idéalement un témoignage qui cite Annie ou Jade par leur prénom et qui décrit un détail concret (« quand l'avion a été annulé, Jade nous a re-routés en 2 h »).",
    typeVoyage: "Circuit en famille",
  },
  {
    id: 3,
    auteur: "TODO — Hélène et Paul B.",
    destination: "TODO — Tanzanie + Zanzibar",
    date: "2025-04",
    note: 5,
    texte:
      "TODO — verbatim couple senior, type voyage emblématique (safari, croisière).",
    typeVoyage: "Safari + plage",
  },
  {
    id: 4,
    auteur: "TODO — Camille R.",
    destination: "TODO — Albanie",
    date: "2024-09",
    note: 5,
    texte:
      "TODO — verbatim client jeune actif, voyage court, pour montrer la diversité de la clientèle.",
    typeVoyage: "Séjour découverte",
  },
  {
    id: 5,
    auteur: "TODO — Jean-Marc T.",
    destination: "TODO — Croisière Méditerranée",
    date: "2024-06",
    note: 5,
    texte:
      "TODO — verbatim client croisière, type voyage premium.",
    typeVoyage: "Croisière",
  },
];

/**
 * Statistiques globales — utilisées dans AggregateRating (Schema.org) et dans
 * le bloc "Ce que disent nos clients" de la homepage.
 *
 * TODO : mettre à jour à chaque trimestre avec vos vraies données Google /
 * fiche client.
 */
export const aggregateRating = {
  noteMoyenne: 4.9, // TODO — moyenne réelle (Google Business Profile)
  nombreAvis: 47, // TODO — nombre total d'avis collectés
  sourcePrincipale: "Google Business Profile + retours clients agence",
};
