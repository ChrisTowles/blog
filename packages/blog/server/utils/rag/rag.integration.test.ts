import { beforeEach, describe, expect, it } from 'vitest';
import { eq } from 'drizzle-orm';
import { documentChunks, documents } from '../../database/schema';
import { useDrizzle } from '../drizzle';
import { createFakeAi, createFakeVectorize, fakeVector } from '../../test-utils/rag-fakes';
import { ingestSources, pruneRemovedDocuments, type BlogSource } from './ingest';
import { keywordSearch, retrieveRAGDetailed } from './retrieve';
import type { RagRuntime } from './runtime';
import { deleteDocument } from './store';

const body = (topic: string) =>
  `${topic} is the subject of this paragraph, which is long enough to survive the chunker minimum size. `.repeat(
    4,
  );

function source(slug: string, topic: string): BlogSource {
  return {
    slug,
    title: `Post ${slug}`,
    url: `/blog/${slug}`,
    path: `2.blog/${slug}`,
    rawbody: `---\ntitle: Post ${slug}\n---\n${body(topic)}`,
  };
}

const describeChunk = async () => 'situating context';

function runtime(): RagRuntime & {
  ai: ReturnType<typeof createFakeAi>;
  vectorize: ReturnType<typeof createFakeVectorize>;
} {
  return { ai: createFakeAi(), vectorize: createFakeVectorize(), db: useDrizzle() };
}

beforeEach(async () => {
  await useDrizzle().delete(documents);
});

describe('FTS5 keyword search', () => {
  it('finds chunks by substring through the trigram index', async () => {
    const rt = runtime();
    await ingestSources(
      rt,
      [source('cf', 'Cloudflare Workers'), source('pg', 'Postgres')],
      describeChunk,
    );

    const hits = await keywordSearch(rt, 'workers', 10);

    expect(hits.map((h) => h.documentSlug)).toEqual(['cf']);
    expect(hits[0]?.rank).toBeGreaterThan(0);
  });

  it('matches the contextual description too', async () => {
    const rt = runtime();
    await ingestSources(rt, [source('cf', 'Cloudflare')], async () => 'mentions zebrafish');

    expect(await keywordSearch(rt, 'zebrafish', 10)).toHaveLength(1);
  });

  it('stops matching deleted chunks and re-matches updated text', async () => {
    const rt = runtime();
    await ingestSources(rt, [source('cf', 'Cloudflare')], describeChunk);
    const [chunk] = await rt.db.select().from(documentChunks);

    await rt.db
      .update(documentChunks)
      .set({ content: 'completely rewritten about pelicans' })
      .where(eq(documentChunks.id, chunk!.id));

    expect(await keywordSearch(rt, 'pelicans', 10)).toHaveLength(1);
    expect(await keywordSearch(rt, 'cloudflare', 10)).toHaveLength(0);

    await rt.db.delete(documentChunks);

    expect(await keywordSearch(rt, 'pelicans', 10)).toHaveLength(0);
  });

  it('returns nothing for queries with no usable terms', async () => {
    expect(await keywordSearch(runtime(), 'a "', 10)).toEqual([]);
  });
});

describe('ingestSources', () => {
  it('writes chunks, marks them embedded and upserts one vector per chunk', async () => {
    const rt = runtime();
    const result = await ingestSources(rt, [source('cf', 'Cloudflare')], describeChunk);

    expect(result.errors).toEqual([]);
    expect(result.documentsProcessed).toBe(1);

    const chunks = await rt.db.select().from(documentChunks);

    expect(chunks.length).toBe(result.chunksCreated);
    expect(chunks.every((c) => c.embeddedAt !== null)).toBe(true);
    expect([...rt.vectorize.stored.keys()].sort()).toEqual(chunks.map((c) => c.id).sort());

    const vector = rt.vectorize.stored.get(chunks[0]!.id);

    expect(vector?.metadata).toMatchObject({ slug: 'cf', url: '/blog/cf', title: 'Post cf' });
    expect(vector?.values).toHaveLength(1024);
  });

  it('skips unchanged documents, and re-embeds when forced', async () => {
    const rt = runtime();
    await ingestSources(rt, [source('cf', 'Cloudflare')], describeChunk);

    expect(
      (await ingestSources(rt, [source('cf', 'Cloudflare')], describeChunk)).documentsSkipped,
    ).toBe(1);

    const forced = await ingestSources(rt, [source('cf', 'Cloudflare')], describeChunk, {
      force: true,
    });

    expect(forced.documentsProcessed).toBe(1);
    expect(rt.vectorize.stored.size).toBe(forced.chunksCreated);
  });

  it('replaces old vectors when the content changes', async () => {
    const rt = runtime();
    await ingestSources(rt, [source('cf', 'Cloudflare')], describeChunk);
    const before = new Set(rt.vectorize.stored.keys());

    await ingestSources(rt, [source('cf', 'Something else entirely')], describeChunk);

    expect([...rt.vectorize.stored.keys()].some((id) => before.has(id))).toBe(false);
    expect(await rt.db.select().from(documents)).toHaveLength(1);
  });

  it('re-embeds a document whose chunks never got vectors', async () => {
    const rt = runtime();
    await ingestSources(rt, [source('cf', 'Cloudflare')], describeChunk);
    await rt.db.update(documentChunks).set({ embeddedAt: null });

    expect(
      (await ingestSources(rt, [source('cf', 'Cloudflare')], describeChunk)).documentsProcessed,
    ).toBe(1);
  });

  it('records a per-document error and keeps going', async () => {
    const rt = runtime();
    let calls = 0;

    const flaky = async () => {
      if (calls++ === 0) throw new Error('boom');

      return 'ok';
    };

    const result = await ingestSources(rt, [source('a', 'Alpha'), source('b', 'Beta')], flaky);

    expect(result.errors).toHaveLength(1);
    expect(result.documentsProcessed).toBe(1);
  });

  it('honours the document limit', async () => {
    const rt = runtime();

    const result = await ingestSources(
      rt,
      [source('a', 'Alpha'), source('b', 'Beta')],
      describeChunk,
      {
        limit: 1,
      },
    );

    expect(result.documentsProcessed).toBe(1);
  });

  it('deletes vectors with the document and prunes posts that disappeared', async () => {
    const rt = runtime();
    await ingestSources(rt, [source('a', 'Alpha'), source('b', 'Beta')], describeChunk);

    expect(await pruneRemovedDocuments(rt, [source('a', 'Alpha')])).toBe(1);
    expect((await rt.db.select().from(documents)).map((d) => d.slug)).toEqual(['a']);

    const [doc] = await rt.db.select().from(documents);
    await deleteDocument(rt, doc!.id);

    expect(rt.vectorize.stored.size).toBe(0);
  });
});

describe('retrieveRAGDetailed', () => {
  it('fuses vector and keyword hits and reranks', async () => {
    const rt = runtime();
    await ingestSources(
      rt,
      [source('cf', 'Cloudflare Workers'), source('pg', 'Postgres')],
      describeChunk,
    );

    const details = await retrieveRAGDetailed('workers', { topK: 3 }, rt);

    expect(details.semantic.length).toBeGreaterThan(0);
    expect(details.keyword.map((k) => k.documentSlug)).toEqual(['cf']);
    expect(details.results.length).toBeGreaterThan(0);
    expect(rt.ai.calls.some((c) => c.model === '@cf/baai/bge-reranker-base')).toBe(true);
  });

  it('drops vectors whose chunk row no longer exists', async () => {
    const rt = runtime();
    await rt.vectorize.upsert([{ id: 'ghost', values: fakeVector(0) }]);

    const details = await retrieveRAGDetailed('anything', { skipRerank: true }, rt);

    expect(details.semantic).toEqual([]);
    expect(details.results).toEqual([]);
  });

  it('still answers from keywords when the vector leg fails', async () => {
    const rt = runtime();
    await ingestSources(rt, [source('cf', 'Cloudflare Workers')], describeChunk);
    rt.vectorize.query = async () => {
      throw new Error('vectorize down');
    };

    const details = await retrieveRAGDetailed('workers', { skipRerank: true }, rt);

    expect(details.semantic).toEqual([]);
    expect(details.results[0]?.documentSlug).toBe('cf');
  });
});
