import {Grid} from '@/model/Game/Grid';
import {SquareState} from '@/model/Square/SquareState';

export class GameGridModel extends Grid<SquareState> {

  constructor() {
    super(SquareState.Close);
  }

  public importFromString(imported: string) {
    const encodedMap = JSON.parse(imported) as number[][];
    const decodedMap = [] as SquareState[][];

    for (let row = 0; row < encodedMap.length; row++) {
      decodedMap.push([]);
      for (const encodedState of encodedMap[row]) {
        decodedMap[row].push(encodedState === 1 ? SquareState.Value : SquareState.Close);
      }
    }

    return this.import(decodedMap);
  }

  public export() {
    const minifiedMap = [] as number[][];
    for (let row = 0; row < this.rows; row++) {
      minifiedMap.push([]);
      for (const state of this.objects[row]) {
        minifiedMap[row].push(state === SquareState.Value ? 1 : 0);
      }
    }

    return JSON.stringify(minifiedMap);
  }

  public clearValues() {
    this.reinit(this.cols, this.rows, SquareState.Close);
  }

}
