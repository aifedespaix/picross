import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { sql } from 'drizzle-orm';
import { readMigrationFiles } from 'drizzle-orm/migrator';
import { describe, expect, it } from 'vitest';
import { createDb, migrateDb } from './index.ts';
import { migrations } from './migrations.generated.ts';

describe('migrations', () => {
  it('le module embarqué est à jour avec le dossier drizzle/ (pnpm db:generate)', () => {
    const folder = resolve(dirname(fileURLToPath(import.meta.url)), '../../drizzle');
    expect(migrations).toEqual(readMigrationFiles({ migrationsFolder: folder }));
  });

  it('s’appliquent sur une base vide, et deux fois de suite sans erreur', async () => {
    const { db, close } = await createDb({ url: ':memory:' });
    await migrateDb(db);
    await migrateDb(db);
    const tables = await db.all<{ name: string }>(
      sql`select name from sqlite_master where type = 'table' and name in ('users', 'picrosses', 'likes', 'meta')`,
    );
    expect(tables.map((t) => t.name).sort()).toEqual(['likes', 'meta', 'picrosses', 'users']);
    close();
  });
});
