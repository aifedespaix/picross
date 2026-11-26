/**
 * Convertit les migrations SQL de `drizzle/` en module TypeScript (`src/db/migrations.generated.ts`).
 * Les migrations voyagent ainsi DANS le bundle : plus de dossier à copier à côté du code, ce qui est
 * indispensable sur Vercel (fonctions sans système de fichiers maîtrisé). Lancé par `pnpm db:generate`.
 */
import { writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { readMigrationFiles } from 'drizzle-orm/migrator';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const migrations = readMigrationFiles({ migrationsFolder: resolve(root, 'drizzle') });

const out = `// Fichier généré par scripts/bundle-migrations.ts — ne pas modifier à la main.
import type { MigrationMeta } from 'drizzle-orm/migrator';

export const migrations: MigrationMeta[] = ${JSON.stringify(migrations, null, 2)};
`;
writeFileSync(resolve(root, 'src/db/migrations.generated.ts'), out);
console.log(`${migrations.length} migration(s) embarquée(s)`);
