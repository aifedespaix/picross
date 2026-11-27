"""05 · LE SEUIL (« threshold ») — la dernière porte avant le fond.
Sol mineur, 80 BPM, 16 mesures. Un cœur (deux battements) toutes les mesures, bourdon dont le filtre respire (aller-retour : la boucle reste continue),
notes graves espacées, un frottement aigu qui monte et retombe. L'attente avant le choc."""
from loop import *
rng, STEP, BAR, LN, N = setup(80, 16, seed=55, tail=5.0)
heart, dr, mel, hiss = Z(N), Z(N), Z(N), Z(N)
ROOT = [43, 43, 41, 42]                                     # Sol, Sol, Fa, Fa# (la porte)
NOTES = [[(67, 4, 6), (70, 10, 4)], [(65, 4, 6), (62, 10, 4)], [(70, 2, 4), (67, 8, 4), (62, 13, 3)], [(66, 4, 6), (69, 10, 4)]]
for b in range(16):
    t0 = b * BAR
    place(heart, lp(kick(rng, 0.35, 0.5), 200), t0, 0.8)
    place(heart, lp(kick(rng, 0.35, 0.5), 200), t0 + 2.5 * STEP, 0.5)
    if b % 4 == 0:
        # filtre qui respire : ouvert au milieu de la phrase, refermé à ses bords
        seg = drone(midi(ROOT[(b // 4) % 4]), BAR * 4.1, rng, cut=900, amp=0.6)
        n = len(seg)
        lfo = 0.5 - 0.5 * np.cos(2 * np.pi * np.arange(n) / n)
        seg = np.stack([lp(seg, 350) * (1 - lfo) + lp(seg, 1100) * lfo] * 2)
        place(dr, seg[0], t0, 0.55)
    if b % 4 != 0:
        for m, s, ln in NOTES[b % 4]:
            place(mel, soft_pluck(midi(m), STEP * (ln + 4), 0.7), t0 + s * STEP, 0.5, 0.3 * (-1) ** s)
    if b % 8 == 6:
        place(hiss, breath(rng, BAR * 1.8, 2400, 7000, 0.45), t0, 0.5, 0.0)
mel_d = np.stack([delay(c, STEP * 3, 0.4, 2200, 5) for c in mel])
rv = np.stack([reverb((mel_d * 0.8 + dr * 0.3 + hiss * 0.6)[c], np.random.default_rng(13 + c), 4.2, damp=2400) for c in range(2)])
mix = mixdown((heart, 0.9), (dr, 0.6), (mel_d, 0.9), (hiss, 0.4), (rv, 0.45))
mix = np.stack([lp(c, 8000) for c in mix])
save_loop(mix, "05-threshold", LN)
