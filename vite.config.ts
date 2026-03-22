/// <reference types="vitest" />
/// <reference types="vite/client" />  // optional but good for Vite client types

import { defineConfig } from 'vitest/config';  // ← IMPORTANT: import from 'vitest/config'
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      manifest: {
        name: 'World Cup Quiz',
        short_name: 'WC Quiz',
        description: 'World Cup quiz',
        theme_color: '#1d4ed8',
        background_color: '#ffffff',
        display: 'standalone',
        icons: [
          { src: '/pwa-192x192.png', sizes: '192x192', type: 'image/png' },
          { src: '/pwa-512x512.png', sizes: '512x512', type: 'image/png' }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
        maximumFileSizeToCacheInBytes: 40 * 1024 * 1024
      }
    })
  ],

  // Vitest config – now recognized because we imported from 'vitest/config'
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './vitest.setup.ts',  // create this file if you need global mocks/setup
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
    },
  },
});