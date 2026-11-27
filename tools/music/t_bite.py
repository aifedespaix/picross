"""06 · LA MORSURE (« bite ») — chaque erreur laisse une trace.
Ré mineur, 104 BPM, 16 mesures. Première vraie pulsation : basse « voyelle » (formants) qui mord, kick sec mais rond, claps décalés,
plucks graves en contre-temps. Le niveau reste bas et l'espace large : une morsure, pas une bagarre (L-A26)."""
from loop import *
rng, STEP, BAR, LN, N = setup(104, 16, seed=66)
drums, bass, stab, hats = Z(N), Z(N), Z(N), Z(N)
RIFF = [(38, 0, 3), (None, 0, 0), (45, 3, 2), (41, 6, 2), (None, 0, 0), (38, 10, 3), (43, 13, 2)]
RIFF2 = [(38, 0, 3), (41, 4, 2), (None, 0, 0), (45, 7, 3), (43, 11, 2), (38, 14, 2)]
STAB = [[62, 65, 69], [60, 65, 69], [58, 62, 65], [57, 62, 65]]
for b in range(16):
    t0 = b * BAR
    for s in (0, 6, 10) if b % 2 == 0 else (0, 7, 10, 13):
        place(drums, lp(kick(rng, 0.55, 0.3), 450), t0 + s * STEP, 0.6)
    for s in (4, 12):
        place(drums, lp(snare(rng, 200, 0.18, 0.9), 3500), t0 + s * STEP + (0.012 if b % 4 == 3 else 0), 0.28)
    for s in range(2, 16, 4):
        place(hats, lp(hat(rng), 7500), t0 + s * STEP, 0.5, 0.3)
    riff = RIFF if (b // 4) % 2 == 0 else RIFF2
    transpose = -2 if (b // 4) == 2 else 0
    for m, s, ln in riff:
        if m is None:
            continue
        place(bass, formant_bass(midi(m + transpose), STEP * (ln + 1), amp=0.4, sweep=0.8 + 0.2 * (b % 4)), t0 + s * STEP, 0.7)
    if b % 4 in (1, 3):
        for i, m in enumerate(STAB[(b // 4) % 4]):
            place(stab, soft_pluck(midi(m), STEP * 4, 0.8), t0 + (11 + (0 if b % 4 == 1 else 2)) * STEP + i * 0.012, 0.4, 0.2 * (i - 1))
stab_d = np.stack([delay(c, STEP * 3, 0.35, 2800, 4) for c in stab])
rv = np.stack([reverb((stab_d * 0.9 + hats * 0.3)[c], np.random.default_rng(15 + c), 2.2, damp=3000) for c in range(2)])
bass = sidechain(bass, [b * BAR + s * STEP for b in range(16) for s in ((0, 6, 10) if b % 2 == 0 else (0, 7, 10, 13))], 0.35, 0.14)
mix = mixdown((drums, 0.85), (bass, 0.9), (stab_d, 0.8), (hats, 0.5), (rv, 0.35))
mix = np.stack([lp(c, 8500) for c in mix])
save_loop(mix, "06-bite", LN)
