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

const villesImport = await import('../src/data/villes.js');
const villeSlugs = villesImport.getAllVilleSlugs();

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
