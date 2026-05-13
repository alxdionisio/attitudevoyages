import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const BASE_URL = 'https://attitude-voyages.fr';
const today = new Date().toISOString().split('T')[0];

const pages = [
  { loc: '/', changefreq: 'weekly', priority: '1.0' },
  { loc: '/destinations', changefreq: 'weekly', priority: '0.9' },
  { loc: '/a-propos', changefreq: 'monthly', priority: '0.8' },
  { loc: '/contact', changefreq: 'monthly', priority: '0.9' },
  { loc: '/faq', changefreq: 'monthly', priority: '0.7' },
  { loc: '/cgv', changefreq: 'yearly', priority: '0.4' },
  { loc: '/mentions-legales', changefreq: 'yearly', priority: '0.3' },
  { loc: '/politique-confidentialite', changefreq: 'yearly', priority: '0.3' },
];

const offres = [
  '/offre/circuit-sri-lanka-eveil-des-sens',
  '/offre/sejour-albanie-tout-inclus',
  '/offre/sejour-sanur-bali',
  '/offre/sejour-jimbaran-bali',
  '/offre/circuit-bali-lombok-privatif',
  '/offre/croisiere-kuoni-royal-clipper-perles-de-mediterranee',
];

function slugify(name) {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
}

const villeNoms = [
  'Nîmes', 'Caveirac', 'Caissargues', 'Rodilhan', 'Milhaud', 'Bouillargues',
  'Marguerittes', 'Manduel', 'Garons', 'Langlade', 'Poulx', 'Bernis', 'Aubord',
  'Clarensac', 'Nages-et-Solorgues', 'Générac', 'La Calmette', 'Uchaud',
  'Cabrières', 'Redessan', 'Saint-Gervasy', 'Bezouce', 'Codognan', 'Beauvoisin',
  'Bellegarde', 'Vestric-et-Candiac', 'Vergèze', 'Mus', 'Aimargues',
  'Gallargues-le-Montueux', 'Aigues-Vives', 'Sommières', 'Calvisson', 'Congénies',
  'Boissières', 'Comps', 'Meynes', 'Lédenon', 'Remoulins', 'Uzès', 'Saint-Gilles',
  'Dions', 'Gajan', 'Sauzet', 'Fons-outre-Gardon', 'Saint-Mamert-du-Gard',
  'Saint-Geniès-de-Malgoirès', 'La Rouvière', 'Sernhac', 'Domessargues',
];

const villeSlugs = villeNoms.map(slugify);

const urls = [
  ...pages.map((p) => `  <url>
    <loc>${BASE_URL}${p.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`),
  ...offres.map((o) => `  <url>
    <loc>${BASE_URL}${o}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`),
  ...villeSlugs.map((slug) => `  <url>
    <loc>${BASE_URL}/agence-voyages/${slug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`),
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>`;

const outPath = join(__dirname, '..', 'public', 'sitemap.xml');
writeFileSync(outPath, sitemap, 'utf-8');
console.log(`sitemap.xml generated (${urls.length} URLs, lastmod: ${today})`);
