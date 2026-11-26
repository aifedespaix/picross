import { describe, expect, it } from 'vitest';
import { fromBits } from './grid.ts';
import { rateDifficulty, solveByLogic, solveLine } from './solver.ts';

describe('solveLine', () => {
  it('déduit les chevauchements', () => {
    // 4 cases, bloc de 3 : les 2 cases centrales sont forcément pleines.
    expect(solveLine([0, 0, 0, 0], [3])).toEqual([0, 1, 1, 0]);
  });
  it('remplit une ligne entièrement déterminée', () => {
    expect(solveLine([0, 0, 0, 0, 0], [2, 2])).toEqual([1, 1, 2, 1, 1]);
    expect(solveLine([0, 0, 0], [])).toEqual([2, 2, 2]);
  });
  it('utilise les cases déjà connues', () => {
    expect(solveLine([1, 0, 0, 0, 0], [2])).toEqual([1, 1, 2, 2, 2]);
  });
  it('détecte une contradiction', () => {
    expect(solveLine([1, 2, 1], [3])).toBeNull();
  });
});

describe('solveByLogic', () => {
  it('résout une grille sans ambiguïté', () => {
    const heart = fromBits([
      [0, 1, 0, 1, 0],
      [1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1],
      [0, 1, 1, 1, 0],
      [0, 0, 1, 0, 0],
    ]);
    expect(solveByLogic(heart).solved).toBe(true);
  });
  it('signale une grille ambiguë (deux solutions)', () => {
    const ambiguous = fromBits([
      [1, 0],
      [0, 1],
    ]);
    const result = solveByLogic(ambiguous);
    expect(result.solved).toBe(false);
    expect(result.unknown).toBe(4);
  });
});

describe('rateDifficulty', () => {
  it('monte avec la taille et pénalise les grilles à hypothèses', () => {
    const small = fromBits(Array.from({ length: 5 }, () => Array(5).fill(1)));
    expect(rateDifficulty(small).level).toBe('easy');
    const ambiguous = fromBits([
      [1, 0, 1, 0, 0],
      [0, 1, 0, 1, 0],
      [1, 0, 1, 0, 0],
      [0, 1, 0, 1, 0],
      [0, 0, 0, 0, 1],
    ]);
    expect(rateDifficulty(ambiguous).logical).toBe(false);
  });
});
