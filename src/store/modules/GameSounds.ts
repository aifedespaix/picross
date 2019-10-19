
/**
 * TODO find a better way to load and manage that shit
 */
export class GameSounds {
  public static readonly STATE_CLOSE = new Audio(require('@/assets/audio/close.mp3'));
  public static readonly STATE_EMPTY = new Audio(require('@/assets/audio/empty.mp3'));
  public static readonly STATE_VALUE = new Audio(require('@/assets/audio/value.mp3'));
  public static readonly UNDO = new Audio(require('@/assets/audio/undo.mp3'));
  public static readonly UNDO_2 = new Audio(require('@/assets/audio/undo_2.mp3'));
  public static readonly WIN = new Audio(require('@/assets/audio/win.mp3'));
}
