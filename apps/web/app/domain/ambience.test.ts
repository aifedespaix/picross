import { describe, expect, it } from 'vitest';
import { ambienceLevels } from './ambience';

describe('niveaux d’ambiance', () => {
  it('pureté : seul l’air pur', () => {
    expect(ambienceLevels(0)).toEqual({ pure: 1, uneasy: 0, dark: 0 });
  });
  it('démon : plus d’air pur, les souffles dominent', () => {
    const { pure, dark, uneasy } = ambienceLevels(1);
    expect(pure).toBe(0);
    expect(dark).toBeGreaterThan(uneasy);
  });
  it('la somme reste constante tout du long (changer de couleur, pas de volume)', () => {
    for (let c = 0; c <= 1.0001; c += 0.05) {
      const l = ambienceLevels(c);
      expect(l.pure + l.uneasy + l.dark).toBeCloseTo(1);
    }
  });
  it('valeur absurde : borne', () => {
    expect(ambienceLevels(NaN).pure).toBe(1);
    expect(ambienceLevels(9).dark).toBeGreaterThan(0);
  });
});
