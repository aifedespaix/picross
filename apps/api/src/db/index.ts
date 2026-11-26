import { mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import type { LibSQLDatabase } from 'drizzle-orm/libsql';
import { sql } from 'drizzle-orm';
import * as schema from './schema.ts';
import { migrations } from './migrations.generated.ts';

export type Db = LibSQLDatabase<typeof schema>;

export interface DbOptions {
  /** `file:./data/picross.db`, `:memory:` (tests) ou `libsql://…` (Turso). */
  url: string;
  authToken?: string | undefined;
}

const isRemote = (url: string) => /^(libsql|https?|wss?):/i.test(url);

/**
 * Ouvre la base. Une base distante (Turso) passe par le client « web » (HTTP/WebSocket, aucun module
 * natif : parfait pour les fonctions Vercel) ; une base locale (fichier, mémoire) par le client Node.
 */
export async function createDb({
  url,
  authToken,
}: DbOptions): Promise<{ db: Db; close: () => void }> {
  if (isRemote(url)) {
    const { createClient } = await import('@libsql/client/web');
    const { drizzle } = await import('drizzle-orm/libsql/web');
    const client = createClient({ url, authToken });
    return { db: drizzle(client, { schema }), close: () => client.close() };
  }

  if (url.startsWith('file:'))
    mkdirSync(dirname(resolve(url.slice('file:'.length))), { recursive: true });
  const { createClient } = await import('@libsql/client');
  const { drizzle } = await import('drizzle-orm/libsql');
  const client = createClient({ url });
  const db = drizzle(client, { schema });
  await db.run(sql`PRAGMA foreign_keys = ON`);
  if (url.startsWith('file:')) await db.run(sql`PRAGMA journal_mode = WAL`);
  return { db, close: () => client.close() };
}

/** Applique les migrations pas encore passées (même table de suivi que drizzle : `__drizzle_migrations`). */
export async function migrateDb(db: Db): Promise<void> {
  await db.run(sql`
    CREATE TABLE IF NOT EXISTS "__drizzle_migrations" (
      id SERIAL PRIMARY KEY,
      hash text NOT NULL,
      created_at numeric
    )
  `);
  const last = (
    await db.values(
      sql`SELECT created_at FROM "__drizzle_migrations" ORDER BY created_at DESC LIMIT 1`,
    )
  )[0];
  const lastApplied = last ? Number(last[0]) : -1;

  const statements = [];
  for (const migration of migrations) {
    if (migration.folderMillis <= lastApplied) continue;
    for (const statement of migration.sql) statements.push(db.run(sql.raw(statement)));
    statements.push(
      db.run(
        sql`INSERT INTO "__drizzle_migrations" ("hash", "created_at") VALUES (${migration.hash}, ${migration.folderMillis})`,
      ),
    );
  }
  if (statements.length)
    await db.batch(statements as [(typeof statements)[number], ...typeof statements]);
}

export { schema };
