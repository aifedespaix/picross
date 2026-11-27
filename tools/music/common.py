"""Aides communes aux esquisses « palette » (hors engine.py, qui reste le moteur de base)."""
import sys, os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from engine import *

OUT = os.environ.get("OUT", "/work/out/code")


def setup(bpm, bars, tail=4.0, seed=1):
    rng = np.random.default_rng(int(os.environ.get("SEED", seed)))
    step = 60 / bpm / 4
    bar = step * 16
    total = bar * bars + tail
    return rng, step, bar, total, int(total * SR)


def Z(N):
    return np.zeros((2, N))


def save(mix, name, total, trim=True):
    """Rend le morceau ; coupe le blanc de tête (une musique de banque ne commence jamais par du silence)."""
    os.makedirs(OUT, exist_ok=True)
    if trim:
        loud = np.where(np.max(np.abs(mix), axis=0) > 0.004)[0]
        if len(loud):
            s0 = max(0, int(loud[0]) - int(0.02 * SR))
            mix = mix[:, s0:]
            total -= s0 / SR
    finish(mix, f"{OUT}/{name}.wav")
    print("OK", name, round(total, 1), "s")


def bitcrush(x, bits=6, hold=1):
    q = 2 ** bits
    y = np.round(x * q) / q
    return np.repeat(y[::hold], hold)[: len(x)] if hold > 1 else y


def saw_voice(freq, dur, det=(-8, 0, 8), cut=2000, tau=0.2, cut_lo=300, amp=0.3):
    """Saws désaccordées dont le filtre s'ouvre (cut_lo -> cut) puis se referme avec tau."""
    n = int(dur * SR)
    t = np.arange(n) / SR
    x = sum(signal.sawtooth(2 * np.pi * freq * 2 ** (d / 1200) * t) for d in det) / len(det)
    e = np.exp(-np.arange(n) / (tau * SR))
    y = lp(x, cut_lo) * (1 - e) + lp(x, min(cut, 20000)) * e
    a = np.minimum(1, np.arange(n) / (0.003 * SR))
    r = np.minimum(1, np.arange(n)[::-1] / (0.02 * SR))
    return y * a * r * amp


def organ(freq, dur, amp=0.3):
    n = int(dur * SR)
    t = np.arange(n) / SR
    x = sum(w * np.sin(2 * np.pi * freq * k * t) for k, w in ((1, 1), (2, 0.8), (3, 0.5), (4, 0.35), (6, 0.2)))
    env = np.exp(-np.arange(n) / (dur * SR / 2.5)) * np.minimum(1, np.arange(n) / (0.003 * SR))
    return x * env * amp * 0.5


def clap(rng, dur=0.18):
    n = int(dur * SR)
    x = np.zeros(n)
    for off in (0, 0.011, 0.023):
        s = int(off * SR)
        m = n - s
        x[s:] += bp(rng.standard_normal(m), 900, 4500) * exp_env(m, 0.012 if off < 0.02 else 0.06)
    return sat(x * 0.9, 1.8)


def pump(sig, kicks, total, depth=0.7, rel=0.2):
    return duck(sig, kicks, total, depth=depth, rel=rel)


def mixdown(*pairs):
    return sum(g * s for s, g in pairs)


# ---------- instruments « hybrides » (acid × Autechre × Oizo) ----------
def formant_bass(freq, dur, amp=0.45, sweep=1.0):
    """Basse « voyelle » : saw + sub carré passés dans deux bandes formantiques dont le mélange glisse (wah)."""
    n = int(dur * SR)
    t = np.arange(n) / SR
    x = signal.sawtooth(2 * np.pi * freq * t) + 0.5 * signal.square(2 * np.pi * freq * 0.5 * t)
    e = np.linspace(0, 1, n) ** (1 / max(sweep, 0.1))
    y = bp(x, 300, 750) * (1 - e) + bp(x, 900, 2300) * e
    a = np.minimum(1, np.arange(n) / (0.004 * SR)) * np.minimum(1, np.arange(n)[::-1] / (0.02 * SR))
    return sat(y * a * 1.6, 2.5) * amp


def ring_metal(freq, dur, ratio=1.0, amp=0.5):
    """Percussion métallique par modulation en anneau (partiels inharmoniques)."""
    n = int(dur * SR)
    t = np.arange(n) / SR
    x = np.sin(2 * np.pi * freq * t) * np.sin(2 * np.pi * freq * ratio * 1.618 * t)
    return x * exp_env(n, max(dur / 4, 0.01)) * np.minimum(1, np.arange(n) / (0.001 * SR)) * amp


def tom(rng, freq=120, dur=0.25):
    n = int(dur * SR)
    f = freq * (1 + 1.2 * exp_env(n, 0.03))
    body = np.sin(2 * np.pi * np.cumsum(f) / SR) * exp_env(n, 0.09)
    return sat(body + hp(rng.standard_normal(n), 3000) * exp_env(n, 0.003) * 0.15, 1.4)


def wood(rng, f=900, dur=0.08):
    n = int(dur * SR)
    t = np.arange(n) / SR
    return (np.sin(2 * np.pi * f * t) * exp_env(n, 0.012) + bp(rng.standard_normal(n), f, f * 2.5) * exp_env(n, 0.006) * 0.6) * 0.8


def karplus(freq, dur, rng, loss=0.995):
    """Corde pincée (Karplus-Strong par blocs)."""
    p = max(2, int(SR / freq))
    n = int(dur * SR)
    out = np.zeros(n + 2 * p)
    out[:p] = rng.uniform(-1, 1, p)
    for k in range(p, n, p):
        prev = out[k - p:k]
        out[k:k + p] = 0.5 * (prev + np.roll(prev, 1)) * loss
    return out[:n] * np.minimum(1, np.arange(n)[::-1] / (0.02 * SR)) * 0.8


def glass(freq, dur):
    return fm_bell(freq, dur, ratio=1.41, index=2.0)


def perc_hit(rng, kind, f):
    """Une percussion/fioriture choisie parmi 5 timbres (variété d'instruments)."""
    if kind == 0:
        return ring_metal(f, float(rng.uniform(0.05, 0.25)), ratio=float(rng.choice([1.0, 1.5, 2.3])))
    if kind == 1:
        return karplus(f, float(rng.uniform(0.15, 0.45)), rng) * 0.6
    if kind == 2:
        return wood(rng, f * 3)
    if kind == 3:
        return glass(f * 2, float(rng.uniform(0.2, 0.6))) * 0.5
    return tom(rng, f * 0.6, 0.2) * 0.8
