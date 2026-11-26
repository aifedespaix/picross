import { describe, expect, it } from 'vitest';
import {
  computeClues,
  fromBits,
  lineClues,
  toBits,
  validateSolution,
  createPicrossSchema,
  STARTER_PUZZLES,
  starterBits,
} from './index.ts';

describe('lineClues', () => {
  it('compte les blocs consécutifs', () => {
    expect(lineClues([true, true, false, true])).toEqual([2, 1]);
    expect(lineClues([false, false])).toEqual([]);
    expect(lineClues([true, true, true])).toEqual([3]);
    expect(lineClues([true, false, true, false, true])).toEqual([1, 1, 1]);
  });
});

describe('computeClues', () => {
  it('calcule les indices des lignes et des colonnes', () => {
    const solution = fromBits([
      [1, 1, 0],
      [0, 1, 0],
      [1, 0, 1],
    ]);
    expect(computeClues(solution)).toEqual({
      rows: [[2], [1], [1, 1]],
      cols: [[1, 1], [2], [1]],
    });
  });

  it('fromBits / toBits sont inverses', () => {
    const bits = [
      [1, 0],
      [0, 1],
    ] as const;
    expect(toBits(fromBits(bits))).toEqual(bits);
  });
});

describe('validateSolution', () => {
  it('refuse les tailles hors bornes', () => {
    expect(validateSolution(fromBits([[1, 1], [1, 1]]))).toBe('size');
  });
  it('refuse les grilles trop vides', () => {
    const bits = Array.from({ length: 5 }, () => Array(5).fill(0));
    bits[0]![0] = 1;
    expect(validateSolution(fromBits(bits))).toBe('fill');
  });
  it('refuse les grilles non rectangulaires', () => {
    expect(validateSolution(fromBits([[1, 1, 1], [1, 1, 1], [1, 1]]))).toBe('shape');
  });
});

describe('grilles fournies', () => {
  it.each(STARTER_PUZZLES)('« $title » est valide pour le schéma de création', (puzzle) => {
    expect(createPicrossSchema.safeParse({ title: puzzle.title, map: starterBits(puzzle.rows) }).success).toBe(true);
  });
});
