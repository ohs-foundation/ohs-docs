#!/bin/sh
HERE="$(dirname "$0")"
if command -v open >/dev/null 2>&1; then
  open "$HERE/OPEN_DESIGNS.html"
elif command -v xdg-open >/dev/null 2>&1; then
  xdg-open "$HERE/OPEN_DESIGNS.html"
else
  echo "Open OPEN_DESIGNS.html in your browser."
fi
