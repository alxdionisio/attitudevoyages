import puppeteer from 'puppeteer';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

async function main() {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 630 });
  await page.goto(`file://${join(__dirname, 'generate-og-image.html')}`, { waitUntil: 'load' });
  await page.screenshot({
    path: join(__dirname, '..', 'public', 'og-image.jpg'),
    type: 'jpeg',
    quality: 90,
  });
  await browser.close();
  console.log('og-image.jpg generated in public/');
}

main().catch(console.error);
