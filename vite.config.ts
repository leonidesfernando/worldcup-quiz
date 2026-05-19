/*
/// <reference types="vitest" />
/// <reference types="vite/client" />  // optional but good for Vite client types

import { defineConfig } from 'vitest/config';  // ← IMPORTANT: import from 'vitest/config'
import react from '@vitejs/plugin-react';
//import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react()
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
});*/

// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react(),
  ],

  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
        },
      },
    },
  },

  publicDir: 'public',
});