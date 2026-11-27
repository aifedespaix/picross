"""Aides « boucle de jeu » par-dessus le moteur de la Factory (engine.py, copié de aife-factory/audio-bank).

Une piste picross = N mesures rendues + une queue de réverbération, puis la queue est *repliée* sur le début :
la boucle est donc continue (aucun clic, la réverb de la dernière mesure déborde sur la première).
"""
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from engine import *  # noqa: F401,F403
from common import wood, tom, ring_metal, karplus, formant_bass, bitcrush, perc_hit  # noqa: F401

OUT = os.environ.get("OUT", os.path.join(os.path.dirname(os.path.abspath(__file__)), "out"))


def setup(bpm, bars, seed=1, tail=4.0):
    rng = np.random.default_rng(seed)
    step = 60 / bpm / 4          # une double-croche
    bar = step * 16
    loop_n = int(round(bar * bars * SR))
    n = loop_n + int(tail * SR)
    return rng, step, bar, loop_n, n


def Z(n):
    return np.zeros((2, n))


def fold(mix, loop_n):
    """Replie la queue (au-delà de loop_n) sur le début : boucle sans couture."""
    out = mix[:, :loop_n].copy()
    tail = mix[:, loop_n:]
    out[:, : tail.shape[1]] += tail[:, : loop_n]
    return out


def save_loop(mix, name, loop_n, rms_db=-19.0, peak_max=0.85):
    """Boucle sans couture, calée sur un niveau moyen commun (-19 dBFS RMS) pour que les 7 pistes aient le même volume perçu.
    Filtre grave AVANT le repli (sinon le filtre démarre à zéro et fait un clic à la couture)."""
    os.makedirs(OUT, exist_ok=True)
    x = np.stack([hp(c, 30, 2) for c in mix])
    x = fold(x, loop_n)
    x = sat(x, 1.1)
    gain = 10 ** (rms_db / 20) / (np.sqrt(np.mean(x ** 2)) + 1e-9)
    x = x * min(gain, peak_max / (np.max(np.abs(x)) + 1e-9))
    sf.write(f"{OUT}/{name}.wav", x.T.astype(np.float32), SR, subtype="PCM_24")
    print("OK", name, round(loop_n / SR, 2), "s")


def soft_pluck(freq, dur, bright=1.0):
    """Pluck rond (triangle + saw filtrée) : ni cloche ni synthé « cheap » (L-A19)."""
    n = int(dur * SR)
    t = np.arange(n) / SR
    x = 0.7 * signal.sawtooth(2 * np.pi * freq * t, 0.5) + 0.3 * signal.sawtooth(2 * np.pi * freq * 1.004 * t)
    e = np.exp(-np.arange(n) / (0.07 * SR))
    y = lp(x, 450 * bright) * (1 - e) + lp(x, 3200 * bright) * e
    amp = np.exp(-np.arange(n) / (dur * SR / 3.0)) * np.minimum(1, np.arange(n) / (0.003 * SR))
    return y * amp * np.minimum(1, np.arange(n)[::-1] / (0.01 * SR))


def breath(rng, dur, lo=900, hi=3800, peak=0.6):
    """Souffle filtré (un « murmure » sans mots)."""
    n = int(dur * SR)
    env = np.sin(np.linspace(0, np.pi, n)) ** 2
    x = bp(rng.standard_normal(n), lo, hi, 2)
    return x * env * peak


def drone(freq, dur, rng, cut=500, amp=0.5):
    n = int(dur * SR)
    t = np.arange(n) / SR
    x = (signal.sawtooth(2 * np.pi * freq * t) + signal.sawtooth(2 * np.pi * freq * 1.006 * t)
         + np.sin(2 * np.pi * freq * 0.5 * t) * 1.2) / 3
    x = lp(x, cut)
    a = np.minimum(1, np.arange(n) / (0.8 * SR))
    r = np.minimum(1, np.arange(n)[::-1] / (0.8 * SR))
    return x * a * r * amp


def mixdown(*pairs):
    return sum(g * s for s, g in pairs)


def sidechain(sig, times, depth=0.5, rel=0.14):
    """Creux de volume après chaque temps de `times` (secondes) : la basse laisse passer le kick."""
    n = sig.shape[-1]
    env = np.ones(n)
    for k in times:
        s = int(k * SR)
        if s >= n:
            continue
        m = min(n - s, int(rel * SR * 4))
        env[s:s + m] = np.minimum(env[s:s + m], 1 - depth * np.exp(-np.arange(m) / (rel * SR * 0.4)))
    return sig * env


def loopable(x, fade_s=3.0):
    """Rend une texture bouclable : la fin (longueur `fade_s`) est fondue en équi-puissance dans le début, puis coupée."""
    f = int(fade_s * SR)
    head, tail = x[:, :f], x[:, -f:]
    t = np.linspace(0, np.pi / 2, f)
    body = x[:, :-f].copy()
    body[:, :f] = head * np.sin(t) + tail * np.cos(t)
    return body


def noise_stereo(rng, n):
    return np.stack([rng.standard_normal(n), rng.standard_normal(n)])


def swell(n, cycles, phase=0.0, depth=0.5):
    """Enveloppe lente périodique (nombre ENTIER de cycles : la boucle retombe sur elle-même)."""
    return 1 - depth + depth * (0.5 - 0.5 * np.cos(2 * np.pi * cycles * np.arange(n) / n + phase))
