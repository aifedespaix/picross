# Sons du jeu : musiques, ambiance, effets

Tout est **composé en code** (numpy/scipy, déterministe, graines fixes) avec le moteur de synthèse de la chaîne AIFE Factory
(`engine.py` et `common.py` sont des copies de `aife-factory/audio-bank/service/synth/`). Aucune IA, aucun échantillon tiers.

```bash
tools/music/build.sh                 # tout régénérer (wav dans tools/music/out/, MP3 dans apps/web/app/assets/audio/)
tools/music/build.sh sfx ambience    # une partie seulement : music | more | ambience | sfx
```

| Fichier | Rôle |
|---|---|
| `loop.py` | aides « boucle de jeu » : repli de la queue de réverb (boucle sans couture), niveau commun −19 dBFS RMS, textures bouclables |
| `t_<chapitre>.py` | les 7 pistes d'origine, écrites à la main (une par chapitre du parcours) |
| `gen.py` + `t_more.py` | générateur à recettes (tonalité, gamme, progression, couches) : 9 variantes de chapitre + 3 pistes de carte |
| `a_ambience.py` | 3 textures d'ambiance sans tonalité (air · grondement · souffles) |
| `s_sfx.py` | 15 sons de jeu et d'interface |
| `analyze.py` | contrôle objectif : niveau, crête, brillance, couture de boucle |

## Musiques (19 pistes, 8 « familles »)

Une famille = une ambiance. Le jeu joue la piste de la famille du chapitre (parcours) ou de la corruption (partie libre) ; en revenant
dans une famille il prend une autre variante que la dernière jouée, et ne change jamais de piste en pleine partie.

| Famille | Pistes | Où |
|---|---|---|
| `awakening` L'Éveil | `awakening` · `-b` · `-c` | ch. 1 ; partie libre « pure » |
| `whisper` Le Murmure | `whisper` · `-b` · `-c` | ch. 2 ; libre « calm » |
| `eyes` Les Yeux | `eyes` · `-b` | ch. 3 ; libre « uneasy » |
| `pack` La Meute | `pack` · `-b` | ch. 4 |
| `threshold` Le Seuil | `threshold` · `-b` | ch. 5 |
| `bite` La Morsure | `bite` · `-b` | ch. 6 ; libre « dark » |
| `demon` Le Démon | `demon` · `-b` | ch. 7 (boss) |
| `map` Carte | `map-a` · `-b` · `-c` | parcours (la carte) et accueil : calmes, sans batterie |

Règles tenues (leçons de la Factory L-A19, L-A26, L-A39) : ≤ 4 couches simultanées, de l'espace, aucune cloche FM, pas de « synthé cheap »,
timbres variés d'une piste à l'autre, 16 mesures avec une variation à mi-parcours. Progression pureté → démon par la densité (aucune batterie →
cœur lointain → pulsation → kick franc), pas par le volume.

## Ambiance
Trois textures bouclées (40 s) jouées ensemble sur le bus « ambiance » ; leurs niveaux glissent avec la corruption (`domain/ambience.ts`). Sans
hauteur reconnaissable, elles ne se disputent jamais la tonalité avec la musique.

## Effets
Tonals ceux-là sont accordés sur do pentatonique : `fill` est une seule note que le jeu transpose (tracer une ligne joue un petit arpège qui monte puis
redescend), `line` (ligne ou colonne faite), `hint`, `win1/2/3` (une phrase de plus par étoile), `boss`. Les autres : `cross`, `clear`, `undo`, `undo2`,
`error` (grave et doux, il ne punit pas), `tap`, `open`, `close` (interface).

## Mixage (côté jeu : `domain/mix.ts`, `utils/audioMixer.ts`)
Quatre bus (musique, ambiance, effets, interface) + volume général, chacun réglable de 0 à 100 dans les réglages (0 = muet, courbe perceptive).
Par défaut : effets > interface > musique > ambiance. Chaque effet creuse brièvement la musique et l'ambiance (ducking), la victoire beaucoup plus ;
la musique a un léger creux à 2,6 kHz où tombent les effets ; un limiteur doux protège la sortie.
Les wav ne sont pas versionnés, seuls les MP3 le sont. Les fichiers audio ne sont jamais inlinés par Vite (CSP `connect-src 'self'`).
