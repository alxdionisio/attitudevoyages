/**
 * Équipe Attitude Voyages — biographies E-E-A-T pour la page À propos.
 *
 * TODO (Annie & Jade) : remplacer chaque champ TODO par votre contenu réel.
 * Ces données alimentent :
 *  - La section "Notre équipe" sur /a-propos (composant EquipeSection)
 *  - Le JSON-LD Person injecté dans <head> (signaux Knowledge Graph / GEO)
 *
 * Pour les photos : placer les fichiers dans /public/team/ et référencer
 * "/team/annie.jpg" etc. Préférer du 800x800 (carré), format WebP si possible.
 */

export const equipe = [
  {
    id: "annie",
    prenom: "Annie",
    nom: "TODO — nom de famille",
    role: "Conseillère voyage & co-fondatrice",
    photo: "/team/annie-placeholder.svg", // TODO : remplacer par photo réelle
    photoAlt: "Annie, conseillère voyage chez Attitude Voyages",
    anneesExperience: 17, // TODO : ajuster
    languesParlees: ["Français", "Anglais"], // TODO : compléter
    destinationsExpertes: [
      "Indonésie (Bali, Lombok)",
      "Sri Lanka",
      "Tanzanie",
      "Méditerranée",
    ], // TODO : compléter
    bio: `Annie a co-fondé Attitude Voyages en 2009 après TODO — racontez son
parcours pré-agence (compagnie aérienne ? voyagiste ? tour-leader ?). Spécialiste
des TODO — type de voyage (circuits sur mesure, croisières, etc.), elle a
personnellement parcouru TODO — nombre de pays / régions clés et accompagne ses
clients de la première idée jusqu'au retour. Ses voyageurs apprécient TODO —
qualité distinctive (sa disponibilité, son sens du détail, sa connaissance
terrain…).`,
    citation:
      "TODO — une phrase d'Annie sur sa vision du voyage (1–2 lignes max).",
    linkedin: null, // TODO : URL LinkedIn pro si dispo
  },
  {
    id: "jade",
    prenom: "Jade",
    nom: "TODO — nom de famille",
    role: "Conseillère voyage & co-fondatrice",
    photo: "/team/jade-placeholder.svg", // TODO : remplacer par photo réelle
    photoAlt: "Jade, conseillère voyage chez Attitude Voyages",
    anneesExperience: 12, // TODO : ajuster
    languesParlees: ["Français", "Anglais", "Espagnol"], // TODO : compléter
    destinationsExpertes: [
      "Asie du Sud-Est",
      "Amériques",
      "Islande",
      "Voyages de noces",
    ], // TODO : compléter
    bio: `Jade a rejoint Attitude Voyages en TODO — année. Diplômée TODO —
formation tourisme (BTS Tourisme ? École de commerce ?), elle s'est spécialisée
dans TODO — créneau (voyages de noces, voyages en famille, longue durée…). Ses
clients la reconnaissent pour TODO — qualité distinctive. Quand elle ne crée
pas d'itinéraires, elle explore TODO — passion personnelle voyage.`,
    citation:
      "TODO — une phrase de Jade (1–2 lignes max).",
    linkedin: null,
  },
];
