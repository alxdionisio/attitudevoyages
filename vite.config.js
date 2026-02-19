import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Pour GitHub Pages (site projet) : base = /nom-du-repo/
  base: process.env.BASE_PATH || '/',
})
