import {GameGridModel} from '@/model/Game/GameGrid.model';
import {SquareState} from '@/model/Square/SquareState';

describe('GameGridModel', () => {
  function randomValue(max: number) {
    return Math.floor(Math.random() * max);
  }

  const cols = randomValue(20) + 5;
  const rows = randomValue(20) + 5;

  it('import / export', () => {
    const gameGrid = new GameGridModel();
    gameGrid.setComp(cols, rows, SquareState.Close);

    for (let i = 0; i < randomValue(20) + 10; i++) {
      gameGrid.setValue({
        col: randomValue(cols),
        row: randomValue(rows),
      }, SquareState.Value);
    }

    const exported = gameGrid.export();

    const newGamegrid = new GameGridModel();
    newGamegrid.importFromString(exported);

    expect(gameGrid).toEqual(newGamegrid);
  });
});
