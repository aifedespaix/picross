/**
 * Musiques de fond : sept boucles, une par chapitre du parcours, de la plus pure (« L'Éveil ») à la plus
 * sombre (« Le Démon »). Composées en code (`tools/music/`), jamais d'IA, et pensées pour durer : pas de
 * mélodie qui s'impose, une pulsation qui n'apparaît qu'à mesure que le démon s'approche.
 */
import type { Chapter } from './journey';

export const MUSIC_TRACKS = [
  'awakening',
  'whisper',
  'eyes',
  'pack',
  'threshold',
  'bite',
  'demon',
] as const;
export type MusicTrack = (typeof MUSIC_TRACKS)[number];

/** Les identifiants de chapitre sont ceux des pistes : le chapitre « eyes » joue la piste « eyes ». */
export function trackForChapter(chapterId: string): MusicTrack | null {
  return (MUSIC_TRACKS as readonly string[]).includes(chapterId) ? (chapterId as MusicTrack) : null;
}

/**
 * Partie libre (hors parcours) : la musique suit la corruption, donc les erreurs des grilles précédentes.
 * Seules quatre pistes y servent ; « Le Seuil » et « Le Démon » restent réservées au parcours.
 */
export function trackForStage(stage: 'pure' | 'calm' | 'uneasy' | 'dark'): MusicTrack {
  return { pure: 'awakening', calm: 'whisper', uneasy: 'eyes', dark: 'bite' }[stage] as MusicTrack;
}

/** Chapitre qui contient une grille du parcours (par son `slug`), s'il existe. */
export function chapterIdOfSlug(chapters: readonly Chapter[], slug: string): string | null {
  const chapter = chapters.find((item) =>
    item.steps.some((step) => step.levels.some((level) => level.slug === slug)),
  );
  return chapter?.id ?? null;
}
