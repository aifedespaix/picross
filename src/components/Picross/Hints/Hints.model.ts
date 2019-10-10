import {SquareState} from '@/components/Picross/Square/SquareState';
import {Hint} from '@/components/Picross/Hints/Hint';

export default class HintsModel {

  public hints: Hint[];
  public valid: boolean;
  private readonly solutionStates!: SquareState[];

  constructor(solutionStates: SquareState[]) {
    this.solutionStates = solutionStates;
    this.hints = this.getHintsForLine(this.solutionStates);
    this.valid = false;
  }

  public verify(line: SquareState[]) {
    const userHints = this.getHintsForLine(line);
    for (let i = 0; i < this.hints.length; i++) {
      this.hints[i].valid = typeof userHints[i] !== 'undefined' && userHints[i].value === this.hints[i].value;
    }

    if (userHints.length === this.hints.length) {
      this.generalVerify();
    } else {
      this.valid = false;
    }
  }

  private generalVerify() {
    for (const hint of this.hints) {
      if (!hint.valid) {
        this.valid = false;
        return;
      }
    }
    this.valid = true;
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
