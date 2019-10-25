import {SquareState} from '@/model/Square/SquareState';
import {GameModel} from '@/model/Game/GameModel';
import testPicross from '@/assets/maps/example';
import {GameGridModel} from '@/model/Game/GameGrid.model';
import {GqlPicross} from '@/api/Picross';
import {IGridPosition} from '@/model/Square/IGridPosition';
import {soundModule} from '@/store/modules/Sound';
import {GameSounds} from '@/store/modules/GameSounds';

interface IGamePlay {
  win: boolean;
  actualState: SquareState;
  started: boolean;
}

export class GamePlayModel extends GameModel implements IGamePlay {

  get solutionGrid(): GameGridModel {
    return this._solutionGrid;
  }

  get started(): boolean {
    return this._started;
  }

  get actualState(): SquareState {
    return this._actualState;
  }

  set actualState(state: SquareState) {
    this._actualState = state;
  }

  get win(): boolean {
    return this._win;
  }

  private _solutionGrid: GameGridModel;

  private _started: boolean;

  private _actualState: SquareState;

  private _win: boolean;

  constructor() {
    super();

    this._actualState = SquareState.Value;
    this._win = false;
    this._started = false;

    this._solutionGrid = new GameGridModel();
  }

  public async newGame() {
    const result = await GqlPicross.loadRandomPicross();
    const imported = result.picross ? result.picross.map : testPicross;
    this._solutionGrid.importFromString(imported);
    this.hintsManager.init(this._solutionGrid);

    this.gameGrid.reinit(this._solutionGrid.cols, this._solutionGrid.rows, SquareState.Close);

    this._actualState = SquareState.Value;
    this._win = false;
    this._loaded = true;
  }

  public startPlacing(position: IGridPosition) {
    if (!this._started) {
      this._started = true;
    }
    super.startPlacing(position);
  }

  public changeStatesTo(position: IGridPosition) {
    if (this.win) {
      return;
    }
    super.changeStatesTo(position);
    this.verifyWin();
  }

  public switchActualState() {
    this.actualState = this.actualState === SquareState.Value ? SquareState.Empty : SquareState.Value;
  }

  protected postEachChange(position: IGridPosition) {
    this.hintsManager.verify(position, this.gameGrid);
  }

  protected prepareUsingState() {
    const actualGridPositionState = this.gameGrid.getValue(this.positionFrom);

    if (actualGridPositionState === SquareState.Close) {
      this.usingState = this.actualState;
      this.stateToClose = SquareState.Close;
    } else {
      this.usingState = actualGridPositionState === this.actualState ? SquareState.Close : this.actualState;
      this.stateToClose = actualGridPositionState as SquareState;
    }
  }

  private verifyWin() {
    if (this.gameGrid.countValue(SquareState.Value) === this._solutionGrid.countValue(SquareState.Value)
      && this.hintsManager.isHintsValid()) {
      this._win = true;
      soundModule.playSound(GameSounds.WIN).then();
    }
  }
}
