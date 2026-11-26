import { describe, expect, it, vi } from 'vitest';
import { ref } from 'vue';
import { createGrid } from '@/domain/grid';
import { useBoard } from './useBoard';

describe('useBoard', () => {
  it('peint un trait puis l’annule en une seule étape', () => {
    const board = useBoard(createGrid(5, 1));
    board.begin({ row: 0, col: 0 });
    board.move({ row: 0, col: 3 });
    board.end();
    expect(board.cells.value[0]).toEqual(['filled', 'filled', 'filled', 'filled', 'blank']);
    expect(board.canUndo.value).toBe(true);

    expect(board.undo()).toBe(true);
    expect(board.cells.value[0]).toEqual(Array(5).fill('blank'));
    expect(board.canUndo.value).toBe(false);
    expect(board.undo()).toBe(false);
  });

  it('n’ajoute pas d’historique quand rien ne change', () => {
    const board = useBoard(createGrid(3, 1));
    board.begin({ row: 0, col: 0 }, 'crossed');
    board.end();
    board.toggleAt({ row: 0, col: 0 }, 'crossed'); // re-clic : efface
    expect(board.cells.value[0]![0]).toBe('blank');
    expect(board.canUndo.value).toBe(true);
    board.undo();
    board.undo();
    expect(board.canUndo.value).toBe(false);
  });

  it('ignore toute action quand la grille est verrouillée', () => {
    const locked = ref(false);
    const board = useBoard(createGrid(3, 1), { locked });
    board.toggleAt({ row: 0, col: 0 });
    locked.value = true;
    board.toggleAt({ row: 0, col: 1 });
    expect(board.cells.value[0]).toEqual(['filled', 'blank', 'blank']);
    expect(board.undo()).toBe(false);
  });

  it('notifie les changements et les sons de pose', () => {
    const onChange = vi.fn();
    const onPaint = vi.fn();
    const board = useBoard(createGrid(3, 1), { onChange, onPaint });
    board.begin({ row: 0, col: 0 });
    board.move({ row: 0, col: 0 }); // même case : aucun nouveau changement
    board.end();
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onPaint).toHaveBeenCalledWith(['filled']);
  });

  it('signale chaque case modifiée par un trait', () => {
    const onPaint = vi.fn();
    const board = useBoard(createGrid(6, 1), { onPaint });
    board.begin({ row: 0, col: 0 });
    board.move({ row: 0, col: 5 });
    board.end();
    expect(onPaint).toHaveBeenLastCalledWith(Array(5).fill('filled'));
  });

  it('un redimensionnement checkpointé est annulable', () => {
    const board = useBoard(createGrid(3, 3));
    board.checkpoint();
    board.load(createGrid(5, 5), { keepHistory: true });
    expect(board.cells.value).toHaveLength(5);
    board.undo();
    expect(board.cells.value).toHaveLength(3);
  });
});
