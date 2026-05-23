// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const buildTimestamp = Date.now();

export default defineConfig({
  plugins: [
    react(),
  ],

  define: {
    // Makes BUILD_VERSION available as a global constant in your app code
    __BUILD_VERSION__: JSON.stringify(buildTimestamp.toString()),

  },

  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        entryFileNames: `assets/[name]-[hash]-${buildTimestamp}.js`,
        chunkFileNames: `assets/[name]-[hash]-${buildTimestamp}.js`,
        assetFileNames: `assets/[name]-[hash]-${buildTimestamp}.[ext]`,
        manualChunks: {
          vendor: ['react', 'react-dom'],
        },
      },
    },
  },

  publicDir: 'public',
});