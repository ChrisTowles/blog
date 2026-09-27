#!/usr/bin/env bash
# Start a Cloud SQL instance and block until Postgres accepts connections.
#
# The staging instance is stopped nightly by the cost scheduler. While it is
# stopped, `terraform plan` errors reading the SQL user and silently skips every
# resource that depends on Cloud SQL — including the blog Cloud Run service.
#
# Usage: wake-sql.sh <project_id> [instance]   (instance defaults to <project_id>-db)
set -euo pipefail

PROJECT="${1:?usage: wake-sql.sh <project_id> [instance]}"
INSTANCE="${2:-${PROJECT}-db}"

state() { gcloud sql instances describe "$INSTANCE" --project="$PROJECT" --format='value(state)' 2>/dev/null || echo UNKNOWN; }

STATE=$(state)
echo "Cloud SQL ${INSTANCE}: ${STATE}"
if [ "$STATE" != "RUNNABLE" ]; then
  # --async: a cold start can outlast gcloud's built-in operation wait. A patch
  # may already be in flight from another run, so a non-zero exit is non-fatal.
  gcloud sql instances patch "$INSTANCE" --activation-policy=ALWAYS --project="$PROJECT" --async --quiet \
    || echo "patch dispatch non-zero (likely already starting); polling state"
fi

for i in $(seq 1 100); do
  STATE=$(state)
  [ "$STATE" = "RUNNABLE" ] && break
  echo "  [$((i * 15))s] state=${STATE}"
  sleep 15
done
if [ "$STATE" != "RUNNABLE" ]; then
  echo "Cloud SQL did not reach RUNNABLE in time (state=${STATE})" >&2
  exit 1
fi

# RUNNABLE precedes Postgres accepting connections. Listing users makes the
# Admin API connect to the database, which is the same read terraform does.
for i in $(seq 1 40); do
  if gcloud sql users list --instance="$INSTANCE" --project="$PROJECT" --format='value(name)' >/dev/null 2>&1; then
    echo "Cloud SQL ${INSTANCE} accepting connections."
    exit 0
  fi
  echo "  [$((i * 15))s] waiting for Postgres to accept connections"
  sleep 15
done
echo "Postgres on ${INSTANCE} never accepted connections" >&2
exit 1
