import { z } from 'zod';

defineRouteMeta({
  openAPI: {
    description: 'Public semantic search across blog content using RAG pipeline',
    tags: ['search'],
  },
});

export default defineEventHandler(async (event) => {
  const {
    query,
    topK = 5,
  } = await readValidatedBody(
    event,
    z.object({
      query: z.string().min(1).max(500),
      topK: z.number().min(1).max(20).optional(),
    }).parse,
  );

  const startTime = Date.now();

  const results = await retrieveRAG(query, { topK, skipRerank: false });

  // Deduplicate by document - keep highest scoring chunk per document
  const seenSlugs = new Map<string, typeof dedupedResults[number]>();
  const dedupedResults: Array<{
    title: string;
    url: string;
    slug: string;
    score: number;
    snippet: string;
    context: string;
  }> = [];

  for (const r of results) {
    // Create a snippet from the content - take first meaningful portion
    const snippet = r.content.length > 300
      ? `${r.content.slice(0, 300).trimEnd()}...`
      : r.content;

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
      // Replace with higher scoring chunk
      const idx = dedupedResults.indexOf(existing);
      dedupedResults[idx] = entry;
      seenSlugs.set(r.documentSlug, entry);
    }
  }

  return {
    query,
    results: dedupedResults,
    totalMs: Date.now() - startTime,
  };
});
