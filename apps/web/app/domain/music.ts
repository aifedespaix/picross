/**
 * Musiques de fond : sept boucles, une par chapitre du parcours, de la plus pure (« L'Éveil ») à la plus
 * sombre (« Le Démon »). Composées en code (`tools/music/`), jamais d'IA, et pensées pour durer : pas de
 * mélodie qui s'impose, une pulsation qui n'apparaît qu'à mesure que le démon s'approche.
 */
import type { Chapter } from './journey';

/**
 * Une « famille » = une ambiance (un chapitre, ou la carte du parcours). Chaque famille a plusieurs pistes
 * pour que la même grille ne rejoue pas toujours la même musique.
 */
export const MUSIC_VARIANTS = {
  awakening: ['awakening', 'awakening-b', 'awakening-c'],
  whisper: ['whisper', 'whisper-b', 'whisper-c'],
  eyes: ['eyes', 'eyes-b'],
  pack: ['pack', 'pack-b'],
  threshold: ['threshold', 'threshold-b'],
  bite: ['bite', 'bite-b'],
  demon: ['demon', 'demon-b'],
  map: ['map-a', 'map-b', 'map-c'],
} as const;
export type MusicFamily = keyof typeof MUSIC_VARIANTS;
export type MusicTrack = (typeof MUSIC_VARIANTS)[MusicFamily][number];
export const MUSIC_FAMILIES = Object.keys(MUSIC_VARIANTS) as MusicFamily[];
export const MUSIC_TRACKS = MUSIC_FAMILIES.flatMap((family) => [...MUSIC_VARIANTS[family]]);

/** Les identifiants de chapitre sont ceux des familles : le chapitre « eyes » joue la famille « eyes ». */
export function trackForChapter(chapterId: string): MusicFamily | null {
  return chapterId !== 'map' && chapterId in MUSIC_VARIANTS ? (chapterId as MusicFamily) : null;
}

/**
 * Partie libre (hors parcours) : la musique suit la corruption, donc les erreurs des grilles précédentes.
 * Seules quatre familles y servent ; « Le Seuil » et « Le Démon » restent réservées au parcours.
 */
export function trackForStage(stage: 'pure' | 'calm' | 'uneasy' | 'dark'): MusicFamily {
  return { pure: 'awakening', calm: 'whisper', uneasy: 'eyes', dark: 'bite' }[stage] as MusicFamily;
}

/**
 * Choisit la piste d'une famille : on garde celle qui joue déjà si elle en fait partie (aucun redémarrage d'une
 * grille à l'autre) ; sinon une variante au hasard, jamais la dernière jouée de cette famille quand il y a le choix.
 */
export function pickTrack(
  family: MusicFamily,
  playing: MusicTrack | null,
  lastOfFamily: MusicTrack | undefined,
  random: () => number = Math.random,
): MusicTrack {
  const variants: readonly MusicTrack[] = MUSIC_VARIANTS[family];
  if (playing && variants.includes(playing)) return playing;
  const choices = variants.length > 1 ? variants.filter((v) => v !== lastOfFamily) : variants;
  return choices[Math.min(choices.length - 1, Math.floor(random() * choices.length))]!;
}

/** Chapitre qui contient une grille du parcours (par son `slug`), s'il existe. */
export function chapterIdOfSlug(chapters: readonly Chapter[], slug: string): string | null {
  const chapter = chapters.find((item) =>
    item.steps.some((step) => step.levels.some((level) => level.slug === slug)),
  );
  return chapter?.id ?? null;
}
