/**
 * Tests for the search API endpoint's deduplication and result formatting logic.
 * The actual RAG retrieval is tested in server/utils/rag/retrieve.test.ts.
 */
import { describe, it, expect } from 'vitest';

/** Replicate the deduplication logic from the search endpoint for unit testing */
function deduplicateResults(
  results: Array<{
    content: string;
    documentTitle: string;
    documentUrl: string;
    documentSlug: string;
    score: number;
    contextualContent: string;
  }>,
) {
  const seenSlugs = new Map<string, (typeof dedupedResults)[number]>();
  const dedupedResults: Array<{
    title: string;
    url: string;
    slug: string;
    score: number;
    snippet: string;
    context: string;
  }> = [];

  for (const r of results) {
    const snippet = r.content.length > 300 ? `${r.content.slice(0, 300).trimEnd()}...` : r.content;

    const entry = {
      title: r.documentTitle,
      url: r.documentUrl,
      slug: r.documentSlug,
      score: r.score,
      snippet,
      context: r.contextualContent,
    };

    const existing = seenSlugs.get(r.documentSlug);
    if (!existing) {
      seenSlugs.set(r.documentSlug, entry);
      dedupedResults.push(entry);
    } else if (r.score > existing.score) {
      const idx = dedupedResults.indexOf(existing);
      dedupedResults[idx] = entry;
      seenSlugs.set(r.documentSlug, entry);
    }
  }

  return dedupedResults;
}

describe('search deduplication', () => {
  it('returns unique results for different slugs', () => {
    const results = deduplicateResults([
      {
        content: 'Vue tips',
        documentTitle: 'Vue Tips',
        documentUrl: '/blog/vue-tips',
        documentSlug: 'vue-tips',
        score: 0.9,
        contextualContent: 'context1',
      },
      {
        content: 'Nuxt guide',
        documentTitle: 'Nuxt Guide',
        documentUrl: '/blog/nuxt-guide',
        documentSlug: 'nuxt-guide',
        score: 0.8,
        contextualContent: 'context2',
      },
    ]);

    expect(results).toHaveLength(2);
    expect(results[0]!.slug).toBe('vue-tips');
    expect(results[1]!.slug).toBe('nuxt-guide');
  });

  it('deduplicates by slug, keeping highest score', () => {
    const results = deduplicateResults([
      {
        content: 'Chunk 1 from vue tips',
        documentTitle: 'Vue Tips',
        documentUrl: '/blog/vue-tips',
        documentSlug: 'vue-tips',
        score: 0.7,
        contextualContent: 'low score chunk',
      },
      {
        content: 'Chunk 2 from vue tips - better match',
        documentTitle: 'Vue Tips',
        documentUrl: '/blog/vue-tips',
        documentSlug: 'vue-tips',
        score: 0.95,
        contextualContent: 'high score chunk',
      },
    ]);

    expect(results).toHaveLength(1);
    expect(results[0]!.score).toBe(0.95);
    expect(results[0]!.context).toBe('high score chunk');
  });

  it('keeps first entry when duplicate has lower score', () => {
    const results = deduplicateResults([
      {
        content: 'Best chunk',
        documentTitle: 'Post A',
        documentUrl: '/blog/post-a',
        documentSlug: 'post-a',
        score: 0.9,
        contextualContent: 'best',
      },
      {
        content: 'Worse chunk',
        documentTitle: 'Post A',
        documentUrl: '/blog/post-a',
        documentSlug: 'post-a',
        score: 0.5,
        contextualContent: 'worse',
      },
    ]);

    expect(results).toHaveLength(1);
    expect(results[0]!.score).toBe(0.9);
    expect(results[0]!.context).toBe('best');
  });

  it('truncates long content to 300 char snippet', () => {
    const longContent = 'A'.repeat(500);
    const results = deduplicateResults([
      {
        content: longContent,
        documentTitle: 'Long Post',
        documentUrl: '/blog/long',
        documentSlug: 'long',
        score: 0.8,
        contextualContent: 'ctx',
      },
    ]);

    expect(results[0]!.snippet.length).toBeLessThanOrEqual(303); // 300 + "..."
    expect(results[0]!.snippet.endsWith('...')).toBe(true);
  });

  it('does not truncate short content', () => {
    const results = deduplicateResults([
      {
        content: 'Short content',
        documentTitle: 'Short',
        documentUrl: '/blog/short',
        documentSlug: 'short',
        score: 0.8,
        contextualContent: 'ctx',
      },
    ]);

    expect(results[0]!.snippet).toBe('Short content');
  });

  it('returns empty array for no results', () => {
    const results = deduplicateResults([]);
    expect(results).toHaveLength(0);
  });

  it('handles mixed duplicates and unique entries', () => {
    const results = deduplicateResults([
      {
        content: 'A1',
        documentTitle: 'Post A',
        documentUrl: '/blog/a',
        documentSlug: 'a',
        score: 0.6,
        contextualContent: '',
      },
      {
        content: 'B1',
        documentTitle: 'Post B',
        documentUrl: '/blog/b',
        documentSlug: 'b',
        score: 0.9,
        contextualContent: '',
      },
      {
        content: 'A2',
        documentTitle: 'Post A',
        documentUrl: '/blog/a',
        documentSlug: 'a',
        score: 0.8,
        contextualContent: '',
      },
      {
        content: 'C1',
        documentTitle: 'Post C',
        documentUrl: '/blog/c',
        documentSlug: 'c',
        score: 0.7,
        contextualContent: '',
      },
    ]);

    expect(results).toHaveLength(3);
    const slugs = results.map((r) => r.slug);
    expect(slugs).toContain('a');
    expect(slugs).toContain('b');
    expect(slugs).toContain('c');

    // Post A should have the higher score (0.8, not 0.6)
    const postA = results.find((r) => r.slug === 'a')!;
    expect(postA.score).toBe(0.8);
  });
});
