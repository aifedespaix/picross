import { STARTER_PUZZLES } from '@picross/shared';
import { describe, expect, it } from 'vitest';
import { buildJourney, CHAPTER_IDS } from './journey';
import { chapterIdOfSlug, MUSIC_TRACKS, trackForChapter, trackForStage } from './music';

describe('musiques de fond', () => {
  it('chaque chapitre du parcours a sa piste', () => {
    for (const id of CHAPTER_IDS) expect(trackForChapter(id)).toBe(id);
    expect([...MUSIC_TRACKS]).toEqual([...CHAPTER_IDS]);
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
