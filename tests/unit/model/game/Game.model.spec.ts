import {GameModel} from '@/model/Game/GameModel';
import {SquareState} from '@/model/Square/SquareState';
import {IGridPosition} from '@/model/Square/IGridPosition';

describe('GameModel', () => {
  class GameModelSpec extends GameModel {

    public newGame(params: object): void {
      return;
    }

    protected postEachChange(position: IGridPosition): void {
      return;
    }
  }

  let game: GameModelSpec;
  const cols = 25;
  const rows = 10;

  beforeEach(() => {
    game = new GameModelSpec();
  });

  it('should place square state in first case', () => {
    game.gameGrid.setComp(cols, rows, SquareState.Close);
    game.startPlacing({col: 0, row: 0});
    game.stopPlacing();
    expect(game.gameGrid.getValue({col: 0, row: 0})).toEqual(SquareState.Value);
    expect(game.gameGrid.getValue({col: 0, row: 1})).toEqual(SquareState.Close);
    expect(game.gameGrid.getValue({col: 1, row: 0})).toEqual(SquareState.Close);
  });

  it('should place square state in last row', () => {
    game.gameGrid.setComp(cols, rows, SquareState.Close);
    game.startPlacing({col: 0, row: rows - 1});
    game.changeStatesTo({col: cols, row: rows - 1});
    game.stopPlacing();
    for (let col = 0; col < cols; col++) {
      expect(game.gameGrid.getValue({col, row: rows - 1})).toEqual(SquareState.Value);
    }
  });
});
