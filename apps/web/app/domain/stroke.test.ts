import { describe, expect, it } from 'vitest';
import { createGrid, type Grid } from './grid.ts';
import { beginStroke, gridsEqual, strokeTo } from './stroke.ts';

const row = (grid: Grid, r: number) => grid[r]!.join(',');

describe('stroke', () => {
  it('remplit une case au simple clic', () => {
    const grid = createGrid(5, 5);
    const stroke = beginStroke(grid, { row: 2, col: 2 }, 'filled');
    expect(strokeTo(stroke, { row: 2, col: 2 })[2]![2]).toBe('filled');
    expect(grid[2]![2]).toBe('blank'); // la grille d'origine n'est jamais mutée
  });

  it('remplit en ligne et se verrouille sur l’axe horizontal', () => {
    const stroke = beginStroke(createGrid(5, 5), { row: 1, col: 1 }, 'filled');
    const result = strokeTo(stroke, { row: 2, col: 3 }); // plus d'écart en colonnes
    expect(stroke.axis).toBe('row');
    expect(row(result, 1)).toBe('blank,filled,filled,filled,blank');
    expect(row(result, 2)).toBe('blank,blank,blank,blank,blank');
  });

  it('se verrouille sur l’axe vertical', () => {
    const stroke = beginStroke(createGrid(5, 5), { row: 0, col: 2 }, 'filled');
    const result = strokeTo(stroke, { row: 3, col: 3 });
    expect(stroke.axis).toBe('col');
    expect(result.map((r) => r[2])).toEqual(['filled', 'filled', 'filled', 'filled', 'blank']);
  });

  it('annule les cases dépassées quand on revient en arrière', () => {
    const stroke = beginStroke(createGrid(6, 1), { row: 0, col: 0 }, 'filled');
    strokeTo(stroke, { row: 0, col: 4 });
    expect(row(strokeTo(stroke, { row: 0, col: 1 }), 0)).toBe(
      'filled,filled,blank,blank,blank,blank',
    );
  });

  it('peint vers la gauche', () => {
    const stroke = beginStroke(createGrid(5, 1), { row: 0, col: 4 }, 'filled');
    expect(row(strokeTo(stroke, { row: 0, col: 2 }), 0)).toBe('blank,blank,filled,filled,filled');
  });

  it('efface quand on démarre sur une case déjà pleine, sans toucher aux croix', () => {
    const grid = createGrid(5, 1);
    grid[0] = ['filled', 'filled', 'crossed', 'filled', 'blank'];
    const stroke = beginStroke(grid, { row: 0, col: 0 }, 'filled');
    expect(row(strokeTo(stroke, { row: 0, col: 4 }), 0)).toBe('blank,blank,crossed,blank,blank');
  });

  it('ne remplit que les cases vides quand on démarre sur une case vide', () => {
    const grid = createGrid(4, 1);
    grid[0] = ['blank', 'crossed', 'filled', 'blank'];
    const stroke = beginStroke(grid, { row: 0, col: 0 }, 'filled');
    expect(row(strokeTo(stroke, { row: 0, col: 3 }), 0)).toBe('filled,crossed,filled,filled');
  });

  it('pose des croix avec l’outil croix, et les retire en re-cliquant', () => {
    const grid = createGrid(3, 1);
    const marked = strokeTo(beginStroke(grid, { row: 0, col: 0 }, 'crossed'), { row: 0, col: 2 });
    expect(row(marked, 0)).toBe('crossed,crossed,crossed');
    const cleared = strokeTo(beginStroke(marked, { row: 0, col: 0 }, 'crossed'), {
      row: 0,
      col: 2,
    });
    expect(row(cleared, 0)).toBe('blank,blank,blank');
  });

  it('ignore les positions hors grille', () => {
    const stroke = beginStroke(createGrid(3, 3), { row: 1, col: 1 }, 'filled');
    const result = strokeTo(stroke, { row: 1, col: 9 });
    expect(row(result, 1)).toBe('blank,filled,filled');
  });

  it('gridsEqual compare le contenu', () => {
    expect(gridsEqual(createGrid(2, 2), createGrid(2, 2))).toBe(true);
    const other = createGrid(2, 2);
    other[0]![0] = 'filled';
    expect(gridsEqual(createGrid(2, 2), other)).toBe(false);
  });
});
