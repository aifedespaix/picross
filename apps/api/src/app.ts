import { Hono } from 'hono';
import { bodyLimit } from 'hono/body-limit';
import { cors } from 'hono/cors';
import { secureHeaders } from 'hono/secure-headers';
import { ZodError } from 'zod';
import { authRoutes } from './routes/auth.ts';
import { picrossRoutes } from './routes/picrosses.ts';
import { HttpError, errorBody, requireJson, type AppEnv, type Deps } from './lib/http.ts';
import { sessionMiddleware } from './lib/session.ts';

export function createApp(deps: Deps) {
  const app = new Hono<AppEnv>().basePath('/api');

  app.use(secureHeaders());
  if (deps.env.corsOrigin) {
    app.use(cors({ origin: deps.env.corsOrigin, credentials: true }));
  }
  app.use(bodyLimit({ maxSize: 64 * 1024, onError: () => { throw new HttpError(413, 'payload_too_large'); } }));
  app.use(requireJson);
  app.use(sessionMiddleware(deps));

  app.get('/health', (c) => c.json({ status: 'ok' }));
  app.route('/auth', authRoutes(deps));
  app.route('/picrosses', picrossRoutes(deps));

  app.notFound((c) => c.json(errorBody('not_found'), 404));

  app.onError((error, c) => {
    if (error instanceof HttpError) {
      return c.json(errorBody(error.message, error.fields), error.status);
    }
    if (error instanceof ZodError) {
      return c.json(errorBody('validation'), 400);
    }
    console.error('[api] erreur inattendue', error);
    return c.json(errorBody('internal_error'), 500);
  });

  return app;
}

export type App = ReturnType<typeof createApp>;
