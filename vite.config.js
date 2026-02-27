import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Même base que le routeur (ex. /attitude-voyages sur GitHub Pages). Évite la page blanche au refresh sur /offre/:slug :
// avec base: './', les scripts étaient résolus en /offre/assets/... au lieu de /assets/... ou /basename/assets/...
const base = typeof process.env.VITE_BASENAME === 'string' && process.env.VITE_BASENAME
  ? process.env.VITE_BASENAME.replace(/\/$/, '') + '/'
  : '/'

export default defineConfig({
  plugins: [react()],
  base,
})
