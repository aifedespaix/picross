import { sql } from 'drizzle-orm';
import {
  index,
  integer,
  primaryKey,
  sqliteTable,
  text,
  uniqueIndex,
} from 'drizzle-orm/sqlite-core';

const id = () =>
  text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID());
const createdAt = () =>
  integer('created_at', { mode: 'timestamp_ms' })
    .notNull()
    .$defaultFn(() => new Date());

export const users = sqliteTable(
  'users',
  {
    id: id(),
    // Les emails sont normalisés en minuscules avant insertion (cf. schémas partagés).
    email: text('email').notNull().unique(),
    name: text('name').notNull(),
    passwordHash: text('password_hash').notNull(),
    role: text('role', { enum: ['user', 'admin'] })
      .notNull()
      .default('user'),
    createdAt: createdAt(),
  },
  // Pseudo unique, insensible à la casse.
  (table) => [uniqueIndex('users_name_lower_unique').on(sql`lower(${table.name})`)],
);

export const picrosses = sqliteTable(
  'picrosses',
  {
    id: id(),
    title: text('title').notNull(),
    /** Titre anglais (grilles livrées avec l'application) ; `null` : on affiche `title` partout. */
    titleEn: text('title_en'),
    /** Identifiant stable des grilles livrées avec l'application (`null` pour celles des joueurs). */
    slug: text('slug').unique(),
    difficulty: text('difficulty', { enum: ['easy', 'medium', 'hard', 'expert'] })
      .notNull()
      .default('medium'),
    /** Solution : JSON `number[][]` (0 / 1). */
    map: text('map').notNull(),
    width: integer('width').notNull(),
    height: integer('height').notNull(),
    validated: integer('validated', { mode: 'boolean' }).notNull().default(false),
    /** `null` pour les grilles livrées avec l'application. */
    authorId: text('author_id').references(() => users.id, { onDelete: 'set null' }),
    createdAt: createdAt(),
  },
  (table) => [
    index('picrosses_author_idx').on(table.authorId),
    index('picrosses_validated_idx').on(table.validated, table.createdAt),
  ],
);

export const likes = sqliteTable(
  'likes',
  {
    userId: text('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    picrossId: text('picross_id')
      .notNull()
      .references(() => picrosses.id, { onDelete: 'cascade' }),
    createdAt: createdAt(),
  },
  // Clé composite : un utilisateur ne peut liker une grille qu'une seule fois.
  (table) => [primaryKey({ columns: [table.userId, table.picrossId] })],
);

/** Petites valeurs persistantes (version du jeu de grilles livré, etc.). */
export const meta = sqliteTable('meta', {
  key: text('key').primaryKey(),
  value: text('value').notNull(),
});

export type UserRow = typeof users.$inferSelect;
export type PicrossRow = typeof picrosses.$inferSelect;
