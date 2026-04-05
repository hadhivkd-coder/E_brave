import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: false,      // Never expose source code in production
    minify: 'esbuild',
    target: 'es2015',
  }
})
