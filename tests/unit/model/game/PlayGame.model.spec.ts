import {SquareState} from '@/model/Square/SquareState';
import {GamePlayModel} from '@/model/Game/GamePlay';

describe('PlayGameModel', () => {

  let gamePlay: GamePlayModel;
  const cols = 2;
  const rows = 2;

  beforeEach(() => {
    gamePlay = new GamePlayModel();
  });

  it('should place square state in first case', () => {
    gamePlay.gameGrid.setComp(cols, rows, SquareState.Close);
    gamePlay.startPlacing({col: 0, row: 0});
    gamePlay.stopPlacing();
    expect(gamePlay.gameGrid.getValue({col: 0, row: 0})).toEqual(SquareState.Value);
    expect(gamePlay.gameGrid.getValue({col: 0, row: 1})).toEqual(SquareState.Close);
    expect(gamePlay.gameGrid.getValue({col: 1, row: 0})).toEqual(SquareState.Close);
  });
});
