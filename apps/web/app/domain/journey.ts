import {
  fromBits,
  rateDifficulty,
  starterBits,
  type Difficulty,
  type StarterPuzzle,
} from '@picross/shared';

/** Une grille du parcours (grille livrée avec l'application : jouable hors ligne). */
export interface Level {
  /** Identifiant stable (celui de la grille livrée) : la progression s'y rattache. */
  slug: string;
  names: { fr: string; en: string };
  bits: (0 | 1)[][];
  width: number;
  height: number;
  /** Nombre de cases pleines de la solution. */
  filled: number;
  difficulty: Difficulty;
}

/**
 * Une étape du chemin :
 * - `level` : une grille ;
 * - `fork` : le chemin se sépare, on en joue au moins une (les deux pour tout terminer) ;
 * - `boss` : la plus grosse grille du chapitre, qui le conclut.
 */
export type Step =
  { kind: 'level' | 'boss'; levels: [Level] } | { kind: 'fork'; levels: [Level, Level] };

export interface Chapter {
  index: number;
  /** Clé de traduction (`journey.chapters.<id>`). */
  id: string;
  steps: Step[];
}

export const CHAPTER_IDS = [
  'awakening',
  'whisper',
  'eyes',
  'pack',
  'threshold',
  'bite',
  'demon',
] as const;

/** Une bifurcation toutes les trois étapes. */
const FORK_EVERY = 3;

function toLevel(puzzle: StarterPuzzle): Level {
  const bits = starterBits(puzzle.rows);
  return {
    slug: puzzle.slug,
    names: { fr: puzzle.fr, en: puzzle.en },
    bits,
    width: bits[0]?.length ?? 0,
    height: bits.length,
    filled: bits.flat().filter(Boolean).length,
    difficulty: rateDifficulty(fromBits(bits)).level,
  };
}

/**
 * Découpe les grilles (triées de la plus facile à la plus difficile : taille, puis nombre de cases)
 * en chapitres. Dans chaque chapitre : des grilles, une bifurcation toutes les trois étapes, et la
 * plus grosse grille en boss final. Entièrement déterministe.
 */
export function buildJourney(
  puzzles: readonly StarterPuzzle[],
  chapterIds: readonly string[] = CHAPTER_IDS,
): Chapter[] {
  const levels = puzzles
    .map(toLevel)
    .sort(
      (a, b) =>
        a.width * a.height - b.width * b.height ||
        a.filled - b.filled ||
        (a.slug < b.slug ? -1 : 1),
    );
  const per = Math.ceil(levels.length / chapterIds.length);
  const chapters: Chapter[] = [];
  chapterIds.forEach((id, index) => {
    const chunk = levels.slice(index * per, (index + 1) * per);
    if (chunk.length === 0) return;
    const boss = chunk.pop()!;
    const steps: Step[] = [];
    while (chunk.length > 0) {
      const wantsFork = (steps.length + 1) % FORK_EVERY === 0 && chunk.length >= 2;
      if (wantsFork) steps.push({ kind: 'fork', levels: [chunk.shift()!, chunk.shift()!] });
      else steps.push({ kind: 'level', levels: [chunk.shift()!] });
    }
    steps.push({ kind: 'boss', levels: [boss] });
    chapters.push({ index, id, steps });
  });
  return chapters;
}

// --- Progression ---------------------------------------------------------------

export type Stars = 1 | 2 | 3;

export interface LevelResult {
  stars: Stars;
  /** Meilleur temps (ms). */
  time: number;
}

export type Progress = Record<string, LevelResult>;

/** 3 étoiles sans erreur, 2 avec une ou deux, 1 pour une grille résolue malgré tout. */
export function starsFor(mistakes: number): Stars {
  return mistakes === 0 ? 3 : mistakes <= 2 ? 2 : 1;
}

/** Garde le meilleur de deux résultats (plus d'étoiles, puis meilleur temps). */
export function betterResult(a: LevelResult | undefined, b: LevelResult): LevelResult {
  if (!a) return b;
  return { stars: Math.max(a.stars, b.stars) as Stars, time: Math.min(a.time, b.time) };
}

export const allSteps = (chapters: readonly Chapter[]): Step[] => chapters.flatMap((c) => c.steps);

/** Une étape est franchie quand au moins une de ses grilles est résolue. */
export const isCleared = (step: Step, progress: Progress): boolean =>
  step.levels.some((level) => progress[level.slug]);

/** Une bifurcation est « complète » quand ses deux branches sont résolues. */
export const isComplete = (step: Step, progress: Progress): boolean =>
  step.levels.every((level) => progress[level.slug]);

export type NodeStatus = 'locked' | 'open' | 'done';

export interface StepView {
  step: Step;
  chapter: number;
  /** Position dans le chemin entier (0 = première étape). */
  position: number;
  /** `locked` : étape précédente non franchie ; `open` : jouable ; `done` : franchie. */
  status: NodeStatus;
}

/** Vue à plat du chemin : chaque étape avec son état, d'après la progression. */
export function stepViews(chapters: readonly Chapter[], progress: Progress): StepView[] {
  const views: StepView[] = [];
  let reachable = true;
  for (const chapter of chapters) {
    for (const step of chapter.steps) {
      const done = isCleared(step, progress);
      views.push({
        step,
        chapter: chapter.index,
        position: views.length,
        status: done ? 'done' : reachable ? 'open' : 'locked',
      });
      if (!done) reachable = false;
    }
  }
  return views;
}

/** État d'une grille : jouable seulement si son étape l'est (ou si elle est déjà résolue). */
export function levelStatus(view: StepView, level: Level, progress: Progress): NodeStatus {
  if (progress[level.slug]) return 'done';
  return view.status === 'locked' ? 'locked' : 'open';
}

/** Étape en cours : la première non franchie (`undefined` quand tout le parcours est terminé). */
export function currentStep(views: readonly StepView[]): StepView | undefined {
  return views.find((view) => view.status === 'open');
}

/** Première grille à jouer dans une étape (les bifurcations proposent d'abord la branche non faite). */
export function firstToPlay(view: StepView, progress: Progress): Level {
  return view.step.levels.find((level) => !progress[level.slug]) ?? view.step.levels[0]!;
}

export function findStep(views: readonly StepView[], slug: string): StepView | undefined {
  return views.find((view) => view.step.levels.some((level) => level.slug === slug));
}

export interface Totals {
  stars: number;
  maxStars: number;
  done: number;
  total: number;
}

export function totals(chapters: readonly Chapter[], progress: Progress): Totals {
  const levels = allSteps(chapters).flatMap((step) => step.levels);
  return {
    stars: levels.reduce((sum, level) => sum + (progress[level.slug]?.stars ?? 0), 0),
    maxStars: levels.length * 3,
    done: levels.filter((level) => progress[level.slug]).length,
    total: levels.length,
  };
}

/** Chapitre terminé : son boss est franchi. */
export const chapterDone = (chapter: Chapter, progress: Progress): boolean =>
  isCleared(chapter.steps.at(-1)!, progress);
