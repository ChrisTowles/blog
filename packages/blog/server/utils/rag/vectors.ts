import type { RagVectorize } from './runtime';

// Vectorize accepts 1000 vectors per upsert; deletes use the same cap.
const MUTATION_BATCH_SIZE = 500;

// Without values or metadata a query may return up to 100 matches.
const MAX_TOP_K = 100;

export interface ChunkVector {
  chunkId: string;
  values: number[];
  documentId: string;
  slug: string;
  url: string;
  title: string;
}

export async function upsertChunkVectors(vectorize: RagVectorize, vectors: ChunkVector[]) {
  for (let i = 0; i < vectors.length; i += MUTATION_BATCH_SIZE) {
    await vectorize.upsert(
      vectors.slice(i, i + MUTATION_BATCH_SIZE).map((v) => ({
        id: v.chunkId,
        values: v.values,
        metadata: { documentId: v.documentId, slug: v.slug, url: v.url, title: v.title },
      })),
    );
  }
}

export async function deleteChunkVectors(vectorize: RagVectorize, chunkIds: string[]) {
  for (let i = 0; i < chunkIds.length; i += MUTATION_BATCH_SIZE) {
    await vectorize.deleteByIds(chunkIds.slice(i, i + MUTATION_BATCH_SIZE));
  }
}

/**
 * Nearest chunk ids, best first. Metadata is not requested: the chunk text and document fields
 * come from D1 anyway, and skipping it lifts the topK cap from 50 to 100.
 */
export async function queryChunkVectors(vectorize: RagVectorize, vector: number[], topK: number) {
  const { matches } = await vectorize.query(vector, {
    topK: Math.min(topK, MAX_TOP_K),
    returnMetadata: 'none',
  });

  return matches;
}
