"""04 · LA MEUTE (« pack ») — ils sont plusieurs, ne vous trompez pas.
Mi dorien, 96 BPM, 16 mesures. Pulsation douce et sourde ; plusieurs « bêtes » (cordes pincées Karplus, bois, métal) qui bouclent
à des longueurs différentes (5, 7 et 3 pas contre la grille de 16) : l'ensemble ne retombe jamais pareil, sans jamais être dense (≤ 4 couches)."""
from loop import *
rng, STEP, BAR, LN, N = setup(96, 16, seed=44)
drums, padb, a, b2, c3 = Z(N), Z(N), Z(N), Z(N), Z(N)
SC = [52, 54, 55, 57, 59, 61, 62, 64]                       # Mi dorien
CH = [[40, 47, 52, 59], [42, 49, 54, 61], [43, 50, 55, 62], [40, 47, 52, 59]]
cyc5 = [64, 59, 62, 57, 64]
cyc7 = [47, 52, 50, 47, 54, 52, 50]
cyc3 = [76, 71, 74]
step_i = 0
for b in range(16):
    t0 = b * BAR
    if b % 4 == 0:
        place(padb, pad([midi(m) for m in CH[(b // 4) % 4]], BAR * 4.1, rng, wobble=0.003), t0, 0.35)
    for s in ((0, 7, 10) if b % 4 != 3 else (0, 6, 10, 14)):
        place(drums, lp(kick(rng, 0.45, 0.3), 380), t0 + s * STEP, 0.6)
    for s in (4, 12):
        place(drums, lp(snare(rng, 170, 0.2, 1.1), 3200), t0 + s * STEP, 0.22)
    for s in range(16):
        k = b * 16 + s
        if k % 5 == 0 and b >= 2:
            place(a, karplus(midi(cyc5[(k // 5) % 5]), 0.5, rng) * 0.5, t0 + s * STEP, 0.55, -0.6)
        if k % 7 == 0:
            place(b2, wood(rng, midi(cyc7[(k // 7) % 7]) * 3, 0.07), t0 + s * STEP, 0.4, 0.5)
        if k % 3 == 0 and b >= 6 and b % 4 != 0:
            place(c3, ring_metal(midi(cyc3[(k // 3) % 3]), 0.12, 1.0, 0.35), t0 + s * STEP, 0.35, 0.0)
rv = np.stack([reverb((a * 0.8 + padb * 0.4)[c], np.random.default_rng(11 + c), 2.4, damp=3200) for c in range(2)])
mix = mixdown((drums, 0.9), (padb, 0.5), (a, 1.0), (b2, 0.9), (c3, 0.6), (rv, 0.4))
mix = np.stack([tape(c, rng, 0.0015) for c in mix])
mix = np.stack([lp(c, 9000) for c in mix])
save_loop(mix, "04-pack", LN)
