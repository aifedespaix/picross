import { randomBytes } from 'node:crypto';
import { z } from 'zod';

const bool = z
  .enum(['true', 'false', '1', '0'])
  .transform((value) => value === 'true' || value === '1');

const schema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().int().min(1).max(65535).default(3000),
  /** Fichier SQLite (ou `:memory:` pour les tests). */
  DATABASE_PATH: z.string().default('./data/picross.db'),
  /** Secret de signature des sessions : obligatoire en production. */
  JWT_SECRET: z.string().min(32, 'JWT_SECRET doit faire au moins 32 caractères').optional(),
  /** Durée de vie d'une session, en jours. */
  SESSION_DAYS: z.coerce.number().int().min(1).max(365).default(30),
  /** Emails (séparés par des virgules) promus administrateurs à la connexion. */
  ADMIN_EMAILS: z.string().default(''),
  /** `true` si les grilles créées sont publiées sans validation d'un admin. */
  AUTO_VALIDATE: bool.default(false),
  /** `true` derrière un reverse proxy : on fait confiance à X-Forwarded-For. */
  TRUST_PROXY: bool.default(false),
  /** Origine autorisée en CORS (utile uniquement si front et API sont sur des domaines différents). */
  CORS_ORIGIN: z.string().optional(),
  /** Force le flag `Secure` du cookie (par défaut : actif en production). */
  COOKIE_SECURE: bool.optional(),
});

export interface Env {
  nodeEnv: 'development' | 'test' | 'production';
  port: number;
  databasePath: string;
  jwtSecret: string;
  sessionDays: number;
  adminEmails: Set<string>;
  autoValidate: boolean;
  trustProxy: boolean;
  corsOrigin: string | undefined;
  cookieSecure: boolean;
}

export function loadEnv(source: Record<string, string | undefined> = process.env): Env {
  const parsed = schema.safeParse(source);
  if (!parsed.success) {
    const details = parsed.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`).join('; ');
    throw new Error(`Configuration invalide — ${details}`);
  }
  const raw = parsed.data;
  const production = raw.NODE_ENV === 'production';

  if (production && !raw.JWT_SECRET) {
    throw new Error('JWT_SECRET est obligatoire en production (openssl rand -base64 48)');
  }
  if (!raw.JWT_SECRET && raw.NODE_ENV !== 'test') {
    console.warn('[api] JWT_SECRET absent : secret aléatoire, les sessions sautent à chaque redémarrage.');
  }

  return {
    nodeEnv: raw.NODE_ENV,
    port: raw.PORT,
    databasePath: raw.DATABASE_PATH,
    jwtSecret: raw.JWT_SECRET ?? randomBytes(32).toString('hex'),
    sessionDays: raw.SESSION_DAYS,
    adminEmails: new Set(
      raw.ADMIN_EMAILS.split(',')
        .map((email) => email.trim().toLowerCase())
        .filter(Boolean),
    ),
    autoValidate: raw.AUTO_VALIDATE,
    trustProxy: raw.TRUST_PROXY,
    corsOrigin: raw.CORS_ORIGIN,
    cookieSecure: raw.COOKIE_SECURE ?? production,
  };
}
