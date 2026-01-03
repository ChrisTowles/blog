#!/bin/bash
# Start Cloud SQL Proxy for local development



PROJECT_ID="blog-towles-staging"
ENVIRONMENT="staging"
PROXY_PORT="${PROXY_PORT:-5433}"  # Use 5433 to avoid conflict with local postgres


#PROJECT_ID="blog-towles-production"
#ENVIRONMENT="production"

echo "Fetching secrets... for #${ENVIRONMENT} in project ${PROJECT_ID}"
CONNECTION_STRING=$(gcloud secrets versions access latest --secret="db-connection-string" --project="${PROJECT_ID}")
CONNECTION_NAME=$(gcloud secrets versions access latest --secret="db-connection-name" --project="${PROJECT_ID}")

echo "Connection name: ${CONNECTION_NAME}"
echo "Connection string: ${CONNECTION_STRING}"

# Build localhost proxy URL by replacing @localhost/db?host=... with @localhost:PORT/db
PROXY_CONNECTION_STRING=$(echo "${CONNECTION_STRING}" | sed -E "s|@localhost/([^?]+)\?host=.*|@localhost:${PROXY_PORT}/\1|")

echo ""
echo "Use this connection string locally (connects via proxy on port ${PROXY_PORT}):"
echo "  ${PROXY_CONNECTION_STRING}"

echo ""
echo "Starting Cloud SQL Proxy on port ${PROXY_PORT}..."
cloud-sql-proxy --port "${PROXY_PORT}" "${CONNECTION_NAME}"
