import {IGridPosition} from '@/model/Square/IGridPosition';
import {GameGridModel} from '@/model/Game/GameGrid.model';
import HintsModel from '@/components/Picross/Hints/Hints.model';

interface IHintsManager {
  colHints: HintsModel[];
  rowHints: HintsModel[];
}

export class HintsManager implements IHintsManager {

  get colHints(): HintsModel[] {
    return this._colHints;
  }

  get rowHints(): HintsModel[] {
    return this._rowHints;
  }

  private _colHints: HintsModel[];

  private _rowHints: HintsModel[];

  constructor(grid: GameGridModel) {
    this._colHints = [];
    this._rowHints = [];
    this.init(grid);
  }

  public isHintsValid() {
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

  public verify(position: IGridPosition, grid: GameGridModel) {
    this._colHints[position.col].verify(grid.getColumn(position.col));
    this._rowHints[position.row].verify(grid.getRow(position.row));
  }

  public init(grid: GameGridModel) {
    this._colHints = [];
    this._rowHints = [];
    for (let col = 0; col < grid.cols; col++) {
      this._colHints.push(new HintsModel(grid.getColumn(col)));
    }
    for (let row = 0; row < grid.rows; row++) {
      this._rowHints.push(new HintsModel(grid.getRow(row)));
    }
  }

  public initToPosition(position: IGridPosition, grid: GameGridModel) {
    this.colHints[position.col] = new HintsModel(grid.getColumn(position.col));
    this.rowHints[position.row] = new HintsModel(grid.getColumn(position.row));
  }
}
