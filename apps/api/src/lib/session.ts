import { deleteCookie, getCookie, setCookie } from 'hono/cookie';
import { sign, verify } from 'hono/jwt';
import { eq } from 'drizzle-orm';
import type { MiddlewareHandler } from 'hono';
import { users } from '../db/schema.ts';
import type { AppContext, AppEnv, Deps } from './http.ts';

const COOKIE = 'picross_session';
const ALG = 'HS256';

export async function startSession(c: AppContext, { env }: Deps, userId: string) {
  const maxAge = env.sessionDays * 24 * 60 * 60;
  const token = await sign(
    { sub: userId, exp: Math.floor(Date.now() / 1000) + maxAge },
    env.jwtSecret,
    ALG,
  );
  setCookie(c, COOKIE, token, {
    httpOnly: true, // illisible depuis le JavaScript de la page : pas de vol de session par XSS
    sameSite: 'Lax', // pas envoyé sur les requêtes cross-site : protection CSRF
    secure: env.cookieSecure,
    path: '/',
    maxAge,
  });
}

export function endSession(c: AppContext, { env }: Deps) {
  deleteCookie(c, COOKIE, { path: '/', secure: env.cookieSecure });
}

/** Charge l'utilisateur courant (ou `null`) à chaque requête : un compte supprimé perd son accès immédiatement. */
export function sessionMiddleware({ db, env }: Deps): MiddlewareHandler<AppEnv> {
  return async (c, next) => {
    c.set('user', null);
    const token = getCookie(c, COOKIE);
    if (token) {
      try {
        const payload = await verify(token, env.jwtSecret, ALG);
        if (typeof payload.sub === 'string') {
          const user = await db.select().from(users).where(eq(users.id, payload.sub)).get();
          c.set('user', user ?? null);
        }
      } catch {
        // Jeton invalide ou expiré : on traite la requête comme anonyme.
      }
    }
    await next();
  };
}
