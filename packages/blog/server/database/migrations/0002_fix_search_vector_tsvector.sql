-- Convert searchVector from text to tsvector type
ALTER TABLE "document_chunks" ALTER COLUMN "searchVector" TYPE tsvector USING to_tsvector('english', COALESCE("searchVector", ''));--> statement-breakpoint

-- Create trigger function to auto-generate tsvector from content + contextualContent
CREATE OR REPLACE FUNCTION document_chunks_search_vector_update() RETURNS trigger AS $$
BEGIN
  NEW."searchVector" := to_tsvector('english', COALESCE(NEW.content, '') || ' ' || COALESCE(NEW."contextualContent", ''));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;--> statement-breakpoint

-- Create trigger on insert/update
CREATE TRIGGER document_chunks_search_vector_trigger
  BEFORE INSERT OR UPDATE OF content, "contextualContent"
  ON "document_chunks"
  FOR EACH ROW
  EXECUTE FUNCTION document_chunks_search_vector_update();--> statement-breakpoint

-- Backfill existing rows
UPDATE "document_chunks" SET "searchVector" = to_tsvector('english', COALESCE(content, '') || ' ' || COALESCE("contextualContent", ''));--> statement-breakpoint

-- Create GIN index for fast full-text search
CREATE INDEX "document_chunks_search_vector_idx" ON "document_chunks" USING gin ("searchVector");
