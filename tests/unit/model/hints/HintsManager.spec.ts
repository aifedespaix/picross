import {HintsManager} from '@/model/Hints/HintsManager';
import {GameGridModel} from '@/model/Game/GameGrid.model';
import {SquareState} from '@/model/Square/SquareState';

describe('HintsManager', () => {
  const cols = 20;
  const rows = cols;

  let hintManager: HintsManager;
  const grid = new GameGridModel();
  grid.setComp(cols, rows, SquareState.Close);
  for (let i = 0; i < cols; i++) {
    grid.setValue({col: i, row: i}, SquareState.Value);

  }

  beforeEach(() => {
    hintManager = new HintsManager(grid);
  });

  it('should hints length long as grid', () => {
    expect(hintManager.rowHints.length).toEqual(rows);
    expect(hintManager.colHints.length).toEqual(cols);
  });

  it('should hints good initialized', () => {
    for (let col = 0; col < cols; col++) {
      expect(hintManager.colHints[col].hints.length).toEqual(1);
      expect(hintManager.colHints[col].hints[0].value).toEqual(1);
      expect(hintManager.colHints[col].hints[0].valid).toEqual(false);
    }
    for (let row = 0; row < rows; row++) {
      expect(hintManager.rowHints[row].hints.length).toEqual(1);
      expect(hintManager.rowHints[row].hints[0].value).toEqual(1);
      expect(hintManager.rowHints[row].hints[0].valid).toEqual(false);
    }
  });
});
