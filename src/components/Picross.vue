<template>
  <div>
    <div class="picross select-none" ref="picross" @touchmove.prevent>

      <div class="colsInfos infos" ref="colHints">
        <div v-for="colHints in colsHints"
             class="flex flex-1 flex-col justify-end items-center bg-gray-300">
          <div v-for="colHint in colHints" :class="hintStyle">
            {{colHint}}
          </div>
        </div>
      </div>

      <div class="rowsInfos infos" ref="rowHints">
        <div v-for="rowHints in rowsHints"
             class="flex flex-1 justify-end items-center bg-gray-300">
          <div v-for="rowHint in rowHints" :class="hintStyle">
            {{rowHint}}
          </div>
        </div>
      </div>

      <div ref="gameGrid" class="gameGrid w-full h-full bg-gray-300" @mouseleave="userLeave()">
        <template v-for="(gameRow, row) in gameGrid">
          <Square v-for="(gameSquare, col) in gameRow" :state="gameSquare" :key="`square_${col}-${row}`"
                  @mousedown.native="startPlacing({col, row}, $event)"
                  @touchstart.native="startPlacing({col, row}, $event)"

                  @mouseenter.native="traceSquares({col, row}, $event)"
                  @touchmove.native="traceSquares({col, row}, $event)"

                  @contextmenu.native="preventRightClick($event)"

                  @mouseup.native="stopPlacing()"
          />
        </template>
      </div>

    </div>

    <div>{{usedBlocs}} / {{maxBlocs}}</div>
    <div>{{duration}}</div>
    <div>
      <input type="checkbox" v-model="stateModeValue">
      <div>activeState : {{stateModeValue}}</div>
    </div>
    <button class="btn btn-blue" @click="undo()" :disabled="history.length === 0">undo</button>
    <div style="display: grid; grid-template-columns: 1fr 1fr;">
      <h3>debug</h3>
      {{blabla}}
      <!--      <div>isMouseDown : {{isMouseDown}}</div>-->
      <!--      <div>squareFrom : {{squareFrom}}</div>-->
      <div>shouldCalcDirection : {{shouldCalcDirection}}</div>
      <div>mouseDirection : {{mouseDirection}}</div>
      <!--      <div>activeState : {{activeState}}</div>-->
      <!--      <div>eraseState : {{eraseState}}</div>-->
      <!--      <div>testEvent : {{JSON.stringify(testEvent)}}</div>-->
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import Square from '@/components/Square.vue';
  import { SquareState } from '@/components/SquareState';
  import { SquarePosition } from '@/components/SquarePosition';
  import _ from 'lodash';

  @Component({
    components: {Square},
  })
  export default class Picross extends Vue {
    private gameStarted = false;

    private timerInterval!: any;
    private duration = 0;

    private maxBlocs!: number;
    private usedBlocs = 0;

    private colsHints = [] as number[][];
    private rowsHints = [] as number[][];

    private gameGrid = [] as number[][];
    private solutionGrid = [] as number[][];

    private history = [] as number[][][];

    private isMouseDown = false;
    private shouldCalcDirection = false;
    private squareFrom!: SquarePosition;
    private mouseDirection = MouseDirection.Vertical;
    private stateModeValue = true;
    private activeState!: SquareState;
    private eraseState!: boolean;

    private blabla = [] as any[];

    private hintStyle = [
      'flex',
      'justify-center',
      'items-center',
      'w-4',
      'h-4',
    ];

    private beforeMount() {
      this.initSolution();
      this.initGrid();
      this.initHints();
      this.addActualToHistory();
      this.maxBlocs = this.countSquareState(SquareState.Value, this.solutionGrid);

      // debug
      // this.gameGrid = this.solutionGrid;
    }

    private initSolution() {
      this.solutionGrid = [
        [2, 2, 2, 2, 1, 1, 2, 2, 2, 2],
        [2, 2, 2, 2, 1, 1, 2, 2, 2, 2],
        [2, 1, 1, 1, 1, 1, 1, 1, 1, 2],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [2, 1, 1, 1, 1, 1, 1, 1, 1, 2],
        [2, 1, 2, 1, 2, 2, 1, 2, 1, 2],
        [1, 1, 2, 1, 2, 2, 1, 2, 1, 1],
        [1, 1, 2, 1, 2, 2, 1, 2, 1, 1],
        [1, 1, 2, 1, 2, 2, 1, 2, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      ];
    }

    private initGrid() {
      const gameGrid = [] as number[][];

      for (const row of this.solutionGrid) {
        const gameRow = [] as number[];
        for (const square of row) {
          gameRow.push(SquareState.Close);
        }
        gameGrid.push(gameRow);
      }

      this.gameGrid = gameGrid;
    }

    private initHints() {
      // Cols
      for (const row of this.solutionGrid) {
        const rowHints = [];
        let iteration = false;
        let hint = 0;
        for (const square of row) {
          if (square === SquareState.Value) {
            iteration = true;
            hint++;
          } else {
            if (hint > 0) {
              rowHints.push(hint);
              hint = 0;
            }
          }
        }
        if (hint > 0) {
          rowHints.push(hint);
          hint = 0;
        }
        this.rowsHints.push(rowHints);
      }

      // Rows
      for (let col = 0; col < this.solutionGrid[0].length; col++) {
        const colHints = [];
        let iteration = false;
        let hint = 0;
        for (const row of this.solutionGrid) {
          if (row[col] === SquareState.Value) {
            iteration = true;
            hint++;
          } else {
            if (hint > 0) {
              colHints.push(hint);
              hint = 0;
            }
          }
        }
        if (hint > 0) {
          colHints.push(hint);
          hint = 0;
        }
        this.colsHints.push(colHints);
      }
    }

    private userLeave() {
      this.isMouseDown = false;
    }

    private startGame() {
      this.timerInterval = setInterval(() => {
        this.duration++;
      }, 1000);
      this.gameStarted = true;
    }

    private stopGame() {
      this.gameStarted = false;
      clearTimeout(this.timerInterval);
    }

    private mounted() {
      const $gameGrid = this.$refs.gameGrid as HTMLElement;
      const cols = this.gameGrid[0].length;
      const rows = this.gameGrid.length;

      $gameGrid.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
      $gameGrid.style.gridTemplateRows = `repeat(${rows}, 1fr)`;

      const $colHints = this.$refs.colHints as HTMLElement;
      $colHints.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;

      const $rowHints = this.$refs.rowHints as HTMLElement;
      $rowHints.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
    }

    private startPlacing(position: SquarePosition, event: MouseEvent | TouchEvent) {
      this.blabla.push('start');

      if (event instanceof MouseEvent && !this.isLeftClick(event)) {
        return;
      }

      this.isMouseDown = true;
      this.squareFrom = position;

      this.prepareActiveState(position);
      this.addActualToHistory();

      if (!this.gameStarted) {
        this.startGame();
      }
    }

    private stopPlacing() {
      this.blabla.push('stop');
      this.isMouseDown = false;
      this.usedBlocs = this.countSquareState(SquareState.Value, this.gameGrid);
    }

    private traceSquares(position: SquarePosition, event: MouseEvent | TouchEvent) {
      // debug
      if (this.blabla[this.blabla.length - 1] === 'write') {
        this.blabla.push(2);
      } else if (typeof this.blabla[this.blabla.length - 1] === 'number') {
        this.blabla[this.blabla.length - 1]++;
      } else {
        this.blabla.push('write');
      }

      if (!this.isMouseDown) {
        return;
      }

      if (event instanceof TouchEvent) {
      this.blabla.push(event.changedTouches[0].pageX);
      }

      this.blabla.push(position);

      this.mouseDirection = position.col !== this.squareFrom.col ? MouseDirection.Horizontal : MouseDirection.Vertical;
      this.shouldCalcDirection = false;

      this.changeState(position);
    }

    /**
     *
     * @param event
     * @return true if left clic
     * @throws Error Not valid clic (molet or other)
     */
    private isLeftClick(event: MouseEvent): boolean {
      return event.button === 0;
    }

    private prepareActiveState(position: SquarePosition) {
      const stateAction = this.stateModeValue ? SquareState.Value : SquareState.Empty;
      const actualState = this.gameGrid[position.row][position.col];

      this.activeState = (actualState === SquareState.Close || actualState !== stateAction)
        ? stateAction : SquareState.Close;
      this.eraseState = actualState !== SquareState.Close;
    }

    private changeState(to: SquarePosition) {
      const inlineTo = {} as SquarePosition;

      let length = 0;
      let colCoef = 0; // Coefficient === 0, -1 or 1, used to factorise gameGrid browsing
      let rowCoef = 0; // Coefficient === 0, -1 or 1, used to factorise gameGrid browsing

      if (this.mouseDirection === MouseDirection.Horizontal) {
        inlineTo.row = this.squareFrom.row;
        inlineTo.col = to.col;

        length = to.col - this.squareFrom.col;
        colCoef = length > 0 ? 1 : -1;
      } else {
        inlineTo.row = to.row;
        inlineTo.col = this.squareFrom.col;

        length = to.row - this.squareFrom.row;
        rowCoef = length > 0 ? 1 : -1;
      }

      // Foreach case between from and to
      for (let i = 0; i <= Math.abs(length); i++) {
        const actualPosition = {
          col: this.squareFrom.col + i * colCoef,
          row: this.squareFrom.row + i * rowCoef,
        } as SquarePosition;

        // If Set close state or Actual square is close or first is the square --> use the activated State
        if (this.activeState === SquareState.Close
          || this.eraseState
          || this.gameGrid[actualPosition.row][actualPosition.col] === SquareState.Close
          || i === 0) {
          this.$set(this.gameGrid[actualPosition.row], actualPosition.col, this.activeState);
        }
        this.verifyHints(actualPosition);
      }

      this.verifyWin();
    }

    private verifyHints(position: SquarePosition) {
      return true;
    }


    private verifyWin() {
      try {
        for (let row = 0; row < this.gameGrid.length; row++) {
          for (let col = 0; col < this.gameGrid[0].length; col++) {
            if (this.solutionGrid[row][col] === SquareState.Value && this.gameGrid[row][col] !== SquareState.Value) {
              throw new Error('Not win');
            }
          }
        }
      } catch (e) {
        return false;
      }

      alert('win');
      return true;
    }

    private countSquareState(state: SquareState, grid: number[][]) {
      let counter = 0;
      for (const row of grid) {
        for (const square of row) {
          if (square === state) {
            counter++;
          }
        }
      }
      return counter;
    }

    private preventRightClick(event: MouseEvent) {
      event.preventDefault();
    }

    private undo() {
      if (this.history.length === 1) {
        this.gameGrid = _.cloneDeep(this.history[0]);
      } else {
        this.gameGrid = this.history.pop() as number[][];
      }
      this.usedBlocs = this.countSquareState(SquareState.Value, this.gameGrid);
    }

    private addActualToHistory() {
      this.history.push(_.cloneDeep(this.gameGrid));
    }

  }

  enum MouseDirection {
    Vertical,
    Horizontal,
  }
</script>

<style>
  .picross {
    width: 100vmin;
    height: 100vmin;
    display: grid;
    grid-template-columns: auto 1fr;
    grid-template-rows: auto 1fr;
    grid-template-areas: ". colsInfos" "rowsInfos gameInfos";
    overscroll-behavior: none;
  }

  .rowsInfos {
    grid-area: rowsInfos;
  }

  .colsInfos {
    grid-area: colsInfos;
  }

  .gameGrid {
    grid-area: gameInfos;
    display: grid;
    grid-gap: 1px;
  }

  .infos {
    display: grid;
    grid-gap: 1px;
  }

  .btn {
    @apply font-bold py-2 px-4 rounded;
  }

  .btn-blue {
    @apply bg-blue-500 text-white;
  }

  .btn-blue:hover {
    @apply bg-blue-700;
  }

  .btn-blue:disabled {
    @apply bg-gray-700;
  }
</style>
