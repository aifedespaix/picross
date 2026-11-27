"""Contrôle objectif des boucles : niveau, crête, pic de spectre, continuité de la couture (fin → début)."""
import sys, glob, numpy as np, soundfile as sf
for p in sorted(glob.glob(sys.argv[1] + "/*.wav")):
    x, sr = sf.read(p); m = x.mean(1)
    rms = np.sqrt(np.mean(m ** 2)); pk = np.abs(x).max()
    seam = abs(m[-1] - m[0]); step = np.abs(np.diff(m)).mean()
    spec = np.abs(np.fft.rfft(m)); f = np.fft.rfftfreq(len(m), 1 / sr)
    cen = (spec * f).sum() / spec.sum()
    w = int(sr * 0.5); loud = [np.sqrt(np.mean(m[i:i + w] ** 2)) for i in range(0, len(m) - w, w)]
    print(f"{p.split('/')[-1]:18s} {len(m)/sr:5.1f}s rms {20*np.log10(rms):6.1f} dBFS pk {20*np.log10(pk):5.1f} centroid {cen:5.0f}Hz seam/step {seam/step:4.1f} dyn(min/max rms) {min(loud)/max(loud):.2f}")
