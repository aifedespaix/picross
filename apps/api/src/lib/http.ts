import type { Context, MiddlewareHandler } from 'hono';
import type { ZodType } from 'zod';
import type { ApiErrorBody } from '@picross/shared';
import type { Env } from '../env.ts';
import type { Db } from '../db/index.ts';
import type { UserRow } from '../db/schema.ts';

export interface Deps {
  db: Db;
  env: Env;
}

export type AppEnv = { Variables: { user: UserRow | null } };
export type AppContext = Context<AppEnv>;

export class HttpError extends Error {
  constructor(
    readonly status: 400 | 401 | 403 | 404 | 409 | 413 | 415 | 429 | 500,
    message: string,
    readonly fields?: Record<string, string>,
  ) {
    super(message);
  }
}

export function errorBody(error: string, fields?: Record<string, string>): ApiErrorBody {
  return fields ? { error, fields } : { error };
}

/** Valide le corps JSON avec un schéma zod ; renvoie les erreurs champ par champ. */
export function jsonBody<T>(schema: ZodType<T>) {
  return async (c: AppContext): Promise<T> => {
    let payload: unknown;
    try {
      payload = await c.req.json();
    } catch {
      throw new HttpError(400, 'invalid_json');
    }
    const result = schema.safeParse(payload);
    if (!result.success) {
      const fields: Record<string, string> = {};
      for (const issue of result.error.issues) {
        const key = issue.path.join('.') || '_';
        fields[key] ??= issue.message;
      }
      throw new HttpError(400, 'validation', fields);
    }
    return result.data;
  };
}

/** Refuse tout corps de requête qui n'est pas du JSON (défense CSRF supplémentaire). */
export const requireJson: MiddlewareHandler = async (c, next) => {
  const method = c.req.method;
  if (method !== 'GET' && method !== 'HEAD' && method !== 'OPTIONS') {
    const hasBody = c.req.header('content-length') !== '0' && c.req.raw.body !== null;
    if (hasBody && !c.req.header('content-type')?.toLowerCase().startsWith('application/json')) {
      throw new HttpError(415, 'unsupported_media_type');
    }
  }
  await next();
};

export function requireUser(c: AppContext) {
  const user = c.get('user');
  if (!user) throw new HttpError(401, 'unauthenticated');
  return user;
}

export function requireAdmin(c: AppContext) {
  const user = requireUser(c);
  if (user.role !== 'admin') throw new HttpError(403, 'forbidden');
  return user;
}
