import { beforeEach, describe, expect, it } from 'vitest';
import { starterBits, STARTER_PUZZLES } from '@picross/shared';
import { createApp } from './app.ts';
import { createDb } from './db/index.ts';
import { loadEnv } from './env.ts';
import { seedStarterPuzzles } from './seed.ts';

const MAP = starterBits(STARTER_PUZZLES.find((p) => p.slug === 'bon-chien')!.rows); // 11 × 11

function setup(overrides: Record<string, string> = {}) {
  const env = loadEnv({ NODE_ENV: 'test', JWT_SECRET: 'x'.repeat(40), ...overrides });
  const { db } = createDb(':memory:');
  const app = createApp({ db, env });

  /** Petit client HTTP qui conserve le cookie de session. */
  function client() {
    let cookie = '';
    return async (method: string, path: string, body?: unknown) => {
      const res = await app.request(`/api${path}`, {
        method,
        headers: {
          ...(body === undefined ? {} : { 'content-type': 'application/json' }),
          ...(cookie ? { cookie } : {}),
        },
        body: body === undefined ? undefined : JSON.stringify(body),
      });
      const set = res.headers.get('set-cookie');
      if (set)
        cookie =
          set.startsWith('picross_session=;') || /Max-Age=0/i.test(set) ? '' : set.split(';')[0]!;
      const text = await res.text();
      return { status: res.status, headers: res.headers, json: text ? JSON.parse(text) : null };
    };
  }
  return { app, db, env, client };
}

const user = (n = 1) => ({
  name: `joueur${n}`,
  email: `joueur${n}@example.com`,
  password: 'correct horse',
});

describe('auth', () => {
  let ctx: ReturnType<typeof setup>;
  beforeEach(() => {
    ctx = setup();
  });

  it('inscrit, connecte et déconnecte', async () => {
    const http = ctx.client();
    const registered = await http('POST', '/auth/register', user());
    expect(registered.status).toBe(201);
    expect(registered.json).toMatchObject({ name: 'joueur1', role: 'user' });
    expect(registered.json).not.toHaveProperty('password');
    expect(registered.headers.get('set-cookie')).toMatch(/HttpOnly/i);
    expect(registered.headers.get('set-cookie')).toMatch(/SameSite=Lax/i);

    expect((await http('GET', '/auth/me')).json.email).toBe('joueur1@example.com');

    await http('POST', '/auth/logout');
    expect((await http('GET', '/auth/me')).json).toBeNull();

    const login = await http('POST', '/auth/login', {
      email: 'JOUEUR1@example.com',
      password: 'correct horse',
    });
    expect(login.status).toBe(200);
  });

  it('refuse les doublons (email et pseudo, sans tenir compte de la casse)', async () => {
    const http = ctx.client();
    await http('POST', '/auth/register', user());
    const sameEmail = await http('POST', '/auth/register', { ...user(), name: 'autre' });
    expect(sameEmail.status).toBe(409);
    expect(sameEmail.json.fields.email).toBe('email_taken');
    const sameName = await http('POST', '/auth/register', { ...user(2), name: 'JOUEUR1' });
    expect(sameName.status).toBe(409);
    expect(sameName.json.fields.name).toBe('name_taken');
  });

  it('valide les champs', async () => {
    const res = await ctx.client()('POST', '/auth/register', {
      name: 'a',
      email: 'nope',
      password: 'court',
    });
    expect(res.status).toBe(400);
    expect(Object.keys(res.json.fields).sort()).toEqual(['email', 'name', 'password']);
  });

  it('ne distingue pas email inconnu et mauvais mot de passe', async () => {
    const http = ctx.client();
    await http('POST', '/auth/register', user());
    await http('POST', '/auth/logout');
    const wrongPassword = await http('POST', '/auth/login', {
      email: user().email,
      password: 'faux faux faux',
    });
    const unknown = await http('POST', '/auth/login', {
      email: 'inconnu@example.com',
      password: 'faux faux faux',
    });
    expect(wrongPassword.status).toBe(401);
    expect(unknown.status).toBe(401);
    expect(unknown.json).toEqual(wrongPassword.json);
  });

  it('limite les tentatives de connexion', async () => {
    const http = ctx.client();
    let last = 0;
    for (let i = 0; i < 12; i++) {
      last = (await http('POST', '/auth/login', { email: 'x@example.com', password: 'whatever' }))
        .status;
    }
    expect(last).toBe(429);
  });

  it('promeut les emails listés dans ADMIN_EMAILS', async () => {
    const admin = setup({ ADMIN_EMAILS: 'joueur1@example.com' });
    const res = await admin.client()('POST', '/auth/register', user());
    expect(res.json.role).toBe('admin');
  });

  it('refuse un corps qui n’est pas du JSON', async () => {
    const res = await ctx.app.request('/api/auth/login', {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      body: 'email=a&password=b',
    });
    expect(res.status).toBe(415);
  });

  it('ignore un cookie de session forgé', async () => {
    const forged = { cookie: 'picross_session=abc.def.ghi', 'content-type': 'application/json' };
    const me = await ctx.app.request('/api/auth/me', { headers: forged });
    expect(await me.json()).toBeNull();
    const create = await ctx.app.request('/api/picrosses', {
      method: 'POST',
      headers: forged,
      body: JSON.stringify({ title: 'Ma grille', map: MAP }),
    });
    expect(create.status).toBe(401);
  });
});

describe('picrosses', () => {
  let ctx: ReturnType<typeof setup>;
  beforeEach(() => {
    ctx = setup();
  });

  it('sert les grilles de départ et une grille aléatoire', async () => {
    seedStarterPuzzles(ctx.db);
    const http = ctx.client();
    const list = await http('GET', '/picrosses');
    expect(list.json.total).toBe(STARTER_PUZZLES.length);
    const random = await http('GET', '/picrosses/random');
    expect(random.status).toBe(200);
    expect(random.json.map.length).toBeGreaterThanOrEqual(5);
    const other = await http('GET', `/picrosses/random?exclude=${random.json.id}`);
    expect(other.json.id).not.toBe(random.json.id);
  });

  it('insère les grilles livrées une seule fois, sans doublon', () => {
    expect(seedStarterPuzzles(ctx.db)).toBe(STARTER_PUZZLES.length);
    expect(seedStarterPuzzles(ctx.db)).toBe(0);
  });

  it('sert les titres dans la langue demandée', async () => {
    seedStarterPuzzles(ctx.db);
    const http = ctx.client();
    const fr = await http('GET', '/picrosses?search=Canard');
    expect(fr.json.items[0].title).toBe('Canard (débogage)');
    const en = await http('GET', '/picrosses?lang=en&search=duck');
    expect(en.json.items[0].title).toBe('Rubber duck (debugging)');
    const unknownLang = await http('GET', '/picrosses?lang=xx&limit=1');
    expect(unknownLang.status).toBe(200); // langue inconnue : repli sur le français
  });

  it('trie du plus facile au plus difficile', async () => {
    seedStarterPuzzles(ctx.db);
    const { json } = await ctx.client()('GET', '/picrosses?sort=difficulty&limit=50');
    const ranks = json.items.map((i: { difficulty: string }) =>
      ['easy', 'medium', 'hard', 'expert'].indexOf(i.difficulty),
    );
    expect(ranks).toEqual([...ranks].sort((a: number, b: number) => a - b));
    expect(json.items[0].difficulty).toBe('easy');
  });

  it('filtre par difficulté', async () => {
    seedStarterPuzzles(ctx.db);
    const http = ctx.client();
    for (const level of ['easy', 'medium', 'hard', 'expert']) {
      const res = await http('GET', `/picrosses?difficulty=${level}&limit=50`);
      expect(res.json.total).toBeGreaterThan(0);
      expect(res.json.items.every((i: { difficulty: string }) => i.difficulty === level)).toBe(
        true,
      );
    }
    expect((await http('GET', '/picrosses?difficulty=impossible')).status).toBe(400);
  });

  it('404 quand il n’y a aucune grille ou un id invalide', async () => {
    const http = ctx.client();
    expect((await http('GET', '/picrosses/random')).status).toBe(404);
    expect((await http('GET', '/picrosses/pas-un-uuid')).status).toBe(404);
  });

  it('crée une grille en attente de validation, visible seulement de son auteur', async () => {
    const author = ctx.client();
    await author('POST', '/auth/register', user(1));
    const created = await author('POST', '/picrosses', { title: 'Ma grille', map: MAP });
    expect(created.status).toBe(201);
    expect(created.json).toMatchObject({
      validated: false,
      author: 'joueur1',
      width: 11,
      height: 11,
      difficulty: 'hard',
    });

    const stranger = ctx.client();
    expect((await stranger('GET', `/picrosses/${created.json.id}`)).status).toBe(404);
    expect((await stranger('GET', '/picrosses')).json.total).toBe(0);
    expect((await author('GET', `/picrosses/${created.json.id}`)).status).toBe(200);
    expect((await author('GET', '/picrosses/mine')).json.total).toBe(1);
  });

  it('exige d’être connecté pour créer', async () => {
    expect(
      (await ctx.client()('POST', '/picrosses', { title: 'Ma grille', map: MAP })).status,
    ).toBe(401);
  });

  it('refuse les grilles invalides', async () => {
    const http = ctx.client();
    await http('POST', '/auth/register', user());
    const tooSmall = await http('POST', '/picrosses', {
      title: 'ok ok',
      map: [
        [1, 1],
        [1, 1],
      ],
    });
    const notBits = await http('POST', '/picrosses', {
      title: 'ok ok',
      map: [
        [2, 1, 1],
        [1, 1, 1],
        [1, 1, 1],
      ],
    });
    const empty = await http('POST', '/picrosses', {
      title: 'ok ok',
      map: Array.from({ length: 5 }, () => Array(5).fill(0)),
    });
    expect([tooSmall.status, notBits.status, empty.status]).toEqual([400, 400, 400]);
  });

  it('un admin valide une grille qui devient publique', async () => {
    const admin = setup({ ADMIN_EMAILS: 'admin@example.com' });
    const author = admin.client();
    const mod = admin.client();
    await author('POST', '/auth/register', user(1));
    await mod('POST', '/auth/register', {
      name: 'chef',
      email: 'admin@example.com',
      password: 'correct horse',
    });
    const { json: grid } = await author('POST', '/picrosses', { title: 'À valider', map: MAP });

    expect(
      (await author('PUT', `/picrosses/${grid.id}/validation`, { validated: true })).status,
    ).toBe(403);
    expect((await mod('GET', '/picrosses?status=pending')).json.total).toBe(1);
    expect((await author('GET', '/picrosses?status=pending')).status).toBe(403);

    const ok = await mod('PUT', `/picrosses/${grid.id}/validation`, { validated: true });
    expect(ok.json.validated).toBe(true);
    expect((await admin.client()('GET', '/picrosses')).json.total).toBe(1);
  });

  it('un like par utilisateur, annulable', async () => {
    seedStarterPuzzles(ctx.db);
    const http = ctx.client();
    const [first] = (await http('GET', '/picrosses')).json.items;
    expect((await http('PUT', `/picrosses/${first.id}/like`, { liked: true })).status).toBe(401);

    await http('POST', '/auth/register', user());
    const once = await http('PUT', `/picrosses/${first.id}/like`, { liked: true });
    const twice = await http('PUT', `/picrosses/${first.id}/like`, { liked: true });
    expect(once.json).toMatchObject({ likes: 1, likedByMe: true });
    expect(twice.json.likes).toBe(1);
    const undone = await http('PUT', `/picrosses/${first.id}/like`, { liked: false });
    expect(undone.json).toMatchObject({ likes: 0, likedByMe: false });
  });

  it('seul l’auteur (ou un admin) supprime une grille', async () => {
    const author = ctx.client();
    const other = ctx.client();
    await author('POST', '/auth/register', user(1));
    await other('POST', '/auth/register', user(2));
    const { json: grid } = await author('POST', '/picrosses', { title: 'Ma grille', map: MAP });
    expect((await other('DELETE', `/picrosses/${grid.id}`)).status).toBe(404); // invisible pour un tiers
    expect((await author('DELETE', `/picrosses/${grid.id}`)).status).toBe(204);
    expect((await author('GET', `/picrosses/${grid.id}`)).status).toBe(404);
  });

  it('recherche par titre sans interpréter % et _', async () => {
    const auto = setup({ AUTO_VALIDATE: 'true' });
    const http = auto.client();
    await http('POST', '/auth/register', user());
    await http('POST', '/picrosses', { title: 'Un cœur', map: MAP });
    await http('POST', '/picrosses', { title: '100% sûr', map: MAP });
    expect((await http('GET', '/picrosses?search=c%C5%93ur')).json.total).toBe(1);
    expect((await http('GET', `/picrosses?search=${encodeURIComponent('%')}`)).json.total).toBe(1);
    expect((await http('GET', `/picrosses?search=${encodeURIComponent('_')}`)).json.total).toBe(0);
  });
});
