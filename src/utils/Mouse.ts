export class Mouse {

  public static isLeftClick(event: MouseEvent) {
    return event.button === 0;
  }

  public static isRightClick(event: PointerEvent) {
    return event.button === 2;
  }

  public static isMouse(event: PointerEvent) {
    return event.pointerType === 'mouse';
  }

}
