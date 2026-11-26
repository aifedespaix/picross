import { describe, expect, it } from 'vitest';
import { safeRedirect } from './redirect';

describe('safeRedirect', () => {
  it('accepte les chemins internes', () => {
    expect(safeRedirect('/create')).toBe('/create');
    expect(safeRedirect('/play/abc?x=1')).toBe('/play/abc?x=1');
  });
  it.each([
    'https://evil.example',
    '//evil.example',
    'javascript:alert(1)',
    '',
    undefined,
    42,
    ['/a'],
  ])('rejette %j', (value) => {
    expect(safeRedirect(value)).toBeNull();
  });
});
