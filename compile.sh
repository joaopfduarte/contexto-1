#!/usr/bin/env bash
# Compila a apresentacao Beamer (LuaLaTeX, duas passagens).
# Uso: ./compile.sh [web]
set -euo pipefail

ROOT="$(cd "$(dirname "$0")" && pwd)"
cd "$ROOT"

cmd="${1:-}"
if [[ -n "$cmd" && "$cmd" != "web" ]]; then
  echo "Uso: $0 [web]" >&2
  exit 1
fi

echo "[1/3] limpar artefatos auxiliares"
rm -f main.aux main.nav main.snm main.toc main.out main.log main.pdf main.vrb \
  main.lof main.lot main.lol texput.log texput.pdf

echo "[2/3] lualatex passo 1/2"
lualatex -interaction=nonstopmode main.tex

echo "[3/3] lualatex passo 2/2"
lualatex -interaction=nonstopmode main.tex

echo "ok — ${ROOT}/main.pdf"

if [[ "$cmd" == "web" ]]; then
  mkdir -p web/public/documents
  cp main.pdf web/public/documents/slides.pdf
  python3 - <<'PY'
import json
from datetime import datetime, timezone
from pathlib import Path
payload = {
    "sha": "local",
    "shortSha": "local",
    "branch": "dev",
    "timestamp": datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"),
}
Path("web/public/build-info.json").write_text(
    json.dumps(payload, indent=2) + "\n",
    encoding="utf-8",
)
PY
  echo "ok — web/public/documents/slides.pdf"
fi
