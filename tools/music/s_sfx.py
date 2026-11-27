"""Sons de jeu et d'interface — même langage que les musiques : bois, cordes pincées rondes, souffle ; jamais de cloche FM (L-A19),
jamais de bip « jeu vidéo ». Sobres (DA « à la Apple ») : courts, doux, un seul timbre dominant par son.
Sons tonals accordés sur DO (pentatonique majeure) pour s'additionner sans fausse note ; `fill` est une seule note de base (do4) que le jeu
transpose à l'exécution (detune) : tracer une ligne joue un petit arpège.
Sortie : out/sfx/<nom>.wav (mono, 48 kHz)."""
from loop import *

rng = np.random.default_rng(404)
SFX = {}


def ssum(*parts):
    """Somme de (signal, gain) de longueurs différentes."""
    out = np.zeros(max(len(x) for x, _ in parts))
    for x, g in parts:
        out[: len(x)] += x * g
    return out


def fit(x, n=None):
    return x if n is None else np.pad(x, (0, max(0, n - len(x))))[:n]


def mixin(buf, x, at=0.0, g=1.0):
    s = int(at * SR)
    end = min(len(buf), s + len(x))
    buf[s:end] += x[: end - s] * g


def rev(x, secs=0.9, wet=0.25, damp=3000, seed=1):
    pad_ = np.concatenate([x, np.zeros(int(secs * SR))])
    r = reverb(pad_, np.random.default_rng(seed), secs, damp=damp)
    return pad_ + r * wet


def fade(x, a=0.002, r=0.01):
    n = len(x)
    return x * np.minimum(1, np.arange(n) / (a * SR)) * np.minimum(1, np.arange(n)[::-1] / (r * SR))


def tok(f=261.63, dur=0.2):
    """Note « tok » : corps sinusoïdal rond qui retombe, 2ᵉ harmonique brève, petit claquement de bois."""
    n = int(dur * SR)
    fr = f * (1 + 0.18 * exp_env(n, 0.012))
    ph = 2 * np.pi * np.cumsum(fr) / SR
    body = np.sin(ph) * exp_env(n, 0.07) + 0.3 * np.sin(2 * ph) * exp_env(n, 0.03) + 0.08 * np.sin(3 * ph) * exp_env(n, 0.015)
    click = bp(rng.standard_normal(n), 1400, 5200) * exp_env(n, 0.0025) * 0.22
    return fade(lp(body + click, 4200), 0.0008, 0.02)


def glide(f0, f1, dur, tau=0.05, tri=False):
    n = int(dur * SR)
    fr = f1 + (f0 - f1) * exp_env(n, dur / 3)
    ph = 2 * np.pi * np.cumsum(fr) / SR
    w = signal.sawtooth(ph, 0.5) if tri else np.sin(ph)
    return fade(lp(w * exp_env(n, dur / 2.2), 2600), 0.004, 0.02)


def sp(m, d, bright=0.9):
    return soft_pluck(midi(m), d, bright)


def pad_swell(ms, dur, seed=3):
    r = np.random.default_rng(seed)
    p = pad([midi(m) for m in ms], dur, r, wobble=0.002)
    return p


# ---- gestes de jeu -------------------------------------------------------------------------------
SFX["fill"] = tok(261.63, 0.2)
SFX["cross"] = fade(ssum((wood(rng, 1900, 0.07), 0.9), (lp(tick(rng, 2800, 0.012), 6000), 0.3)), 0.0008, 0.015)
n = int(0.26 * SR)
sweep = np.zeros(n)
for i, c in enumerate(np.linspace(3200, 500, 8)):
    seg = slice(int(i * n / 8), int((i + 1) * n / 8))
    sweep[seg] = bp(rng.standard_normal(seg.stop - seg.start), c * 0.7, c * 1.3)
SFX["clear"] = fade(sweep * 0.5 * np.sin(np.linspace(0, np.pi, n)) ** 1.3 + fit(glide(150, 90, 0.2), n) * 0.5, 0.004, 0.05)
SFX["undo"] = glide(560, 400, 0.11)
SFX["undo2"] = glide(500, 360, 0.12, tri=True) * 0.8

# ---- retours de jeu -----------------------------------------------------------------------------
line = np.zeros(int(1.4 * SR))
mixin(line, sp(76, 0.45), 0.0, 0.8)     # mi5
mixin(line, sp(83, 0.6), 0.075, 0.7)    # si5
SFX["line"] = rev(line[: int(0.9 * SR)], 0.8, 0.22, seed=2)
err = np.zeros(int(0.5 * SR))
for f, g in ((110.0, 0.7), (116.5, 0.5)):
    m = int(0.36 * SR)
    mixin(err, lp(np.sin(2 * np.pi * f * np.arange(m) / SR) * exp_env(m, 0.1), 500) * fade(np.ones(m), 0.008, 0.08), 0.0, g)
mixin(err, lp(tick(rng, 900, 0.02), 1500), 0.0, 0.5)
SFX["error"] = err[: int(0.4 * SR)]
hint = np.zeros(int(1.2 * SR))
for i, m in enumerate((67, 71, 74)):    # sol4 si4 ré5 : une main tendue
    mixin(hint, sp(m, 0.4, 0.8), i * 0.085, 0.7)
SFX["hint"] = rev(hint[: int(0.8 * SR)], 0.9, 0.3, seed=4)

# ---- victoires : une phrase de plus à chaque étoile ------------------------------------------------
def win(stars):
    L = int(3.6 * SR)
    b = np.zeros(L)
    mixin(b, pad_swell([48, 55, 64, 67], 2.6), 0.0, 0.55)
    mixin(b, sub_bass(midi(36), 1.4), 0.0, 0.3)
    notes = {1: [(72, 0.0), (76, 0.14), (79, 0.28)],
             2: [(72, 0.0), (76, 0.12), (79, 0.24), (84, 0.38), (79, 0.62), (84, 0.78)],
             3: [(72, 0.0), (76, 0.09), (79, 0.18), (84, 0.27), (88, 0.36), (91, 0.45), (96, 0.6), (91, 0.9), (96, 1.05)]}[stars]
    for m, t in notes:
        mixin(b, sp(m, 0.9, 1.0 if m < 90 else 0.8), t, 0.55 if m < 90 else 0.35)
    if stars == 3:      # un voile de scintillement (souffle très aigu, pas de cloche)
        for t in (0.5, 0.75, 1.1):
            mixin(b, bp(rng.standard_normal(int(0.5 * SR)), 6000, 11000) * exp_env(int(0.5 * SR), 0.12) * 0.05, t)
    secs = {1: 2.0, 2: 2.6, 3: 3.4}[stars]
    return rev(fit(b, int(secs * SR)), 1.6, 0.3, seed=10 + stars)


for s in (1, 2, 3):
    SFX[f"win{s}"] = win(s)

# boss vaincu : ré mineur, grave, lent — la fin de chapitre pèse
L = int(5.0 * SR)
b = np.zeros(L)
mixin(b, drone(midi(38), 4.2, np.random.default_rng(5), cut=520, amp=0.8), 0.0, 0.6)
mixin(b, lp(kick(rng, 0.3, 0.5), 140), 0.0, 0.8)
for m, t in ((62, 0.5), (65, 0.95), (69, 1.4), (74, 1.9), (77, 2.6)):
    mixin(b, sp(m, 1.2, 0.7), t, 0.5)
SFX["boss"] = rev(b, 2.6, 0.35, damp=2400, seed=31)

# ---- interface : presque rien ---------------------------------------------------------------------
tn = int(0.03 * SR)
SFX["tap"] = fade(np.sin(2 * np.pi * 1050 * np.arange(tn) / SR) * exp_env(tn, 0.007), 0.0008, 0.01)
op = np.zeros(int(0.5 * SR)); mixin(op, sp(72, 0.2, 0.7), 0, 0.7); mixin(op, sp(79, 0.25, 0.7), 0.055, 0.6)
SFX["open"] = rev(op[: int(0.3 * SR)], 0.4, 0.2, seed=6)
cl = np.zeros(int(0.5 * SR)); mixin(cl, sp(79, 0.2, 0.7), 0, 0.7); mixin(cl, sp(72, 0.25, 0.6), 0.055, 0.6)
SFX["close"] = rev(cl[: int(0.3 * SR)], 0.4, 0.2, seed=7)

PEAK = {"fill": .6, "cross": .45, "clear": .5, "undo": .4, "undo2": .4, "line": .7, "error": .5, "hint": .55,
        "win1": .75, "win2": .82, "win3": .9, "boss": .9, "tap": .35, "open": .4, "close": .4}
os.makedirs(f"{OUT}/sfx", exist_ok=True)
for name, x in SFX.items():
    x = np.asarray(x, dtype=float)
    x = hp(x, 40, 2)
    loud = np.where(np.abs(x) > 0.003 * np.abs(x).max())[0]       # coupe la queue inaudible (-50 dB), fondu de sortie
    x = x[: min(len(x), loud[-1] + int(0.03 * SR))]
    x = x * np.minimum(1, np.arange(len(x))[::-1] / (0.03 * SR))
    x = x / (np.abs(x).max() + 1e-9) * PEAK[name]
    sf.write(f"{OUT}/sfx/{name}.wav", x.astype(np.float32), SR, subtype="PCM_24")
    print("OK", name, round(len(x) / SR, 2), "s")
