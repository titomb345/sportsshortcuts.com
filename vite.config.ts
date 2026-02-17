import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'prompt',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,json}'],
        clientsClaim: true,
        navigateFallbackDenylist: [/^\/sitemap\.xml$/, /^\/robots\.txt$/],
      },
      manifest: false, // Use existing manifest.json in public/
    }),
  ],
  server: {
    port: 5174,
  },
})
