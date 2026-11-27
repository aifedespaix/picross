#!/usr/bin/env bash
# Rend tous les sons du jeu (déterministes, seeds fixes) et les encode dans apps/web/app/assets/audio/.
# Prérequis : uv (https://docs.astral.sh/uv/) et ffmpeg.
# Usage : tools/music/build.sh [music|more|ambience|sfx ...]   (sans argument : tout)
set -euo pipefail
cd "$(dirname "$0")"
export OUT="$PWD/out"
AUDIO="../../apps/web/app/assets/audio"
mkdir -p "$OUT" "$AUDIO/music" "$AUDIO/ambience" "$AUDIO/sfx"
parts=("$@"); [ ${#parts[@]} -eq 0 ] && parts=(music more ambience sfx)
py() { uv run --quiet --with numpy --with scipy --with soundfile python "$@"; }
enc_music() { for f in "$@"; do n=$(basename "$f" .wav); ffmpeg -y -loglevel error -i "$f" -c:a libmp3lame -b:a 96k -joint_stereo 1 -ar 44100 "$AUDIO/music/${n#*-}.mp3"; done; }

for part in "${parts[@]}"; do
  case "$part" in
    music)    for t in awakening whisper eyes pack threshold bite demon; do py "t_${t}.py" & done; wait; enc_music "$OUT"/0[1-7]-*.wav ;;
    more)     py t_more.py; enc_music "$OUT"/0[89]-*.wav "$OUT"/1?-*.wav ;;
    ambience) py a_ambience.py
              for n in pure uneasy dark; do ffmpeg -y -loglevel error -i "$OUT/ambience-$n.wav" -c:a libmp3lame -b:a 64k -ar 44100 "$AUDIO/ambience/$n.mp3"; done ;;
    sfx)      py s_sfx.py
              for f in "$OUT"/sfx/*.wav; do ffmpeg -y -loglevel error -i "$f" -ac 1 -c:a libmp3lame -b:a 96k -ar 44100 "$AUDIO/sfx/$(basename "$f" .wav).mp3"; done ;;
  esac
done
uv run --quiet --with numpy --with soundfile python analyze.py "$OUT"
