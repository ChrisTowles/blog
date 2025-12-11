#!/bin/bash
# Start Cloud SQL Proxy for local development



PROJECT_ID="blog-towles-staging"
ENVIRONMENT="staging"


#PROJECT_ID="blog-towles-production"
#ENVIRONMENT="production"

echo "Fetching secrets... for #${ENVIRONMENT} in project ${PROJECT_ID}"
CONNECTION_STRING=$(gcloud secrets versions access latest --secret="${ENVIRONMENT}-db-connection-string" --project="${PROJECT_ID}")
CONNECTION_NAME=$(gcloud secrets versions access latest --secret="${ENVIRONMENT}-db-connection-name" --project="${PROJECT_ID}")

echo "Connection name: ${CONNECTION_NAME}"
echo "Connection string: ${CONNECTION_STRING}"

echo ""
echo "Starting Cloud SQL Proxy..."
cloud-sql-proxy "${CONNECTION_NAME}"
