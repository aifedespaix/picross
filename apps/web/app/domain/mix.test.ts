import { describe, expect, it } from 'vitest';
import {
  BUS_TRIM,
  busGain,
  masterGain,
  clampVolume,
  sanitizeVolumes,
  VOLUME_DEFAULTS,
  volumeToGain,
} from './mix';

describe('mixage', () => {
  it('0 coupe le son, 100 le laisse entier, le milieu est perceptivement plus bas', () => {
    expect(volumeToGain(0)).toBe(0);
    expect(volumeToGain(100)).toBe(1);
    expect(volumeToGain(50)).toBeCloseTo(0.25);
  });

  it('borne les valeurs absurdes', () => {
    expect(clampVolume(250)).toBe(100);
    expect(clampVolume(-4)).toBe(0);
    expect(clampVolume('abc')).toBe(100);
  });

  it('le volume général coupe tout, un bus coupé ne coupe que lui', () => {
    expect(masterGain({ ...VOLUME_DEFAULTS, master: 0 })).toBe(0);
    const musicOff = { ...VOLUME_DEFAULTS, music: 0 };
    expect(busGain(musicOff, 'music')).toBe(0);
    expect(busGain(musicOff, 'sfx')).toBe(BUS_TRIM.sfx);
  });

  it('par défaut les effets passent devant la musique, devant l’ambiance', () => {
    expect(BUS_TRIM.sfx).toBeGreaterThan(BUS_TRIM.music);
    expect(BUS_TRIM.music).toBeGreaterThan(BUS_TRIM.ambience);
  });

  it('complète et assainit un cookie incomplet ou corrompu', () => {
    expect(sanitizeVolumes(undefined)).toEqual(VOLUME_DEFAULTS);
    expect(sanitizeVolumes({ music: 40, sfx: 'x', nope: 3 })).toEqual({
      ...VOLUME_DEFAULTS,
      music: 40,
      sfx: 100,
    });
  });
});
