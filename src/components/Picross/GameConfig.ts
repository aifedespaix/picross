export class GameConfig {
  public rightClickChange!: boolean;
  private readonly rightClickChangeItem = 'rightClickChange';

  constructor() {
    this.loadRightClickChange();
  }

  public loadRightClickChange() {
    const rightClickChange = localStorage.getItem(this.rightClickChangeItem);

    if (rightClickChange) {
      this.rightClickChange = Boolean(rightClickChange);
    } else {
      this.rightClickChange = false;
    }
  }

  public save() {
    localStorage.setItem(this.rightClickChangeItem, String(this.rightClickChange));
  }

}
