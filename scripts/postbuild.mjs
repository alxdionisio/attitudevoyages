import { copyFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dist = join(__dirname, '..', 'dist');

const indexPath = join(dist, 'index.html');
const notFoundPath = join(dist, '404.html');

if (existsSync(indexPath)) {
  copyFileSync(indexPath, notFoundPath);
  console.log('404.html created (SPA fallback for GitHub Pages)');
} else {
  console.warn('dist/index.html not found — skipping 404.html generation');
}
