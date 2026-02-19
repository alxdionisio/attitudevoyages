import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Base relative pour que les assets chargent correctement sur GitHub Pages
  base: './',
})
