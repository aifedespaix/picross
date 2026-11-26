import { eq, sql } from 'drizzle-orm';
import { Hono } from 'hono';
import { loginSchema, registerSchema, type UserDto } from '@picross/shared';
import { users, type UserRow } from '../db/schema.ts';
import { HttpError, jsonBody, requireUser, type AppEnv, type Deps } from '../lib/http.ts';
import { dummyVerify, hashPassword, verifyPassword } from '../lib/password.ts';
import { clientIp, rateLimit } from '../lib/rate-limit.ts';
import { endSession, startSession } from '../lib/session.ts';

export function toUserDto(user: UserRow): UserDto {
  return { id: user.id, name: user.name, email: user.email, role: user.role };
}

export function authRoutes(deps: Deps) {
  const { db, env } = deps;
  const app = new Hono<AppEnv>();
  const byIp = (c: Parameters<typeof clientIp>[0]) => clientIp(c, env.trustProxy);

  const loginLimit = rateLimit({ windowMs: 15 * 60_000, max: 10, key: byIp });
  const registerLimit = rateLimit({ windowMs: 60 * 60_000, max: 10, key: byIp });

  /** Les emails listés dans ADMIN_EMAILS deviennent administrateurs (remplace l'ancien mot de passe en dur). */
  function promoteIfAdmin(user: UserRow): UserRow {
    if (user.role !== 'admin' && env.adminEmails.has(user.email)) {
      db.update(users).set({ role: 'admin' }).where(eq(users.id, user.id)).run();
      return { ...user, role: 'admin' };
    }
    return user;
  }

  app.post('/register', registerLimit, async (c) => {
    const input = await jsonBody(registerSchema)(c);

    const taken = db
      .select({ email: users.email, name: users.name })
      .from(users)
      .where(sql`${users.email} = ${input.email} or lower(${users.name}) = lower(${input.name})`)
      .get();
    if (taken) {
      throw new HttpError(
        409,
        'conflict',
        taken.email === input.email ? { email: 'email_taken' } : { name: 'name_taken' },
      );
    }

    const passwordHash = await hashPassword(input.password);
    let user: UserRow;
    try {
      user = db
        .insert(users)
        .values({ email: input.email, name: input.name, passwordHash })
        .returning()
        .get();
    } catch {
      // Course entre deux inscriptions simultanées : l'index unique a tranché.
      throw new HttpError(409, 'conflict', { email: 'email_taken' });
    }
    user = promoteIfAdmin(user);
    await startSession(c, deps, user.id);
    return c.json(toUserDto(user), 201);
  });

  app.post('/login', loginLimit, async (c) => {
    const input = await jsonBody(loginSchema)(c);
    const user = db.select().from(users).where(eq(users.email, input.email)).get();
    // Même message et même coût que l'email soit inconnu ou le mot de passe faux (anti-énumération).
    const valid = user
      ? await verifyPassword(input.password, user.passwordHash)
      : await dummyVerify(input.password);
    if (!user || !valid) throw new HttpError(401, 'invalid_credentials');

    const current = promoteIfAdmin(user);
    await startSession(c, deps, current.id);
    return c.json(toUserDto(current));
  });

  app.post('/logout', (c) => {
    endSession(c, deps);
    return c.body(null, 204);
  });

  app.get('/me', (c) => c.json(toUserDto(requireUser(c))));

  return app;
}
