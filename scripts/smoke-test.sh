#!/usr/bin/env bash
# Usage: scripts/smoke-test.sh <base-url> [path ...]
# Retries each path until it answers 200. A path ending in "?" is optional: a 404
# is accepted (the route may not exist), any other non-200 still fails.
set -euo pipefail

BASE_URL="${1:?base url required}"
shift
PATHS=("$@")
[ ${#PATHS[@]} -eq 0 ] && PATHS=("/")

ATTEMPTS="${SMOKE_ATTEMPTS:-18}"
DELAY="${SMOKE_DELAY:-10}"

for raw in "${PATHS[@]}"; do
  optional=false
  path="$raw"
  if [[ "$raw" == *"?" ]]; then
    optional=true
    path="${raw%?}"
  fi

  status=000
  for i in $(seq 1 "$ATTEMPTS"); do
    status=$(curl -s -o /dev/null -w '%{http_code}' --max-time 20 "${BASE_URL}${path}" || echo 000)
    echo "  ${BASE_URL}${path} [attempt ${i}] HTTP ${status}"
    if [ "$status" = "200" ]; then break; fi
    if [ "$optional" = true ] && [ "$status" = "404" ]; then break; fi
    sleep "$DELAY"
  done

  if [ "$status" = "200" ] || { [ "$optional" = true ] && [ "$status" = "404" ]; }; then
    continue
  fi
  echo "::error::Smoke test failed for ${BASE_URL}${path} (last status ${status})"
  exit 1
done

echo "Smoke test passed for ${BASE_URL}"
