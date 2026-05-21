/**
 * Équipe Attitude Voyages — biographies E-E-A-T pour la page À propos.
 *
 * Ces données alimentent :
 *  - La section "Notre équipe" sur /a-propos (composant EquipeSection)
 *  - Le JSON-LD Person injecté dans <head> (signaux Knowledge Graph / GEO)
 */

export const equipe = [
  {
    id: "annie",
    prenom: "Annie",
    role: "Co-fondatrice & conseillère voyage",
    initiale: "A",
    anneesExperience: 17,
    languesParlees: ["Français", "Anglais"],
    destinationsExpertes: [
      "Indonésie (Bali, Lombok)",
      "Sri Lanka",
      "Tanzanie & Zanzibar",
      "Croisières Méditerranée",
    ],
    bio:
      "Annie a fondé Attitude Voyages en 2009 avec une conviction : un voyage réussi se construit en écoutant d'abord. Après plus de quinze ans dans le tourisme et des dizaines de destinations parcourues à titre personnel, elle conçoit des circuits sur mesure pour ses voyageurs et accompagne chaque projet de la première idée jusqu'au retour. Ses clients reviennent pour son sens du détail et sa capacité à transformer une envie floue en itinéraire précis.",
  },
  {
    id: "jade",
    prenom: "Jade",
    role: "Conseillère voyage",
    initiale: "J",
    anneesExperience: 12,
    languesParlees: ["Français", "Anglais", "Espagnol"],
    destinationsExpertes: [
      "Asie du Sud-Est",
      "Voyages de noces",
      "Séjours en famille",
      "Albanie & Balkans",
    ],
    bio:
      "Jade a rejoint l'agence pour apporter son regard sur les voyages de noces, les séjours en famille et les escapades plus longues. Formée au tourisme et passionnée par la planification logistique, elle est le contact privilégié pour les itinéraires combinés, les départs multi-générationnels et tout projet qui demande plusieurs prestataires coordonnés. Son approche : un brief précis en amont, puis une disponibilité totale pendant le voyage en cas d'imprévu.",
  },
];
