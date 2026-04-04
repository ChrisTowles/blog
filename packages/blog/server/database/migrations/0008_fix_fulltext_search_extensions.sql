-- Enable pg_trgm extension for trigram-based text search
CREATE EXTENSION IF NOT EXISTS pg_trgm;--> statement-breakpoint

-- Ensure searchVector column is tsvector type (idempotent: no-op if already tsvector)
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'document_chunks'
      AND column_name = 'searchVector'
      AND data_type = 'text'
  ) THEN
    ALTER TABLE "document_chunks"
      ALTER COLUMN "searchVector" TYPE tsvector
      USING to_tsvector('english', COALESCE("searchVector", ''));
  END IF;
END $$;--> statement-breakpoint

-- Recreate trigger function (idempotent via CREATE OR REPLACE)
CREATE OR REPLACE FUNCTION document_chunks_search_vector_update() RETURNS trigger AS $$
BEGIN
  NEW."searchVector" := to_tsvector('english', COALESCE(NEW.content, '') || ' ' || COALESCE(NEW."contextualContent", ''));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;--> statement-breakpoint

-- Recreate trigger (drop first to be idempotent)
DROP TRIGGER IF EXISTS document_chunks_search_vector_trigger ON "document_chunks";--> statement-breakpoint
CREATE TRIGGER document_chunks_search_vector_trigger
  BEFORE INSERT OR UPDATE OF content, "contextualContent"
  ON "document_chunks"
  FOR EACH ROW
  EXECUTE FUNCTION document_chunks_search_vector_update();--> statement-breakpoint

-- Create GIN index if not exists for fast full-text search
CREATE INDEX IF NOT EXISTS "document_chunks_search_vector_idx"
  ON "document_chunks" USING gin ("searchVector");--> statement-breakpoint

-- Create GIN trigram index on content for fuzzy text matching
CREATE INDEX IF NOT EXISTS "document_chunks_content_trgm_idx"
  ON "document_chunks" USING gin (content gin_trgm_ops);
