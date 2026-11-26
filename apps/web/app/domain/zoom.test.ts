import { describe, expect, it } from 'vitest';
import { clampView, IDENTITY, MAX_SCALE, panBy, zoomAt, type Layout } from './zoom';

// Plateau 200×200 au repos, centré dans un cadre 300×400.
const layout: Layout = {
  board: { left: 50, top: 100, width: 200, height: 200 },
  frame: { width: 300, height: 400 },
};

describe('zoom', () => {
  it('à l’échelle 1, le plateau reste en place', () => {
    expect(clampView({ scale: 1, x: 40, y: -30 }, layout)).toEqual({ scale: 1, x: 0, y: 0 });
  });

  it('plafonne l’échelle', () => {
    expect(zoomAt(IDENTITY, 100, { x: 150, y: 200 }, layout).scale).toBe(MAX_SCALE);
    expect(zoomAt(IDENTITY, 0.01, { x: 150, y: 200 }, layout).scale).toBe(1);
  });

  it('garde fixe le point sous les doigts', () => {
    const view = zoomAt(IDENTITY, 2, { x: 150, y: 200 }, layout); // centre du plateau
    // Le centre du plateau (150, 200) reste à (150, 200) : il vaut left + 100*2 = 150.
    expect(layout.board.left + view.x + 100 * view.scale).toBeCloseTo(150);
    expect(layout.board.top + view.y + 100 * view.scale).toBeCloseTo(200);
  });

  it('ne laisse pas le plateau sortir du cadre', () => {
    const zoomed = zoomAt(IDENTITY, 4, { x: 150, y: 200 }, layout); // 800×800 dans 300×400
    const far = panBy(zoomed, 10_000, 10_000, layout);
    expect(layout.board.left + far.x).toBeLessThanOrEqual(0);
    expect(layout.board.top + far.y).toBeLessThanOrEqual(0);
    const other = panBy(zoomed, -10_000, -10_000, layout);
    expect(layout.board.left + other.x + 800).toBeGreaterThanOrEqual(300);
    expect(layout.board.top + other.y + 800).toBeGreaterThanOrEqual(400);
  });
});
