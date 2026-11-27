"""Générateur de pistes à « recettes » : une recette = tonalité, gamme, tempo, progression, et quelques couches (≤ 4).
Mélodies engendrées par graine (déterministes) : notes de l'accord sur les temps forts, pas conjoints ailleurs, deux phrases A/B
arrangées sur 16 mesures (A A B A · A B B A'), A' = A une octave plus haut. Boucle sans couture (voir loop.py)."""
from loop import *

SCALES = {
    "major": [0, 2, 4, 5, 7, 9, 11], "lydian": [0, 2, 4, 6, 7, 9, 11], "minor": [0, 2, 3, 5, 7, 8, 10],
    "dorian": [0, 2, 3, 5, 7, 9, 10], "phrygian": [0, 1, 3, 5, 7, 8, 10], "mixolydian": [0, 2, 4, 5, 7, 9, 10],
}
STRONG = (0, 4, 8, 12)


def scale_notes(root, mode, lo, hi):
    return [n for n in range(lo, hi + 1) if (n - root) % 12 in SCALES[mode]]


def chord_of(root, mode, degree, size=4):
    """Accord par tierces empilées sur le degré `degree` (0-6) de la gamme ; renvoie des notes midi autour de `root`."""
    sc = SCALES[mode]
    out = []
    for k in range(size):
        d = degree + 2 * k
        out.append(root + sc[d % 7] + 12 * (d // 7))
    return out


def motif(rng, root, mode, chord, lo, hi, notes_n, span=16):
    """Une phrase de `notes_n` notes sur `span` pas : (midi, pas, durée en pas)."""
    pool = scale_notes(root, mode, lo, hi)
    tones = [n for n in pool if (n - chord[0]) % 12 in {(c - chord[0]) % 12 for c in chord}]
    slots = sorted(set([0] + list(rng.choice(range(1, span), size=min(notes_n - 1, span - 1), replace=False))))
    slots = sorted(slots, key=lambda s: s)
    out, cur = [], int(rng.choice(tones))
    for i, s in enumerate(slots):
        if i:
            idx = pool.index(cur) if cur in pool else len(pool) // 2
            idx = int(np.clip(idx + rng.choice([-2, -1, -1, 0, 1, 1, 2]), 0, len(pool) - 1))
            cur = pool[idx]
        if s in STRONG or i == len(slots) - 1:       # temps forts et dernière note : sur l'accord
            cur = min(tones, key=lambda n: abs(n - cur))
        nxt = slots[i + 1] if i + 1 < len(slots) else span
        out.append((cur, s, max(1, min(nxt - s, 6))))
    return out


def render(r):
    rng, STEP, BAR, LN, N = setup(r["bpm"], 16, seed=r["seed"], tail=r.get("tail", 4.0))
    root, mode = r["root"], r["mode"]
    prog = r["prog"]                                          # 4 degrés, un par groupe de 4 mesures
    L = {k: Z(N) for k in ("pad", "bass", "lead", "drums", "extra", "arp")}
    lead_kind = r.get("lead", "pluck")
    lo, hi = r.get("range", (root + 24, root + 40))
    phr = {}
    for gi, deg in enumerate(prog):
        ch = chord_of(root + 12, mode, deg)
        phr[gi] = (motif(rng, root, mode, ch, lo, hi, r.get("notes", 4)), motif(rng, root, mode, ch, lo, hi, r.get("notes", 4)))
    order = "AABAABBA"
    kick_times = []
    for b in range(16):
        t0 = b * BAR
        g = b // 4
        ch = chord_of(root, mode, prog[g])
        if b % 4 == 0 and r.get("pad", 0):
            place(L["pad"], pad([midi(m) for m in ch], BAR * 4.1, rng, wobble=0.003), t0, r["pad"])
        bass = r.get("bass")
        if bass == "sub" and b % 2 == 0:
            place(L["bass"], sub_bass(midi(ch[0] - 12 if ch[0] > 40 else ch[0]), BAR * 1.7), t0, r.get("bass_g", 0.4))
        elif bass == "formant":
            riff = [(0, 3), (6, 2), (10, 3), (13, 2)] if b % 2 == 0 else [(0, 3), (4, 2), (7, 3), (12, 2)]
            for s, ln in riff:
                m = ch[0] + (7 if s in (6, 13) else 0)
                place(L["bass"], formant_bass(midi(m - (12 if m > 50 else 0)), STEP * (ln + 1), amp=0.4, sweep=0.8 + 0.2 * (b % 4)), t0 + s * STEP, r.get("bass_g", 0.7))
        if r.get("lead_g", 0):
            seg = order[b // 2] if b % 2 == 0 else None
            if seg:
                ph = phr[g][0 if seg in "A" else 1]
                up = 12 if (b // 2 == 7) else 0
                for m, s, ln in ph:
                    f = midi(m + up)
                    if lead_kind == "pluck":
                        x = soft_pluck(f, STEP * (ln + 3), r.get("bright", 0.9))
                    elif lead_kind == "karplus":
                        x = lp(karplus(f, STEP * (ln + 4), rng), 2100) * 0.7
                    else:
                        x = wood(rng, f * 2, 0.09)
                    place(L["lead"], x, t0 + s * STEP, r["lead_g"], 0.25 * (-1) ** s)
                # la phrase dure deux mesures : on rejoue sa moitié en écho pour remplir la 2e mesure
                for m, s, ln in ph[: max(1, len(ph) // 2)]:
                    x = soft_pluck(midi(m + up), STEP * (ln + 2), 0.7) if lead_kind != "karplus" else lp(karplus(midi(m + up), STEP * 4, rng), 2100) * 0.55
                    place(L["lead"], x, t0 + BAR + s * STEP, r["lead_g"] * 0.7, -0.25 * (-1) ** s)
        d = r.get("drums")
        if d == "heart":
            place(L["drums"], lp(kick(rng, 0.3, 0.45), 170), t0, 0.7); kick_times.append(t0)
            place(L["drums"], lp(kick(rng, 0.3, 0.45), 170), t0 + 2.5 * STEP, 0.45)
        elif d in ("soft", "broken", "drive"):
            ks = {"soft": (0, 10) if b % 2 == 0 else (0, 7, 10), "broken": (0, 6, 10) if b % 2 == 0 else (0, 7, 10, 13), "drive": (0, 4, 8, 12)}[d]
            for s in ks:
                place(L["drums"], lp(kick(rng, 0.5, 0.3), 480), t0 + s * STEP, 0.6); kick_times.append(t0 + s * STEP)
            if d != "soft" or b % 2:
                for s in (4, 12):
                    place(L["drums"], lp(snare(rng, 180, 0.2, 1.0), 3500), t0 + s * STEP, 0.2)
            for s in range(2, 16, 4):
                place(L["drums"], lp(hat(rng), 7500), t0 + s * STEP, 0.4, 0.3)
        e = r.get("extra")
        if e == "wood" and b % 2 == 1:
            for s in (5, 11):
                place(L["extra"], wood(rng, 1400 + 150 * (b % 4), 0.06), t0 + s * STEP, 0.22, float(rng.uniform(-0.8, 0.8)))
        if e == "breath" and b % 4 in (1, 3):
            place(L["extra"], breath(rng, STEP * 7, 1000 + 150 * (b % 3), 3600, 0.5), t0 + (2 if b % 4 == 1 else 8) * STEP, 0.4, -0.7 if b % 8 < 4 else 0.7)
        if e == "ticks":
            for s in (5, 10, 15):
                place(L["extra"], lp(tick(rng, 3200 + 300 * s, 0.015), 4500) * 0.6, t0 + s * STEP, 0.1 if s != 10 else 0.18, float(rng.uniform(-0.6, 0.6)))
        if e == "blink":
            hi_n, lo_n = chord_of(root + 24, mode, prog[g])[2], chord_of(root + 12, mode, prog[g])[0]
            base = 1 if b % 2 == 0 else 3
            place(L["extra"], soft_pluck(midi(hi_n), STEP * 6, 0.75), t0 + base * STEP, 0.45, -0.85)
            place(L["extra"], soft_pluck(midi(hi_n), STEP * 6, 0.75), t0 + (base + 2) * STEP + 0.01, 0.45, 0.85)
        ar = r.get("arp")
        if ar:    # cycles de longueurs différentes (polymétrie douce), notes de l'accord
            for s in range(16):
                k = b * 16 + s
                if k % ar[0] == 0:
                    n = chord_of(root + 12, mode, prog[g])[(k // ar[0]) % 4]
                    place(L["arp"], lp(karplus(midi(n + 12), 0.5, rng), 2600) * 0.55, t0 + s * STEP, 0.5, -0.6)
                if len(ar) > 1 and k % ar[1] == 0:
                    n = chord_of(root + 12, mode, prog[g])[(k // ar[1] + 1) % 4]
                    place(L["arp"], wood(rng, midi(n) * 3, 0.07), t0 + s * STEP, 0.35, 0.5)
    lead_d = np.stack([delay(c, STEP * r.get("delay_steps", 3), r.get("fb", 0.35), 2600, 4) for c in L["lead"]])
    wet = (L["pad"] * 0.6 + lead_d * 0.6 + L["extra"] * 0.4 + L["arp"] * 0.5)
    rv = np.stack([reverb(wet[c], np.random.default_rng(r["seed"] + 5 + c), r.get("rv", 3.2), damp=r.get("damp", 2800)) for c in range(2)])
    bass = sidechain(L["bass"], kick_times, 0.35, 0.14) if kick_times else L["bass"]
    mix = L["drums"] * 0.85 + bass * 0.8 + lead_d + L["pad"] * 0.5 + L["extra"] * 0.8 + L["arp"] + rv * r.get("rv_g", 0.4)
    if r.get("tape"):
        mix = np.stack([tape(c, rng, r["tape"]) for c in mix])
    mix = np.stack([lp(c, r.get("lp", 9000)) for c in mix])
    save_loop(mix, r["name"], LN)
