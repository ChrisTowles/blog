#!/bin/sh
set -e

echo "Running database migrations..."
node /app/.output/database/migrate.mjs

echo "Starting application..."
# exec replaces this shell with node (node becomes PID 1)
# This ensures Docker signals (SIGTERM) go directly to node for graceful shutdown
exec node /app/.output/server/index.mjs
