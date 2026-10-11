import {
  EMBEDDING_DIMENSIONS,
  type RagAi,
  type RagAiInput,
  type RagVectorRecord,
  type RagVectorize,
} from '../utils/rag/runtime';

/** Deterministic unit-ish vector so tests can reason about similarity. */
export function fakeVector(seed: number): number[] {
  return Array.from({ length: EMBEDDING_DIMENSIONS }, (_, i) =>
    i === seed % EMBEDDING_DIMENSIONS ? 1 : 0,
  );
}

export interface FakeAi extends RagAi {
  calls: Array<{ model: string; input: RagAiInput }>;
}

/** Embeds every input as `fakeVector(0)`; reranks by reversing the context order. */
export function createFakeAi(): FakeAi {
  const calls: FakeAi['calls'] = [];

  return {
    calls,
    async run(model, input) {
      calls.push({ model, input });

      if (Array.isArray(input.contexts)) {
        return {
          response: input.contexts.map((_, id, all) => ({ id, score: (id + 1) / all.length })),
        };
      }

      const count = Array.isArray(input.text) ? input.text.length : 1;

      return { data: Array.from({ length: count }, () => fakeVector(0)) };
    },
  };
}

export interface FakeVectorize extends RagVectorize {
  stored: Map<string, RagVectorRecord>;
}

/** In-memory index; query ranks stored vectors by dot product with the query. */
export function createFakeVectorize(): FakeVectorize {
  const stored = new Map<string, RagVectorRecord>();

  return {
    stored,
    async upsert(vectors) {
      for (const v of vectors) stored.set(v.id, v);

      return { mutationId: 'fake' };
    },
    async deleteByIds(ids) {
      for (const id of ids) stored.delete(id);

      return { mutationId: 'fake' };
    },
    async query(vector, { topK }) {
      const matches = [...stored.values()]
        .map((v) => ({
          id: v.id,
          score: v.values.reduce((sum, x, i) => sum + x * (vector[i] ?? 0), 0),
        }))
        .sort((a, b) => b.score - a.score)
        .slice(0, topK);

      return { matches };
    },
  };
}
