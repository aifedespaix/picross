import { fileURLToPath } from 'node:url';
import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vitest/config';

// Tests unitaires du domaine, des composables et des composants « purs » (sans runtime Nuxt).
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./app', import.meta.url)),
      '~~': fileURLToPath(new URL('./', import.meta.url)),
    },
  },
  test: { environment: 'happy-dom', include: ['app/**/*.test.ts'] },
});
