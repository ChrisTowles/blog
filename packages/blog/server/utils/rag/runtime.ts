import { useDrizzle } from '../drizzle';

export const EMBEDDING_MODEL = '@cf/qwen/qwen3-embedding-0.6b';

export const RERANK_MODEL = '@cf/baai/bge-reranker-base';

export const EMBEDDING_DIMENSIONS = 1024;

export type RagAiInput = Record<string, string | number | string[] | Array<{ text: string }>>;

/** The one Workers AI call shape RAG uses. The real `Ai` binding satisfies it. */
export interface RagAi {
  run(model: string, input: RagAiInput): Promise<object>;
}

export interface RagVectorRecord {
  id: string;
  values: number[];
  metadata?: Record<string, string>;
}

export interface RagVectorMatch {
  id: string;
  score: number;
}

/** The slice of a Vectorize index RAG uses. The real binding satisfies it. */
export interface RagVectorize {
  upsert(vectors: RagVectorRecord[]): Promise<object>;
  deleteByIds(ids: string[]): Promise<object>;
  query(
    vector: number[],
    options: { topK: number; returnMetadata: 'none' },
  ): Promise<{ matches: RagVectorMatch[] }>;
}

export type RagDb = ReturnType<typeof useDrizzle>;

export interface RagRuntime {
  ai: RagAi;
  vectorize: RagVectorize;
  db: RagDb;
}

/** Thrown when a binding RAG needs is not configured, e.g. `env.dev` has no AI or Vectorize. */
export class RagUnavailableError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'RagUnavailableError';
  }
}

export function resolveRagRuntime(
  env: { AI?: RagAi; VECTORIZE?: RagVectorize },
  getDb: () => RagDb,
): RagRuntime {
  if (!env.AI) throw new RagUnavailableError('RAG unavailable: AI binding missing');

  if (!env.VECTORIZE) throw new RagUnavailableError('RAG unavailable: VECTORIZE binding missing');

  return { ai: env.AI, vectorize: env.VECTORIZE, db: getDb() };
}

/** Bindings come from the current request, so this only works inside a handler. */
export function useRagRuntime(): RagRuntime {
  return resolveRagRuntime(useEvent().context.cloudflare.env, useDrizzle);
}

/** Runs route work, mapping a missing binding to a 503 instead of a crashing 500. */
export async function withRagErrors<T>(work: () => Promise<T>): Promise<T> {
  try {
    return await work();
  } catch (error) {
    if (error instanceof RagUnavailableError) {
      throw createError({ statusCode: 503, statusMessage: error.message });
    }

    throw error;
  }
}
