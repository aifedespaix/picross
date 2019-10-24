import {SquareState} from '@/model/Square/SquareState';
import {GameModel} from '@/model/Game/GameModel';
import {HintsManager} from '@/model/Hints/HintsManager';
import {IGridPosition} from '@/model/Square/IGridPosition';
import {GqlPicross} from '@/api/Picross';

export class GameCreateModel extends GameModel {

  get hintsManager(): HintsManager {
    return this._hintsManager;
  }

  private _hintsManager: HintsManager;

  constructor() {
    super();
    this._hintsManager = new HintsManager(this.gameGrid);
  }

  public save() {
    GqlPicross.savePicross(this.gameGrid.export());
  }

  public newGame(cols: number, rows: number) {
    this.gameGrid.reinit(cols, rows, SquareState.Close);
    this._hintsManager.init(this.gameGrid);
    this._loaded = true;
  }

  protected postEachChange(position: IGridPosition) {
    this.hintsManager.initToPosition(position, this.gameGrid);
  }

}
