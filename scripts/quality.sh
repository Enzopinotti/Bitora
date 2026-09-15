#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
MODE="${1:-all}"

log() {
  printf '\n==> %s\n' "$1"
}

require_command() {
  if ! command -v "$1" >/dev/null 2>&1; then
    printf 'Required command not found: %s\n' "$1" >&2
    exit 1
  fi
}

check_backend() {
  require_command node
  require_command npm
  log "Backend: clean install + Jest"
  (
    cd "$ROOT_DIR/backend"
    npm ci
    npm test -- --runInBand
  )
}

check_frontend() {
  require_command node
  require_command npm
  log "Frontend: clean install + production build"
  (
    cd "$ROOT_DIR/frontend"
    npm ci
    npm run build
  )
}

check_compose() {
  require_command docker
  if ! docker compose version >/dev/null 2>&1; then
    printf 'Docker Compose v2 is required (docker compose).\n' >&2
    exit 1
  fi

  log "Docker Compose: configuration contract"
  (
    cd "$ROOT_DIR"
    docker compose config --quiet
  )
}

case "$MODE" in
  backend)
    check_backend
    ;;
  frontend)
    check_frontend
    ;;
  compose)
    check_compose
    ;;
  all)
    check_backend
    check_frontend
    check_compose
    ;;
  *)
    printf 'Usage: %s [all|backend|frontend|compose]\n' "${0##*/}" >&2
    exit 2
    ;;
esac

log "Quality contract passed: $MODE"
