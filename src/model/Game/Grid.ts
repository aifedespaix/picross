import { IGridPosition } from '@/model/Square/IGridPosition';
import * as _ from 'lodash';

export enum GridComp {
  Col,
  Row,
}

export class Grid<T> {

  private readonly _objects: T[][];

  get objects(): T[][] {
    return this._objects;
  }

  constructor(fill: T, cols: number = 1, rows: number = 1) {
    this._objects = [];
    this._objects.push([fill]);
    this.setComp(cols, rows, fill);
  }

  get cols() {
    return this._objects.length > 0 ? this._objects[0].length : 0;
  }

  get rows() {
    return this._objects.length;
  }

  public getCssGridStyle(gridComp: GridComp) {
    if (gridComp === GridComp.Col) {
      return `repeat(${this.cols}, 1fr)`;
    } else if (gridComp === GridComp.Row) {
      return `repeat(${this.rows}, 1fr)`;
    } else {
      throw Error('Impossible Grid');
    }
  }

  public setComp(cols: number, rows: number, fill: T) {
    this.setCols(cols, fill);
    this.setRows(rows, fill);
  }

  public setRows(rows: number, fill: T) {
    const movingRows = rows - this.rows;

    for (let i = 0; i < Math.abs(movingRows); i++) {
      if (movingRows > 0) {
        this.addRow(fill);
      } else {
        this.removeRow();
      }
    }
  }

  public addRow(value: T) {
    const row = this._objects[0] ? _.clone(this._objects[0]) : [value];
    row.fill(value);
    this._objects.push(row);
  }

  public removeRow() {
    if (this.rows > 1) {
      this._objects.pop();
    }
  }

  public setCols(cols: number, fill: T) {
    const movingCols = cols - this.cols;
    if (this.rows === 0) {
      this.addRow(fill);
    }

    for (let i = 0; i < Math.abs(movingCols); i++) {
      if (movingCols > 0) {
        this.addCol(fill);
      } else {
        this.removeCol();
      }
    }
  }

  public addCol(value: T) {
    for (let row = 0; row < this.rows; row++) {
      this._objects[row].push(value);
    }
  }

  public removeCol() {
    if (this.cols > 1) {
      for (let row = 0; row < this.rows; row++) {
        this._objects[row].pop();
      }
    }
  }

  public countValue(value: T) {
    let counter = 0;
    if (this._objects.length) {
      for (const row of this._objects) {
        for (const compare of row) {
          if (_.isEqual(compare, value)) {
            counter++;
          }
        }
      }
    }

    return counter;
  }

  public setValue(position: IGridPosition, value: T) {
    if (this.isValidPosition(position)) {
      this._objects[position.row][position.col] = value;
    }
  }

  public getValue(position: IGridPosition) {
    if (this.isValidPosition(position)) {
      return this._objects[position.row][position.col];
    }
  }

  public getColumn(col: number) {
    const columnList = [] as T[];

    if (this.isValidCol(col)) {
      for (const row of this._objects) {
        columnList.push(row[col]);
      }
    }
    return columnList;
  }

  public getRow(row: number) {
    return this.isValidRow(row) ? _.cloneDeep(this._objects[row]) : [];
  }

  public reinit(cols: number, rows: number, value: T) {
    this.reset(value);
    this.setCols(cols, value); // cols first, faster
    this.setRows(rows, value);
  }

  public copyValues(grid: Grid<T>) {
    for (let row = 0; row < grid.rows; row++) {
      for (let col = 0; col < grid.cols; col++) {
        this._objects[row][col] = _.cloneDeep(grid.getValue({col, row})) as T;
      }
    }
  }

  protected import(grid: T[][]) {
    const rows = grid.length;
    if (!rows) {
      return false;
    }

    const cols = grid[0].length;
    if (!cols) {
      return false;
    }

    this.setComp(cols, rows, {} as T);
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        this._objects[row][col] = _.cloneDeep(grid[row][col]);
      }
    }

    return true;
  }

  protected reset(value: T) {
    this.setRows(1, value); // row first, faster
    this.setCols(1, value);
    this.setValue({col: 0, row: 0}, value);
  }

  private isValidPosition(position: IGridPosition) {
    return this.isValidCol(position.col) && this.isValidRow(position.row);
  }

  private isValidCol(col: number) {
    return col >= 0 && col < this.cols;
  }

  private isValidRow(row: number) {
    return row >= 0 && row < this.rows;
  }

}
