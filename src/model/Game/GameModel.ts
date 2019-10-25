import {IDirection} from '@/model/Game/IDirection';
import {SquareState} from '@/model/Square/SquareState';
import {IGridPosition} from '@/model/Square/IGridPosition';
import {GameGridModel} from '@/model/Game/GameGrid.model';
import _ from 'lodash';
import {soundModule} from '@/store/modules/Sound';
import {GameSounds} from '@/store/modules/GameSounds';
import {HintsManager} from '@/model/Hints/HintsManager';

export enum GameMode {
  Play,
  Create,
}

interface IGame {
  loaded: boolean;
  gameGrid: GameGridModel;
  hintsManager: HintsManager;
}

export abstract class GameModel implements IGame {

  get hintsManager(): HintsManager {
    return this._hintsManager;
  }

  get loaded(): boolean {
    return this._loaded;
  }

  get gameGrid(): GameGridModel {
    return this._gameGrid;
  }

  protected get positionFrom(): IGridPosition {
    return this._positionFrom;
  }

  protected stateToClose: SquareState; // todo rename closingState
  protected usingState: SquareState; // todo rename placingState

  protected _loaded: boolean;

  private _hintsManager: HintsManager;
  private direction: IDirection;
  private haveToCalcDirection: boolean;
  private isPlacing: boolean;
  private readonly _history: GameGridModel[];

  private _gameGrid: GameGridModel;

  private _positionFrom: IGridPosition; // todo rename placingFrom

  constructor() {
    this._gameGrid = new GameGridModel();

    this.direction = IDirection.None;
    this.haveToCalcDirection = false;

    this.isPlacing = false;
    this._positionFrom = {col: -1, row: -1};
    this.stateToClose = SquareState.Close;
    this.usingState = SquareState.Value;
    this._hintsManager = new HintsManager(this.gameGrid);

    this._history = [];

    this._loaded = false;
  }

  public abstract newGame(params: object): void;

  public startPlacing(position: IGridPosition) {
    this.isPlacing = true;
    this._positionFrom = position;
    this.haveToCalcDirection = true;

    this._history.push(_.cloneDeep(this.gameGrid));
    this.prepareUsingState();
    this.changeStatesTo(position);
  }

  public changeStatesTo(position: IGridPosition) {
    if (!this.isPlacing) {
      return;
    }

    if (this.haveToCalcDirection && !_.isEqual(position, this._positionFrom)) {
      this.direction = position.col !== this._positionFrom.col ? IDirection.Horizontal : IDirection.Vertical;
      this.haveToCalcDirection = false;
    }

    this.changeStates(this._positionFrom, position, this.usingState, this.stateToClose, this.direction);
  }

  public isRevertable() {
    return this._history && this._history.length;
  }

  public undo() {
    if (!this.isRevertable) {
      this.gameGrid.clearValues();
    } else {
      this.gameGrid.copyValues(this._history.pop() as GameGridModel);
    }

    soundModule.playSound(Math.random() > .5 ? GameSounds.UNDO : GameSounds.UNDO_2).then();
  }

  public stopPlacing() {
    this.isPlacing = false;
  }

  protected abstract postEachChange(position: IGridPosition): void;

  protected prepareUsingState() {
    const actualPositionState = this.gameGrid.getValue(this._positionFrom);

    if (actualPositionState === SquareState.Close) {
      this.usingState = SquareState.Value;
      this.stateToClose = SquareState.Close;
    } else {
      this.usingState = SquareState.Close;
      this.stateToClose = SquareState.Value;
    }
  }

  private changeStates(
    from: IGridPosition,
    to: IGridPosition,
    usingState: SquareState,
    stateToClose: SquareState,
    direction: IDirection,
  ) {
    const inlineTo = {} as IGridPosition;

    let length = 0;
    let colCoef = 0; // Coefficient === 0, -1 or 1, used to factorise gameGrid browsing
    let rowCoef = 0; // Coefficient === 0, -1 or 1, used to factorise gameGrid browsing

    if (direction === IDirection.Horizontal) {
      inlineTo.row = from.row;
      inlineTo.col = to.col;

      length = to.col - from.col;
      colCoef = length > 0 ? 1 : -1;
    } else {
      inlineTo.row = to.row;
      inlineTo.col = from.col;

      length = to.row - from.row;
      rowCoef = length > 0 ? 1 : -1;
    }

    // Foreach case between from and to
    for (let i = 0; i <= Math.abs(length); i++) {
      const actualPosition = {
        col: from.col + i * colCoef,
        row: from.row + i * rowCoef,
      } as IGridPosition;

      // If Set close state or Actual square is close or first is the square --> use the activated State
      const actualGridState = this.gameGrid.getValue(actualPosition);
      if ((usingState !== SquareState.Close && actualGridState === SquareState.Close)
        || (usingState === SquareState.Close && actualGridState === stateToClose)
        || (
          actualGridState !== SquareState.Close
          && actualGridState !== usingState
          && actualGridState === stateToClose
        )
      ) {
        this.gameGrid.setValue(actualPosition, usingState);
        soundModule.playSquareStateSound(this.usingState);
      }
      this.postEachChange(actualPosition);
    }

  }
}
