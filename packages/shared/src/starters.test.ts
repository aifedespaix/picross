import { describe, expect, it } from 'vitest';
import { createPicrossSchema } from './schemas.ts';
import { fromBits } from './grid.ts';
import { rateDifficulty, solveByLogic } from './solver.ts';
import { STARTER_PUZZLES, starterBits } from './starters.ts';

describe('grilles livrées', () => {
  it('en propose une centaine, aux identifiants uniques', () => {
    expect(STARTER_PUZZLES.length).toBeGreaterThanOrEqual(100);
    const slugs = STARTER_PUZZLES.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const puzzle of STARTER_PUZZLES) {
      expect(puzzle.slug).toMatch(/^[a-z0-9-]+$/);
      expect(puzzle.fr.length).toBeGreaterThan(2);
      expect(puzzle.en.length).toBeGreaterThan(2);
    }
  });

  it.each(STARTER_PUZZLES.map((p) => [p.slug, p] as const))(
    '« %s » est valide et se résout sans deviner',
    (_slug, puzzle) => {
      const bits = starterBits(puzzle.rows);
      expect(createPicrossSchema.safeParse({ title: puzzle.fr, map: bits }).success).toBe(true);
      expect(solveByLogic(fromBits(bits)).solved).toBe(true);
    },
  );

  it('couvre les quatre niveaux de difficulté', () => {
    const levels = new Set(
      STARTER_PUZZLES.map((p) => rateDifficulty(fromBits(starterBits(p.rows))).level),
    );
    expect([...levels].sort()).toEqual(['easy', 'expert', 'hard', 'medium']);
  });
});
