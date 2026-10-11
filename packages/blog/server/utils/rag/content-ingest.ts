import { queryCollection } from '@nuxt/content/server';
import {
  generateContextualDescription,
  ingestSources,
  pruneRemovedDocuments,
  type BlogSource,
  type IngestOptions,
  type IngestResult,
} from './ingest';
import { useRagRuntime } from './runtime';

/** Published posts from the Nuxt Content `posts` collection. Works on Workers (no filesystem). */
export async function loadBlogSources(): Promise<BlogSource[]> {
  const posts = await queryCollection(useEvent(), 'posts')
    .where('status', '<>', 'draft')
    .select('path', 'stem', 'title', 'rawbody')
    .all();

  return posts.map((post) => ({
    slug: post.path.split('/').pop() ?? post.path,
    title: post.title,
    url: post.path,
    path: post.stem,
    rawbody: post.rawbody,
  }));
}

/** Ingest every published post and drop documents whose post is gone. */
export async function ingestBlogPosts(options: IngestOptions = {}): Promise<IngestResult> {
  const runtime = useRagRuntime();
  const sources = await loadBlogSources();
  const result = await ingestSources(runtime, sources, generateContextualDescription, options);

  result.documentsRemoved = await pruneRemovedDocuments(runtime, sources);

  return result;
}

/** Ingest one post by slug; `force` re-embeds even when the content is unchanged. */
export async function ingestDocument(slug: string, force = false): Promise<IngestResult> {
  const runtime = useRagRuntime();
  const source = (await loadBlogSources()).find((s) => s.slug === slug);

  if (!source) {
    return {
      documentsProcessed: 0,
      documentsSkipped: 0,
      documentsRemoved: 0,
      chunksCreated: 0,
      errors: [`Document not found: ${slug}`],
    };
  }

  return ingestSources(runtime, [source], generateContextualDescription, { force });
}
