/** Zoom et déplacement du plateau (pincement tactile, Ctrl + molette). Calculs purs, sans DOM. */
export const MIN_SCALE = 1;
export const MAX_SCALE = 4;

export interface View {
  scale: number;
  /** Décalage du plateau (en pixels) par rapport à sa position au repos. */
  x: number;
  y: number;
}

/** Rectangles en pixels, relatifs au cadre : le plateau au repos (sans zoom) et le cadre visible. */
export interface Layout {
  board: { left: number; top: number; width: number; height: number };
  frame: { width: number; height: number };
}

export const IDENTITY: View = { scale: 1, x: 0, y: 0 };

/** Garde le plateau dans le cadre : jamais de bord qui s'éloigne, jamais de vide inutile. */
export function clampView(view: View, layout: Layout): View {
  const scale = Math.min(Math.max(view.scale, MIN_SCALE), MAX_SCALE);
  const axis = (offset: number, natural: number, origin: number, frame: number) => {
    const scaled = natural * scale;
    // Plus petit que le cadre : le plateau reste centré (l'origine du zoom est son coin haut-gauche).
    if (scaled <= frame) return (frame - scaled) / 2 - origin;
    const lo = Math.min(0, frame - scaled);
    const hi = Math.max(0, frame - scaled);
    return Math.min(Math.max(origin + offset, lo), hi) - origin;
  };
  const { board, frame } = layout;
  return {
    scale,
    x: axis(view.x, board.width, board.left, frame.width),
    y: axis(view.y, board.height, board.top, frame.height),
  };
}

/** Zoome de `factor` en gardant fixe le point `center` (relatif au cadre). */
export function zoomAt(
  view: View,
  factor: number,
  center: { x: number; y: number },
  layout: Layout,
): View {
  const scale = Math.min(Math.max(view.scale * factor, MIN_SCALE), MAX_SCALE);
  const ratio = scale / view.scale;
  const left = layout.board.left + view.x;
  const top = layout.board.top + view.y;
  return clampView(
    {
      scale,
      x: center.x - (center.x - left) * ratio - layout.board.left,
      y: center.y - (center.y - top) * ratio - layout.board.top,
    },
    layout,
  );
}

export function panBy(view: View, dx: number, dy: number, layout: Layout): View {
  return clampView({ ...view, x: view.x + dx, y: view.y + dy }, layout);
}
