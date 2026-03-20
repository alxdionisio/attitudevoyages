// Données partagées pour les offres (liste + page détail)

const offresBase = [
  {
    id: 1,
    slug: "escapade-mediterraneenne",
    title: "Escapade Méditerranéenne",
    destination: "Grèce & Îles",
    duration: "8 jours / 7 nuits",
    price: "1 290€",
    image: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?q=80&w=2835&auto=format&fit=crop",
    highlights: ["Santorin", "Mykonos", "Athènes"],
    tag: "Coup de cœur",
    shortDescription: "Découvrez les perles de la Méditerranée entre bleu infini et villages blancs.",
    pointsForts: [
      { icon: "sunset", title: "Couchers de soleil", description: "Vues panoramiques sur les caldeiras de Santorin" },
      { icon: "boat", title: "Croisière", description: "Navigation vers les îles avec déjeuner à bord" },
      { icon: "culture", title: "Patrimoine", description: "Visite de l'Acropole et des sites antiques" },
      { icon: "relax", title: "Détente", description: "Hôtels de charme avec piscines et spa" },
    ],
    itineraire: [
      { jour: 1, titre: "Arrivée à Athènes", description: "Accueil à l'aéroport, transfert et installation à l'hôtel. Soirée libre dans le quartier de Plaka." },
      { jour: 2, titre: "Athènes antique", description: "Visite de l'Acropole, du Parthénon et du musée de l'Acropole. Déjeuner typique dans une taverne." },
      { jour: 3, titre: "Vers Santorin", description: "Vol ou ferry vers Santorin. Installation et découverte d'Oia au coucher du soleil." },
      { jour: 4, titre: "Santorin", description: "Croisière aux volcans et sources chaudes. Baignade et déjeuner à bord." },
      { jour: 5, titre: "Mykonos", description: "Traversée vers Mykonos. Découverte de Mykonos ville et des moulins." },
      { jour: 6, titre: "Délos", description: "Excursion à Délos, île sacrée et site archéologique classé UNESCO." },
      { jour: 7, titre: "Journée libre Mykonos", description: "Détente sur les plages ou shopping. Dîner d'adieu en bord de mer." },
      { jour: 8, titre: "Retour", description: "Transfert vers l'aéroport et vol de retour." },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1523531294919-4bcd7c65e216?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1548585605-e040f841b77b?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?q=80&w=1200&auto=format&fit=crop",
    ],
  },
  {
    id: 2,
    slug: "safari-tanzanien",
    title: "Safari Tanzanien",
    destination: "Tanzanie",
    duration: "12 jours / 11 nuits",
    price: "3 450€",
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=2868&auto=format&fit=crop",
    highlights: ["Serengeti", "Kilimandjaro", "Zanzibar"],
    tag: "Aventure",
    shortDescription: "Safari inoubliable dans les parcs du Serengeti et extension balnéaire à Zanzibar.",
    pointsForts: [
      { icon: "wildlife", title: "Big Five", description: "Observation des lions, léopards, éléphants, buffles et rhinocéros" },
      { icon: "landscape", title: "Paysages", description: "Savanes à perte de vue et vue sur le Kilimandjaro" },
      { icon: "beach", title: "Zanzibar", description: "Extension plage et culture swahilie" },
      { icon: "guide", title: "Guides experts", description: "Rangers locaux francophones et passionnés" },
    ],
    itineraire: [
      { jour: 1, titre: "Arrivée à Arusha", description: "Accueil à l'aéroport de Kilimandjaro. Transfert et nuit à Arusha." },
      { jour: 2, titre: "Tarangire", description: "Premier safari dans le parc national de Tarangire, célèbre pour ses éléphants." },
      { jour: 3, titre: "Manyara", description: "Safari au lac Manyara, forêt tropicale et lions grimpeurs." },
      { jour: 4, titre: "Serengeti", description: "Route vers le Serengeti. Safari en cours de route." },
      { jour: 5, titre: "Serengeti", description: "Safari toute la journée dans les plaines du Serengeti." },
      { jour: 6, titre: "Serengeti", description: "Deuxième journée complète de safari dans le parc." },
      { jour: 7, titre: "Ngorongoro", description: "Descente dans le cratère du Ngorongoro, écosystème unique." },
      { jour: 8, titre: "Vers Zanzibar", description: "Vol vers Zanzibar. Installation en bord de mer." },
      { jour: 9, titre: "Zanzibar", description: "Journée libre : plage, spa ou visite de Stone Town." },
      { jour: 10, titre: "Zanzibar", description: "Excursion en boutre ou plongée selon envies." },
      { jour: 11, titre: "Zanzibar", description: "Dernière journée de détente avant le retour." },
      { jour: 12, titre: "Retour", description: "Transfert aéroport et vol international." },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1489392191049-fd32a58bb314?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1589553416260-32d847a5a8e1?q=80&w=1200&auto=format&fit=crop",
    ],
  },
  {
    id: 3,
    slug: "temples-asie",
    title: "Temples d'Asie",
    destination: "Thaïlande & Cambodge",
    duration: "15 jours / 14 nuits",
    price: "2 190€",
    image: "https://images.unsplash.com/photo-1528181304800-259b08848526?q=80&w=2940&auto=format&fit=crop",
    highlights: ["Angkor Wat", "Bangkok", "Phuket"],
    tag: "Culture",
    shortDescription: "De Bangkok aux temples d'Angkor, un voyage entre spiritualité et plages de rêve.",
    pointsForts: [
      { icon: "temple", title: "Angkor Wat", description: "Temples mythiques au lever du soleil" },
      { icon: "food", title: "Gastronomie", description: "Dégustation de street food et cours de cuisine" },
      { icon: "nature", title: "Nature", description: "Jungle, rizières et plages de Phuket" },
      { icon: "wellness", title: "Bien-être", description: "Massages traditionnels et détente" },
    ],
    itineraire: [
      { jour: 1, titre: "Bangkok", description: "Arrivée et installation. Soirée au marché de Chatuchak ou sur les rooftops." },
      { jour: 2, titre: "Bangkok", description: "Grand Palais, Wat Pho (Bouddha couché), balade en tuk-tuk." },
      { jour: 3, titre: "Bangkok - Siem Reap", description: "Vol vers Siem Reap. Premier contact avec les temples au coucher du soleil." },
      { jour: 4, titre: "Angkor", description: "Lever de soleil à Angkor Wat. Visite d'Angkor Thom et du Bayon." },
      { jour: 5, titre: "Angkor", description: "Ta Prohm, Banteay Srei et autres temples de la petite circulation." },
      { jour: 6, titre: "Siem Reap", description: "Village flottant du Tonlé Sap ou atelier d'artisanat." },
      { jour: 7, titre: "Vers Phuket", description: "Vol vers Phuket. Installation en bord de mer." },
      { jour: 8, titre: "Phuket", description: "Excursion en bateau vers les îles (James Bond, Phi Phi selon programme)." },
      { jour: 9, titre: "Phuket", description: "Journée libre : plage, spa, vieille ville de Phuket." },
      { jour: 10, titre: "Phuket", description: "Cours de cuisine thaï ou plongée." },
      { jour: 11, titre: "Phuket", description: "Détente et derniers achats." },
      { jour: 12, titre: "Retour Bangkok", description: "Vol retour Bangkok. Dernière soirée." },
      { jour: 13, titre: "Retour", description: "Transfert aéroport et vol international." },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1528181304800-259b08848526?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1508009603885-50cf7c579365?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1528181304800-259b08848526?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1555992336-fb0d29498b13?q=80&w=1200&auto=format&fit=crop",
    ],
  },
  {
    id: 4,
    slug: "road-trip-americain",
    title: "Road Trip Américain",
    destination: "Ouest Américain",
    duration: "14 jours / 13 nuits",
    price: "2 890€",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2940&auto=format&fit=crop",
    highlights: ["Grand Canyon", "Monument Valley", "Las Vegas"],
    tag: "Liberté",
    shortDescription: "La route 66, les parcs nationaux et les paysages iconiques de l'Ouest américain.",
    pointsForts: [
      { icon: "road", title: "Road trip", description: "Location véhicule et liberté totale d'itinéraire" },
      { icon: "canyon", title: "Grand Canyon", description: "Randonnées et points de vue à couper le souffle" },
      { icon: "desert", title: "Monument Valley", description: "Paysages de western et culture navajo" },
      { icon: "nightlife", title: "Las Vegas", description: "Détente et divertissement en fin de parcours" },
    ],
    itineraire: [
      { jour: 1, titre: "Los Angeles", description: "Arrivée, récupération du véhicule. Première nuit à LA ou Santa Monica." },
      { jour: 2, titre: "Vers Las Vegas", description: "Route vers Las Vegas via le désert de Mojave. Soirée sur le Strip." },
      { jour: 3, titre: "Las Vegas", description: "Journée libre : casinos, spectacles, ou excursion au barrage Hoover." },
      { jour: 4, titre: "Grand Canyon", description: "Route vers le Grand Canyon. Coucher de soleil au bord du canyon." },
      { jour: 5, titre: "Grand Canyon", description: "Randonnée ou hélicoptère. Nuit sur place." },
      { jour: 6, titre: "Monument Valley", description: "Route vers Monument Valley. Tour en 4x4 avec guide navajo." },
      { jour: 7, titre: "Monument Valley", description: "Lever de soleil sur les mittens. Route vers Page." },
      { jour: 8, titre: "Antelope Canyon", description: "Visite d'Antelope Canyon et Horseshoe Bend." },
      { jour: 9, titre: "Zion", description: "Parc national de Zion. Randonnée dans le canyon." },
      { jour: 10, titre: "Bryce Canyon", description: "Bryce Canyon et ses hoodoos. Nuit à Bryce." },
      { jour: 11, titre: "Vers LA", description: "Route retour vers Los Angeles (ou extension Death Valley)." },
      { jour: 12, titre: "Los Angeles", description: "Hollywood, Beverly Hills, plages selon envies." },
      { jour: 13, titre: "Los Angeles", description: "Dernière journée shopping ou détente." },
      { jour: 14, titre: "Retour", description: "Restitution véhicule et vol retour." },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1504281623087-1a6dd8f827c2?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1605649487212-47bdab064df7?q=80&w=1200&auto=format&fit=crop",
    ],
  },
  {
    id: 5,
    slug: "merveilles-nordiques",
    title: "Merveilles Nordiques",
    destination: "Islande",
    duration: "10 jours / 9 nuits",
    price: "2 590€",
    image: "https://images.unsplash.com/photo-1504893524553-b855bce32c67?q=80&w=2787&auto=format&fit=crop",
    highlights: ["Aurores boréales", "Blue Lagoon", "Reykjavik"],
    tag: "Nature",
    shortDescription: "Glaciers, geysers, lagons et aurores boréales : l'Islande dans toute sa splendeur.",
    pointsForts: [
      { icon: "aurora", title: "Aurores boréales", description: "Chasse aux aurores en période hivernale" },
      { icon: "hotspring", title: "Sources chaudes", description: "Blue Lagoon et bains naturels" },
      { icon: "glacier", title: "Glaciers", description: "Lagon glaciaire de Jökulsárlón" },
      { icon: "waterfall", title: "Cascades", description: "Skógafoss, Seljalandsfoss et bien d'autres" },
    ],
    itineraire: [
      { jour: 1, titre: "Reykjavik", description: "Arrivée à Keflavik. Transfert et première nuit à Reykjavik." },
      { jour: 2, titre: "Cercle d'or", description: "Thingvellir, Geysir, Gullfoss. Nuit dans la région." },
      { jour: 3, titre: "Côte sud", description: "Seljalandsfoss, Skógafoss, plage de Vik. Nuit à Vik." },
      { jour: 4, titre: "Jökulsárlón", description: "Lagon glaciaire, Diamond Beach. Nuit à Höfn." },
      { jour: 5, titre: "Vers l'est", description: "Fjords de l'Est et paysages lunaires. Nuit à Egilsstaðir." },
      { jour: 6, titre: "Myvatn", description: "Zone géothermique de Myvatn, bains naturels. Nuit à Akureyri." },
      { jour: 7, titre: "Akureyri", description: "Capital du Nord. Retour vers l'ouest." },
      { jour: 8, titre: "Reykjavik", description: "Retour à Reykjavik. Soirée aurores si conditions favorables." },
      { jour: 9, titre: "Blue Lagoon", description: "Détente au Blue Lagoon avant le vol." },
      { jour: 10, titre: "Retour", description: "Transfert aéroport et vol retour." },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1504893524553-b855bce32c67?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1520769945061-0a448c463865?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1476610182048-b716b8518aae?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1504829857797-ddff29c27927?q=80&w=1200&auto=format&fit=crop",
    ],
  },
  {
    id: 6,
    slug: "douceur-orientale",
    title: "Douceur Orientale",
    destination: "Maroc",
    duration: "7 jours / 6 nuits",
    price: "890€",
    image: "https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?q=80&w=2787&auto=format&fit=crop",
    highlights: ["Marrakech", "Désert", "Essaouira"],
    tag: "Proximité",
    shortDescription: "Marrakech, une nuit en bivouac dans le désert et la côte atlantique.",
    pointsForts: [
      { icon: "medina", title: "Médinas", description: "Souks, riads et palais de Marrakech" },
      { icon: "desert", title: "Désert", description: "Nuit en bivouac sous les étoiles" },
      { icon: "ocean", title: "Essaouira", description: "Ville fortifiée et plages de l'Atlantique" },
      { icon: "food", title: "Cuisine", description: "Tajines, couscous et thé à la menthe" },
    ],
    itineraire: [
      { jour: 1, titre: "Marrakech", description: "Arrivée et transfert au riad. Soirée place Jemaa el-Fna." },
      { jour: 2, titre: "Marrakech", description: "Palais de la Bahia, jardins Majorelle, souks." },
      { jour: 3, titre: "Vers le désert", description: "Route via Aït Ben Haddou. Nuit en bivouac aux dunes." },
      { jour: 4, titre: "Désert", description: "Balade à dos de dromadaire, lever et coucher de soleil. Nuit au bivouac." },
      { jour: 5, titre: "Essaouira", description: "Route vers Essaouira. Découverte de la médina et des remparts." },
      { jour: 6, titre: "Essaouira", description: "Plage, port de pêche, ateliers d'artisanat. Retour Marrakech en fin de journée." },
      { jour: 7, titre: "Retour", description: "Derniers achats et transfert aéroport." },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1549140602-114f4d4d1c2d?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?q=80&w=1200&auto=format&fit=crop",
    ],
  },
  {
    id: 7,
    slug: "circuit-sri-lanka-eveil-des-sens",
    title: "Circuit Sri Lanka – Éveil des sens",
    destination: "Sri Lanka",
    duration: "10 jours / 9 nuits",
    price: "Sur devis",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=2835&auto=format&fit=crop",
    highlights: ["Dambulla", "Sigiriya", "Kandy", "Yoga & méditation"],
    tag: "Bien-être",
    shortDescription: "Circuit Namasté 10 jours au départ de Paris (18–27 mai). Yoga, méditation, cure ayurvédique et découvertes : temples, Rocher de Sigiriya, Temple de la Dent à Kandy, rencontre avec les moines, village de Suduganga et cours de cuisine. Mini-groupe 20 personnes max.",
    pointsForts: [
      { icon: "guide", title: "Mini-groupe 20 personnes max", description: "Voyage en petit groupe pour une atmosphère conviviale et des échanges privilégiés." },
      { icon: "wellness", title: "Yoga, méditation & ayurvéda", description: "Temps libre, séances de yoga et de méditation, cure ayurvédique." },
      { icon: "temple", title: "Découvertes culturelles", description: "Temple rupestre de Dambulla, ascension du Rocher de Sigiriya et des Demoiselles, Temple de la Dent Sacrée à Kandy." },
      { icon: "culture", title: "Rencontres & immersion", description: "Rencontre avec des moines bouddhistes, balade hors des sentiers battus au village de Suduganga, cours de cuisine." },
      { icon: "food", title: "Pension complète", description: "Pension complète et assistant francophone sur place tout au long du circuit." },
      { icon: "relax", title: "Hébergements de qualité", description: "Hébergements soigneusement sélectionnés pour un confort optimal." },
    ],
    itineraire: [
      { jour: 1, titre: "Paris – Colombo / Negombo", description: "Vol au départ de Paris. Accueil à l'aéroport, transfert et installation à l'hôtel. Soirée libre pour récupérer du voyage." },
      { jour: 2, titre: "Vers Dambulla", description: "Route vers la région de Dambulla. Visite du temple rupestre de Dambulla (site UNESCO). Temps libre et première séance de yoga en fin de journée." },
      { jour: 3, titre: "Sigiriya", description: "Ascension du Rocher de Sigiriya et découverte des fameuses Demoiselles de Sigiriya. Après-midi détente ou méditation au cœur de la nature." },
      { jour: 4, titre: "Vers Kandy", description: "Route vers Kandy. Visite du Temple de la Dent Sacrée (Sri Dalada Maligawa). Rencontre avec des moines bouddhistes pour un moment d'échange et de découverte." },
      { jour: 5, titre: "Kandy et environs", description: "Temps libre pour explorer Kandy. Séance de yoga. Découverte des environs : jardins botaniques ou temples selon le programme." },
      { jour: 6, titre: "Village de Suduganga", description: "Balade hors des sentiers battus au village de Suduganga pour une immersion authentique dans la vie locale et les traditions." },
      { jour: 7, titre: "Cours de cuisine", description: "Cours de cuisine traditionnelle sri-lankaise. Après-midi dédié à la cure ayurvédique ou à la détente." },
      { jour: 8, titre: "Bien-être", description: "Journée dédiée au bien-être : yoga, méditation et soins ayurvédiques selon le programme du circuit." },
      { jour: 9, titre: "Retour vers Colombo / Negombo", description: "Route vers la côte. Derniers achats ou détente en bord de mer. Préparation au retour." },
      { jour: 10, titre: "Départ", description: "Transfert vers l'aéroport et vol retour vers Paris." },
    ],
    gallery: [],
  },
  {
    id: 8,
    slug: "sejour-albanie-tout-inclus",
    title: "Séjour Albanie – Tout inclus",
    destination: "Albanie",
    duration: "5 jours / 4 nuits",
    price: "895€",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2835&auto=format&fit=crop",
    highlights: ["Front de mer", "Plage de sable", "Tout inclus"],
    tag: "Tout inclus",
    shortDescription: "Séjour en Albanie 5 jours / 4 nuits avec vol au départ de Marseille. Hôtel club en front de mer avec plage de sable. Tout inclus selon disponibilité.",
    pointsForts: [
      { icon: "beach", title: "Proximité de la plage", description: "Hôtel club en front de mer avec une plage de sable pour profiter du soleil et de la mer." },
      { icon: "relax", title: "Aéroport à 35 min", description: "Transfert rapide depuis l'aéroport (environ 35 minutes) pour un accès facile au départ de Marseille." },
      { icon: "food", title: "Tout inclus", description: "Formule tout inclus selon disponibilité : restauration et boissons sur place." },
    ],
    itineraire: [
      { jour: 1, titre: "Marseille – Albanie", description: "Vol au départ de Marseille. Transfert vers l'hôtel club (environ 35 min). Installation et découverte des lieux. Soirée à l'hôtel." },
      { jour: 2, titre: "Journée en bord de mer", description: "Journée libre pour profiter de la plage de sable et des équipements de l'hôtel. Repas et animations tout inclus." },
      { jour: 3, titre: "Détente et découverte", description: "Temps libre en front de mer : baignade, détente ou balade aux alentours selon vos envies." },
      { jour: 4, titre: "Dernière journée", description: "Dernière journée de détente à l'hôtel club. Profitez de la plage et des activités proposées." },
      { jour: 5, titre: "Retour", description: "Transfert vers l'aéroport et vol retour vers Marseille." },
    ],
    gallery: [],
  },
  {
    id: 9,
    slug: "sejour-sanur-bali",
    title: "Bali, Prama Sanur Beach 5* + Vols Flex",
    destination: "Bali",
    duration: "De 5 à 14 nuits",
    price: "809 € TTC",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=2835&auto=format&fit=crop",
    highlights: ["Sanur", "Prama Sanur Beach 5*", "Plage", "Détente"],
    tag: "Soleil",
    shortDescription: "Découvrez Bali, l'île des Dieux. L'hôtel Prama Sanur 5* vous accueille sur la plage de Sanur, ancien village de pêcheurs : sables en pente douce, lagon protégé par le récif, idéal pour l'exploration et la natation à marée haute. Séjour parfait pour les couples et les familles.",
    promoLabel: "PETIT PRIX !",
    dateDebut: "07/05/2026",
    pointsForts: [
      { icon: "beach", title: "Plage & lagon", description: "Sables en pente douce, lagon peu profond. Natation à marée haute." },
      { icon: "relax", title: "Hôtel 5*", description: "Prama Sanur Beach : jardins tropicaux, chambres spacieuses vue jardin, piscine ou mer." },
      { icon: "wellness", title: "Piscines & spa", description: "Deux piscines (dont toboggan), tennis, salle de sport, spa." },
      { icon: "food", title: "Restaurants & bars", description: "Cuisine internationale et balinaise, bar lounge et bar de plage." },
    ],
    itineraire: [
      { jour: 1, titre: "Arrivée à Bali", description: "Transfert en véhicule climatisé vers l'hôtel Prama Sanur Beach 5*. Installation et découverte des lieux." },
      { jour: 2, titre: "Sanur", description: "Journée libre : plage, lagon, piscines. Restaurants et boutiques du village à proximité." },
      { jour: 3, titre: "Sanur", description: "Détente à l'hôtel ou exploration des alentours. Spa et activités nautiques en option." },
      { jour: 4, titre: "Sanur", description: "Journée libre. Farniente sur la plage ou balade le long du front de mer." },
      { jour: 5, titre: "Sanur", description: "Temps libre. Piscines, lagon peu profond propice au snorkeling à marée haute." },
      { jour: 6, titre: "Sanur", description: "Journée libre. Cuisine balinaise et internationale à l'hôtel ou en ville." },
      { jour: 7, titre: "Sanur", description: "Détente. Jardins tropicaux de l'hôtel, tennis, ou sortie en option." },
      { jour: 8, titre: "Sanur", description: "Journée libre. Plage de sable en pente douce, protégée par le récif." },
      { jour: 9, titre: "Sanur", description: "Temps libre. Bar de plage, bar lounge, soirées à l'hôtel." },
      { jour: 10, titre: "Sanur", description: "Dernière journée de détente. Derniers achats ou farniente." },
      { jour: 11, titre: "Retour", description: "Transfert vers l'aéroport et vol retour." },
    ],
    itineraireNote: "Proposition de programme pour un séjour de 10 nuits. Durée adaptable de 5 à 14 nuits.",
    // Mise en avant par activités (au lieu du détail jour par jour) – uniquement pour cette offre
    programmeActivites: [
      { titre: "Plage & lagon", description: "Sables en pente douce, lagon protégé par le récif. Natation et snorkeling à marée haute." },
      { titre: "Piscines & détente", description: "Deux piscines dont une avec toboggan, jardins tropicaux, transats." },
      { titre: "Spa & bien-être", description: "Spa haut de gamme (supplément). Massages et soins en option." },
      { titre: "Restaurants & bars", description: "Cuisine internationale et balinaise, grillades au bord de la piscine, bar lounge et bar de plage." },
      { titre: "Village de Sanur", description: "Boutiques, restaurants et front de mer à proximité. Balades à pied ou à vélo." },
      { titre: "Activités nautiques", description: "Exploration du lagon, sorties en option. Plage idéale pour les familles." },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1555400038-63f5ba517a47?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1540202404-a2f29016b523?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200&auto=format&fit=crop",
    ],
    hebergementTitre: "Votre hôtel",
    hebergementNom: "Prama Sanur Beach 5*",
    hebergementDescription: "Hôtel 5* sur la plage de Sanur, 6 ha de jardins tropicaux. Chambres avec climatisation, TV, mini-bar, balcon vue jardin/piscine/mer.\n\nÉquipements : deux piscines (dont toboggan), tennis, salle de sport, spa (supplément). Restaurants : international, grillades, cuisine balinaise. Petit-déjeuner buffet vue mer. Bar lounge et bar de plage.",
    hebergementPrevu: "Bali : Prama Sanur Beach 5*",
    classificationNote: "Classification indicative (système français). En cas d'indisponibilité, hôtel de catégorie similaire.",
    prixComprend: [
      "Vols réguliers internationaux choisis avec escale(s)",
      "Transferts en véhicule climatisé.",
      "Séjour à l'hôtel Prama Sanur 5* à Bali.",
      "Les repas selon la formule choisie",
      "Les taxes d'aéroport et frais de dossier (à ce jour et sujet à modification)",
      "Le pré acheminement de PROVINCE pourra s'effectuer en avion ou en train.",
    ],
    prixNeComprendPas: [
      "Les boissons, les repas libres ou non-mentionnés et les dépenses personnelles",
      "Les activités, visites et excursions proposées en option",
      "Les frais de visa (Visa On Arrival)",
      "La taxe touristique (à régler en ligne ou à l'arrivée)",
      "Les pourboires des guides et chauffeurs",
      "Les éventuels frais d'appareils photos et caméras sur les sites et dans les musées",
      "Les assurances assistance, rapatriement et annulation",
      "Tout ce qui n'est pas mentionné dans « Ce prix comprend »",
    ],
    bonASavoir: "Empreinte carte bancaire possible à l'arrivée (aucun débit sans consommation).\n\nChambre disponible entre 12h30 et 14h00.\n\nChambres triples : lit d'appoint peu confortable pour un adulte.\n\nTransport et formalités : informations indicatives ; consulter diplomatie.gouv.fr avant le départ.",
    attention: "Location de véhicule motorisé chez loueurs locaux non assurée : nous dégageons toute responsabilité en cas d'accident.",
  },
  {
    id: 10,
    slug: "sejour-jimbaran-bali",
    title: "Bali, Anja Jimbaran 4* + Vols Flex",
    destination: "Bali",
    duration: "De 5 à 14 nuits",
    price: "1 049 € TTC",
    image: "https://images.unsplash.com/photo-1555400038-63f5ba517a47?q=80&w=2835&auto=format&fit=crop",
    highlights: ["Jimbaran", "Anja Jimbaran 4*", "Plage", "Romantique"],
    tag: "Soleil",
    shortDescription: "Jimbaran est un village de pêcheurs et l'une des plus belles plages de sable de Bali, avec de nombreux restaurants de fruits de mer. Sur le « cou » de la péninsule du sud, les marées sont quasi inexistantes. Merveilleux couchers de soleil ; en soirée, les restaurants pittoresques sur la plage proposent poisson et fruits de mer frais. Idéal pour des vacances romantiques et de tout repos sur l'île des Dieux.",
    promoLabel: "PETIT PRIX !",
    dateDebut: "27/05/2026",
    pointsForts: [
      { icon: "beach", title: "Plage de Jimbaran", description: "L'une des plus belles plages de sable de Bali, marées quasi inexistantes." },
      { icon: "sunset", title: "Couchers de soleil", description: "Vues magnifiques en soirée depuis la plage." },
      { icon: "food", title: "Fruits de mer", description: "Restaurants pittoresques sur la plage, poisson et fruits de mer frais." },
      { icon: "relax", title: "Vacances romantiques", description: "Cadre idyllique pour un séjour de tout repos." },
    ],
    itineraire: [
      { jour: 1, titre: "Arrivée à Bali", description: "Transfert en véhicule climatisé vers l'hôtel Anja Jimbaran 4*. Installation et découverte des lieux." },
      { jour: 2, titre: "Jimbaran", description: "Journée libre : plage, piscine. Restaurants de fruits de mer sur la plage en soirée." },
      { jour: 3, titre: "Jimbaran", description: "Détente à l'hôtel. Spa, salle de gym ou farniente au bord de la piscine." },
      { jour: 4, titre: "Jimbaran", description: "Journée libre. Couchers de soleil et dîners en bord de plage." },
      { jour: 5, titre: "Jimbaran", description: "Temps libre. Plage de sable, cadre romantique." },
      { jour: 6, titre: "Jimbaran", description: "Journée libre. Restaurant Le Manja : plats balinais et internationaux." },
      { jour: 7, titre: "Jimbaran", description: "Détente. Piscine, espace enfants, Siesta Spa." },
      { jour: 8, titre: "Jimbaran", description: "Journée libre. Derniers moments sur la plage avant le retour." },
      { jour: 9, titre: "Retour", description: "Transfert vers l'aéroport et vol retour." },
    ],
    itineraireNote: "Proposition de programme pour un séjour de 8 nuits. Durée adaptable de 5 à 14 nuits.",
    programmeActivites: [
      { titre: "Plage de Jimbaran", description: "L'une des plus belles plages de sable de Bali. Marées quasi inexistantes, idéale pour la baignade." },
      { titre: "Couchers de soleil", description: "Merveilleux couchers de soleil en bord de plage." },
      { titre: "Restaurants de fruits de mer", description: "En soirée, les restaurants pittoresques sur la plage proposent poisson et fruits de mer frais." },
      { titre: "Piscine & détente", description: "Piscine (non surveillée), transats, cadre tropical. Idéal pour le farniente." },
      { titre: "Siesta Spa & gym", description: "Spa et salle de gym pour se ressourcer." },
      { titre: "Le Manja Restaurant", description: "Plats balinais et internationaux de 07h00 à 22h00." },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1555400038-63f5ba517a47?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1540202404-a2f29016b523?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200&auto=format&fit=crop",
    ],
    hebergementTitre: "Votre hôtel",
    hebergementNom: "Anja Jimbaran 4*",
    hebergementDescription: "Idéalement placé à quelques pas de la légendaire plage de Jimbaran à Bali, l'Anja Jimbaran vous plonge dans le confort tropical et se fond à merveille dans le décor qui l'entoure. 37 chambres et suites familiales épurées, spacieuses et modernes, décorées de légères touches asiatiques ; mobilier en bois. Chaque chambre possède un balcon.\n\nVotre chambre Deluxe (36 m²) : lit king size, ambiance cosy, large balcon vue jardins et piscine.\n\nÉquipements : climatisation, balcon, service en chambre, réfrigérateur, téléphone, TV LCD câble, coffre-fort, chambres insonorisées, fer et planche à repasser (sur demande), sèche-cheveux, eau minérale gratuite, peignoirs, serviettes, chaussons.\n\nRestauration : Le Manja Restaurant – plats balinais et internationaux, tous les jours de 07h00 à 22h00.\n\nServices & activités : piscine (non surveillée), espace enfants, Siesta Spa, salle de gym, salles de réunion.",
    hebergementPrevu: "Bali : Anja Jimbaran 4*",
    classificationNote: "Il n'existe pas à ce jour de classification hôtelière internationale. Le système d'étoiles est purement français. Notre classification est basée sur les prestations et notre appréciation qualité. En cas d'indisponibilité, hôtel de catégorie similaire.",
    prixComprend: [
      "Vols réguliers internationaux choisis avec escale(s)",
      "Transferts en véhicule climatisé.",
      "Séjour à l'hôtel Anja Jimbaran 4* à Bali.",
      "Les repas selon la formule choisie",
      "Les taxes d'aéroport et frais de dossier (à ce jour et sujet à modification)",
      "Le pré acheminement de PROVINCE pourra s'effectuer en avion ou en train.",
    ],
    prixNeComprendPas: [
      "Les boissons, les repas libres ou non-mentionné et les dépenses personnelles",
      "Les activités, visites et excursions proposées en option",
      "Les frais de visa (Visa On Arrival)",
      "La taxe touristique (à régler en ligne ou à l'arrivée)",
      "Les pourboires des guides et chauffeurs",
      "Les éventuels frais d'appareils photos et caméras sur les sites et dans les musées",
      "Les assurances assistance, rapatriement et annulation",
      "Tout ce qui n'est pas mentionné dans « Ce prix comprend »",
    ],
    bonASavoir: "Lors de votre séjour plage, à votre arrivée, l'hôtelier vous demandera une empreinte de carte bancaire afin de sécuriser vos éventuelles dépenses en extra. Vous ne subirez aucun débit si vous n'avez rien consommé.\n\nSelon les normes internationales, votre chambre sera disponible entre 12h30 et 14h00. En cas d'arrivée plus matinale, vous devrez parfois attendre sa mise à disposition.\n\nAttention : les chambres triples se composent d'une chambre double et d'un lit d'appoint peu confortable pour un adulte.\n\nLes informations de transport sont données à titre indicatif. Elles sont susceptibles d'être modifiées par la compagnie avant le départ et de comporter des escales techniques.\n\nLes informations concernant les formalités d'entrée sont communiquées à titre indicatif. Nous vous conseillons de consulter jusqu'au jour du départ le site diplomatie.gouv.fr.",
  },
  {
    id: 11,
    slug: "circuit-bali-lombok-privatif",
    title: "Circuit de Bali à Lombok en Privatif 3*",
    destination: "Bali & Lombok",
    duration: "15 jours / 12 nuits",
    price: "2 599 € TTC",
    priceBefore: "2 699 € TTC",
    image: "https://images.unsplash.com/photo-1594235206666-19245d362ffa?q=80&w=1920&auto=format&fit=crop",
    highlights: ["Ubud", "Sidemen", "Lombok", "2 îles"],
    tag: "Circuit",
    shortDescription: "Un voyage complet à travers la spiritualité balinaise, les rizières classées à l'UNESCO comme Jatiluwih et les panoramas volcaniques tels que le Mont Batur. Une immersion authentique entre Ubud, Sidemen et Lombok : une nature préservée et des plages paradisiaques. L'équilibre parfait entre découvertes culturelles, évasion tropicale et détente.",
    promoLabel: "PROMOTION",
    dateDebut: "10/05/2026",
    promoNote: "Promotion valable sur certains départs du 10/05/26 au 25/10/26. Vols, transferts, hébergement, pension, excursions avec guide, droits d'entrée et massage balinais inclus selon le programme.",
    pointsForts: [
      { icon: "wellness", title: "Massage au spa d'Ubud", description: "Massage balinais de 90 minutes inclus." },
      { icon: "hike", title: "Randonnées", description: "Rizières de Jatiluwih et campagne de Sidemen." },
      { icon: "beach", title: "Séjour libre à Lombok", description: "Île authentique, plages et nature." },
      { icon: "sunset", title: "Séjour libre Sud de Bali", description: "Détente en bord de mer après le circuit." },
    ],
    itineraire: [
      { jour: 1, titre: "France – Denpasar", description: "Envol pour l'Indonésie. Repas et nuit à bord." },
      { jour: 2, titre: "Denpasar – Ubud", description: "Accueil et transfert à Ubud. Repas libres. Nuit à l'hôtel." },
      { jour: 3, titre: "Ubud", description: "Forêt sacrée des singes, temples (Pura Taman Saraswati), Palais d'Ubud, marché, musée ARMA. Déjeuner local. Massage de 90 min dans un spa d'Ubud. Dîner libre. Nuit à l'hôtel." },
      { jour: 4, titre: "Tanah Lot – Taman Ayun – Jatiluwih – Ulun Danu", description: "Temple de Tanah Lot sur son îlot. Temple Royal de Taman Ayun (UNESCO). Rizières de Jatiluwih (UNESCO), randonnée d'environ 1 h. Région de Bedugul et temple d'Ulun Danu sur le lac Bratan. Retour à Ubud. Dîner libre. Nuit à l'hôtel." },
      { jour: 5, titre: "Gunung Kawi – Tirta Empul – Kintamani – Besakih – Sidemen", description: "Gunung Kawi (niches sculptées dans la roche). Sources sacrées de Tirta Empul. Vue sur le Mont Batur et le lac Batur. Déjeuner panoramique. Temple de Besakih, « temple mère » de Bali. Route vers Sidemen. Dîner libre. Nuit à l'hôtel." },
      { jour: 6, titre: "Sidemen – Tirta Gangga – Tenganan", description: "Randonnée d'environ 2 h (rizières, village, fabrique d'Ikat, plantation d'herbes). Déjeuner pique-nique. Palais aquatique de Tirta Gangga. Village de Tenganan (Bali Aga). Dîner libre. Nuit à l'hôtel." },
      { jour: 7, titre: "Sidemen – Padang Bai – Senggigi (Lombok)", description: "Transfert au port de Padang Bai. Traversée en bateau rapide vers Lombok. Transfert à Senggigi. Repas libres. Nuit à l'hôtel." },
      { jour: 8, titre: "Senggigi", description: "Séjour libre à Lombok en petit-déjeuner. Lombok : volcan Rinjani, plages de sable blanc, culture sasak. Découvertes optionnelles avec supplément." },
      { jour: 9, titre: "Senggigi", description: "Séjour libre. Détente sur les plages ou découverte des cascades et de la culture sasak en option." },
      { jour: 10, titre: "Senggigi", description: "Séjour libre à Lombok. Quatrième nuit à Senggigi." },
      { jour: 11, titre: "Senggigi – Bangsal – Sud de Bali", description: "Transfert au port de Bangsal. Traversée en bateau rapide vers Bali. Transfert au Sud de Bali. Repas libres. Nuit à l'hôtel." },
      { jour: 12, titre: "Sud de Bali", description: "Séjour libre au Sud de Bali en petit-déjeuner. Plages, activités balnéaires, boutiques et restaurants selon la zone." },
      { jour: 13, titre: "Sud de Bali", description: "Séjour libre. Détente en bord de mer." },
      { jour: 14, titre: "Sud de Bali – Denpasar – France", description: "Matinée et déjeuner libres. Transfert à l'aéroport. Envol pour la France. Repas et nuit à bord." },
      { jour: 15, titre: "France", description: "Arrivée en France." },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1594235206666-19245d362ffa?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200&auto=format&fit=crop",
    ],
    hebergementTitre: "Votre hébergement",
    hebergementNom: "Hôtels 3* (ou similaires)",
    hebergementDescription: "Ubud : Pertiwi Bisma ou Rama Phala ou Awatara Boutique.\n\nSidemen : Alamdhari Resort & Spa Sidemen.\n\nSenggigi (Lombok) : Merumatta Senggigi.\n\nPlage (Sud de Bali) : Jimbaran Bay ou Anja Jimbaran.",
    hebergementPrevu: "Ubud : Pertiwi Bisma / Rama Phala / Awatara — Sidemen : Alamdhari — Senggigi : Merumatta — Plage : Jimbaran Bay / Anja Jimbaran",
    classificationNote: "La classification en étoiles mentionnée se réfère aux normes locales (NL) du pays. Elle n'a pas de rapport avec la classification française. En cas d'indisponibilité, hôtel de catégorie similaire.",
    prixComprend: [
      "Vols internationaux Paris/Denpasar/Paris avec escale(s)",
      "Éventuels pré/post acheminements de Province en train ou avion",
      "Taxes d'aéroport, de sécurité et frais de dossier (à ce jour, sujets à modifications)",
      "Accueil à l'aéroport par notre correspondant local",
      "Transferts aéroport/hôtel/aéroport",
      "Transport en véhicule climatisé selon le programme",
      "Hébergement 12 nuits dans les hôtels cités (ou similaires)",
      "Pension selon le programme (hors boissons)",
      "Guide local francophone durant les excursions (ou anglophone selon disponibilités)",
      "Droits d'entrée sur les sites selon le programme",
    ],
    prixComprendNote: "Tous nos départs sont garantis à partir de 2 personnes. L'inscription en chambre individuelle peut être annulée faute d'au moins 2 participants.",
    prixNeComprendPas: [
      "Les boissons, les repas libres ou non-mentionné et les dépenses personnelles",
      "Les activités, visites et excursions proposées en option",
      "Les frais de visa (Visa On Arrival)",
      "La taxe touristique (à régler en ligne ou à l'arrivée)",
      "Les pourboires des guides et chauffeurs",
      "Les éventuels frais d'appareils photos et caméras sur les sites et dans les musées",
      "Les assurances assistance, rapatriement et annulation",
      "Tout ce qui n'est pas mentionné dans « Ce prix comprend »",
    ],
    bonASavoir: "Départs garantis à partir de 2 personnes. Inscription en chambre individuelle soumise à conditions et pouvant être annulée faute d'au moins 2 participants.\n\nLes traversées pour rejoindre Lombok sont soumises aux conditions météorologiques et peuvent entraîner un réaménagement du programme.\n\nGunung Kawi : balade d'environ 1h15 — prévoir bonnes chaussures et protection solaire.\n\nRandonnée Sidemen : prévoir maillot de bain pour se rafraîchir dans la rivière.\n\nDisponibilité des guides francophones limitée (surtout 15 juin / 15 septembre). Le guide pourra être anglophone.\n\nL'ordre des visites peut être inversé ou modifié ; toutes les visites seront respectées.\n\nChambre disponible entre 12h30 et 15h00. Empreinte carte bancaire possible à l'arrivée en séjour plage (aucun débit sans consommation).",
  },
  {
    id: 12,
    slug: "croisiere-kuoni-royal-clipper-perles-de-mediterranee",
    title: "Croisière exclusive Kuoni à bord du Royal Clipper",
    destination: "Méditerranée",
    duration: "8 jours / 7 nuits",
    price: "2 490€",
    image: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?q=80&w=2835&auto=format&fit=crop",
    highlights: ["Royal Clipper (5 mâts)", "Départ unique Nice", "Portofino & Bonifacio", "Exclusivité Kuoni"],
    tag: "Croisière",
    shortDescription:
      "Croisière exclusive Kuoni à bord du Royal Clipper : une navigation à voile unique avec escales d’exception. Départ unique le 8 mai 2027 depuis Nice. Réservation avant le 31 août 2026 : -10% sur le prix de la cabine.",
    promoLabel: "EXCLUSIVITÉ KUONI",
    dateDebut: "08/05/2027",
    promoDiscountPercent: "10%",
    promoDiscountUntil: "31 août 2026",
    promoNote:
      "Réduction exceptionnelle de 10% pour toute réservation faite avant le 31 août 2026 sur l’ensemble des catégories de cabines et suites. Cette réduction est valable sur le prix de la cabine. Contactez un conseiller voyage pour en savoir plus !",
    pointsForts: [
      {
        icon: "boat",
        title: "Royal Clipper, 5 mâts",
        description:
          "Plus grand voilier et unique 5 mâts au monde : une expérience de navigation à voile, confort et détente.",
      },
      {
        icon: "relax",
        title: "Espaces bien-être & loisirs",
        description:
          "Trois piscines, Captain Nemo Spa, salle de sport, accès aux sports nautiques et ambiance piano-bar.",
      },
      {
        icon: "food",
        title: "Saveurs à bord",
        description:
          "Petit-déjeuner continental et anglais, déjeuner en buffet varié et dîner servi à table.",
      },
      {
        icon: "culture",
        title: "Conférenciers & ambiance Kuoni",
        description:
          "Présence exceptionnelle de 2 conférenciers et d’un ambassadeur Kuoni pour enrichir l’expérience.",
      },
    ],
    itineraireNote:
      "La croisière, bien qu’accessible à tous, nécessite une condition physique raisonnablement bonne. Tenue décontractée en journée et plus habillée le soir, pour les dîners. Les frais annexes à bord sont à régler par carte de crédit (American Express, Visa ou MasterCard). Pourboires obligatoires : 70 €/personne, à régler avant départ. Excursions (hors Portofino et Monaco) : sélection disponible sur demande, recommandée à réserver avant le départ.",
    itineraire: [
      {
        jour: 1,
        titre: "Nice (embarquement)",
        description: "8 mai : embarquement de 15 h à 16 h, départ à 22 h.",
      },
      {
        jour: 2,
        titre: "Portofino",
        description: "9 mai : escale à Portofino (Italie) de 12 h à 18 h.",
      },
      {
        jour: 3,
        titre: "Portoferraio (île d’Elbe)",
        description: "10 mai : escale à Portoferraio (île d’Elbe, Italie) de 9 h à 18 h.",
      },
      {
        jour: 4,
        titre: "Bonifacio (Corse)",
        description: "11 mai : escale à Bonifacio (Corse, France) de 10 h à 22 h.",
      },
      {
        jour: 5,
        titre: "Alghero (Sardaigne)",
        description: "12 mai : escale à Alghero (Sardaigne, Italie) de 10 h à 17 h.",
      },
      {
        jour: 6,
        titre: "Ajaccio (Corse)",
        description: "13 mai : escale à Ajaccio (Corse, France) de 9 h à 16 h.",
      },
      {
        jour: 7,
        titre: "Monaco",
        description: "14 mai : escale à Monaco de 8 h à 23 h 45.",
      },
      {
        jour: 8,
        titre: "Nice (arrivée & débarquement)",
        description: "15 mai : arrivée à Nice à 7 h, débarquement jusqu’à 10 h.",
      },
    ],
    hebergementTitre: "Les cabines",
    hebergementNom: "Cabines & suites Royal Clipper (Kuoni)",
    hebergementDescription:
      "Les cabines et suites ont été conçues pour offrir un cadre confortable et élégant, dans un esprit nautique premium. Matériaux soignés, cuivres polis et mobilier en acajou contribuent à créer une ambiance chaleureuse.\n\nToutes les cabines disposent d’un aménagement complet répondant aux attentes d’une clientèle en recherche de confort : lits jumeaux ou lit double, salle de bains ou douche équipée d’un sèche-cheveux, climatisation individuelle et télévision.\n\nCatégories (selon ponts) :\n- Cabines intérieures (catégorie 6) : 10 m² (1 individuelle et 5 doubles/triples)\n- Cabines standard extérieures (catégorie 5) : 11 m² (pont Commodore)\n- Cabines extérieures (catégories 3 et 4) : 13 m² (ponts Clipper et Commodore)\n- Cabines supérieures extérieures (catégorie 2) : 13 m² (pont Clipper)\n- Cabines de luxe extérieures (catégorie 1) : 14,5 m² (pont principal)\n- Suites deluxe extérieures (pont principal) : balcon privé, bain à remous et service en cabine (26 m² balcon inclus)\n- Suites extérieures de l’Armateur (pont Clipper) : coin salon, bain à remous, minibar et service en cabine (40 m²).",
    prixNeComprendPas: [
      "Excursions et services selon programme et disponibilités",
      "Dépenses personnelles à bord",
      "Pourboires obligatoires (70 €/personne) à régler avant départ",
    ],
    bonASavoir:
      "La croisière nécessite une condition physique raisonnablement bonne.\n\nLa tenue est décontractée en journée et plus habillée le soir, pour les dîners.\n\nLes frais annexes à bord sont à régler par carte de crédit (American Express, Visa ou MasterCard).\n\nPourboires obligatoires : 70 €/personne, à régler avant départ.\n\nExcursions : à chaque escale (hors Portofino et Monaco), une sélection est proposée sur demande et recommandée à réserver avant le départ.",
  },
];

const SLUGS_OFFRES_DISPONIBLES = [
  "circuit-sri-lanka-eveil-des-sens",
  "sejour-albanie-tout-inclus",
  "sejour-sanur-bali",
  "sejour-jimbaran-bali",
  "circuit-bali-lombok-privatif",
  "croisiere-kuoni-royal-clipper-perles-de-mediterranee",
];

export const offresData = offresBase.filter((o) => SLUGS_OFFRES_DISPONIBLES.includes(o.slug));

export const getOffreBySlug = (slug) => offresData.find((o) => o.slug === slug);
export const getOffreById = (id) => offresData.find((o) => o.id === Number(id));
export const getAllTags = () => [...new Set(offresData.map((o) => o.tag))].sort();

/** Nombre d'offres par tag. "Tous" = total. Pour afficher les comptes dans les filtres. */
export const getTagCounts = () => {
  const counts = { Tous: offresData.length };
  offresData.forEach((o) => {
    counts[o.tag] = (counts[o.tag] || 0) + 1;
  });
  return counts;
};

/** Filtre par tag (optimisé, une seule itération). */
export const filterOffresByTag = (tag) =>
  tag === "Tous" || !tag ? offresData : offresData.filter((o) => o.tag === tag);

export const getAllDestinations = () => [...new Set(offresData.map((o) => o.destination))].sort();

/** Nombre d'offres par destination. "Toutes" = total. */
export const getDestinationCounts = () => {
  const counts = { Toutes: offresData.length };
  offresData.forEach((o) => {
    counts[o.destination] = (counts[o.destination] || 0) + 1;
  });
  return counts;
};

/**
 * Filtre unifié par types et/ou destinations. Sélection multiple : une offre est retenue si
 * (aucun filtre type OU son tag est dans tags) ET (aucun filtre destination OU sa destination est dans destinations).
 * @param {{ tag?: string, destination?: string, tags?: string[], destinations?: string[] }} filters
 * - tag/destination : ancienne API (une seule valeur) encore supportée
 * - tags/destinations : tableaux ; vide ou contenant "Tous"/"Toutes" = pas de filtre
 */
export const filterOffres = (filters = {}) => {
  const tags = filters.tags ?? (filters.tag != null ? [filters.tag] : null);
  const destinations = filters.destinations ?? (filters.destination != null ? [filters.destination] : null);
  const noTagFilter = !tags?.length || tags.includes("Tous");
  const noDestFilter = !destinations?.length || destinations.includes("Toutes");
  if (noTagFilter && noDestFilter) return offresData;
  return offresData.filter((o) => {
    const matchTag = noTagFilter || tags.includes(o.tag);
    const matchDest = noDestFilter || destinations.includes(o.destination);
    return matchTag && matchDest;
  });
};

/** Retourne le prix numérique en € ou null pour "Sur devis". */
export const getPriceNumber = (offre) => {
  const p = offre.price;
  if (!p || p === "Sur devis") return null;
  const n = parseInt(String(p).replace(/\s/g, "").replace("€", ""), 10);
  return Number.isNaN(n) ? null : n;
};

/** Min et max des prix numériques des offres (pour configurer la barre de filtre). */
export const getPriceRange = () => {
  const numbers = offresData.map(getPriceNumber).filter((n) => n != null);
  if (numbers.length === 0) return { min: 0, max: 5000 };
  return { min: Math.min(...numbers), max: Math.max(...numbers) };
};
