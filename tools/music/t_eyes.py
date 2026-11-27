"""03 · LES YEUX (« eyes ») — on vous observe, deux points rouges au loin.
Ré mineur, 84 BPM, 16 mesures. Un bourdon grave, deux notes aiguës qui « clignent » en alternance gauche/droite (les deux yeux),
un cœur très lointain (sous-grave) toutes les deux mesures, quelques tics de hi-hat. Demi-ton Mib sur la 3e phrase : le malaise."""
from loop import *
rng, STEP, BAR, LN, N = setup(84, 16, seed=33)
eyes, dr, heart, tk, mel = Z(N), Z(N), Z(N), Z(N), Z(N)
ROOT = [38, 38, 39, 38]                                    # Ré, Ré, Mib (le demi-ton), Ré
EYES = [(81, 74), (81, 74), (82, 75), (79, 74)]            # la / ré, la / ré, sib / mib, sol / ré
for b in range(16):
    t0 = b * BAR
    ph = (b // 4) % 4
    if b % 4 == 0:
        place(dr, drone(midi(ROOT[ph]), BAR * 4.1, rng, cut=420 + 120 * ph), t0, 0.55)
    hi, lo = EYES[ph]
    base = 1 if b % 2 == 0 else 3
    place(eyes, soft_pluck(midi(hi), STEP * 6, 0.75), t0 + base * STEP, 0.5, -0.85)           # l'œil gauche
    place(eyes, soft_pluck(midi(hi), STEP * 6, 0.75), t0 + (base + 2) * STEP + 0.01, 0.5, 0.85)  # l'œil droit, un souffle plus tard
    if b % 4 in (2, 3):
        place(mel, soft_pluck(midi(lo), STEP * 8, 0.7), t0 + 8 * STEP, 0.4, 0.0)
    if b % 2 == 0:
        place(heart, lp(kick(rng, 0.3, 0.45), 160), t0, 0.7)
        place(heart, lp(kick(rng, 0.3, 0.45), 160), t0 + 2 * STEP, 0.45)
    for s in (5, 10, 15):
        place(tk, tick(rng, 3200 + 300 * s, 0.015), t0 + s * STEP, 0.1 if s != 10 else 0.18, float(rng.uniform(-0.6, 0.6)))
eyes_d = np.stack([delay(c, STEP * 3, 0.4, 3000, 5) for c in eyes])
rv = np.stack([reverb((eyes_d * 0.7 + dr * 0.3 + mel * 0.4)[c], np.random.default_rng(9 + c), 3.4, damp=3000) for c in range(2)])
mix = mixdown((eyes_d, 1.0), (dr, 0.55), (mel, 0.8), (heart, 0.8), (tk, 0.9), (rv, 0.4))
mix = np.stack([lp(c, 9000) for c in mix])
save_loop(mix, "03-eyes", LN)
