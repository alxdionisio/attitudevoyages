function slugify(name) {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

const villesData = [
  { nom: "Nîmes", distance: 12, cp: "30000", accroche: "Depuis la cité des arènes, rejoignez-nous en quelques minutes pour organiser votre prochain voyage sur mesure." },
  { nom: "Caveirac", distance: 0, cp: "30820", accroche: "Venez nous rendre visite directement à l'agence, au cœur de la Vaunage." },
  { nom: "Caissargues", distance: 8, cp: "30132", accroche: "À quelques minutes de Caissargues, notre agence vous accueille pour créer le voyage de vos rêves." },
  { nom: "Rodilhan", distance: 10, cp: "30230", accroche: "Habitants de Rodilhan, profitez de la proximité de notre agence pour un conseil voyage personnalisé." },
  { nom: "Milhaud", distance: 6, cp: "30540", accroche: "Toute proche de Milhaud, notre agence vous propose des séjours adaptés à vos envies." },
  { nom: "Bouillargues", distance: 9, cp: "30230", accroche: "Depuis Bouillargues, il ne faut que quelques minutes pour venir découvrir nos offres de voyages." },
  { nom: "Marguerittes", distance: 14, cp: "30320", accroche: "Habitants de Marguerittes, nous sommes votre agence de voyage de proximité dans le Gard." },
  { nom: "Manduel", distance: 16, cp: "30129", accroche: "De Manduel, rejoignez facilement notre agence pour organiser votre escapade." },
  { nom: "Garons", distance: 11, cp: "30128", accroche: "Proche de l'aéroport de Nîmes-Garons, notre agence est idéalement située pour vos projets de voyage." },
  { nom: "Langlade", distance: 4, cp: "30980", accroche: "Voisins de Langlade, venez nous voir à Caveirac pour un conseil voyage sur mesure." },
  { nom: "Poulx", distance: 18, cp: "30320", accroche: "Depuis Poulx et les garrigues nîmoises, notre agence est facilement accessible." },
  { nom: "Bernis", distance: 9, cp: "30620", accroche: "Habitants de Bernis, profitez de notre expertise voyage à deux pas de chez vous." },
  { nom: "Aubord", distance: 14, cp: "30620", accroche: "Depuis Aubord, venez découvrir nos circuits et séjours sur mesure." },
  { nom: "Clarensac", distance: 3, cp: "30870", accroche: "Clarensac est à deux pas de notre agence – passez nous voir pour préparer votre voyage." },
  { nom: "Nages-et-Solorgues", distance: 5, cp: "30114", accroche: "Depuis le village de Nages-et-Solorgues, rejoignez-nous en quelques minutes." },
  { nom: "Générac", distance: 16, cp: "30510", accroche: "Habitants de Générac, nous vous accueillons pour concevoir ensemble votre prochain séjour." },
  { nom: "La Calmette", distance: 15, cp: "30190", accroche: "Depuis La Calmette, profitez de notre accompagnement personnalisé pour vos voyages." },
  { nom: "Uchaud", distance: 12, cp: "30620", accroche: "À une dizaine de minutes d'Uchaud, notre agence vous attend avec des offres exclusives." },
  { nom: "Cabrières", distance: 7, cp: "30210", accroche: "Voisins de Cabrières, venez nous confier vos envies de voyage à Caveirac." },
  { nom: "Redessan", distance: 13, cp: "30129", accroche: "Depuis Redessan, quelques minutes suffisent pour rejoindre notre agence dans la Vaunage." },
  { nom: "Saint-Gervasy", distance: 10, cp: "30320", accroche: "Habitants de Saint-Gervasy, notre agence est votre partenaire voyage de proximité." },
  { nom: "Bezouce", distance: 14, cp: "30320", accroche: "Depuis Bezouce, venez profiter de nos conseils experts pour votre prochain voyage." },
  { nom: "Codognan", distance: 13, cp: "30920", accroche: "Habitants de Codognan, nous sommes à votre service pour organiser vos vacances idéales." },
  { nom: "Beauvoisin", distance: 18, cp: "30640", accroche: "Depuis Beauvoisin, rejoignez notre agence pour un voyage sur mesure dans le monde entier." },
  { nom: "Bellegarde", distance: 22, cp: "30127", accroche: "Même depuis Bellegarde, notre agence reste facilement accessible pour vos projets de voyage." },
  { nom: "Vestric-et-Candiac", distance: 8, cp: "30600", accroche: "Tout près de Vestric-et-Candiac, notre agence vous attend pour créer votre voyage idéal." },
  { nom: "Vergèze", distance: 14, cp: "30310", accroche: "Habitants de Vergèze, profitez de la proximité de notre agence pour vos projets d'évasion." },
  { nom: "Mus", distance: 11, cp: "30121", accroche: "Depuis Mus, venez découvrir nos offres de circuits et séjours exceptionnels." },
  { nom: "Aimargues", distance: 20, cp: "30470", accroche: "Depuis Aimargues et la Petite Camargue, notre agence vous propose des voyages d'exception." },
  { nom: "Gallargues-le-Montueux", distance: 16, cp: "30660", accroche: "Habitants de Gallargues, nous sommes votre agence de voyage la plus proche." },
  { nom: "Aigues-Vives", distance: 17, cp: "30670", accroche: "Depuis Aigues-Vives, rejoignez-nous pour organiser votre prochaine aventure." },
  { nom: "Sommières", distance: 14, cp: "30250", accroche: "Depuis la cité médiévale de Sommières, notre agence est rapidement accessible." },
  { nom: "Calvisson", distance: 8, cp: "30420", accroche: "Voisins de Calvisson, venez nous voir pour un voyage personnalisé et inoubliable." },
  { nom: "Congénies", distance: 6, cp: "30111", accroche: "Depuis Congénies, quelques minutes vous séparent de notre agence et de votre prochain voyage." },
  { nom: "Boissières", distance: 5, cp: "30114", accroche: "Habitants de Boissières, nous sommes juste à côté pour vous conseiller." },
  { nom: "Comps", distance: 20, cp: "30300", accroche: "Depuis Comps, venez profiter de notre expertise en voyages sur mesure." },
  { nom: "Meynes", distance: 16, cp: "30840", accroche: "Habitants de Meynes, notre agence vous accompagne dans tous vos projets de voyage." },
  { nom: "Lédenon", distance: 17, cp: "30210", accroche: "Depuis Lédenon, rejoignez notre agence pour un conseil personnalisé." },
  { nom: "Remoulins", distance: 22, cp: "30210", accroche: "Depuis Remoulins et le Pont du Gard, nous sommes votre agence de voyage la plus proche." },
  { nom: "Uzès", distance: 28, cp: "30700", accroche: "Depuis la ville ducale d'Uzès, notre agence est accessible en moins d'une demi-heure." },
  { nom: "Saint-Gilles", distance: 20, cp: "30800", accroche: "Habitants de Saint-Gilles, profitez de notre expertise pour vos voyages sur mesure." },
  { nom: "Dions", distance: 14, cp: "30190", accroche: "Depuis Dions, rejoignez facilement notre agence dans la Vaunage." },
  { nom: "Gajan", distance: 11, cp: "30730", accroche: "Voisins de Gajan, venez nous rendre visite pour préparer votre prochain voyage." },
  { nom: "Sauzet", distance: 9, cp: "30190", accroche: "Depuis Sauzet, notre agence est à quelques minutes pour organiser vos vacances." },
  { nom: "Fons-outre-Gardon", distance: 16, cp: "30190", accroche: "Habitants de Fons-outre-Gardon, nous sommes votre agence de proximité." },
  { nom: "Saint-Mamert-du-Gard", distance: 8, cp: "30730", accroche: "Depuis Saint-Mamert-du-Gard, venez découvrir nos offres de voyages exclusives." },
  { nom: "Saint-Geniès-de-Malgoirès", distance: 12, cp: "30190", accroche: "Habitants de Saint-Geniès-de-Malgoirès, notre agence vous attend pour créer votre voyage." },
  { nom: "La Rouvière", distance: 7, cp: "30190", accroche: "Depuis La Rouvière, profitez de la proximité de notre agence pour vos envies d'évasion." },
  { nom: "Sernhac", distance: 19, cp: "30210", accroche: "Depuis Sernhac, rejoignez-nous pour un voyage sur mesure inoubliable." },
  { nom: "Domessargues", distance: 10, cp: "30350", accroche: "Habitants de Domessargues, nous sommes votre agence de voyage de proximité dans le Gard." },
];

export const villes = villesData.map((v) => ({
  ...v,
  slug: slugify(v.nom),
}));

export function getVilleBySlug(slug) {
  return villes.find((v) => v.slug === slug) || null;
}

export function getAllVilleSlugs() {
  return villes.map((v) => v.slug);
}
