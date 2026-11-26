import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/server.ts'],
  format: ['esm'],
  target: 'node22',
  clean: true,
  sourcemap: true,
  // Le package partagé est du TypeScript brut : on l'embarque dans le bundle.
  noExternal: ['@picross/shared'],
});
