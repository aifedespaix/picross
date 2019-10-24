import {Hint} from '@/components/Picross/Hints/Hint';
import {SquareState} from '@/model/Square/SquareState';

export default class HintsModel {

  private _hints: Hint[];

  get hints(): Hint[] {
    return this._hints;
  }

  private _valid: boolean;

  get valid(): boolean {
    return this._valid;
  }

  constructor(states: SquareState[]) {
    this._hints = this.getHintsForLine(states);
    this._valid = false;
  }

  public verify(line: SquareState[]) {
    const userHints = this.getHintsForLine(line);
    for (let i = 0; i < this._hints.length; i++) {
      this._hints[i].valid = typeof userHints[i] !== 'undefined' && userHints[i].value === this._hints[i].value;
    }

    if (userHints.length === this._hints.length) {
      this.generalVerify();
    } else {
      this._valid = false;
    }
  }

  private generalVerify() {
    for (const hint of this._hints) {
      if (!hint.valid) {
        this._valid = false;
        return;
      }
    }
    this._valid = true;
  }

  private getHintsForLine(line: SquareState[]) {
    const hints = [];
    let iteration = false;
    let hint = 0;

    for (const solutionState of line) {
      if (solutionState === SquareState.Value) {
        iteration = true;
        hint++;
      } else {
        if (hint > 0) {
          hints.push({value: hint, valid: false});
          hint = 0;
        }
      }
    }
    if (hint > 0) {
      hints.push({value: hint, valid: false});
    }

    return hints;
  }

}
