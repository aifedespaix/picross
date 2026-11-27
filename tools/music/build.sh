#!/usr/bin/env bash
# Rend les 7 boucles (déterministes, seed fixe) puis les encode en MP3 dans apps/web/app/assets/audio/music/.
# Prérequis : uv (https://docs.astral.sh/uv/) et ffmpeg. Usage : tools/music/build.sh [piste ...]  (ex. : eyes demon)
set -euo pipefail
cd "$(dirname "$0")"
export OUT="$PWD/out"
DEST="../../apps/web/app/assets/audio/music"
mkdir -p "$OUT" "$DEST"
tracks=("$@"); [ ${#tracks[@]} -eq 0 ] && tracks=(awakening whisper eyes pack threshold bite demon)
for t in "${tracks[@]}"; do
  uv run --quiet --with numpy --with scipy --with soundfile python "t_${t}.py" &
done
wait
for t in "${tracks[@]}"; do
  wav=$(ls "$OUT"/*-"$t".wav)
  ffmpeg -y -loglevel error -i "$wav" -c:a libmp3lame -b:a 96k -joint_stereo 1 -ar 44100 "$DEST/$t.mp3"
done
uv run --quiet --with numpy --with soundfile python analyze.py "$OUT"
