import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const base = typeof process.env.VITE_BASENAME === 'string' && process.env.VITE_BASENAME
  ? process.env.VITE_BASENAME.replace(/\/$/, '') + '/'
  : '/'

export default defineConfig({
  plugins: [react()],
  base,
})
