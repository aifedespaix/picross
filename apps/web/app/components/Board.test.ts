import { mount } from '@vue/test-utils';
import { createI18n } from 'vue-i18n';
import { describe, expect, it } from 'vitest';
import { createGrid } from '@/domain/grid';
import fr from '~~/i18n/locales/fr.json';
import Board from './Board.vue';

const i18n = createI18n({ legacy: false, locale: 'fr', messages: { fr } } as never);

function mountBoard(props: Partial<InstanceType<typeof Board>['$props']> = {}) {
  const wrapper = mount(Board, {
    global: { plugins: [i18n] },
    props: {
      cells: createGrid(4, 4),
      rowClues: [[1], [2], [1, 1], []],
      colClues: [[1], [2], [1, 1], []],
      tool: 'filled',
      interactive: true,
      allowCross: true,
      showProgress: false,
      ...props,
    },
  });
  const grid = wrapper.get('[role=grid]').element;
  // happy-dom ne fait pas de mise en page : on simule un plateau de 400×400 px à l'origine.
  grid.getBoundingClientRect = () =>
    ({ left: 0, top: 0, width: 400, height: 400, right: 400, bottom: 400, x: 0, y: 0 }) as DOMRect;
  return wrapper;
}

const pointer = (type: string, x: number, y: number, extra: object = {}) =>
  Object.assign(new MouseEvent(type, { clientX: x, clientY: y, bubbles: true, ...extra }), {
    pointerType: 'mouse',
    pointerId: 1,
  });

describe('Board', () => {
  it('affiche les indices (0 pour une ligne vide)', () => {
    const wrapper = mountBoard();
    const clues = wrapper.findAll('.clue-line').map((line) =>
      line
        .findAll('.clue-number')
        .map((n) => n.text())
        .join(' '),
    );
    expect(clues).toEqual(['1', '2', '1 1', '0', '1', '2', '1 1', '0']);
    expect(wrapper.findAll('[role=gridcell]')).toHaveLength(16);
  });

  it('convertit les coordonnées du pointeur en case, glissé compris', async () => {
    const wrapper = mountBoard();
    const grid = wrapper.get('[role=grid]');
    grid.element.dispatchEvent(pointer('pointerdown', 150, 250, { button: 0 })); // col 1, row 2
    grid.element.dispatchEvent(pointer('pointermove', 350, 260)); // col 3, row 2
    grid.element.dispatchEvent(pointer('pointermove', 999, 999)); // hors plateau : ramené au bord
    grid.element.dispatchEvent(pointer('pointerup', 350, 260));
    expect(wrapper.emitted('strokeStart')?.[0]).toEqual([{ row: 2, col: 1 }, 'filled']);
    expect(wrapper.emitted('strokeMove')?.map(([pos]) => pos)).toEqual([
      { row: 2, col: 3 },
      { row: 3, col: 3 },
    ]);
    expect(wrapper.emitted('strokeEnd')).toHaveLength(1);
  });

  it('le clic droit pose une croix, sauf si les croix sont désactivées', () => {
    const withCross = mountBoard();
    withCross
      .get('[role=grid]')
      .element.dispatchEvent(pointer('pointerdown', 10, 10, { button: 2 }));
    expect(withCross.emitted('strokeStart')?.[0]?.[1]).toBe('crossed');

    const editor = mountBoard({ allowCross: false });
    editor.get('[role=grid]').element.dispatchEvent(pointer('pointerdown', 10, 10, { button: 2 }));
    expect(editor.emitted('strokeStart')?.[0]?.[1]).toBe('filled');
  });

  it('est utilisable au clavier', async () => {
    const wrapper = mountBoard();
    const grid = wrapper.get('[role=grid]');
    await grid.trigger('keydown', { key: 'ArrowRight' });
    await grid.trigger('keydown', { key: 'ArrowDown' });
    await grid.trigger('keydown', { key: ' ' });
    await grid.trigger('keydown', { key: 'x' });
    await grid.trigger('keydown', { key: 'z', ctrlKey: true });
    expect(wrapper.emitted('cellAction')).toEqual([
      [{ row: 1, col: 1 }, 'filled'],
      [{ row: 1, col: 1 }, 'crossed'],
    ]);
    expect(wrapper.emitted('undo')).toHaveLength(1);
  });

  it('ne réagit pas quand la grille n’est pas interactive', () => {
    const wrapper = mountBoard({ interactive: false });
    wrapper.get('[role=grid]').element.dispatchEvent(pointer('pointerdown', 10, 10, { button: 0 }));
    expect(wrapper.emitted('strokeStart')).toBeUndefined();
  });
});
