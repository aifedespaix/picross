/** N'autorise que les redirections internes (empêche les « open redirect » via ?redirect=https://…). */
export function safeRedirect(value: unknown): string {
  return typeof value === 'string' && value.startsWith('/') && !value.startsWith('//')
    ? value
    : '/';
}
