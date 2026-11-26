import { getConnInfo } from '@hono/node-server/conninfo';
import type { MiddlewareHandler } from 'hono';
import { HttpError, type AppContext } from './http.ts';

interface Bucket {
  count: number;
  resetAt: number;
}

/**
 * Limiteur en mémoire (fenêtre fixe). Suffisant pour une instance unique ;
 * à remplacer par un store partagé si l'API est un jour répliquée.
 */
export function rateLimit(options: {
  windowMs: number;
  max: number;
  key: (c: AppContext) => string;
}): MiddlewareHandler {
  const buckets = new Map<string, Bucket>();
  const sweep = setInterval(() => {
    const now = Date.now();
    for (const [key, bucket] of buckets) if (bucket.resetAt <= now) buckets.delete(key);
  }, options.windowMs);
  sweep.unref();

  return async (c, next) => {
    const now = Date.now();
    const key = options.key(c as AppContext);
    let bucket = buckets.get(key);
    if (!bucket || bucket.resetAt <= now) {
      bucket = { count: 0, resetAt: now + options.windowMs };
      buckets.set(key, bucket);
    }
    bucket.count++;
    if (bucket.count > options.max) {
      c.header('Retry-After', String(Math.ceil((bucket.resetAt - now) / 1000)));
      throw new HttpError(429, 'too_many_requests');
    }
    await next();
  };
}

export function clientIp(c: AppContext, trustProxy: boolean): string {
  if (trustProxy) {
    const forwarded = c.req.header('x-forwarded-for')?.split(',')[0]?.trim();
    if (forwarded) return forwarded;
  }
  try {
    return getConnInfo(c).remote.address ?? 'unknown';
  } catch {
    return 'unknown';
  }
}
