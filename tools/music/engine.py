"""Moteur de synthèse / séquençage maison (numpy + scipy). Tout est déterministe via un seed."""
import numpy as np
from scipy import signal
import soundfile as sf

SR = 48000


def midi(n):
    return 440.0 * 2 ** ((n - 69) / 12)


def t_arr(dur):
    return np.arange(int(dur * SR)) / SR


def exp_env(n, tau):
    return np.exp(-np.arange(n) / (tau * SR))


def lp(x, fc, order=2):
    return signal.sosfilt(signal.butter(order, min(fc, SR / 2 - 100), "low", fs=SR, output="sos"), x)


def hp(x, fc, order=2):
    return signal.sosfilt(signal.butter(order, fc, "high", fs=SR, output="sos"), x)


def bp(x, lo, hi, order=2):
    return signal.sosfilt(signal.butter(order, [lo, min(hi, SR / 2 - 100)], "band", fs=SR, output="sos"), x)


def sat(x, drive=2.0):
    return np.tanh(x * drive) / np.tanh(drive)


# ---------- instruments ----------
def kick(rng, punch=1.0, dur=0.38):
    n = int(dur * SR)
    f = 48 + 120 * punch * exp_env(n, 0.025)
    ph = 2 * np.pi * np.cumsum(f) / SR
    body = np.sin(ph) * exp_env(n, 0.16)
    click = hp(rng.standard_normal(n), 2500) * exp_env(n, 0.004) * 0.25
    return sat(body + click, 2.2)


def snare(rng, tone=190, dur=0.22, bright=1.0):
    n = int(dur * SR)
    noise = bp(rng.standard_normal(n), 1200, 9000) * exp_env(n, 0.05 * bright)
    body = np.sin(2 * np.pi * tone * t_arr(dur)[:n] * (1 + 0.5 * exp_env(n, 0.02))) * exp_env(n, 0.06)
    return sat(noise * 0.9 + body * 0.6, 1.8)


def hat(rng, open_=False, tone=1.0):
    dur = 0.28 if open_ else 0.05
    n = int(dur * SR)
    t = t_arr(dur)[:n]
    metal = sum(np.sign(np.sin(2 * np.pi * f * tone * t)) for f in (205, 301, 366, 522, 603, 811))
    x = hp(metal + rng.standard_normal(n) * 2, 6500) * exp_env(n, 0.09 if open_ else 0.012)
    return x * 0.12


def tick(rng, f=3000, dur=0.02):
    n = int(dur * SR)
    return bp(rng.standard_normal(n), f * 0.7, f * 1.4, 2) * exp_env(n, 0.004) * 2.2


def sub_bass(freq, dur, glide_from=None):
    n = int(dur * SR)
    f = np.full(n, freq)
    if glide_from:
        f = freq + (glide_from - freq) * exp_env(n, 0.04)
    ph = 2 * np.pi * np.cumsum(f) / SR
    x = np.sin(ph) + 0.35 * np.sin(2 * ph) * exp_env(n, 0.25)
    a = np.minimum(1, np.arange(n) / (0.004 * SR))
    r = np.minimum(1, np.arange(n)[::-1] / (0.03 * SR))
    return sat(x * a * r, 1.6)


def fm_bell(freq, dur, ratio=3.5, index=4.0):
    n = int(dur * SR)
    t = np.arange(n) / SR
    mod = np.sin(2 * np.pi * freq * ratio * t) * index * exp_env(n, 0.18)
    x = np.sin(2 * np.pi * freq * t + mod) * exp_env(n, dur / 3.2)
    return x * np.minimum(1, np.arange(n) / (0.002 * SR))


def pad(freqs, dur, rng, wobble=0.0035):
    n = int(dur * SR)
    t = np.arange(n) / SR
    out = np.zeros(n)
    for f0 in freqs:
        for det in (-0.12, 0.0, 0.1):
            lfo = 1 + wobble * np.sin(2 * np.pi * (0.35 + rng.random() * 0.4) * t + rng.random() * 6)
            ph = 2 * np.pi * np.cumsum(f0 * (1 + det * 0.01) * lfo) / SR
            out += signal.sawtooth(ph) * 0.12
    out = lp(out, 1400)
    a = np.minimum(1, np.arange(n) / (0.6 * SR))
    r = np.minimum(1, np.arange(n)[::-1] / (0.8 * SR))
    return out * a * r


def acid303(notes, step_dur, rng, cutoff=500, reso=0.82, env_mod=3200, decay=0.18):
    """notes: liste de (midi|None, accent, slide). Chaque pas = step_dur. Filtre SVF résonant."""
    n = int(len(notes) * step_dur * SR)
    out = np.zeros(n)
    prev_f = None
    for i, (m, acc, slide) in enumerate(notes):
        if m is None:
            prev_f = None
            continue
        f = midi(m)
        ln = int(step_dur * SR * (1.25 if slide else 0.8))
        ln = min(ln, n - int(i * step_dur * SR))
        fr = np.full(ln, f)
        if prev_f and slide is not None and slide is True:
            fr = f + (prev_f - f) * np.exp(-np.arange(ln) / (0.03 * SR))
        ph = 2 * np.pi * np.cumsum(fr) / SR
        osc = signal.sawtooth(ph)
        env = np.exp(-np.arange(ln) / (decay * SR * (1.6 if acc else 1.0)))
        fc = cutoff + env_mod * env * (1.5 if acc else 1.0)
        F = 2 * np.sin(np.pi * np.minimum(fc, 9000) / SR)
        q = 2 - 2 * reso
        low = band = 0.0
        y = np.empty(ln)
        for k in range(ln):
            low += F[k] * band
            high = osc[k] - low - q * band
            band += F[k] * high
            y[k] = low
        g = np.minimum(1, np.arange(ln)[::-1] / (0.008 * SR))
        out[int(i * step_dur * SR):int(i * step_dur * SR) + ln] += sat(y, 1.6 if acc else 1.2) * g * (1.0 if acc else 0.7) * 0.6
        prev_f = f
    return out


# ---------- FX ----------
def reverb(x, rng, secs=2.8, wet=1.0, damp=3500):
    n = int(secs * SR)
    ir = rng.standard_normal(n) * exp_env(n, secs / 4.5)
    ir = lp(ir, damp)
    ir[: int(0.012 * SR)] *= np.linspace(0, 1, int(0.012 * SR))
    out = signal.fftconvolve(x, ir)[: len(x)]
    return out / (np.max(np.abs(out)) + 1e-9) * np.max(np.abs(x)) * wet


def delay(x, secs, fb=0.45, tone=3500, n_rep=6):
    out = x.copy()
    cur = x
    for i in range(n_rep):
        cur = lp(np.concatenate([np.zeros(int(secs * SR)), cur])[: len(x)], tone) * fb
        out += cur
    return out


def tape(x, rng, amt=0.003):
    t = np.arange(len(x)) / SR
    wob = amt * (np.sin(2 * np.pi * 0.5 * t) + 0.5 * np.sin(2 * np.pi * 3.1 * t + 1.3))
    idx = np.arange(len(x)) + wob * SR
    y = np.interp(idx, np.arange(len(x)), x)
    return sat(y + rng.standard_normal(len(x)) * 0.0015, 1.4)


def pan(x, p):
    p = (p + 1) / 2
    return np.stack([x * np.cos(p * np.pi / 2), x * np.sin(p * np.pi / 2)])


def place(buf, x, start, gain=1.0, p=0.0):
    s = int(start * SR)
    if s >= buf.shape[1]:
        return
    seg = pan(x, p)[:, : buf.shape[1] - s] * gain
    buf[:, s:s + seg.shape[1]] += seg


def duck(sig, kick_times, total, depth=0.55, rel=0.16):
    env = np.ones(int(total * SR))
    for k in kick_times:
        s = int(k * SR)
        if s >= len(env):
            continue
        m = min(len(env) - s, int(rel * SR))
        env[s:s + m] = np.minimum(env[s:s + m], 1 - depth * np.exp(-np.arange(m) / (0.06 * SR)))
    return sig * env


def finish(mix, path, peak=0.89):
    mix = mix.copy()
    mix = np.stack([hp(c, 25, 2) for c in mix])
    mix = sat(mix, 1.15)
    mix = mix / (np.max(np.abs(mix)) + 1e-9) * peak
    sf.write(path, mix.T.astype(np.float32), SR, subtype="PCM_24")


def pluck(freq, dur, bright=1.0, detune=0.007):
    """Pluck analogique : 2 saws désaccordées + pulse, filtre dont l'enveloppe se referme (son sec, rond, pas de cloche)."""
    n = int(dur * SR)
    t = np.arange(n) / SR
    x = (signal.sawtooth(2 * np.pi * freq * (1 - detune) * t) + signal.sawtooth(2 * np.pi * freq * (1 + detune) * t)
         + 0.6 * signal.square(2 * np.pi * freq * 0.5 * t, duty=0.35)) * 0.33
    e = np.exp(-np.arange(n) / (0.09 * SR))
    y = lp(x, 500 * bright) * (1 - e) + lp(x, 5200 * bright) * e
    amp = np.exp(-np.arange(n) / (dur * SR / 3.5)) * np.minimum(1, np.arange(n) / (0.002 * SR))
    return sat(y * amp * 1.6, 1.4)
