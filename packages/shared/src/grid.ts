/**
 * Représentation d'une solution de picross : une matrice de booléens
 * (`true` = case pleine). C'est le format manipulé par le jeu ; la base de
 * données stocke la même chose sous forme de JSON `number[][]` (0 / 1).
 */
export type Solution = boolean[][];

/** Taille minimale / maximale (en cases) d'un côté de la grille. */
export const MIN_SIZE = 3;
export const MAX_SIZE = 15;

/** Une grille doit avoir plus d'1/5 de cases pleines pour être intéressante. */
export const MIN_FILL_RATIO = 0.2;

export function gridWidth(solution: Solution): number {
  return solution[0]?.length ?? 0;
}

export function gridHeight(solution: Solution): number {
  return solution.length;
}

export function countFilled(solution: Solution): number {
  let total = 0;
  for (const row of solution) for (const cell of row) if (cell) total++;
  return total;
}

/** Convertit une matrice de 0 / 1 (format d'API) en solution booléenne. */
export function fromBits(bits: readonly (readonly number[])[]): Solution {
  return bits.map((row) => row.map((bit) => bit === 1));
}

export function toBits(solution: Solution): (0 | 1)[][] {
  return solution.map((row) => row.map((cell) => (cell ? 1 : 0)));
}

/** Indices des blocs consécutifs d'une ligne : `[1,1,0,1]` -> `[2, 1]`. */
export function lineClues(line: readonly boolean[]): number[] {
  const clues: number[] = [];
  let run = 0;
  for (const filled of line) {
    if (filled) {
      run++;
    } else if (run > 0) {
      clues.push(run);
      run = 0;
    }
  }
  if (run > 0) clues.push(run);
  return clues;
}

export interface Clues {
  rows: number[][];
  cols: number[][];
}

export function computeClues(solution: Solution): Clues {
  const width = gridWidth(solution);
  const rows = solution.map((row) => lineClues(row));
  const cols: number[][] = [];
  for (let col = 0; col < width; col++) {
    cols.push(lineClues(solution.map((row) => row[col] ?? false)));
  }
  return { rows, cols };
}

/** Une grille est valide si elle est rectangulaire, dans les bornes et assez remplie. */
export function validateSolution(solution: Solution): string | null {
  const height = gridHeight(solution);
  const width = gridWidth(solution);
  if (height < MIN_SIZE || height > MAX_SIZE || width < MIN_SIZE || width > MAX_SIZE) {
    return 'size';
  }
  if (solution.some((row) => row.length !== width)) return 'shape';
  if (countFilled(solution) <= width * height * MIN_FILL_RATIO) return 'fill';
  return null;
}
