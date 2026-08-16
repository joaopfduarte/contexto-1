#!/usr/bin/env bash
# Compila a apresentacao Beamer (LuaLaTeX, duas passagens).
set -euo pipefail

ROOT="$(cd "$(dirname "$0")" && pwd)"
cd "$ROOT"

echo "[1/3] limpar artefatos auxiliares"
rm -f main.aux main.nav main.snm main.toc main.out main.log main.pdf main.vrb \
  main.lof main.lot main.lol texput.log texput.pdf

echo "[2/3] lualatex passo 1/2"
lualatex -interaction=nonstopmode main.tex

echo "[3/3] lualatex passo 2/2"
lualatex -interaction=nonstopmode main.tex

echo "ok — ${ROOT}/main.pdf"
