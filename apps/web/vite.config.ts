import { fileURLToPath, URL } from 'node:url';
import tailwindcss from '@tailwindcss/vite';
import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [vue(), tailwindcss()],
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
  server: {
    port: 5173,
    // En dev, l'API tourne sur :3000 ; le proxy garde le même domaine que la page (cookies de session).
    proxy: {
      '/api': { target: process.env.API_URL ?? 'http://localhost:3000', changeOrigin: false },
    },
  },
  build: { target: 'es2022', sourcemap: false },
  test: {
    environment: 'happy-dom',
    include: ['src/**/*.test.ts'],
  },
});
