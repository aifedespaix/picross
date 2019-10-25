import {Hint} from '@/components/Picross/Hints/Hint';
import {SquareState} from '@/model/Square/SquareState';
import _ from 'lodash';

export default class HintsModel {

  get hints(): Hint[] {
    return this._hints;
  }

  get valid(): boolean {
    return this._valid;
  }

  private _hints: Hint[];

  private _valid: boolean;

  constructor(states: SquareState[]) {
    this._hints = this.getHintsForLine(states);
    this._valid = false;
  }

  public verify(line: SquareState[]) {
/*
    const userHints = _.cloneDeep(this._hints);
    for (const userHint of userHints) {
      userHint.value = 0;
    }
    const strictHints = this.getHintsForLine(line, true);
    const strictHintsReverse = this.getHintsForLine(line.reverse(), true);

    for (let i = 0; i < strictHints.length; i++) {
      userHints[i] = strictHints[i];
    }
    for (let i = strictHintsReverse.length - 1; i >= 0; i--) {
      userHints[i] = strictHintsReverse[i];
    }
*/
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

  private getHintsForLine(line: SquareState[], breakable: boolean = false) {
    const hints = [];
    let iteration = false;
    let hint = 0;

    for (const solutionState of line) {
      if (breakable && solutionState === SquareState.Close) {
        break;
      }
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
