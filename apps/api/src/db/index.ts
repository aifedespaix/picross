import { existsSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import { migrate } from 'drizzle-orm/better-sqlite3/migrator';
import * as schema from './schema.ts';

export type Db = ReturnType<typeof createDb>['db'];

/** Dossier des migrations SQL générées par drizzle-kit (copié à côté du bundle en prod). */
function migrationsFolder(): string {
  const here = dirname(fileURLToPath(import.meta.url));
  // src/db -> ../../drizzle ; dist -> ../drizzle
  const candidates = [resolve(here, '../../drizzle'), resolve(here, '../drizzle')];
  const found = candidates.find((dir) => existsSync(resolve(dir, 'meta/_journal.json')));
  if (!found) throw new Error('Dossier de migrations introuvable (pnpm db:generate ?)');
  return found;
}

export function createDb(path: string) {
  if (path !== ':memory:') mkdirSync(dirname(resolve(path)), { recursive: true });
  const sqlite = new Database(path);
  sqlite.pragma('journal_mode = WAL');
  sqlite.pragma('foreign_keys = ON');
  sqlite.pragma('busy_timeout = 5000');
  const db = drizzle(sqlite, { schema });
  migrate(db, { migrationsFolder: migrationsFolder() });
  return { db, sqlite };
}

export { schema };
