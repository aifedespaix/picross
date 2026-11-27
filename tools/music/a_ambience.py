"""Ambiances (couche « ambiance » du mixeur) : trois textures sans mélodie ni tonalité, jouées ENSEMBLE, dont les niveaux suivent la
corruption (pureté → démon). Aucune hauteur reconnaissable → elles ne se disputent jamais la tonalité avec les 7 pistes de musique.
  ambience-pure   : air de pièce, souffle très doux qui respire, scintillement aigu ténu
  ambience-uneasy : grondement sourd, bande de bruit qui balaie lentement, craquements de bois lointains
  ambience-dark   : sub-grave sous 60 Hz, souffles / chuchotis denses, battement lointain à peine perceptible
Boucle de 40 s (fondu enchaîné interne de 3 s)."""
from loop import *

DUR, FADE = 40.0, 3.0
N = int((DUR + FADE) * SR)
T = N / SR


def pure():
    rng = np.random.default_rng(101)
    air = lp(noise_stereo(rng, N), 1100) * 0.5
    air = np.stack([lp(c, 500) * 1.4 for c in air])
    air *= swell(N, 5, 0.0, 0.45)
    shimmer = np.stack([bp(c, 5200, 9000) * 0.05 * swell(N, k, p, 0.9) for c, k, p in zip(noise_stereo(rng, N), (7, 9), (0, 2))])
    return air * 0.9 + shimmer


def uneasy():
    rng = np.random.default_rng(202)
    rumble = np.stack([lp(c, 160) * 1.4 for c in noise_stereo(rng, N)]) * swell(N, 4, 1.0, 0.5)
    sweep = np.zeros((2, N))
    for c in range(2):
        raw = rng.standard_normal(N)
        lo = [bp(raw[i:i + SR // 2], 300 + 500 * (0.5 - 0.5 * np.cos(2 * np.pi * 3 * (i / N))), 900 + 1400 * (0.5 - 0.5 * np.cos(2 * np.pi * 3 * (i / N)))) for i in range(0, N - SR // 2, SR // 2)]
        seg = np.concatenate(lo)
        sweep[c, :len(seg)] = seg
    sweep *= 0.22 * swell(N, 6, 0.5, 0.7)
    creaks = np.zeros((2, N))
    for t0 in rng.uniform(1, T - 2, 9):
        f = float(rng.uniform(140, 260))
        pp = float(rng.uniform(-0.8, 0.8))
        place(creaks, wood(rng, f, 0.09), float(t0), 0.2, pp)
        place(creaks, lp(tom(rng, f * 0.5, 0.2), 400), float(t0), 0.12, pp)
    return rumble * 0.9 + sweep + creaks * 0.8


def dark():
    rng = np.random.default_rng(303)
    sub = np.stack([lp(c, 55, 4) * 6.0 for c in noise_stereo(rng, N)]) * swell(N, 3, 0.3, 0.6)
    whispers = np.zeros((2, N))
    for t0 in rng.uniform(0.5, T - 5, 14):
        dur = float(rng.uniform(1.4, 3.4))
        lo = float(rng.uniform(900, 1600))
        w = breath(rng, dur, lo, lo * 2.6, 0.5)
        w = w * (0.6 + 0.4 * np.sin(2 * np.pi * rng.uniform(5, 9) * np.arange(len(w)) / SR))   # syllabes
        place(whispers, w, float(t0), 0.35, float(rng.uniform(-0.9, 0.9)))
    beat = np.zeros((2, N))
    for k in range(int(T / 1.9)):
        place(beat, lp(kick(rng, 0.2, 0.5), 110), k * 1.9, 0.5)
        place(beat, lp(kick(rng, 0.2, 0.5), 110), k * 1.9 + 0.32, 0.3)
    return sub * 0.8 + whispers + beat * 0.5


os.makedirs(OUT, exist_ok=True)
for name, fn in (("pure", pure), ("uneasy", uneasy), ("dark", dark)):
    x = loopable(fn(), FADE)
    x = np.stack([hp(c, 22, 2) for c in x])
    gain = 10 ** (-24 / 20) / (np.sqrt(np.mean(x ** 2)) + 1e-9)
    x = x * min(gain, 0.8 / (np.abs(x).max() + 1e-9))
    sf.write(f"{OUT}/ambience-{name}.wav", x.T.astype(np.float32), SR, subtype="PCM_24")
    print("OK", name, round(x.shape[1] / SR, 1), "s")
