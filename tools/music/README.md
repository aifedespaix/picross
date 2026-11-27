# Musiques de fond du jeu

Sept boucles instrumentales, **composées en code** (numpy/scipy, déterministes), avec le moteur de synthèse de la
chaîne AIFE Factory (`engine.py` et `common.py` sont des copies de `aife-factory/audio-bank/service/synth/`).
Aucune IA pour la musique. `loop.py` ajoute ce qu'il faut à un jeu : **boucle sans couture** (la réverbération de la
dernière mesure est repliée sur la première), niveau commun de −19 dBFS RMS.

```bash
tools/music/build.sh            # tout régénérer (wav dans tools/music/out/, MP3 dans apps/web/app/assets/audio/music/)
tools/music/build.sh eyes demon # certaines pistes seulement
```

## Les pistes — une par chapitre du parcours, de la pureté au démon

| Piste | Chapitre | Tonalité · BPM · durée | Ce qu'on entend | Où elle joue |
|---|---|---|---|---|
| `awakening` | L'Éveil | Do · 72 · 53 s | plucks ronds, nappe claire, un tic de bois ; aucune batterie | parcours ch. 1 ; partie libre, corruption « pure » |
| `whisper` | Le Murmure | La m · 76 · 51 s | plucks rares, souffles filtrés qui passent d'une oreille à l'autre | ch. 2 ; libre, « calm » |
| `eyes` | Les Yeux | Ré m · 84 · 46 s | bourdon, deux notes aiguës qui « clignent » gauche/droite, cœur lointain, demi-ton Mib | ch. 3 ; libre, « uneasy » |
| `pack` | La Meute | Mi dorien · 96 · 40 s | pulsation sourde, cordes pincées/bois/métal en cycles de 5, 7 et 3 pas contre la grille de 16 | ch. 4 |
| `threshold` | Le Seuil | Sol m · 80 · 48 s | cœur à deux battements, bourdon dont le filtre respire, frottement aigu | ch. 5 |
| `bite` | La Morsure | Ré m · 104 · 37 s | basse « voyelle » (formants), kick rond, plucks graves en contre-temps | ch. 6 ; libre, « dark » |
| `demon` | Le Démon | Ré m · 118 · 33 s | kick, arpège de plucks, nappe sombre ; une seule ligne de 303 en 2ᵉ moitié (signature rare) | ch. 7 (boss) |

Règles tenues (leçons de la Factory L-A19, L-A26, L-A39) : ≤ 4 couches simultanées, de l'espace, aucune cloche FM, pas de
« synthé cheap », timbres variés d'une piste à l'autre, 16 mesures avec une variation à mi-parcours pour que la boucle ne lasse pas.
Les pistes `threshold` et `demon` ne servent qu'au parcours ; en partie libre, la musique suit la corruption (voir `domain/music.ts`).

## Réglages à l'oreille
Niveau de jeu : `LEVEL` (0,32) et `DUCKED_LEVEL` (0,10, pendant l'écran de victoire) dans `composables/useMusic.ts`.
Les wav ne sont pas versionnés ; seuls les MP3 le sont.
