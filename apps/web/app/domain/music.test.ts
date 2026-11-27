import { STARTER_PUZZLES } from '@picross/shared';
import { describe, expect, it } from 'vitest';
import { buildJourney, CHAPTER_IDS } from './journey';
import {
  chapterIdOfSlug,
  MUSIC_FAMILIES,
  MUSIC_VARIANTS,
  pickTrack,
  trackForChapter,
  trackForStage,
} from './music';

describe('musiques de fond', () => {
  it('chaque chapitre du parcours a sa piste', () => {
    for (const id of CHAPTER_IDS) expect(trackForChapter(id)).toBe(id);
    expect(MUSIC_FAMILIES.filter((family) => family !== 'map')).toEqual([...CHAPTER_IDS]);
  });

  it('chaque famille a au moins une piste, et « map » n’est pas un chapitre', () => {
    for (const family of MUSIC_FAMILIES) expect(MUSIC_VARIANTS[family].length).toBeGreaterThan(0);
    expect(trackForChapter('map')).toBeNull();
  });

  it('garde la piste qui joue déjà tant qu’on reste dans la famille', () => {
    expect(pickTrack('whisper', 'whisper-b', 'whisper', () => 0)).toBe('whisper-b');
  });

  it('change de variante quand on revient dans la famille (jamais la dernière jouée)', () => {
    for (const r of [0, 0.3, 0.99]) {
      expect(pickTrack('awakening', 'demon', 'awakening-b', () => r)).not.toBe('awakening-b');
    }
    expect(pickTrack('eyes', null, 'eyes', () => 0.5)).toBe('eyes-b');
  });

  it('un chapitre inconnu n’a pas de piste', () => {
    expect(trackForChapter('nope')).toBeNull();
  });

  it('en partie libre, la piste s’assombrit avec la corruption', () => {
    expect(trackForStage('pure')).toBe('awakening');
    expect(trackForStage('calm')).toBe('whisper');
    expect(trackForStage('uneasy')).toBe('eyes');
    expect(trackForStage('dark')).toBe('bite');
  });

  it('retrouve le chapitre d’une grille du parcours', () => {
    const chapters = buildJourney(STARTER_PUZZLES);
    const first = chapters[0]!.steps[0]!.levels[0].slug;
    const lastChapter = chapters[chapters.length - 1]!;
    const boss = lastChapter.steps[lastChapter.steps.length - 1]!.levels[0].slug;
    expect(chapterIdOfSlug(chapters, first)).toBe('awakening');
    expect(chapterIdOfSlug(chapters, boss)).toBe(lastChapter.id);
    expect(chapterIdOfSlug(chapters, 'inconnue')).toBeNull();
  });
});
