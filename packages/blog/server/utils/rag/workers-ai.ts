import { z } from 'zod';
import { EMBEDDING_DIMENSIONS, EMBEDDING_MODEL, RERANK_MODEL, type RagAi } from './runtime';

// The model accepts at most 32 inputs per call.
const EMBED_BATCH_SIZE = 32;

const embeddingOutput = z.object({
  data: z.array(z.array(z.number()).length(EMBEDDING_DIMENSIONS)),
});

const rerankOutput = z.object({
  response: z.array(z.object({ id: z.number().int(), score: z.number() })),
});

export interface RerankResult {
  index: number;
  relevanceScore: number;
}

function parseEmbeddings(output: z.infer<typeof embeddingOutput>, expected: number): number[][] {
  const { data } = output;

  if (data.length !== expected) {
    throw new Error(`Embedding model returned ${data.length} vectors for ${expected} inputs`);
  }

  return data;
}

/** Embeds documents (chunks), batching to the model's per-call limit. Output order matches input. */
export async function embedTexts(ai: RagAi, texts: string[]): Promise<number[][]> {
  const embeddings: number[][] = [];

  for (let i = 0; i < texts.length; i += EMBED_BATCH_SIZE) {
    const batch = texts.slice(i, i + EMBED_BATCH_SIZE);
    const output = await ai.run(EMBEDDING_MODEL, { text: batch });

    embeddings.push(...parseEmbeddings(embeddingOutput.parse(output), batch.length));
  }

  return embeddings;
}

/** Embeds a search query. `queries` makes the model apply its retrieval instruction prefix. */
export async function embedQuery(ai: RagAi, query: string): Promise<number[]> {
  const output = await ai.run(EMBEDDING_MODEL, { queries: query });
  const [embedding] = parseEmbeddings(embeddingOutput.parse(output), 1);

  if (!embedding) throw new Error('Embedding model returned no vector');

  return embedding;
}

/** Scores documents against the query, best first, keeping at most `topN`. */
export async function rerankDocuments(
  ai: RagAi,
  query: string,
  documents: string[],
  topN: number,
): Promise<RerankResult[]> {
  const output = await ai.run(RERANK_MODEL, {
    query,
    contexts: documents.map((text) => ({ text })),
    top_k: topN,
  });

  return rerankOutput
    .parse(output)
    .response.map((r) => ({ index: r.id, relevanceScore: r.score }))
    .sort((a, b) => b.relevanceScore - a.relevanceScore)
    .slice(0, topN);
}
