"""02 · LE MURMURE (« whisper ») — quelque chose chuchote entre les lignes.
La mineur, 76 BPM, 16 mesures. Plucks plus rares, souffles filtrés (chuchotements sans mots) qui passent d'une oreille à l'autre,
tics de bois en contretemps. Toujours pas de batterie : l'inquiétude vient du vide, pas du bruit."""
from loop import *
rng, STEP, BAR, LN, N = setup(76, 16, seed=22)
mel, padb, bass, wd, br = Z(N), Z(N), Z(N), Z(N), Z(N)
CH = [[45, 52, 57, 60], [41, 48, 55, 60], [43, 50, 55, 59], [40, 47, 55, 59]]          # Am, Fmaj7, G, Em
M = [[(69, 0, 4), (72, 6, 3), (76, 10, 5)], [(72, 0, 3), (69, 4, 3), (77, 9, 5)],
     [(71, 2, 4), (74, 8, 3), (79, 12, 3)], [(76, 0, 5), (71, 7, 3), (64, 11, 4)]]
for b in range(16):
    t0 = b * BAR
    if b % 2 == 0:
        c = CH[(b // 2) % 4]
        place(padb, pad([midi(m) for m in c], BAR * 2.1, rng, wobble=0.004), t0, 0.5)
        place(bass, sub_bass(midi(c[0] - 12), BAR * 1.7), t0, 0.35)
    if b % 4 != 3:
        for m, s, ln in M[b % 4]:
            place(mel, soft_pluck(midi(m), STEP * (ln + 3), 0.8), t0 + s * STEP, 0.5, float(rng.uniform(-0.5, 0.5)))
    for s in ((3, 11) if b % 2 else (7, 13)):
        place(wd, wood(rng, 1500 + 200 * (b % 3), 0.06), t0 + s * STEP, 0.22, float(rng.uniform(-0.8, 0.8)))
    if b % 4 in (1, 3):                      # le murmure : un souffle toutes les deux mesures environ
        place(br, breath(rng, STEP * 7, 1100 + 150 * (b % 3), 3600, 0.5), t0 + (2 if b % 4 == 1 else 8) * STEP, 0.5, -0.7 if b % 8 < 4 else 0.7)
mel_d = np.stack([delay(c, STEP * 3, 0.38, 2400, 5) for c in mel])
rv = np.stack([reverb((padb * 0.6 + mel_d * 0.6 + br * 0.8)[c], np.random.default_rng(7 + c), 3.6, damp=2600) for c in range(2)])
mix = mixdown((mel_d, 1.0), (padb, 0.5), (bass, 0.55), (wd, 0.8), (br, 0.35), (rv, 0.45))
mix = np.stack([tape(c, rng, 0.0018) for c in mix])
mix = np.stack([lp(c, 8500) for c in mix])
save_loop(mix, "02-whisper", LN)
