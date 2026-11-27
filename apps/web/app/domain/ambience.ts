/**
 * Niveaux (0-1) des trois textures d'ambiance selon la corruption (0 = pureté, 1 = le démon prend la place).
 * L'air pur s'efface à mesure que le grondement puis les souffles montent ; la somme reste à peu près constante
 * pour que l'ambiance change de couleur sans changer de volume.
 */
export function ambienceLevels(corruption: number): { pure: number; uneasy: number; dark: number } {
  const c = Math.min(1, Math.max(0, Number.isFinite(corruption) ? corruption : 0));
  const pure = Math.max(0, 1 - c / 0.55);
  const dark = Math.max(0, (c - 0.35) / 0.65);
  const uneasy = Math.max(0, 1 - Math.abs(c - 0.45) / 0.45);
  const total = pure + uneasy + dark || 1;
  return { pure: pure / total, uneasy: uneasy / total, dark: dark / total };
}
