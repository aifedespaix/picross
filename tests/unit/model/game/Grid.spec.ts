import {Grid, GridComp} from '@/model/Game/Grid';
import {SquareState} from '@/model/Square/SquareState';
import {IGridPosition} from '@/model/Square/IGridPosition';
import _ from 'lodash';

describe('Grid', () => {
  describe('constructor', () => {
    it('should create 2x2  grid', () => {
      const grid = new Grid<SquareState>(SquareState.Close, 2, 2);
      expect(grid.cols).toEqual(2);
      expect(grid.rows).toEqual(2);
    });
    it('should create 50x1  grid', () => {
      const grid = new Grid<SquareState>(SquareState.Close, 50, 1);
      expect(grid.cols).toEqual(50);
      expect(grid.rows).toEqual(1);
    });
    it('should create 1x50  grid', () => {
      const grid = new Grid<SquareState>(SquareState.Close, 1, 50);
      expect(grid.cols).toEqual(1);
      expect(grid.rows).toEqual(50);
    });
    it('should create 1x1  grid', () => {
      const grid = new Grid<SquareState>(SquareState.Close, -1, -1);
      expect(grid.cols).toEqual(1);
      expect(grid.rows).toEqual(1);
    });
    it('should create 1x1  grid', () => {
      const grid = new Grid<SquareState>(SquareState.Close, -100, -100);
      expect(grid.cols).toEqual(1);
      expect(grid.rows).toEqual(1);
    });
  });

  describe('Grid cols and rows', () => {
    let grid: Grid<SquareState>;
    const cols = 10;
    const rows = 12;

    beforeEach(() => {
      grid = new Grid<SquareState>(SquareState.Empty, cols, rows);
    });

    it('should have 2 colmuns', () => {
      grid.setCols(2, SquareState.Empty);
      expect(grid.cols).toEqual(2);
    });

    it('should have 2 rows', () => {
      grid.setRows(2, SquareState.Empty);
      expect(grid.rows).toEqual(2);
    });

    it(`should have 2 rows and ${cols} cols`, () => {
      grid.setComp(cols, 2, SquareState.Empty);
      expect(grid.rows).toEqual(2);
      expect(grid.cols).toEqual(cols);
    });

    describe('getCssGridStyle', () => {
      it('should return col style', () => {
        grid.setCols(250, SquareState.Empty);
        expect(grid.getCssGridStyle(GridComp.Col)).toEqual('repeat(250, 1fr)');
      });
      it('should return row style', () => {
        grid.setRows(250, SquareState.Empty);
        expect(grid.getCssGridStyle(GridComp.Row)).toEqual('repeat(250, 1fr)');
      });
    });

    describe('getValue', () => {

      it('should place state precisely', () => {
        const position: IGridPosition = {col: 3, row: 5};
        const objects = _.cloneDeep((grid as any)._objects);

        grid.setValue(position, SquareState.Value);
        objects[position.row][position.col] = SquareState.Value;

        expect(grid.getValue(position)).toEqual(objects[position.row][position.col]);
      });

      it('should place state precisely', () => {
        const position: IGridPosition = {
          col: 1,
          row: 1,
        };
        grid.setValue(position, SquareState.Value);
        expect(grid.getValue(position)).toEqual(SquareState.Value);
      });

      it('should place state precisely', () => {
        const position: IGridPosition = {
          col: 9,
          row: 9,
        };
        grid.setValue(position, SquareState.Value);
        expect(grid.getValue(position)).toEqual(SquareState.Value);
      });

      it('should place state precisely', () => {
        const position: IGridPosition = {
          col: 5,
          row: 8,
        };
        grid.setValue(position, SquareState.Value);
        expect(grid.getValue(position)).toEqual(SquareState.Value);
      });

      it('should not place to bad position', () => {
        const position: IGridPosition = {
          col: cols,
          row: rows,
        };
        grid.setValue(position, SquareState.Value);
        expect(grid.getValue(position)).toEqual(undefined);
      });

      it('should not place to bad negative position', () => {
        const position: IGridPosition = {
          col: -10,
          row: -10,
        };
        grid.setValue(position, SquareState.Value);
        expect(grid.getValue(position)).toEqual(undefined);
      });
    });

    describe('countValue', () => {
      it('should count 0 value', () => {
        expect(grid.countValue(SquareState.Value)).toEqual(0);
      });
      it('should count 1 value', () => {
        const position: IGridPosition = {col: 1, row: 1};
        grid.setValue(position, SquareState.Value);
        expect(grid.countValue(SquareState.Value)).toEqual(1);
      });
      it(`should count 10 values`, () => {
        for (let i = 0; i < 10; i++) {
          const position: IGridPosition = {col: i, row: 1};
          grid.setValue(position, SquareState.Value);
        }
        expect(grid.countValue(SquareState.Value)).toEqual(10);
      });
    });
    describe('getColmun', () => {
      const position: IGridPosition = {
        col: 2, row: 3,
      };
      let colmun: SquareState[];

      beforeEach(() => {
        colmun = [];
        for (let i = 0; i < rows; i++) {
          colmun.push(SquareState.Empty);
        }
      });

      it('should get good column length ', () => {
        expect(grid.getColumn(0).length).toEqual(rows);
      });

      it('should get first column', () => {
        expect(grid.getColumn(0)).toEqual(colmun);
      });

      it('should get column', () => {
        grid.setValue(position, SquareState.Value);
        colmun[position.row] = SquareState.Value;
        expect(grid.getColumn(position.col)).toEqual(colmun);
      });
    });
    describe('getColmun', () => {
      const position: IGridPosition = {
        col: 2, row: 3,
      };
      let row: SquareState[];

      beforeEach(() => {
        row = [];
        for (let i = 0; i < cols; i++) {
          row.push(SquareState.Empty);
        }
      });

      it('should get good row length ', () => {
        expect(grid.getRow(0).length).toEqual(cols);
      });

      it('should get first row', () => {
        expect(grid.getRow(0)).toEqual(row);
      });

      it('should get row', () => {
        grid.setValue(position, SquareState.Value);
        row[position.col] = SquareState.Value;
        expect(grid.getRow(position.row)).toEqual(row);
      });

    });

    describe('reset and reinit', () => {
      it('should reset to 1x1', () => {
        (grid as any).reset(SquareState.Close);
        const newGrid = new Grid<SquareState>(SquareState.Close);
        expect(grid).toEqual(newGrid);
        expect(grid.cols).toEqual(1);
        expect(grid.rows).toEqual(1);
      });

      it('should reset to 15x50', () => {
        (grid as any).reinit(cols, rows, SquareState.Close);
        const newGrid = new Grid<SquareState>(SquareState.Close, cols, rows);
        expect(grid).toEqual(newGrid);
        expect(grid.cols).toEqual(cols);
        expect(grid.rows).toEqual(rows);
      });
    });

  });
});
