import { and, count, eq, isNull, notInArray } from 'drizzle-orm';
import { log } from 'evlog';
import { documentChunks, documents } from '../../database/schema';
import { insertChunked } from '../drizzle';
import { chunkText, hashContent, stripFrontmatter } from './chunker';
import { getAnthropicClient } from '../ai/anthropic';
import { withAnthropicSpan } from '../observability/anthropic';
import type { RagRuntime } from './runtime';
import { deleteChunksOf, deleteDocument } from './store';
import { embedTexts } from './workers-ai';
import { upsertChunkVectors } from './vectors';

// Prompt for generating contextual descriptions
const DOCUMENT_CONTEXT_PROMPT = `<document title="{title}" url="{url}">
{doc_content}
</document>`;

const CHUNK_CONTEXT_PROMPT = `Here is a chunk from the document above:
<chunk>
{chunk_content}
</chunk>

Generate 1-2 sentences situating this chunk within the overall document for improving search retrieval. Focus on what topic this chunk covers and how it relates to the document's main theme. Answer only with the context, nothing else.`;

export interface IngestResult {
  documentsProcessed: number;
  documentsSkipped: number;
  documentsRemoved: number;
  chunksCreated: number;
  errors: string[];
}

export interface BlogSource {
  slug: string;
  title: string;
  url: string;
  path: string;
  /** Whole file as Nuxt Content stores it: frontmatter included. */
  rawbody: string;
}

export type DescribeChunk = (
  title: string,
  url: string,
  docContent: string,
  chunkContent: string,
) => Promise<string>;

export interface IngestOptions {
  /** Re-embed even when the content hash is unchanged. */
  force?: boolean;
  /** Stop after this many documents were (re)processed, so one request stays within limits. */
  limit?: number;
}

function emptyResult(): IngestResult {
  return {
    documentsProcessed: 0,
    documentsSkipped: 0,
    documentsRemoved: 0,
    chunksCreated: 0,
    errors: [],
  };
}

/**
 * Generate contextual description for a chunk using Claude
 * Uses prompt caching to reduce cost when processing multiple chunks from same doc
 */
export async function generateContextualDescription(
  docTitle: string,
  docUrl: string,
  docContent: string,
  chunkContent: string,
): Promise<string> {
  const client = getAnthropicClient();
  const config = useRuntimeConfig();
  const model = config.public.model_fast;

  const response = await withAnthropicSpan(
    'chat',
    model,
    () =>
      client.messages.create({
        model, // claude-haiku-4-5
        max_tokens: 200,
        temperature: 0,
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'text' as const,
                text: DOCUMENT_CONTEXT_PROMPT.replace('{title}', docTitle)
                  .replace('{url}', docUrl)
                  .replace('{doc_content}', docContent),
                cache_control: { type: 'ephemeral' as const }, // Enable prompt caching
              },
              {
                type: 'text' as const,
                text: CHUNK_CONTEXT_PROMPT.replace('{chunk_content}', chunkContent),
              },
            ],
          },
        ],
      }),
    {
      max_tokens: 200,
      temperature: 0,
      attributes: { 'rag.ingest.kind': 'contextual_description' },
    },
  );

  const textBlock = response.content.find((c) => c.type === 'text');

  return textBlock?.text ?? '';
}

async function isUpToDate(
  { db }: RagRuntime,
  existing: { id: string; contentHash: string },
  contentHash: string,
) {
  if (existing.contentHash !== contentHash) return false;

  const [row] = await db
    .select({ total: count() })
    .from(documentChunks)
    .where(eq(documentChunks.documentId, existing.id));

  const [pending] = await db
    .select({ total: count() })
    .from(documentChunks)
    .where(and(eq(documentChunks.documentId, existing.id), isNull(documentChunks.embeddedAt)));

  return (row?.total ?? 0) > 0 && (pending?.total ?? 0) === 0;
}

async function ingestSource(
  runtime: RagRuntime,
  source: BlogSource,
  describe: DescribeChunk,
  force: boolean,
): Promise<{ status: 'skipped' } | { status: 'processed'; chunks: number }> {
  const { db, ai, vectorize } = runtime;
  const contentHash = await hashContent(source.rawbody);

  const existing = await db.query.documents.findFirst({
    where: (doc) => eq(doc.slug, source.slug),
  });

  if (existing && !force && (await isUpToDate(runtime, existing, contentHash))) {
    return { status: 'skipped' };
  }

  const body = stripFrontmatter(source.rawbody);
  const chunks = chunkText(body);
  const described: string[] = [];

  for (const chunk of chunks) {
    described.push(await describe(source.title, source.url, body, chunk.content));
  }

  const embeddings = await embedTexts(
    ai,
    chunks.map((chunk, i) => `${chunk.content}\n\nContext: ${described[i]}`),
  );

  if (existing) await deleteChunksOf(runtime, existing.id);

  const fields = {
    title: source.title,
    path: source.path,
    url: source.url,
    contentHash,
  };

  const [doc] = existing
    ? await db.update(documents).set(fields).where(eq(documents.id, existing.id)).returning()
    : await db
        .insert(documents)
        .values({ slug: source.slug, ...fields })
        .returning();

  if (!doc) throw new Error(`Failed to write document: ${source.slug}`);

  const rows = chunks.map((chunk, i) => ({
    id: crypto.randomUUID(),
    documentId: doc.id,
    chunkIndex: chunk.index,
    content: chunk.content,
    contextualContent: described[i] ?? '',
  }));

  const [firstInsert, ...otherInserts] = insertChunked(db, documentChunks, rows);

  if (firstInsert) {
    await db.batch([firstInsert, ...otherInserts]);
    await upsertChunkVectors(
      vectorize,
      rows.map((row, i) => ({
        chunkId: row.id,
        values: embeddings[i] ?? [],
        documentId: doc.id,
        slug: doc.slug,
        url: doc.url,
        title: doc.title,
      })),
    );
    await db
      .update(documentChunks)
      .set({ embeddedAt: new Date() })
      .where(eq(documentChunks.documentId, doc.id));
  }

  return { status: 'processed', chunks: rows.length };
}

/**
 * Ingest the given sources. Unchanged, fully embedded documents are skipped, so a run that
 * stopped early (error or `limit`) resumes where it left off.
 */
export async function ingestSources(
  runtime: RagRuntime,
  sources: BlogSource[],
  describe: DescribeChunk,
  options: IngestOptions = {},
): Promise<IngestResult> {
  const result = emptyResult();

  for (const source of sources) {
    if (options.limit !== undefined && result.documentsProcessed >= options.limit) break;

    try {
      const outcome = await ingestSource(runtime, source, describe, options.force ?? false);

      if (outcome.status === 'skipped') {
        result.documentsSkipped++;
      } else {
        result.documentsProcessed++;
        result.chunksCreated += outcome.chunks;
        log.info('rag', `Ingested: ${source.title} (${outcome.chunks} chunks)`);
      }
    } catch (error) {
      const message = `Failed to process ${source.slug}: ${error}`;
      result.errors.push(message);
      log.error('rag', message);
    }
  }

  return result;
}

/** Deletes indexed documents whose post no longer exists (or became a draft). */
export async function pruneRemovedDocuments(runtime: RagRuntime, sources: BlogSource[]) {
  const slugs = sources.map((s) => s.slug);

  const stale = await runtime.db
    .select({ id: documents.id })
    .from(documents)
    .where(slugs.length > 0 ? notInArray(documents.slug, slugs) : undefined);

  for (const doc of stale) await deleteDocument(runtime, doc.id);

  return stale.length;
}
