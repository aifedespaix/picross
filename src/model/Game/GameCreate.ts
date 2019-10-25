import {SquareState} from '@/model/Square/SquareState';
import {GameModel} from '@/model/Game/GameModel';
import {IGridPosition} from '@/model/Square/IGridPosition';
import {GqlPicross} from '@/api/Picross';

export class GameCreateModel extends GameModel {

  public async save() {
    const {data} = await GqlPicross.savePicross(this.gameGrid.export());
    if (!data) {
      return false;
    }
    return data;
  }

  public changeSize(cols: number, rows: number) {
    this.gameGrid.setCols(cols, SquareState.Close);
    this.gameGrid.setRows(rows, SquareState.Close);
    this.hintsManager.init(this.gameGrid);
  }

  public newGame({cols, rows}: { cols: number, rows: number }) {
    this.gameGrid.reinit(cols, rows, SquareState.Close);
    this.hintsManager.init(this.gameGrid);
    this._loaded = true;
  }

  protected postEachChange(position: IGridPosition) {
    this.hintsManager.initToPosition(position, this.gameGrid);
  }

}
