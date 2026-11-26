import { and, asc, desc, eq, ne, sql, type SQL } from 'drizzle-orm';
import { Hono } from 'hono';
import { z } from 'zod';
import {
  createPicrossSchema,
  DIFFICULTIES,
  fromBits,
  likeSchema,
  rateDifficulty,
  validateSchema,
  type PicrossDetail,
  type PicrossSummary,
} from '@picross/shared';
import { likes, picrosses, users } from '../db/schema.ts';
import {
  HttpError,
  jsonBody,
  requireAdmin,
  requireUser,
  type AppContext,
  type AppEnv,
  type Deps,
} from '../lib/http.ts';
import { rateLimit } from '../lib/rate-limit.ts';

const idSchema = z.uuid();

const langSchema = z.enum(['fr', 'en']).catch('fr');
type Lang = z.infer<typeof langSchema>;

const listQuery = z.object({
  /** Langue des titres (les grilles livrées ont un titre français et anglais). */
  lang: langSchema,
  difficulty: z.enum(DIFFICULTIES).optional(),
  search: z.string().trim().max(60).optional(),
  sort: z.enum(['recent', 'popular', 'difficulty']).default('recent'),
  /** `pending` et `all` sont réservés aux administrateurs. */
  status: z.enum(['validated', 'pending', 'all']).default('validated'),
  limit: z.coerce.number().int().min(1).max(50).default(24),
  offset: z.coerce.number().int().min(0).default(0),
});

export function picrossRoutes({ db, env }: Deps) {
  const app = new Hono<AppEnv>();

  const likeCount = sql<number>`(select count(*) from ${likes} where ${likes.picrossId} = ${picrosses.id})`;
  const likedBy = (userId: string | undefined) =>
    userId
      ? sql<number>`exists(select 1 from ${likes} where ${likes.picrossId} = ${picrosses.id} and ${likes.userId} = ${userId})`
      : sql<number>`0`;

  const columns = (userId: string | undefined) => ({
    id: picrosses.id,
    title: picrosses.title,
    titleEn: picrosses.titleEn,
    difficulty: picrosses.difficulty,
    map: picrosses.map,
    width: picrosses.width,
    height: picrosses.height,
    validated: picrosses.validated,
    createdAt: picrosses.createdAt,
    authorId: picrosses.authorId,
    author: users.name,
    likes: likeCount,
    liked: likedBy(userId),
  });

  const base = (userId: string | undefined) =>
    db.select(columns(userId)).from(picrosses).leftJoin(users, eq(picrosses.authorId, users.id));

  type Row = Awaited<ReturnType<ReturnType<typeof base>['all']>>[number];

  const toSummary = (row: Row, lang: Lang): PicrossSummary => ({
    id: row.id,
    title: lang === 'en' && row.titleEn ? row.titleEn : row.title,
    difficulty: row.difficulty,
    width: row.width,
    height: row.height,
    validated: row.validated,
    author: row.author,
    likes: Number(row.likes),
    likedByMe: Boolean(row.liked),
    createdAt: row.createdAt.toISOString(),
  });

  const toDetail = (row: Row, lang: Lang): PicrossDetail => ({
    ...toSummary(row, lang),
    map: JSON.parse(row.map) as PicrossDetail['map'],
  });

  /** Une grille non validée n'est visible que par son auteur et les administrateurs. */
  const canSee = (c: AppContext, row: Row) => {
    const user = c.get('user');
    return row.validated || (user && (user.role === 'admin' || user.id === row.authorId));
  };

  const getOr404 = async (c: AppContext, id: string) => {
    const parsed = idSchema.safeParse(id);
    const row = parsed.success
      ? await base(c.get('user')?.id).where(eq(picrosses.id, id)).get()
      : undefined;
    if (!row || !canSee(c, row)) throw new HttpError(404, 'not_found');
    return row;
  };

  const difficultyRank = sql`case ${picrosses.difficulty} when 'easy' then 0 when 'medium' then 1 when 'hard' then 2 else 3 end`;
  const order = (sort: 'recent' | 'popular' | 'difficulty') =>
    sort === 'popular'
      ? [desc(likeCount), desc(picrosses.createdAt)]
      : sort === 'difficulty'
        ? [
            asc(difficultyRank),
            asc(sql`${picrosses.width} * ${picrosses.height}`),
            asc(picrosses.title),
          ]
        : [desc(picrosses.createdAt)];

  const langOf = (c: AppContext): Lang => langSchema.parse(c.req.query('lang'));

  const createLimit = rateLimit({
    windowMs: 60 * 60_000,
    max: 20,
    key: (c) => c.get('user')?.id ?? 'anonymous',
  });

  app.get('/', async (c) => {
    const query = listQuery.parse(c.req.query());
    const user = c.get('user');
    if (query.status !== 'validated') requireAdmin(c);

    const conditions: SQL[] = [];
    if (query.status === 'validated') conditions.push(eq(picrosses.validated, true));
    if (query.status === 'pending') conditions.push(eq(picrosses.validated, false));
    if (query.difficulty) conditions.push(eq(picrosses.difficulty, query.difficulty));
    if (query.search) {
      const escaped = query.search.replace(/[\\%_]/g, '\\$&');
      const pattern = `%${escaped}%`;
      // On cherche dans les deux langues, quelle que soit celle de l'interface.
      conditions.push(
        sql`(${picrosses.title} like ${pattern} escape '\\' or ${picrosses.titleEn} like ${pattern} escape '\\')`,
      );
    }
    const where = conditions.length ? and(...conditions) : undefined;

    const total =
      (
        await db
          .select({ n: sql<number>`count(*)` })
          .from(picrosses)
          .where(where)
          .get()
      )?.n ?? 0;
    const rows = await base(user?.id)
      .where(where)
      .orderBy(...order(query.sort))
      .limit(query.limit)
      .offset(query.offset)
      .all();

    return c.json({ items: rows.map((row) => toSummary(row, query.lang)), total });
  });

  app.get('/mine', async (c) => {
    const user = requireUser(c);
    const rows = await base(user.id)
      .where(eq(picrosses.authorId, user.id))
      .orderBy(desc(picrosses.createdAt))
      .all();
    return c.json({ items: rows.map((row) => toSummary(row, langOf(c))), total: rows.length });
  });

  app.get('/random', async (c) => {
    const exclude = idSchema.safeParse(c.req.query('exclude'));
    const row = await base(c.get('user')?.id)
      .where(
        and(
          eq(picrosses.validated, true),
          exclude.success ? ne(picrosses.id, exclude.data) : undefined,
        ),
      )
      .orderBy(sql`random()`)
      .limit(1)
      .get();
    // S'il n'y a qu'une seule grille, on la rejoue plutôt que de renvoyer une erreur.
    const fallback =
      row ?? (await base(c.get('user')?.id).where(eq(picrosses.validated, true)).limit(1).get());
    if (!fallback) throw new HttpError(404, 'not_found');
    return c.json(toDetail(fallback, langOf(c)));
  });

  app.get('/:id', async (c) => c.json(toDetail(await getOr404(c, c.req.param('id')), langOf(c))));

  app.post('/', createLimit, async (c) => {
    const user = requireUser(c);
    const input = await jsonBody(createPicrossSchema)(c);
    const created = await db
      .insert(picrosses)
      .values({
        title: input.title,
        map: JSON.stringify(input.map),
        width: input.map[0]!.length,
        height: input.map.length,
        authorId: user.id,
        difficulty: rateDifficulty(fromBits(input.map)).level,
        validated: env.autoValidate || user.role === 'admin',
      })
      .returning({ id: picrosses.id })
      .get();
    return c.json(toSummary(await getOr404(c, created.id), langOf(c)), 201);
  });

  app.delete('/:id', async (c) => {
    const user = requireUser(c);
    const row = await getOr404(c, c.req.param('id'));
    if (user.role !== 'admin' && row.authorId !== user.id) throw new HttpError(403, 'forbidden');
    await db.delete(picrosses).where(eq(picrosses.id, row.id)).run();
    return c.body(null, 204);
  });

  app.put('/:id/like', async (c) => {
    const user = requireUser(c);
    const row = await getOr404(c, c.req.param('id'));
    const { liked } = await jsonBody(likeSchema)(c);
    if (liked) {
      await db
        .insert(likes)
        .values({ userId: user.id, picrossId: row.id })
        .onConflictDoNothing()
        .run();
    } else {
      await db
        .delete(likes)
        .where(and(eq(likes.userId, user.id), eq(likes.picrossId, row.id)))
        .run();
    }
    return c.json(toSummary(await getOr404(c, row.id), langOf(c)));
  });

  app.put('/:id/validation', async (c) => {
    requireAdmin(c);
    const row = await getOr404(c, c.req.param('id'));
    const { validated } = await jsonBody(validateSchema)(c);
    await db.update(picrosses).set({ validated }).where(eq(picrosses.id, row.id)).run();
    return c.json(toSummary(await getOr404(c, row.id), langOf(c)));
  });

  return app;
}
