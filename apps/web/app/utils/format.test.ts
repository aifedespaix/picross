import { describe, expect, it } from 'vitest';
import { formatDuration } from './format';

describe('formatDuration', () => {
  it('formate en minutes:secondes', () => {
    expect(formatDuration(0)).toBe('0:00');
    expect(formatDuration(5_400)).toBe('0:05');
    expect(formatDuration(83_000)).toBe('1:23');
    expect(formatDuration(3_725_000)).toBe('62:05');
    expect(formatDuration(-5)).toBe('0:00');
  });
});
