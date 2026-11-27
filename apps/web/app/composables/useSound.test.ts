import { describe, expect, it } from 'vitest';
import { FILL_SCALE, scaleDegree } from './useSound';

describe('arpège des cases pleines', () => {
  it('monte degré par degré puis redescend, sans saut ni sortie de la gamme', () => {
    const seq = Array.from({ length: 20 }, (_, i) => scaleDegree(i));
    expect(seq.slice(0, 8)).toEqual([0, 1, 2, 3, 4, 5, 6, 7]);
    expect(seq.slice(8, 15)).toEqual([6, 5, 4, 3, 2, 1, 0]);
    for (let i = 1; i < seq.length; i++) expect(Math.abs(seq[i]! - seq[i - 1]!)).toBe(1);
    expect(Math.max(...seq)).toBe(FILL_SCALE.length - 1);
  });
  it('accepte des indices négatifs', () => {
    expect(scaleDegree(-1)).toBe(1);
  });
});
