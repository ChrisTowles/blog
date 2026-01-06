-- Migration: Add proper tsvector support for full-text search
-- Fixes: GitHub issue #160 - ts_rank(text, tsquery) does not exist

-- Step 1: Alter searchVector column from text to tsvector
-- Note: Existing data will be cast to tsvector (empty values become null)
ALTER TABLE document_chunks
ALTER COLUMN "searchVector" TYPE tsvector
USING "searchVector"::tsvector;

--> statement-breakpoint

-- Step 2: Create GIN index for fast full-text search
CREATE INDEX IF NOT EXISTS "document_chunks_search_vector_idx"
ON document_chunks USING GIN ("searchVector");

--> statement-breakpoint

-- Step 3: Create trigger function to auto-populate searchVector from content
CREATE OR REPLACE FUNCTION update_search_vector()
RETURNS TRIGGER AS $$
BEGIN
  NEW."searchVector" := to_tsvector('english', COALESCE(NEW.content, '') || ' ' || COALESCE(NEW."contextualContent", ''));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

--> statement-breakpoint

-- Step 4: Create trigger to run on insert/update
DROP TRIGGER IF EXISTS document_chunks_search_vector_trigger ON document_chunks;
CREATE TRIGGER document_chunks_search_vector_trigger
BEFORE INSERT OR UPDATE ON document_chunks
FOR EACH ROW
EXECUTE FUNCTION update_search_vector();

--> statement-breakpoint

-- Step 5: Update existing rows to populate searchVector
UPDATE document_chunks
SET "searchVector" = to_tsvector('english', COALESCE(content, '') || ' ' || COALESCE("contextualContent", ''))
WHERE "searchVector" IS NULL OR "searchVector" = ''::tsvector;
