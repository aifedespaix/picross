"""01 · L'ÉVEIL (chapitre « awakening ») — le premier pixel : tout est calme, tout est pur.
Do majeur (lydien par touches), 72 BPM, 16 mesures. Pas de batterie : plucks ronds qui respirent, nappe claire, un tic de bois.
Variation : la mélodie change à la mesure 9 (B), revient en A avec une octave plus haut sur la dernière phrase."""
from loop import *
rng, STEP, BAR, LN, N = setup(72, 16, seed=11)
mel, padb, bass, wd = Z(N), Z(N), Z(N), Z(N)
CH = [[48, 55, 59, 64], [45, 52, 60, 64], [41, 48, 57, 60], [43, 50, 59, 62]]       # C, Am7, Fmaj7, G
A = [[(76, 0, 3), (79, 4, 2), (83, 7, 4), (79, 12, 3)], [(76, 0, 3), (81, 4, 2), (84, 7, 4), (81, 12, 3)],
     [(77, 0, 3), (81, 4, 2), (84, 7, 4), (81, 12, 3)], [(74, 0, 3), (79, 4, 2), (83, 7, 4), (86, 12, 3)]]
B = [[(79, 2, 2), (83, 6, 2), (86, 10, 3)], [(76, 0, 2), (81, 5, 2), (88, 10, 3)],
     [(77, 2, 2), (84, 6, 2), (81, 10, 3)], [(79, 0, 2), (83, 6, 2), (74, 12, 3)]]
for b in range(16):
    t0 = b * BAR
    c = CH[(b // 2) % 4]
    if b % 2 == 0:
        place(padb, pad([midi(m) for m in c], BAR * 2.1, rng, wobble=0.002), t0, 0.5)
        place(bass, sub_bass(midi(c[0] - 12), BAR * 1.6), t0, 0.35)
    phrase = (A if b < 8 or b >= 12 else B)[b % 4]
    for m, s, ln in phrase:
        up = 12 if (b >= 14 and s == 7) else 0
        place(mel, soft_pluck(midi(m + up), STEP * (ln + 3), 0.9), t0 + s * STEP, 0.55, 0.2 * (1 if (s // 4) % 2 else -1))
    if b % 4 == 3:
        place(wd, wood(rng, 1200, 0.07), t0 + 14 * STEP, 0.25, 0.4)
mel_d = np.stack([delay(c, STEP * 3, 0.32, 2600, 4) for c in mel])
rv = np.stack([reverb((padb * 0.7 + mel_d * 0.6)[c], np.random.default_rng(5 + c), 3.2, damp=3200) for c in range(2)])
mix = mixdown((mel_d, 1.0), (padb, 0.55), (bass, 0.6), (wd, 0.8), (rv, 0.4))
mix = np.stack([lp(c, 9500) for c in mix])
save_loop(mix, "01-awakening", LN)
