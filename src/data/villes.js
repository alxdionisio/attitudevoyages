/**
 * Villes pour les pages "Agence de voyages à [ville]" (SEO local).
 * slug = identifiant URL (minuscules, tirets, sans accents).
 */

function slugify(name) {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

const nomsVilles = [
  "Nîmes",
  "Caveirac",
  "Caissargues",
  "Rodilhan",
  "Milhaud",
  "Bouillargues",
  "Marguerittes",
  "Manduel",
  "Garons",
  "Langlade",
  "Poulx",
  "Bernis",
  "Aubord",
  "Clarensac",
  "Nages-et-Solorgues",
  "Générac",
  "La Calmette",
  "Uchaud",
  "Cabrières",
  "Redessan",
  "Saint-Gervasy",
  "Bezouce",
  "Codognan",
  "Beauvoisin",
  "Bellegarde",
  "Vestric-et-Candiac",
  "Vergèze",
  "Mus",
  "Aimargues",
  "Gallargues-le-Montueux",
  "Aigues-Vives",
  "Sommières",
  "Calvisson",
  "Congénies",
  "Boissières",
  "Comps",
  "Meynes",
  "Lédenon",
  "Remoulins",
  "Uzès",
  "Saint-Gilles",
  "Dions",
  "Gajan",
  "Sauzet",
  "Fons-outre-Gardon",
  "Saint-Mamert-du-Gard",
  "Saint-Geniès-de-Malgoirès",
  "La Rouvière",
  "Sernhac",
  "Domessargues",
];

export const villes = nomsVilles.map((nom) => ({
  nom,
  slug: slugify(nom),
}));

export function getVilleBySlug(slug) {
  return villes.find((v) => v.slug === slug) || null;
}

export function getAllVilleSlugs() {
  return villes.map((v) => v.slug);
}
