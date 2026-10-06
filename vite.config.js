import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

const base = typeof process.env.VITE_BASENAME === 'string' && process.env.VITE_BASENAME
  ? process.env.VITE_BASENAME.replace(/\/$/, '') + '/'
  : '/'

export default defineConfig(({ command, mode }) => {
  // Sans VITE_SITE_URL, canonical / og:url / JSON-LD retombent sur l'origine
  // du prérendu (http://localhost:4173) : on refuse de builder.
  const siteUrl = process.env.VITE_SITE_URL || loadEnv(mode, process.cwd(), 'VITE_').VITE_SITE_URL
  if (command === 'build' && !/^https:\/\//.test(siteUrl || '')) {
    throw new Error('VITE_SITE_URL manquant ou non https (ex. VITE_SITE_URL=https://attitude-voyages.fr)')
  }

  return {
  plugins: [react()],
  base,
  build: {
    target: 'es2020',
    cssCodeSplit: true,
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (!id.includes('node_modules')) return
          if (id.includes('react-router')) return 'vendor-router'
          if (id.includes('framer-motion')) return 'vendor-motion'
          if (id.includes('react-calendly')) return 'vendor-calendly'
          if (id.includes('react') || id.includes('scheduler')) return 'vendor-react'
          return 'vendor'
        },
      },
    },
  },
  }
})
