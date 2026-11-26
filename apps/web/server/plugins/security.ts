import { createHash } from 'node:crypto';

/**
 * Content-Security-Policy stricte, sans 'unsafe-inline' pour les scripts : à chaque réponse on
 * calcule l'empreinte SHA-256 des scripts / styles inline réellement présents dans le HTML
 * (importmap et configuration de Nuxt, script d'initialisation du thème…).
 * Contrairement à un nonce, une empreinte reste valide si la réponse est mise en cache.
 */
const INLINE = /<(script|style)(?![^>]*\bsrc=)([^>]*)>([\s\S]*?)<\/\1>/g;

const sha256 = (content: string) =>
  `'sha256-${createHash('sha256').update(content).digest('base64')}'`;

export default defineNitroPlugin((nitroApp) => {
  if (import.meta.dev) return; // l'HMR de Vite a besoin de scripts inline : pas de CSP en dev

  nitroApp.hooks.hook('render:html', (html, { event }) => {
    const scripts = new Set<string>();
    const styles = new Set<string>();
    const chunks = [...html.head, ...html.bodyPrepend, ...html.body, ...html.bodyAppend];
    for (const chunk of chunks) {
      for (const [, tag, attrs, content] of chunk.matchAll(INLINE)) {
        if (!content?.trim()) continue;
        // Les blocs de données (JSON, JSON-LD) ne sont pas exécutés : pas concernés par la CSP.
        if (tag === 'script' && /type=["']application\/(ld\+)?json["']/.test(attrs ?? '')) continue;
        (tag === 'script' ? scripts : styles).add(sha256(content));
      }
    }

    setResponseHeader(
      event,
      'Content-Security-Policy',
      [
        "default-src 'self'",
        `script-src 'self' ${[...scripts].join(' ')}`.trim(),
        `style-src 'self' ${[...styles].join(' ')}`.trim(),
        // Attributs style="--cols: 10" posés par le rendu du plateau (variables CSS uniquement).
        "style-src-attr 'unsafe-inline'",
        "img-src 'self' data:",
        "media-src 'self' data:",
        "font-src 'self'",
        "connect-src 'self'",
        "object-src 'none'",
        "base-uri 'self'",
        "form-action 'self'",
        "frame-ancestors 'none'",
      ].join('; '),
    );
  });
});
