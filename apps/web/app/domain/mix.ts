/**
 * Mixage : quatre bus (musique, ambiance, effets, interface) puis un volume général. Chaque bus a un
 * réglage joueur de 0 à 100 (0 = muet) ; le « trim » fixe sa place par défaut dans le mélange pour que
 * les effets passent toujours devant la musique, et la musique devant l'ambiance.
 */
export const BUSES = ['music', 'ambience', 'sfx', 'ui'] as const;
export type BusName = (typeof BUSES)[number];
export type VolumeName = BusName | 'master';
export type Volumes = Record<VolumeName, number>;
export const VOLUME_NAMES: readonly VolumeName[] = ['master', ...BUSES];

export const VOLUME_DEFAULTS: Volumes = {
  master: 100,
  music: 100,
  ambience: 100,
  sfx: 100,
  ui: 100,
};

/** Niveau de chaque bus quand son curseur est à 100 : l'équilibre voulu par la direction sonore. */
export const BUS_TRIM: Record<BusName, number> = { music: 0.32, ambience: 0.2, sfx: 1, ui: 0.8 };

export const clampVolume = (value: unknown): number => {
  const n = Number(value);
  return Number.isFinite(n) ? Math.min(100, Math.max(0, Math.round(n))) : 100;
};

/** Courbe perceptive : le milieu du curseur est nettement plus bas que la moitié du signal ; 0 = silence exact. */
export const volumeToGain = (value: number): number => (clampVolume(value) / 100) ** 2;

/** Niveau d'un bus (sans le volume général, appliqué en aval sur la sortie). */
export const busGain = (volumes: Volumes, bus: BusName): number =>
  volumeToGain(volumes[bus]) * BUS_TRIM[bus];

/** Volume général. */
export const masterGain = (volumes: Volumes): number => volumeToGain(volumes.master);

/** Complète et borne des réglages lus d'un cookie (valeurs absentes ou invalides = défaut). */
export function sanitizeVolumes(raw: unknown): Volumes {
  const source =
    raw && typeof raw === 'object' ? (raw as Partial<Record<VolumeName, unknown>>) : {};
  const out = { ...VOLUME_DEFAULTS };
  for (const name of VOLUME_NAMES) if (name in source) out[name] = clampVolume(source[name]);
  return out;
}

/**
 * Creux de volume que les sons font dans les bus de fond : `depth` (0-1) retiré pendant `hold` secondes,
 * puis retour en `release` secondes. Un effet de jeu est bref ; la victoire efface presque tout le fond.
 */
export interface Duck {
  depth: number;
  hold: number;
  release: number;
}
export const DUCKS = {
  sfx: { depth: 0.16, hold: 0.06, release: 0.3 },
  ui: { depth: 0.1, hold: 0.04, release: 0.25 },
  win: { depth: 0.75, hold: 2.4, release: 1.4 },
} as const satisfies Record<string, Duck>;
export type DuckName = keyof typeof DUCKS;
