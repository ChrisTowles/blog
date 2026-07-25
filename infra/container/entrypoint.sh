#!/bin/sh
set -e

# Cloud SQL can report RUNNABLE while still refusing connections — the Cloud
# Run connector then fails the dial with "timed out after 10s". Staging hits
# this on most deploys because the cost kill-switch stops the instance, so
# every deploy pays a cold start.
#
# Without a retry, `set -e` aborts the container right here: the server never
# binds $PORT, Cloud Run reports "STARTUP TCP probe failed ... instance was
# not started", and the revision serves 500s until the smoke test gives up.
# Retrying keeps a transient DB cold start from killing an otherwise healthy
# revision. A genuinely broken migration still fails, just after the window.
echo "Running database migrations..."
MIGRATE_MAX_ATTEMPTS="${MIGRATE_MAX_ATTEMPTS:-18}"
MIGRATE_RETRY_DELAY="${MIGRATE_RETRY_DELAY:-10}"

attempt=1
while :; do
  if node /app/.output/database/migrate.mjs; then
    echo "Migrations applied (attempt ${attempt})."
    break
  fi

  if [ "$attempt" -ge "$MIGRATE_MAX_ATTEMPTS" ]; then
    echo "Migrations failed after ${attempt} attempts; aborting startup." >&2
    exit 1
  fi

  echo "  migration attempt ${attempt}/${MIGRATE_MAX_ATTEMPTS} failed — retrying in ${MIGRATE_RETRY_DELAY}s..."
  attempt=$((attempt + 1))
  sleep "$MIGRATE_RETRY_DELAY"
done

echo "Starting application..."
# exec replaces this shell with node (node becomes PID 1)
# This ensures Docker signals (SIGTERM) go directly to node for graceful shutdown
exec node /app/.output/server/index.mjs
