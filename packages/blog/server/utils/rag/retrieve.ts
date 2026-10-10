import { eq, inArray, sql } from 'drizzle-orm';
import { log } from 'evlog';
import { createHash } from 'node:crypto';
import { SpanKind, SpanStatusCode, trace, type Span } from '@opentelemetry/api';
import { documentChunks, documents } from '../../database/schema';
import { recordSpanError } from '../observability/span-helpers';
import { EMBEDDING_MODEL, RERANK_MODEL, useRagRuntime, type RagRuntime } from './runtime';
import { embedQuery, rerankDocuments } from './workers-ai';
import { queryChunkVectors } from './vectors';

const ragTracer = trace.getTracer('blog.rag');

export function hashQuery(query: string): string {
  return createHash('sha256').update(query).digest('hex').slice(0, 16);
}

export interface RAGResult {
  content: string;
  contextualContent: string;
  documentTitle: string;
  documentUrl: string;
  documentSlug: string;
  chunkIndex: number;
  score: number;
}

export interface RetrieveOptions {
  topK?: number; // Final number of results to return
  semanticWeight?: number; // Weight for semantic search in RRF (default 0.7)
  bm25Weight?: number; // Weight for BM25 search in RRF (default 0.3)
  candidateMultiplier?: number; // How many candidates to retrieve before reranking
  skipRerank?: boolean; // Skip reranking step (faster but less accurate)
}

const DEFAULT_OPTIONS: Required<RetrieveOptions> = {
  topK: 5,
  semanticWeight: 0.7,
  bm25Weight: 0.3,
  candidateMultiplier: 10,
  skipRerank: false,
};

// D1 caps a statement at 100 bound parameters, and hydrating candidates binds one per id.
const MAX_CANDIDATES = 100;

const RERANK_CANDIDATES = 20;

export type ChunkCandidate = {
  id: string;
  documentId: string;
  content: string;
  contextualContent: string;
  chunkIndex: number;
  documentTitle: string;
  documentUrl: string;
  documentSlug: string;
};

export type SemanticCandidate = ChunkCandidate & { distance: number };

export type KeywordCandidate = ChunkCandidate & { rank: number };

const candidateColumns = {
  id: documentChunks.id,
  documentId: documentChunks.documentId,
  content: documentChunks.content,
  contextualContent: documentChunks.contextualContent,
  chunkIndex: documentChunks.chunkIndex,
  documentTitle: documents.title,
  documentUrl: documents.url,
  documentSlug: documents.slug,
};

async function loadCandidates(db: RagRuntime['db'], ids: string[]): Promise<ChunkCandidate[]> {
  if (ids.length === 0) return [];

  return db
    .select(candidateColumns)
    .from(documentChunks)
    .innerJoin(documents, eq(documentChunks.documentId, documents.id))
    .where(inArray(documentChunks.id, ids));
}

/**
 * Embeds the query, asks Vectorize for the nearest chunk ids, then loads those rows from D1.
 * Vectors whose chunk row is gone (Vectorize writes are eventually consistent) are dropped.
 */
export async function semanticSearch(
  { ai, vectorize, db }: RagRuntime,
  query: string,
  limit: number,
): Promise<SemanticCandidate[]> {
  const vector = await embedQuery(ai, query);
  const matches = await queryChunkVectors(vectorize, vector, limit);

  const rows = new Map(
    (
      await loadCandidates(
        db,
        matches.map((m) => m.id),
      )
    ).map((r) => [r.id, r]),
  );

  return matches.flatMap((match) => {
    const row = rows.get(match.id);

    return row ? [{ ...row, distance: 1 - match.score }] : [];
  });
}

const MAX_QUERY_TERMS = 8;

// The trigram tokenizer cannot match anything shorter than three characters.
const MIN_TERM_LENGTH = 3;

export function keywordTerms(query: string): string[] {
  return [
    ...new Set(
      query
        .toLowerCase()
        .split(/\s+/)
        .map((t) => t.replace(/[^\p{L}\p{N}_-]/gu, ''))
        .filter((t) => t.length >= MIN_TERM_LENGTH),
    ),
  ].slice(0, MAX_QUERY_TERMS);
}

/** FTS5 MATCH expression: each term is a quoted phrase, OR-ed together. Null when nothing usable. */
export function ftsMatchQuery(query: string): string | null {
  const terms = keywordTerms(query);

  if (terms.length === 0) return null;

  return terms.map((t) => `"${t.replaceAll('"', '""')}"`).join(' OR ');
}

/** BM25 over the `document_chunks_fts` trigram index. `rank` is negated bm25, so higher is better. */
export async function keywordSearch(
  { db }: Pick<RagRuntime, 'db'>,
  query: string,
  limit: number,
): Promise<KeywordCandidate[]> {
  const match = ftsMatchQuery(query);

  if (!match) return [];

  return db.all<KeywordCandidate>(sql`
    SELECT
      dc.id,
      dc."documentId",
      dc.content,
      dc."contextualContent",
      dc."chunkIndex",
      d.title AS "documentTitle",
      d.url AS "documentUrl",
      d.slug AS "documentSlug",
      -bm25(document_chunks_fts, 1.0, 0.5) AS rank
    FROM document_chunks_fts
    JOIN document_chunks dc ON dc.rowid = document_chunks_fts.rowid
    JOIN documents d ON d.id = dc."documentId"
    WHERE document_chunks_fts MATCH ${match}
    ORDER BY rank DESC
    LIMIT ${limit}
  `);
}

/**
 * Reciprocal Rank Fusion to combine semantic and BM25 results
 * Formula: score = Σ (weight / (rank + k)) where k = 60 (standard)
 */
export function reciprocalRankFusion(
  semanticResults: SemanticCandidate[],
  bm25Results: KeywordCandidate[],
  semanticWeight: number,
  bm25Weight: number,
): Array<ChunkCandidate & { score: number }> {
  const k = 60; // Standard RRF constant
  const scoreMap = new Map<string, { candidate: ChunkCandidate; score: number }>();

  semanticResults.forEach((result, index) => {
    const rank = index + 1;
    const score = semanticWeight / (rank + k);
    scoreMap.set(result.id, {
      candidate: result,
      score,
    });
  });

  bm25Results.forEach((result, index) => {
    const rank = index + 1;
    const score = bm25Weight / (rank + k);

    if (scoreMap.has(result.id)) {
      scoreMap.get(result.id)!.score += score;
    } else {
      scoreMap.set(result.id, {
        candidate: result,
        score,
      });
    }
  });

  const combined = Array.from(scoreMap.values()).sort((a, b) => b.score - a.score);

  return combined.map((item) => ({
    ...item.candidate,
    score: item.score,
  }));
}

export interface RetrievalDetails {
  results: RAGResult[];
  semantic: SemanticCandidate[];
  keyword: KeywordCandidate[];
  timingsMs: { semantic: number; keyword: number; rerank: number; total: number };
}

async function timed<T>(work: () => Promise<T>): Promise<[T, number]> {
  const start = Date.now();
  const value = await work();

  return [value, Date.now() - start];
}

async function degrade<T>(span: Span, leg: string, work: () => Promise<T[]>): Promise<T[]> {
  try {
    return await work();
  } catch (error) {
    log.error('rag', `${leg} search failed: ${error}`);
    span.setAttribute(`rag.${leg}.error`, true);

    return [];
  }
}

/**
 * Hybrid retrieval with the intermediate candidate lists. A failing semantic or keyword leg is
 * logged and the other leg still answers; missing bindings throw `RagUnavailableError` before
 * any work starts.
 */
export async function retrieveRAGDetailed(
  query: string,
  options: RetrieveOptions = {},
  runtime: RagRuntime = useRagRuntime(),
): Promise<RetrievalDetails> {
  const opts = { ...DEFAULT_OPTIONS, ...options };
  const candidateCount = Math.min(opts.topK * opts.candidateMultiplier, MAX_CANDIDATES);
  const startedAt = Date.now();

  return ragTracer.startActiveSpan(
    'rag.retrieve',
    {
      kind: SpanKind.INTERNAL,
      attributes: {
        'rag.query.hash': hashQuery(query),
        'rag.query.length': query.length,
        'rag.k': opts.topK,
        'rag.candidate_count': candidateCount,
        'rag.semantic.weight': opts.semanticWeight,
        'rag.bm25.weight': opts.bm25Weight,
        'rag.rerank.enabled': !opts.skipRerank,
        'rag.embedding.model': EMBEDDING_MODEL,
      },
    },
    async (span) => {
      try {
        const [[semantic, semanticMs], [keyword, keywordMs]] = await Promise.all([
          timed(() =>
            degrade(span, 'semantic', () => semanticSearch(runtime, query, candidateCount)),
          ),
          timed(() => degrade(span, 'bm25', () => keywordSearch(runtime, query, candidateCount))),
        ]);

        span.setAttributes({
          'rag.semantic.candidates': semantic.length,
          'rag.bm25.candidates': keyword.length,
        });

        const fusedResults = reciprocalRankFusion(
          semantic,
          keyword,
          opts.semanticWeight,
          opts.bm25Weight,
        );

        span.setAttribute('rag.fused.count', fusedResults.length);

        let finalResults: Array<ChunkCandidate & { score: number }> = fusedResults.slice(
          0,
          opts.topK,
        );

        let rerankMs = 0;

        if (!opts.skipRerank && fusedResults.length > 0) {
          const topCandidates = fusedResults.slice(0, RERANK_CANDIDATES);

          try {
            const [reranked, ms] = await timed(() =>
              rerankDocuments(
                runtime.ai,
                query,
                topCandidates.map((c) => `${c.content}\n\nContext: ${c.contextualContent}`),
                opts.topK,
              ),
            );

            rerankMs = ms;
            span.setAttribute('rag.reranker.model', RERANK_MODEL);
            finalResults = reranked.flatMap((r) => {
              const candidate = topCandidates[r.index];

              return candidate ? [{ ...candidate, score: r.relevanceScore }] : [];
            });
          } catch (error) {
            log.error('rag', `Rerank failed, keeping fused order: ${error}`);
            span.setAttribute('rag.rerank.error', true);
          }
        }

        span.setAttributes({
          'rag.results.count': finalResults.length,
          'rag.top_score': finalResults[0]?.score ?? 0,
        });

        return {
          results: finalResults.map((r) => ({
            content: r.content,
            contextualContent: r.contextualContent,
            documentTitle: r.documentTitle,
            documentUrl: r.documentUrl,
            documentSlug: r.documentSlug,
            chunkIndex: r.chunkIndex,
            score: r.score,
          })),
          semantic,
          keyword,
          timingsMs: {
            semantic: semanticMs,
            keyword: keywordMs,
            rerank: rerankMs,
            total: Date.now() - startedAt,
          },
        };
      } catch (err) {
        recordSpanError(span, err);
        span.setStatus({ code: SpanStatusCode.ERROR });
        throw err;
      } finally {
        span.end();
      }
    },
  );
}

export async function retrieveRAG(
  query: string,
  options: RetrieveOptions = {},
  runtime?: RagRuntime,
): Promise<RAGResult[]> {
  return (await retrieveRAGDetailed(query, options, runtime)).results;
}

/**
 * Simple search without reranking (faster, cheaper)
 */
export async function retrieveRAGFast(query: string, topK: number = 5): Promise<RAGResult[]> {
  return retrieveRAG(query, { topK, skipRerank: true });
}
