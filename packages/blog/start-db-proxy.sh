#!/bin/bash
# Start Cloud SQL Proxy for local development

echo "Starting Cloud SQL Proxy..."
/tmp/cloud-sql-proxy blog-towles-staging:us-central1:staging-blog-towles-staging-db
