import { STARTER_PUZZLES } from '@picross/shared';
import { beforeEach, describe, expect, it } from 'vitest';
import {
  allSteps,
  buildJourney,
  chapterDone,
  currentStep,
  findStep,
  firstToPlay,
  levelStatus,
  starsFor,
  stepViews,
  totals,
  type Progress,
} from './journey';
import { clearProgress, loadProgress, recordResult } from './journeyProgress';

const chapters = buildJourney(STARTER_PUZZLES);
const result = { stars: 3 as const, time: 1000 };

describe('buildJourney', () => {
  it('utilise chaque grille livrée exactement une fois', () => {
    const slugs = allSteps(chapters).flatMap((s) => s.levels.map((l) => l.slug));
    expect(slugs).toHaveLength(STARTER_PUZZLES.length);
    expect(new Set(slugs).size).toBe(STARTER_PUZZLES.length);
  });

  it('est déterministe', () => {
    expect(buildJourney(STARTER_PUZZLES)).toEqual(chapters);
  });

  it('termine chaque chapitre par un boss, et seulement par lui', () => {
    for (const chapter of chapters) {
      expect(chapter.steps.at(-1)!.kind).toBe('boss');
      expect(chapter.steps.filter((s) => s.kind === 'boss')).toHaveLength(1);
    }
  });

  it('propose des bifurcations de deux grilles', () => {
    const forks = allSteps(chapters).filter((s) => s.kind === 'fork');
    expect(forks.length).toBeGreaterThan(5);
    expect(forks.every((s) => s.levels.length === 2)).toBe(true);
  });

  it('va du plus petit au plus grand', () => {
    const areas = chapters.map((c) => {
      const levels = c.steps.flatMap((s) => s.levels);
      return Math.max(...levels.map((l) => l.width * l.height));
    });
    expect(areas).toEqual([...areas].sort((a, b) => a - b));
  });
});

describe('progression', () => {
  const first = chapters[0]!.steps[0]!.levels[0]!;

  it('ne débloque que la première étape au départ', () => {
    const views = stepViews(chapters, {});
    expect(views[0]!.status).toBe('open');
    expect(views.slice(1).every((v) => v.status === 'locked')).toBe(true);
    expect(currentStep(views)).toBe(views[0]);
  });

  it('débloque l’étape suivante quand une grille est résolue', () => {
    const views = stepViews(chapters, { [first.slug]: result });
    expect(views[0]!.status).toBe('done');
    expect(views[1]!.status).toBe('open');
    expect(views[2]!.status).toBe('locked');
  });

  it('une bifurcation se franchit avec une seule branche, l’autre reste jouable', () => {
    const fork = chapters[0]!.steps.find((s) => s.kind === 'fork')!;
    const done: Progress = {};
    for (const step of chapters[0]!.steps) {
      if (step === fork) break;
      done[step.levels[0]!.slug] = result;
    }
    done[fork.levels[0].slug] = result;
    const views = stepViews(chapters, done);
    const view = findStep(views, fork.levels[1].slug)!;
    expect(view.status).toBe('done');
    expect(levelStatus(view, fork.levels[0], done)).toBe('done');
    expect(levelStatus(view, fork.levels[1], done)).toBe('open');
    expect(firstToPlay(view, done)).toBe(fork.levels[1]);
  });

  it('compte les étoiles et détecte la fin d’un chapitre', () => {
    const progress: Progress = {};
    for (const step of chapters[0]!.steps) progress[step.levels[0].slug] = result;
    expect(chapterDone(chapters[0]!, progress)).toBe(true);
    expect(chapterDone(chapters[1]!, progress)).toBe(false);
    const t = totals(chapters, progress);
    expect(t.stars).toBe(chapters[0]!.steps.length * 3);
    expect(t.maxStars).toBe(STARTER_PUZZLES.length * 3);
  });

  it('attribue les étoiles selon les erreurs', () => {
    expect([0, 1, 2, 3, 20].map(starsFor)).toEqual([3, 2, 2, 1, 1]);
  });
});

describe('sauvegarde de la progression', () => {
  const memory = new Map<string, string>();
  beforeEach(() => {
    memory.clear();
    Object.defineProperty(globalThis, 'localStorage', {
      configurable: true,
      value: {
        getItem: (k: string) => memory.get(k) ?? null,
        setItem: (k: string, v: string) => void memory.set(k, v),
        removeItem: (k: string) => void memory.delete(k),
      },
    });
  });

  it('garde le meilleur résultat', () => {
    recordResult('a', 2, 5000);
    recordResult('a', 1, 3000);
    expect(loadProgress().a).toEqual({ stars: 2, time: 3000 });
  });

  it('ignore des données corrompues et peut tout effacer', () => {
    memory.set('picross:journey', '{"a":{"stars":9,"time":1},"b":{"stars":2,"time":10}}');
    expect(Object.keys(loadProgress())).toEqual(['b']);
    memory.set('picross:journey', 'pas du json');
    expect(loadProgress()).toEqual({});
    recordResult('a', 3, 1);
    clearProgress();
    expect(loadProgress()).toEqual({});
  });
});
