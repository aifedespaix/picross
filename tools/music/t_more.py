"""Pistes supplémentaires : variantes de chapitre (b, c) et trois pistes de « carte » (parcours / accueil), toutes issues de gen.render.
Usage : python t_more.py [nom ...]"""
import sys
from gen import *

R = [
    # --- variantes de chapitre -------------------------------------------------------------------
    dict(name="08-awakening-b", seed=108, bpm=68, root=53, mode="lydian", prog=[0, 5, 3, 4], pad=0.5, bass="sub", lead_g=0.5, notes=4, extra="wood", rv=3.4),
    dict(name="09-awakening-c", seed=109, bpm=76, root=55, mode="major", prog=[0, 3, 4, 0], pad=0.4, lead="karplus", lead_g=0.7, notes=5, delay_steps=3, fb=0.4, rv=3.0),
    dict(name="10-whisper-b", seed=110, bpm=72, root=50, mode="dorian", prog=[0, 3, 6, 4], pad=0.5, bass="sub", lead_g=0.45, notes=3, extra="breath", rv=3.6, damp=2600, tape=0.0018),
    dict(name="11-whisper-c", seed=111, bpm=70, root=47, mode="minor", prog=[0, 5, 2, 6], pad=0.45, lead="karplus", lead_g=0.65, notes=4, extra="ticks", rv=3.8, damp=2400),
    dict(name="12-eyes-b", seed=112, bpm=80, root=43, mode="minor", prog=[0, 0, 1, 0], pad=0.55, bass="sub", bass_g=0.5, drums="heart", extra="blink", rv=3.4),
    dict(name="13-pack-b", seed=113, bpm=100, root=45, mode="dorian", prog=[0, 3, 4, 0], pad=0.35, drums="soft", arp=(5, 7), lead_g=0.35, lead="karplus", notes=3, rv=2.4, tape=0.0015),
    dict(name="14-threshold-b", seed=114, bpm=76, root=48, mode="minor", prog=[0, 5, 6, 4], pad=0.55, bass="sub", bass_g=0.5, drums="heart", lead="karplus", lead_g=0.5, notes=3, rv=4.2, damp=2400, tail=5.0),
    dict(name="15-bite-b", seed=115, bpm=110, root=40, mode="minor", prog=[0, 5, 2, 6], bass="formant", drums="broken", lead_g=0.4, notes=4, extra="ticks", rv=2.2),
    dict(name="16-demon-b", seed=116, bpm=120, root=35, mode="minor", prog=[0, 5, 3, 4], pad=0.35, bass="formant", bass_g=0.6, drums="drive", lead_g=0.4, notes=6, delay_steps=3, rv=2.6),
    # --- pistes de carte : calmes, sans batterie, pour le parcours et l'accueil -------------------------
    dict(name="17-map-a", seed=117, bpm=64, root=48, mode="major", prog=[0, 5, 3, 4], pad=0.6, bass="sub", lead_g=0.45, notes=3, extra="wood", rv=3.8),
    dict(name="18-map-b", seed=118, bpm=60, root=45, mode="minor", prog=[0, 5, 2, 4], pad=0.6, lead="karplus", lead_g=0.6, notes=3, rv=4.0, damp=2600),
    dict(name="19-map-c", seed=119, bpm=66, root=50, mode="lydian", prog=[0, 4, 5, 3], pad=0.5, bass="sub", lead_g=0.5, notes=4, extra="ticks", rv=3.6),
]
want = set(sys.argv[1:])
for r in R:
    if not want or r["name"].split("-", 1)[1] in want:
        render(r)
