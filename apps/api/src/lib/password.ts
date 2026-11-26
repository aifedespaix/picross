import { randomBytes, scrypt, timingSafeEqual, type ScryptOptions } from 'node:crypto';

/** scrypt (paramètres OWASP : N=2^15, r=8, p=3) — pas de dépendance native à compiler. */
const PARAMS = { N: 2 ** 15, r: 8, p: 3, maxmem: 128 * 1024 * 1024 } satisfies ScryptOptions;
const KEY_LENGTH = 64;

function derive(password: string, salt: Buffer, params: ScryptOptions = PARAMS): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    scrypt(password.normalize('NFKC'), salt, KEY_LENGTH, params, (error, key) =>
      error ? reject(error) : resolve(key),
    );
  });
}

export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16);
  const key = await derive(password, salt);
  return ['scrypt', PARAMS.N, PARAMS.r, PARAMS.p, salt.toString('base64'), key.toString('base64')].join('$');
}

export async function verifyPassword(password: string, stored: string): Promise<boolean> {
  const [scheme, n, r, p, salt, hash] = stored.split('$');
  if (scheme !== 'scrypt' || !n || !r || !p || !salt || !hash) return false;
  const expected = Buffer.from(hash, 'base64');
  const actual = await derive(password, Buffer.from(salt, 'base64'), {
    N: Number(n),
    r: Number(r),
    p: Number(p),
    maxmem: PARAMS.maxmem,
  });
  return actual.length === expected.length && timingSafeEqual(actual, expected);
}

/** Hash factice pour égaliser le temps de réponse quand l'email est inconnu. */
let dummy: Promise<string> | undefined;
export function dummyVerify(password: string): Promise<boolean> {
  dummy ??= hashPassword('dummy-password-for-timing');
  return dummy.then((hash) => verifyPassword(password, hash)).then(() => false);
}
