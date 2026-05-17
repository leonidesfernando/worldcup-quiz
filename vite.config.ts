/// <reference types="vitest" />
/// <reference types="vite/client" />  // optional but good for Vite client types

import { defineConfig } from 'vitest/config';  // ← IMPORTANT: import from 'vitest/config'
import react from '@vitejs/plugin-react';
//import { VitePWA } from 'vite-plugin-pwa';

const buildTimestamp = Date.now();

export default defineConfig({
  plugins: [
    react()
  ],

  build: {
    rollupOptions: {
      output: {
        // Unique filenames per build — WebView never serves stale cached files
        entryFileNames: `assets/[name]-[hash]-${buildTimestamp}.js`,
        chunkFileNames: `assets/[name]-[hash]-${buildTimestamp}.js`,
        assetFileNames: `assets/[name]-[hash]-${buildTimestamp}.[ext]`,
      },
    },
  },

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