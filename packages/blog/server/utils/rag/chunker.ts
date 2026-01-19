/**
 * Text chunking utilities for RAG
 * Strategy: Split by paragraphs, then combine to target size with overlap
 */

export interface Chunk {
  content: string;
  index: number;
}

export interface ChunkOptions {
  targetSize?: number; // target characters per chunk (~500 tokens ≈ 2000 chars)
  overlap?: number; // overlap characters (~100 tokens ≈ 400 chars)
  minSize?: number; // minimum chunk size to keep
}

const DEFAULT_OPTIONS: Required<ChunkOptions> = {
  targetSize: 2000,
  overlap: 400,
  minSize: 200,
};

/**
 * Split text into chunks with overlap
 * Preserves paragraph boundaries where possible
 */
export function chunkText(text: string, options: ChunkOptions = {}): Chunk[] {
  const opts = { ...DEFAULT_OPTIONS, ...options };
  const chunks: Chunk[] = [];

  // Split into paragraphs (double newline) and sentences
  const paragraphs = text.split(/\n\n+/).filter((p) => p.trim().length > 0);

  let currentChunk = '';
  let chunkIndex = 0;

  for (const paragraph of paragraphs) {
    const trimmedParagraph = paragraph.trim();

    // If adding this paragraph exceeds target, save current and start new
    if (
      currentChunk.length + trimmedParagraph.length > opts.targetSize &&
      currentChunk.length >= opts.minSize
    ) {
      chunks.push({
        content: currentChunk.trim(),
        index: chunkIndex++,
      });

      // Start new chunk with overlap from end of previous
      const overlapStart = Math.max(0, currentChunk.length - opts.overlap);
      currentChunk = currentChunk.slice(overlapStart).trim() + '\n\n' + trimmedParagraph;
    } else {
      // Add paragraph to current chunk
      currentChunk = currentChunk ? currentChunk + '\n\n' + trimmedParagraph : trimmedParagraph;
    }
  }

  // Don't forget the last chunk
  if (currentChunk.trim().length >= opts.minSize) {
    chunks.push({
      content: currentChunk.trim(),
      index: chunkIndex,
    });
  }

  return chunks;
}

/**
 * Extract frontmatter and content from markdown
 */
export interface ParsedMarkdown {
  frontmatter: Record<string, unknown>;
  content: string;
  title: string;
  slug: string;
}

export function parseBlogMarkdown(markdown: string, filePath: string): ParsedMarkdown {
  const frontmatterMatch = markdown.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);

  let frontmatter: Record<string, unknown> = {};
  let content = markdown;

  if (frontmatterMatch && frontmatterMatch[1] && frontmatterMatch[2]) {
    // Simple YAML parsing for common fields
    const yamlContent = frontmatterMatch[1];
    content = frontmatterMatch[2].trim();

    // Parse basic YAML fields
    const titleMatch = yamlContent.match(/^title:\s*(.+)$/m);
    const descMatch = yamlContent.match(/^description:\s*["']?(.*)["']?$/m);
    const dateMatch = yamlContent.match(/^date:\s*(.+)$/m);

    frontmatter = {
      title: titleMatch?.[1]?.replace(/^["']|["']$/g, '') || '',
      description: descMatch?.[1] || '',
      date: dateMatch?.[1] || '',
    };
  }

  // Extract slug from filename: 20250713.tips-for-claude-code.md -> tips-for-claude-code
  const filename = filePath.split('/').pop() || '';
  const slugMatch = filename.match(/^\d+\.(.+)\.md$/);
  const slug = slugMatch?.[1] || filename.replace('.md', '');

  return {
    frontmatter,
    content,
    title: (frontmatter.title as string) || slug,
    slug,
  };
}

/**
 * Generate SHA-256 hash of content for change detection
 */
export async function hashContent(content: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(content);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}
