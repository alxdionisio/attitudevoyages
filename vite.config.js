import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const base = typeof process.env.VITE_BASENAME === 'string' && process.env.VITE_BASENAME
  ? process.env.VITE_BASENAME.replace(/\/$/, '') + '/'
  : '/'

export default defineConfig({
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
})
