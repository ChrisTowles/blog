import { sql } from 'drizzle-orm';
import { useDrizzle } from '../drizzle';
import { embedText, rerankDocuments } from '../ai/bedrock';

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

interface ChunkCandidate {
  id: string;
  documentId: string;
  content: string;
  contextualContent: string;
  chunkIndex: number;
  documentTitle: string;
  documentUrl: string;
  documentSlug: string;
}

/**
 * Semantic search using pgvector cosine similarity
 */
async function semanticSearch(
  queryEmbedding: number[],
  limit: number,
): Promise<Array<ChunkCandidate & { distance: number }>> {
  try {
    const db = useDrizzle();

    // Use raw SQL for pgvector cosine distance operator
    const embeddingStr = `[${queryEmbedding.join(',')}]`;

    const results = await db.execute(sql`
        SELECT
            dc.id,
            dc."documentId",
            dc.content,
            dc."contextualContent",
            dc."chunkIndex",
            d.title as "documentTitle",
            d.url as "documentUrl",
            d.slug as "documentSlug",
            dc.embedding <=> ${embeddingStr}::vector AS distance
        FROM document_chunks dc
        JOIN documents d ON dc."documentId" = d.id
        WHERE dc.embedding IS NOT NULL
        ORDER BY distance
        LIMIT ${limit}
    `);

    if (!results?.rows) {
      return [];
    }

    return results.rows as Array<ChunkCandidate & { distance: number }>;
  } catch (error) {
    console.error('Semantic search failed:', error);
    return [];
  }
}

/**
 * BM25 full-text search using PostgreSQL tsvector
 */
async function bm25Search(
  query: string,
  limit: number,
): Promise<Array<ChunkCandidate & { rank: number }>> {
  try {
    const db = useDrizzle();

    const results = await db.execute(sql`
        SELECT
            dc.id,
            dc."documentId",
            dc.content,
            dc."contextualContent",
            dc."chunkIndex",
            d.title as "documentTitle",
            d.url as "documentUrl",
            d.slug as "documentSlug",
            ts_rank(dc."searchVector", plainto_tsquery('english', ${query})) AS rank
        FROM document_chunks dc
        JOIN documents d ON dc."documentId" = d.id
        WHERE dc."searchVector" @@ plainto_tsquery('english', ${query})
        ORDER BY rank DESC
        LIMIT ${limit}
    `);

    if (!results?.rows) {
      return [];
    }

    return results.rows as Array<ChunkCandidate & { rank: number }>;
  } catch (error) {
    console.error('BM25 search failed:', error);
    return [];
  }
}

/**
 * Reciprocal Rank Fusion to combine semantic and BM25 results
 * Formula: score = Σ (weight / (rank + k)) where k = 60 (standard)
 */
export function reciprocalRankFusion(
  semanticResults: Array<ChunkCandidate & { distance: number }>,
  bm25Results: Array<ChunkCandidate & { rank: number }>,
  semanticWeight: number,
  bm25Weight: number,
): Array<ChunkCandidate & { score: number }> {
  const k = 60; // Standard RRF constant
  const scoreMap = new Map<string, { candidate: ChunkCandidate; score: number }>();

  // Score semantic results
  semanticResults.forEach((result, index) => {
    const rank = index + 1;
    const score = semanticWeight / (rank + k);
    scoreMap.set(result.id, {
      candidate: result,
      score,
    });
  });

  // Add BM25 scores
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

  // Sort by combined score
  const combined = Array.from(scoreMap.values()).sort((a, b) => b.score - a.score);

  return combined.map((item) => ({
    ...item.candidate,
    score: item.score,
  }));
}

/**
 * Main retrieval function: hybrid search with optional reranking
 */
export async function retrieveRAG(
  query: string,
  options: RetrieveOptions = {},
): Promise<RAGResult[]> {
  const opts = { ...DEFAULT_OPTIONS, ...options };
  const candidateCount = opts.topK * opts.candidateMultiplier;

  // Step 1: Generate query embedding
  let queryEmbedding: number[];
  try {
    queryEmbedding = await embedText(query);
  } catch (error) {
    console.error('Failed to generate embedding:', error);
    return [];
  }

  // Step 2: Parallel semantic and BM25 search
  const [semanticResults, bm25Results] = await Promise.all([
    semanticSearch(queryEmbedding, candidateCount),
    bm25Search(query, candidateCount),
  ]);

  // Step 3: Reciprocal Rank Fusion
  const fusedResults = reciprocalRankFusion(
    semanticResults,
    bm25Results,
    opts.semanticWeight,
    opts.bm25Weight,
  );

  // If no results, return empty
  if (fusedResults.length === 0) {
    return [];
  }

  // Step 4: Reranking (optional)
  let finalResults: Array<ChunkCandidate & { score: number }>;

  if (opts.skipRerank) {
    finalResults = fusedResults.slice(0, opts.topK);
  } else {
    // Prepare documents for reranking
    const topCandidates = fusedResults.slice(0, Math.min(20, fusedResults.length));
    const documentsForRerank = topCandidates.map(
      (c) => `${c.content}\n\nContext: ${c.contextualContent}`,
    );

    // Rerank with Cohere
    const rerankResults = await rerankDocuments(query, documentsForRerank, opts.topK);

    // Map rerank results back to candidates
    finalResults = rerankResults
      .filter((r) => topCandidates[r.index] !== undefined)
      .map((r) => ({
        ...topCandidates[r.index]!,
        score: r.relevanceScore,
      }));
  }

  // Format final results
  return finalResults.map((r) => ({
    content: r.content,
    contextualContent: r.contextualContent,
    documentTitle: r.documentTitle,
    documentUrl: r.documentUrl,
    documentSlug: r.documentSlug,
    chunkIndex: r.chunkIndex,
    score: r.score,
  }));
}

/**
 * Simple search without reranking (faster, cheaper)
 */
export async function retrieveRAGFast(query: string, topK: number = 5): Promise<RAGResult[]> {
  return retrieveRAG(query, { topK, skipRerank: true });
}
