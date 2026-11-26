import { beforeEach, describe, expect, it } from 'vitest';
import { createGrid } from './grid';
import { clearGame, loadGame, loadTool, MAX_SAVES, saveGame, saveTool } from './saves';

const memory = new Map<string, string>();
const fakeStorage = {
  getItem: (key: string) => memory.get(key) ?? null,
  setItem: (key: string, value: string) => void memory.set(key, value),
};

beforeEach(() => {
  memory.clear();
  Object.defineProperty(globalThis, 'localStorage', { value: fakeStorage, configurable: true });
});

const game = (mistakes = 0) => {
  const cells = createGrid(3, 2);
  cells[0]![0] = 'filled';
  return { cells, mistakes, elapsed: 1234 };
};

describe('saves', () => {
  it('relit une partie sauvegardée', () => {
    saveGame('a', game(2));
    expect(loadGame('a', 3, 2)).toEqual(game(2));
  });

  it('ignore une sauvegarde aux dimensions différentes', () => {
    saveGame('a', game());
    expect(loadGame('a', 4, 2)).toBeNull();
    expect(loadGame('a', 3, 3)).toBeNull();
  });

  it('efface une partie', () => {
    saveGame('a', game());
    clearGame('a');
    expect(loadGame('a', 3, 2)).toBeNull();
  });

  it('ne garde que les parties les plus récentes', () => {
    for (let i = 0; i < MAX_SAVES + 3; i++) saveGame(`p${i}`, game());
    expect(loadGame('p0', 3, 2)).toBeNull();
    expect(loadGame(`p${MAX_SAVES + 2}`, 3, 2)).not.toBeNull();
  });

  it('survit à des données corrompues', () => {
    memory.set('picross:games', '{pas du json');
    expect(loadGame('a', 3, 2)).toBeNull();
    memory.set('picross:games', JSON.stringify([['a', { cells: 'x' }]]));
    expect(loadGame('a', 3, 2)).toBeNull();
  });

  it('mémorise l’outil', () => {
    expect(loadTool()).toBeNull();
    saveTool('crossed');
    expect(loadTool()).toBe('crossed');
  });
});
