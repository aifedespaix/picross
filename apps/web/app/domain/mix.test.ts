import { describe, expect, it } from 'vitest';
import {
  BUS_TRIM,
  busGain,
  masterGain,
  clampVolume,
  effectiveVolumes,
  isSilent,
  matchPreset,
  PRESETS,
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

  it('un bus coupé vaut 0 sans perdre son réglage', () => {
    const volumes = { ...VOLUME_DEFAULTS, music: 60 };
    expect(effectiveVolumes(volumes, { music: true }).music).toBe(0);
    expect(effectiveVolumes(volumes, { music: true }).sfx).toBe(100);
    expect(volumes.music).toBe(60);
    expect(effectiveVolumes(volumes, {}).music).toBe(60);
  });

  it('silence : général coupé ou à 0', () => {
    expect(isSilent(VOLUME_DEFAULTS, {})).toBe(false);
    expect(isSilent(VOLUME_DEFAULTS, { master: true })).toBe(true);
    expect(isSilent({ ...VOLUME_DEFAULTS, master: 0 }, {})).toBe(true);
    expect(isSilent(VOLUME_DEFAULTS, { music: true })).toBe(false);
  });

  it('reconnaît un préréglage, et rien dès qu’un curseur a bougé ou qu’un bus est coupé', () => {
    expect(matchPreset(PRESETS.normal.volumes, {})).toBe('normal');
    expect(matchPreset(PRESETS.quiet.volumes, {})).toBe('quiet');
    expect(matchPreset(PRESETS.silent.volumes, { master: true })).toBe('silent');
    expect(matchPreset({ ...VOLUME_DEFAULTS, music: 90 }, {})).toBeNull();
    expect(matchPreset(VOLUME_DEFAULTS, { sfx: true })).toBeNull();
  });
});
