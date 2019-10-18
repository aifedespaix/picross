import {SquarePosition} from '@/components/Picross/Square/SquarePosition';
import {SquareState} from '@/components/Picross/Square/SquareState';
import * as _ from 'lodash';
import {Direction} from '@/store/modules/GamePlay';
import HintsModel from '@/components/Picross/Hints/Hints.model';
import {Vue} from 'vue-property-decorator';

export class GameGridModel {

  get colHints(): HintsModel[] {
    return this._colHints;
  }

  get rowHints(): HintsModel[] {
    return this._rowHints;
  }

  get states(): SquareState[][] {
    return this._states;
  }

  get squaresValued(): number {
    return this._squaresValued;
  }

  get cols() {
    return this._states.length > 0 ? this._states[0].length : 0;
  }

  get rows() {
    return this._states.length;
  }

  public static cloneEmpty(toClone: GameGridModel) {
    const clone = _.cloneDeep(toClone);
    clone.initEmpty(clone.cols, clone.rows);
    return clone;
  }

  private _colHints!: HintsModel[];

  private _rowHints!: HintsModel[];

  private _states = [] as SquareState[][];

  private _squaresValued!: number;

  constructor(states: SquareState[][]) {
    this._states = states;
    this.init();
  }

  public import(imported: string) {
    const encodedMap = JSON.parse(imported);
    const decodedMap = [] as SquareState[][];

    for (let row = 0; row < encodedMap.length; row++) {
      decodedMap.push([]);
      for (const encodedState of encodedMap[row]) {
        decodedMap[row].push(encodedState === 1 ? SquareState.Value : SquareState.Empty);
      }
    }
    this._states = decodedMap;

    this.init();
  }

  public init() {
    this._squaresValued = this.countSquareState(SquareState.Value);
    this.initHints();
  }

  public export() {
    const minifiedMap = [] as number[][];
    for (let row = 0; row < this._states.length; row++) {
      minifiedMap.push([]);
      for (const state of this._states[row]) {
        minifiedMap[row].push(state === SquareState.Value ? 1 : 0);
      }
    }

    return JSON.stringify(minifiedMap);
  }

  public resetEmpty() {
    this.initEmpty(this.cols, this.rows);
  }

  public initEmpty(cols: number, rows: number) {
    this._states = [] as SquareState[][];
    for (let row = 0; row < rows; row++) {
      const gameRow = [] as SquareState[];
      for (let col = 0; col < cols; col++) {
        gameRow.push(SquareState.Close);
      }
      this._states.push(gameRow);
    }

    this._squaresValued = 0;
  }

  public getColumn(col: number) {
    const columnList = [] as SquareState[];
    for (const row of this._states) {
      columnList.push(row[col]);
    }
    return columnList;
  }

  public getRow(row: number) {
    const rowList = [] as SquareState[];
    for (let col = 0; col < this._states[0].length; col++) {
      rowList.push(this._states[row][col]);
    }
    return rowList;
  }

  public getState(position: SquarePosition) {
    return this._states[position.row][position.col];
  }

  public setState(position: SquarePosition, state: SquareState) {
    if (position.col < this.cols && position.row < this.rows) {
      Vue.set(this._states[position.row], position.col, state);
    }
  }

  public countSquareState(state: SquareState) {
    let counter = 0;
    if (this._states.length) {
      for (const row of this._states) {
        for (const square of row) {
          if (square === state) {
            counter++;
          }
        }
      }
    }
    return counter;
  }

  public changeStates(
    from: SquarePosition,
    to: SquarePosition,
    usingState: SquareState,
    stateToClose: SquareState,
    direction: Direction,
  ) {
    const inlineTo = {} as SquarePosition;

    let length = 0;
    let colCoef = 0; // Coefficient === 0, -1 or 1, used to factorise gameGrid browsing
    let rowCoef = 0; // Coefficient === 0, -1 or 1, used to factorise gameGrid browsing

    if (direction === Direction.Horizontal) {
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
      } as SquarePosition;

      // If Set close state or Actual square is close or first is the square --> use the activated State
      const actualGridState = this.getState(actualPosition);
      if ((usingState !== SquareState.Close && actualGridState === SquareState.Close)
        || (usingState === SquareState.Close && actualGridState === stateToClose)
        || (
          actualGridState !== SquareState.Close
          && actualGridState !== usingState
          && actualGridState === stateToClose
        )
      ) {
        this.setState(actualPosition, usingState);
      }
      this.verifyHints(actualPosition);
    }

    this._squaresValued = this.countSquareState(SquareState.Value);
  }

  public isAllHintsValid() {
    let valid = true;

    for (const hints of this._colHints) {
      if (!hints.valid) {
        valid = false;
        break;
      }
    }

    for (const hints of this._rowHints) {
      if (!hints.valid) {
        valid = false;
        break;
      }
    }

    return valid;
  }

  private initHints() {
    this._colHints = [];
    this._rowHints = [];
    for (let col = 0; col < this.cols; col++) {
      this._colHints.push(new HintsModel(this.getColumn(col)));
    }
    for (let row = 0; row < this.rows; row++) {
      this._rowHints.push(new HintsModel(this.getRow(row)));
    }
  }

  private verifyHints(position: SquarePosition) {
    this._colHints[position.col].verify(this.getColumn(position.col));
    this._rowHints[position.row].verify(this.getRow(position.row));
  }
}
