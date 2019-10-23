import {Action, getModule, Module, Mutation, VuexModule} from 'vuex-module-decorators';
import store from '@/store';
import {SquareState} from '@/components/Picross/Square/SquareState';
import {GameGridModel} from '@/components/Picross/GameGrid/GameGrid.model';
import {SquarePosition} from '@/components/Picross/Square/SquarePosition';
import {soundModule} from '@/store/modules/Sound';
import _ from 'lodash';
import {GameSounds} from '@/store/modules/GameSounds';
import testPicross from '@/assets/maps/test';
import {graphqlClient} from '@/store/api';

interface PicrossModel {
  id: string;
  map: string;
}

interface PicrossQueryResult {
  picross: PicrossModel;
}

export enum Direction {
  Vertical,
  Horizontal,
}

export enum GameMode {
  Create,
  Play,
}

export interface IGamePlayState {
  ready: boolean;

  gameMode: GameMode;

  started: boolean;
  win: boolean;

  actualState: SquareState;
  usingState: SquareState;
  stateToClose: SquareState;

  haveToCalcDirection: boolean;
  direction: Direction;

  isPlacing: boolean;
  positionFrom: SquarePosition;

  playingGrid: GameGridModel;
  solutionGrid: GameGridModel;
}

@Module({
  namespaced: true,
  dynamic: true,
  name: 'gamePlay',
  store,
})
export class GamePlay extends VuexModule implements IGamePlayState {

  private _gameMode = GameMode.Play;

  get gameMode(): GameMode {
    return this._gameMode;
  }

  private _ready = false;

  get ready(): boolean {
    return this._ready;
  }

  private _actualState = SquareState.Value;

  get actualState(): SquareState {
    return this._actualState;
  }

  private _usingState = SquareState.Value;

  get usingState(): SquareState {
    return this._usingState;
  }

  private _playingGrid = {} as GameGridModel;

  get playingGrid(): GameGridModel {
    return this._playingGrid;
  }

  private _solutionGrid = {} as GameGridModel;

  get solutionGrid(): GameGridModel {
    return this._solutionGrid;
  }

  private _isPlacing = false;

  get isPlacing(): boolean {
    return this._isPlacing;
  }

  private _positionFrom = {} as SquarePosition;

  get positionFrom(): SquarePosition {
    return this._positionFrom;
  }

  private _direction = {} as Direction;

  get direction(): Direction {
    return this._direction;
  }

  private _haveToCalcDirection = false;

  get haveToCalcDirection(): boolean {
    return this._haveToCalcDirection;
  }

  private _stateToClose = {} as SquareState;

  get stateToClose(): SquareState {
    return this._stateToClose;
  }

  private _started = false;

  get started(): boolean {
    return this._started;
  }

  private _win = false;

  get win(): boolean {
    return this._win;
  }

  get isRevertable() {
    return this._history && this._history.length;
  }

  private _history = [] as GameGridModel[];

  protected get history(): GameGridModel[] {
    return this._history;
  }

  @Action
  public resetPlayingGrid() {
    this.playingGrid.resetEmpty();
  }

  @Action
  public changeSquareState(position: SquarePosition) {
    this.playingGrid.setState(position, this.usingState);
    soundModule.playSquareStateSound(this.usingState);
  }

  @Action
  public switchStateMode() {
    this.SET_ACTUAL_STATE(this.actualState === SquareState.Value ? SquareState.Empty : SquareState.Value);
  }

  @Action
  public setActualState(state: SquareState) {
    this.SET_ACTUAL_STATE(state);
  }

  @Action
  public async newGame() {
    this.SET_GAME_MODE(GameMode.Play);
    await this.loadRandomPicross();
  }

  @Action({rawError: true})
  public async newCreator(init: { cols: number, rows: number }) {
    this.SET_GAME_MODE(GameMode.Create);
    const gameGrid = new GameGridModel([]);
    gameGrid.addRows(init.rows);
    gameGrid.addCols(init.cols - 1);
    gameGrid.init();

    this.SET_SOLUTION_GRID(gameGrid);
    this.SET_PLAYING_GRID(gameGrid);
    this.SET_READY(true);
  }

  @Action
  public async loadPicrossById(id: string) {
    const query = `{
        picross(id: "${id}") {
          id
          map
        }
      }`;

    await this.loadPicrossByQuery(query);
  }


  @Action
  public async loadRandomPicross() {
    const query = `{
        picross {
          id
          map
        }
      }`;

    this.loadPicrossByQuery(query);
  }

  @Action
  public setUsingState(squareState: SquareState) {
    this.SET_USING_STATE(squareState);
  }

  @Action
  public startPlacing(position: SquarePosition) {
    this.SET_IS_PLACING(true);
    this.SET_POSITION_FROM(position);
    this.SET_HAVE_TO_CALC_DIRECTION(true);

    this.prepareActiveState();
    this._history.push(_.cloneDeep(this.playingGrid));

    if (!this.started) {
      this.SET_STARTED(true);
    }

    this.changeStatesTo(position);
  }

  @Action
  public stopPlacing() {
    this.SET_IS_PLACING(false);
  }

  @Action
  public undo() {
    if (!this.isRevertable) {
      this.playingGrid.resetEmpty();
    } else {
      this.SET_PLAYING_GRID(this.history.pop() as GameGridModel);
    }

    soundModule.playSound(Math.random() > .5 ? GameSounds.UNDO : GameSounds.UNDO_2).then();
  }

  @Action({rawError: true})
  public changeStatesTo(position: SquarePosition) {
    if (!this.isPlacing || this.win) {
      return;
    }

    if (this.haveToCalcDirection && !_.isEqual(position, this.positionFrom)) {
      this.SET_DIRECTION(position.col !== this.positionFrom.col ? Direction.Horizontal : Direction.Vertical);
      this.SET_HAVE_TO_CALC_DIRECTION(false);
    }

    this.playingGrid.changeStates(this.positionFrom, position, this.usingState, this.stateToClose, this.direction);
    this.verifyWin();
  }

  @Action
  private async loadPicrossByQuery(query: string) {
    const result = await graphqlClient.request<PicrossQueryResult>(query);
    const imported = result.picross ? result.picross.map : testPicross;

    const gameGrid = new GameGridModel([]);
    gameGrid.import(imported);

    this.SET_SOLUTION_GRID(gameGrid);
    this.SET_PLAYING_GRID(GameGridModel.cloneEmpty(gameGrid));
    this.SET_READY(true);
  }

  @Action
  private async savePicross(picross: GameGridModel): Promise<PicrossModel> {
    const mutation = `
    mutation createPicross($map: String!) {
       createPicross(map: $map) {id}
    }
  `;

    const saved = await graphqlClient.request<PicrossQueryResult>(mutation, {map: picross.export()});
    return saved.picross;
  }

  @Action
  private verifyWin() {
    if (this.playingGrid.squaresValued === this.solutionGrid.squaresValued && this.playingGrid.isAllHintsValid()) {
      this.SET_WIN(true);
      soundModule.playSound(GameSounds.WIN).then();
    }
  }

  @Action({rawError: true})
  private prepareActiveState() {
    const actualGridPositionState = this.playingGrid.getState(this.positionFrom);

    if (actualGridPositionState === SquareState.Close) {
      this.SET_USING_STATE(this.actualState);
      this.SET_STATE_TO_CLOSE(SquareState.Close);
    } else {
      this.SET_USING_STATE(actualGridPositionState === this.actualState ? SquareState.Close : this.actualState);
      this.SET_STATE_TO_CLOSE(actualGridPositionState);
    }
  }

  @Mutation
  private SET_SOLUTION_GRID(solutionGrid: GameGridModel) {
    this._solutionGrid = solutionGrid;
  }

  @Mutation
  private SET_PLAYING_GRID(playingGrid: GameGridModel) {
    this._playingGrid = playingGrid;
  }

  @Mutation
  private SET_READY(ready: boolean) {
    this._ready = ready;
  }

  @Mutation
  private SET_ACTUAL_STATE(state: SquareState) {
    this._actualState = state;
  }

  @Mutation
  private SET_USING_STATE(state: SquareState) {
    this._usingState = state;
  }

  @Mutation
  private SET_POSITION_FROM(position: SquarePosition) {
    this._positionFrom = position;
  }

  @Mutation
  private SET_IS_PLACING(isPlacing: boolean) {
    this._isPlacing = isPlacing;
  }

  @Mutation
  private SET_HAVE_TO_CALC_DIRECTION(haveToCalcDirection: boolean) {
    this._haveToCalcDirection = haveToCalcDirection;
  }

  @Mutation
  private SET_STATE_TO_CLOSE(squareState: SquareState) {
    this._stateToClose = squareState;
  }

  @Mutation
  private SET_STARTED(started: boolean) {
    this._started = started;
  }

  @Mutation
  private SET_DIRECTION(direction: Direction) {
    this._direction = direction;
  }

  @Mutation
  private SET_WIN(win: boolean) {
    this._win = win;
  }

  @Mutation
  private SET_GAME_MODE(gameMode: GameMode) {
    this._gameMode = gameMode;
  }

}

export const gamePlayModule = getModule(GamePlay);
