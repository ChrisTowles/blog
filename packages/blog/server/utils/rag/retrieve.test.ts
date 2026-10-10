import { describe, it, expect } from 'vitest';
import { ftsMatchQuery, keywordTerms, reciprocalRankFusion } from './retrieve';
import { RagUnavailableError, resolveRagRuntime, type RagDb } from './runtime';
import { embedQuery, embedTexts, rerankDocuments } from './workers-ai';
import { deleteChunkVectors, queryChunkVectors, upsertChunkVectors } from './vectors';
import { createFakeAi, createFakeVectorize, fakeVector } from '../../test-utils/rag-fakes';

const candidate = (id: string) => ({
  id,
  documentId: 'doc1',
  content: 'test',
  contextualContent: 'test context',
  chunkIndex: 0,
  documentTitle: 'Test',
  documentUrl: '/test',
  documentSlug: 'test',
});

describe('reciprocalRankFusion', () => {
  it('handles empty results arrays', () => {
    expect(reciprocalRankFusion([], [], 0.7, 0.3)).toEqual([]);
  });

  it('handles empty semantic results', () => {
    const result = reciprocalRankFusion([], [{ ...candidate('1'), rank: 0.5 }], 0.7, 0.3);

    expect(result.map((r) => r.id)).toEqual(['1']);
  });

  it('handles empty BM25 results', () => {
    const result = reciprocalRankFusion([{ ...candidate('1'), distance: 0.2 }], [], 0.7, 0.3);

    expect(result.map((r) => r.id)).toEqual(['1']);
  });

  it('ranks chunks found by both legs first', () => {
    const fused = reciprocalRankFusion(
      [
        { ...candidate('a'), distance: 0.1 },
        { ...candidate('b'), distance: 0.2 },
      ],
      [
        { ...candidate('b'), rank: 2 },
        { ...candidate('c'), rank: 1 },
      ],
      0.7,
      0.3,
    );

    expect(fused[0]?.id).toBe('b');
    expect(fused.map((r) => r.id).sort()).toEqual(['a', 'b', 'c']);
  });
});

describe('keyword query building', () => {
  it('drops short terms, punctuation and duplicates', () => {
    expect(keywordTerms('How do I use Workers? workers, AI!')).toEqual(['how', 'use', 'workers']);
  });

  it('caps the number of terms', () => {
    expect(keywordTerms('aaa bbb ccc ddd eee fff ggg hhh iii jjj')).toHaveLength(8);
  });

  it('quotes each term and ORs them', () => {
    expect(ftsMatchQuery('nuxt content')).toBe('"nuxt" OR "content"');
  });

  it('returns null when nothing is searchable', () => {
    expect(ftsMatchQuery('a ?')).toBeNull();
  });

  it('cannot be broken by FTS operators or quotes', () => {
    expect(ftsMatchQuery('foo" AND NOT bar*')).toBe('"foo" OR "and" OR "not" OR "bar"');
  });
});

describe('workers AI helpers', () => {
  it('embeds documents in batches of 32 and keeps order', async () => {
    const ai = createFakeAi();

    const vectors = await embedTexts(
      ai,
      Array.from({ length: 70 }, (_, i) => `t${i}`),
    );

    expect(vectors).toHaveLength(70);
    expect(ai.calls.map((c) => (Array.isArray(c.input.text) ? c.input.text.length : 0))).toEqual([
      32, 32, 6,
    ]);
    expect(ai.calls[0]?.model).toBe('@cf/qwen/qwen3-embedding-0.6b');
  });

  it('embeds a query with the queries parameter', async () => {
    const ai = createFakeAi();

    expect(await embedQuery(ai, 'hello')).toHaveLength(1024);
    expect(ai.calls[0]?.input).toEqual({ queries: 'hello' });
  });

  it('rejects vectors of the wrong dimension', async () => {
    const ai = { run: async () => ({ data: [[1, 2, 3]] }) };

    await expect(embedQuery(ai, 'x')).rejects.toThrow();
  });

  it('rejects a count mismatch', async () => {
    const ai = { run: async () => ({ data: [fakeVector(0)] }) };

    await expect(embedTexts(ai, ['a', 'b'])).rejects.toThrow('1 vectors for 2 inputs');
  });

  it('maps reranker ids to indexes, best first, limited to topN', async () => {
    const ai = createFakeAi();
    const ranked = await rerankDocuments(ai, 'q', ['a', 'b', 'c'], 2);

    expect(ranked.map((r) => r.index)).toEqual([2, 1]);
    expect(ai.calls[0]?.input).toMatchObject({
      top_k: 2,
      contexts: [{ text: 'a' }, { text: 'b' }, { text: 'c' }],
    });
  });
});

describe('vector helpers', () => {
  it('upserts with metadata, queries by similarity and deletes', async () => {
    const vectorize = createFakeVectorize();

    await upsertChunkVectors(vectorize, [
      { chunkId: 'x', values: fakeVector(1), documentId: 'd', slug: 's', url: '/u', title: 'T' },
      { chunkId: 'y', values: fakeVector(2), documentId: 'd', slug: 's', url: '/u', title: 'T' },
    ]);

    expect(vectorize.stored.get('x')?.metadata).toEqual({
      documentId: 'd',
      slug: 's',
      url: '/u',
      title: 'T',
    });
    expect((await queryChunkVectors(vectorize, fakeVector(2), 1)).map((m) => m.id)).toEqual(['y']);

    await deleteChunkVectors(vectorize, ['x', 'y']);

    expect(vectorize.stored.size).toBe(0);
  });
});

describe('resolveRagRuntime', () => {
  const getDb = (): RagDb => {
    throw new Error('db must not be touched');
  };

  it('fails clearly without the AI binding', () => {
    expect(() => resolveRagRuntime({}, getDb)).toThrow('RAG unavailable: AI binding missing');
    expect(() => resolveRagRuntime({}, getDb)).toThrow(RagUnavailableError);
  });

  it('fails clearly without the Vectorize binding', () => {
    expect(() => resolveRagRuntime({ AI: createFakeAi() }, getDb)).toThrow(
      'RAG unavailable: VECTORIZE binding missing',
    );
  });
});
