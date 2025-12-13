-- Enable pgvector extension for vector similarity search
CREATE EXTENSION IF NOT EXISTS vector;
--> statement-breakpoint
CREATE TABLE "document_chunks" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"documentId" varchar(36) NOT NULL,
	"chunkIndex" integer NOT NULL,
	"content" text NOT NULL,
	"contextualContent" text NOT NULL,
	"embedding" vector(1024),
	"searchVector" tsvector GENERATED ALWAYS AS (to_tsvector('english', content || ' ' || "contextualContent")) STORED,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "documents" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"slug" varchar(200) NOT NULL,
	"title" varchar(500) NOT NULL,
	"path" varchar(500) NOT NULL,
	"url" varchar(500) NOT NULL,
	"contentHash" varchar(64) NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "documents_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
ALTER TABLE "document_chunks" ADD CONSTRAINT "document_chunks_documentId_documents_id_fk" FOREIGN KEY ("documentId") REFERENCES "public"."documents"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "document_chunks_document_id_idx" ON "document_chunks" USING btree ("documentId");--> statement-breakpoint
CREATE INDEX "document_chunks_chunk_index_idx" ON "document_chunks" USING btree ("documentId","chunkIndex");--> statement-breakpoint
CREATE INDEX "documents_slug_idx" ON "documents" USING btree ("slug");--> statement-breakpoint
-- HNSW index for fast vector similarity search (cosine distance)
CREATE INDEX "document_chunks_embedding_idx" ON "document_chunks" USING hnsw ("embedding" vector_cosine_ops);--> statement-breakpoint
-- GIN index for fast full-text search (BM25)
CREATE INDEX "document_chunks_search_vector_idx" ON "document_chunks" USING gin ("searchVector");