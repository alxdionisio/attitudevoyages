import puppeteer from 'puppeteer';
import { createServer } from 'http';
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = join(__dirname, '..', 'dist');
const PORT = 4173;

const routes = [
  '/',
  '/destinations',
  '/a-propos',
  '/contact',
  '/cgv',
  '/mentions-legales',
  '/politique-confidentialite',
  '/faq',
  '/offre/circuit-sri-lanka-eveil-des-sens',
  '/offre/sejour-albanie-tout-inclus',
  '/offre/sejour-sanur-bali',
  '/offre/sejour-jimbaran-bali',
  '/offre/circuit-bali-lombok-privatif',
  '/offre/croisiere-kuoni-royal-clipper-perles-de-mediterranee',
  '/agence-voyages/nimes',
  '/agence-voyages/caveirac',
  '/agence-voyages/caissargues',
  '/agence-voyages/rodilhan',
  '/agence-voyages/milhaud',
  '/agence-voyages/bouillargues',
  '/agence-voyages/marguerittes',
  '/agence-voyages/manduel',
  '/agence-voyages/garons',
  '/agence-voyages/langlade',
  '/agence-voyages/poulx',
  '/agence-voyages/bernis',
  '/agence-voyages/aubord',
  '/agence-voyages/clarensac',
  '/agence-voyages/nages-et-solorgues',
  '/agence-voyages/generac',
  '/agence-voyages/la-calmette',
  '/agence-voyages/uchaud',
  '/agence-voyages/cabrieres',
  '/agence-voyages/redessan',
  '/agence-voyages/saint-gervasy',
  '/agence-voyages/bezouce',
  '/agence-voyages/codognan',
  '/agence-voyages/beauvoisin',
  '/agence-voyages/bellegarde',
  '/agence-voyages/vestric-et-candiac',
  '/agence-voyages/vergeze',
  '/agence-voyages/mus',
  '/agence-voyages/aimargues',
  '/agence-voyages/gallargues-le-montueux',
  '/agence-voyages/aigues-vives',
  '/agence-voyages/sommieres',
  '/agence-voyages/calvisson',
  '/agence-voyages/congenies',
  '/agence-voyages/boissieres',
  '/agence-voyages/comps',
  '/agence-voyages/meynes',
  '/agence-voyages/ledenon',
  '/agence-voyages/remoulins',
  '/agence-voyages/uzes',
  '/agence-voyages/saint-gilles',
  '/agence-voyages/dions',
  '/agence-voyages/gajan',
  '/agence-voyages/sauzet',
  '/agence-voyages/fons-outre-gardon',
  '/agence-voyages/saint-mamert-du-gard',
  '/agence-voyages/saint-genies-de-malgoires',
  '/agence-voyages/la-rouviere',
  '/agence-voyages/sernhac',
  '/agence-voyages/domessargues',
];

const indexHtml = readFileSync(join(DIST, 'index.html'), 'utf-8');

function serveDist() {
  const { lookup } = await import('mrmime');
  // Fallback: simple static server
}

async function startServer() {
  const handler = (req, res) => {
    let url = req.url.split('?')[0];
    if (url.endsWith('/')) url += 'index.html';

    const filePath = join(DIST, url);
    try {
      if (existsSync(filePath)) {
        const content = readFileSync(filePath);
        const ext = filePath.split('.').pop();
        const mimeTypes = {
          html: 'text/html', js: 'application/javascript', css: 'text/css',
          png: 'image/png', jpg: 'image/jpeg', svg: 'image/svg+xml',
          json: 'application/json', woff2: 'font/woff2',
        };
        res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' });
        res.end(content);
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(indexHtml);
      }
    } catch {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(indexHtml);
    }
  };

  const server = createServer(handler);
  await new Promise((resolve) => server.listen(PORT, resolve));
  return server;
}

async function main() {
  console.log(`Prerendering ${routes.length} routes...`);

  const server = await startServer();
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });

  let success = 0;
  let errors = 0;

  for (const route of routes) {
    try {
      const page = await browser.newPage();
      await page.goto(`http://localhost:${PORT}${route}`, { waitUntil: 'networkidle0', timeout: 15000 });
      await page.waitForSelector('#root > *', { timeout: 5000 });

      const html = await page.content();

      const outDir = route === '/' ? DIST : join(DIST, route);
      const outFile = join(outDir, 'index.html');

      if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });
      writeFileSync(outFile, `<!DOCTYPE html>${html.replace(/^<!DOCTYPE html>/i, '')}`);

      await page.close();
      success++;
      if (success % 10 === 0) console.log(`  ${success}/${routes.length} done`);
    } catch (err) {
      console.error(`  ERROR ${route}: ${err.message}`);
      errors++;
    }
  }

  await browser.close();
  server.close();

  console.log(`\nPrerender complete: ${success} OK, ${errors} errors`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
