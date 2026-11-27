"""07 · LE DÉMON (« demon », boss) — il vous attendait. Parfait, ou presque.
Ré mineur, 118 BPM (tempo-maître de la Factory), 16 mesures. Le plus dense du jeu mais toujours ≤ 4 couches : kick rond, basse 303 rare
(un seul motif, deuxième moitié seulement : l'acid est une signature, pas un fond), arpège de plucks, nappe sombre."""
from loop import *
rng, STEP, BAR, LN, N = setup(118, 16, seed=77)
drums, sub, arp, acid, padb = Z(N), Z(N), Z(N), Z(N), Z(N)
ROOT = [38, 38, 36, 34]                                   # Ré, Ré, Do, Sib
ARP = [[62, 65, 69, 72], [62, 65, 69, 74], [60, 64, 67, 72], [58, 62, 65, 70]]
KICKS = []
for b in range(16):
    t0 = b * BAR
    r = ROOT[(b // 4) % 4]
    for s in (0, 4, 8, 12) if b >= 2 else (0, 8):
        place(drums, lp(kick(rng, 0.6, 0.32), 520), t0 + s * STEP, 0.7)
        KICKS.append(t0 + s * STEP)
    for s in (4, 12):
        place(drums, lp(snare(rng, 185, 0.2, 1.0), 3800), t0 + s * STEP, 0.26)
    for s in range(2, 16, 4):
        place(drums, lp(hat(rng, open_=(s == 14 and b % 2 == 1)), 8000), t0 + s * STEP, 0.55, 0.3)
    place(sub, sub_bass(midi(r - 12 + 12), STEP * 2.6), t0 + 2 * STEP, 0.45)
    place(sub, sub_bass(midi(r - 12 + 12), STEP * 2.6), t0 + 10 * STEP, 0.4)
    if b % 4 == 0:
        place(padb, pad([midi(m - 12) for m in ARP[(b // 4) % 4]], BAR * 4.1, rng, wobble=0.002), t0, 0.35)
    notes = ARP[(b // 4) % 4]
    for i in range(8):
        m = notes[(i * 3 + b) % 4]
        place(arp, soft_pluck(midi(m), STEP * 3, 0.9), t0 + (i * 2 + (1 if i % 3 == 2 else 0)) * STEP, 0.38, 0.5 * (-1) ** i)
    if b >= 8 and b % 4 in (1, 3):
        pat = [(r + 12, 1, False), (None, 0, False), (r + 24, 1, False), (r + 19, 0, True), (r + 12, 0, False), (None, 0, False), (r + 15, 1, True), (r + 12, 0, False)] * 2
        pat = [(m, a, (True if sl else None)) for m, a, sl in pat]
        place(acid, acid303(pat, STEP, rng, cutoff=420 + 90 * (b - 8), reso=0.78, env_mod=2200, decay=0.16), t0, 0.28)
arp_d = np.stack([delay(c, STEP * 3, 0.38, 3000, 5) for c in arp])
rv = np.stack([reverb((arp_d * 0.6 + padb * 0.5 + acid * 0.4)[c], np.random.default_rng(17 + c), 2.6, damp=3200) for c in range(2)])
sub = sidechain(sub, KICKS, 0.5, 0.12)
mix = mixdown((drums, 0.85), (sub, 0.7), (arp_d, 0.85), (acid, 0.7), (padb, 0.5), (rv, 0.35))
mix = np.stack([lp(c, 9000) for c in mix])
save_loop(mix, "07-demon", LN)
