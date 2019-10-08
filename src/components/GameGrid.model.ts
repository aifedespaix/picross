import {SquarePosition} from '@/components/SquarePosition';
import {SquareState} from '@/components/SquareState';

export class GameGridModel {

  public states = [] as number[][];

  constructor(states: number[][]) {
    this.states = states;
  }

  get cols() {
    return this.states[0].length;
  }

  get rows() {
    return this.states.length;
  }

  public initEmpty(cols: number, rows: number) {
    this.states = [] as number[][];
    for (let row = 0; row < rows; row++) {
      const gameRow = [] as number[];
      for (let col = 0; col < cols; col++) {
        gameRow.push(SquareState.Close);
      }
      this.states.push(gameRow);
    }
  }

  public getColumn(col: number) {
    const columnList = [] as number[];
    for (const row of this.states) {
      columnList.push(row[col]);
    }
    return columnList;
  }


  public getRow(row: number) {
    const rowList = [] as number[];
    for (let col = 0; col < this.states[0].length; col++) {
      rowList.push(this.states[row][col]);
    }
    return rowList;
  }

  public getState(position: SquarePosition) {
    return this.states[position.row][position.col];
  }

  public setState(position: SquarePosition, state: SquareState) {
    if (position.col < this.cols && position.row < this.rows) {
      this.states[position.row][position.col] = state;
    }
  }

  public countSquareState(state: SquareState) {
    let counter = 0;
    for (const row of this.states) {
      for (const square of row) {
        if (square === state) {
          counter++;
        }
      }
    }
    return counter;
  }

}
