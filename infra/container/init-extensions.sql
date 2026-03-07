-- PostgreSQL extensions required by the blog application
-- This script runs automatically on first database creation via Docker Compose

CREATE EXTENSION IF NOT EXISTS vector;
CREATE EXTENSION IF NOT EXISTS pg_trgm;
