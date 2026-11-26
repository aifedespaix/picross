/**
 * N'autorise que les redirections internes (empêche les « open redirect » via ?redirect=https://…).
 * Renvoie `null` si la valeur n'est pas un chemin interne sûr.
 */
export function safeRedirect(value: unknown): string | null {
  return typeof value === 'string' && value.startsWith('/') && !value.startsWith('//')
    ? value
    : null;
}
