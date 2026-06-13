import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// The frontend NEVER talks to Anthropic directly — it calls /api/* which the
// dev server proxies to the Express backend (the only place the key lives).
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:8787',
        changeOrigin: true,
      },
    },
  },
  build: {
    // Lazy-load three.js so it never blocks first paint.
    rollupOptions: {
      output: {
        manualChunks: {
          three: ['three'],
          gsap: ['gsap'],
        },
      },
    },
  },
})
