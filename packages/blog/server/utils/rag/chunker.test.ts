import { describe, it, expect } from 'vitest';
import { chunkText, parseBlogMarkdown, hashContent, type Chunk } from './chunker';

describe('chunkText', () => {
  it('returns empty array for empty string', () => {
    const chunks = chunkText('');
    expect(chunks).toEqual([]);
  });

  it('returns single chunk for small text above minSize', () => {
    // Text must be >= minSize (200 chars by default)
    const text =
      'This is a paragraph with enough content to exceed the minimum size threshold. ' +
      'We need at least 200 characters for the chunker to consider this valid content.\n\n' +
      'Another paragraph here to add more text and make this chunk substantial enough.';
    const chunks = chunkText(text);
    expect(chunks).toHaveLength(1);
    expect(chunks[0]?.content).toBe(text);
    expect(chunks[0]?.index).toBe(0);
  });

  it('splits large text into multiple chunks', () => {
    // Create text larger than target size (2000 chars default)
    const largeParagraph = 'Lorem ipsum '.repeat(200); // ~2400 chars
    const text = `${largeParagraph}\n\n${largeParagraph}\n\n${largeParagraph}`;

    const chunks = chunkText(text);
    expect(chunks.length).toBeGreaterThan(1);

    // Verify all chunks are indexed sequentially
    chunks.forEach((chunk: Chunk, i: number) => {
      expect(chunk.index).toBe(i);
    });
  });

  it('preserves paragraph boundaries', () => {
    const text = 'Paragraph one with content.\n\nParagraph two with content.\n\nParagraph three.';
    const chunks = chunkText(text, { targetSize: 50, minSize: 10 });

    // Each chunk should contain complete paragraphs
    for (const chunk of chunks) {
      // Should not have trailing paragraph separator at end
      expect(chunk.content.endsWith('\n\n')).toBe(false);
    }
  });

  it('respects custom options', () => {
    const text = 'Short paragraph.\n\nAnother short one.';
    const chunks = chunkText(text, {
      targetSize: 100,
      overlap: 10,
      minSize: 5,
    });
    expect(chunks).toHaveLength(1);
  });

  it('creates overlap between chunks', () => {
    // Create text that will split into 2+ chunks with known overlap
    const p1 = 'First paragraph content here.';
    const p2 = 'Second paragraph content here.';
    const p3 = 'Third paragraph content here.';
    const text = `${p1}\n\n${p2}\n\n${p3}`;

    const chunks = chunkText(text, { targetSize: 50, overlap: 20, minSize: 10 });

    // If we have multiple chunks, second should overlap with first
    if (chunks.length > 1) {
      const firstContent = chunks[0]?.content || '';
      const secondContent = chunks[1]?.content || '';
      // Second chunk should start with some content from end of first
      const firstEnd = firstContent.slice(-20);
      expect(secondContent.includes(firstEnd.trim().slice(0, 10))).toBe(true);
    }
  });

  it('filters out chunks smaller than minSize', () => {
    const text = 'Tiny.\n\nA slightly longer paragraph here.';
    const chunks = chunkText(text, { targetSize: 100, minSize: 20 });

    // Should not have a chunk that's just "Tiny."
    for (const chunk of chunks) {
      expect(chunk.content.length).toBeGreaterThanOrEqual(20);
    }
  });
});

describe('parseBlogMarkdown', () => {
  it('extracts frontmatter and content', () => {
    const markdown = `---
title: Test Post
description: A test description
date: 2025-01-15
---

# Heading

Some content here.`;

    const result = parseBlogMarkdown(markdown, '/path/to/20250115.test-post.md');

    expect(result.title).toBe('Test Post');
    expect(result.frontmatter.description).toBe('A test description');
    expect(result.content).toContain('# Heading');
    expect(result.content).toContain('Some content here.');
  });

  it('extracts slug from filename', () => {
    const markdown = '---\ntitle: Test\n---\nContent';

    const result = parseBlogMarkdown(markdown, '/blog/content/20250115.my-blog-slug.md');
    expect(result.slug).toBe('my-blog-slug');
  });

  it('handles markdown without frontmatter', () => {
    const markdown = '# Just a heading\n\nSome content';
    const result = parseBlogMarkdown(markdown, 'simple.md');

    expect(result.content).toBe(markdown);
    expect(result.slug).toBe('simple');
  });

  it('handles quoted title in frontmatter', () => {
    const markdown = `---
title: "Quoted Title"
---
Content`;

    const result = parseBlogMarkdown(markdown, 'post.md');
    expect(result.title).toBe('Quoted Title');
  });

  it('uses slug as title if no title in frontmatter', () => {
    const markdown = `---
description: no title here
---
Content`;

    const result = parseBlogMarkdown(markdown, '20250115.fallback-title.md');
    expect(result.title).toBe('fallback-title');
  });
});

describe('hashContent', () => {
  it('generates consistent SHA-256 hash', async () => {
    const content = 'Test content for hashing';
    const hash1 = await hashContent(content);
    const hash2 = await hashContent(content);

    expect(hash1).toBe(hash2);
    expect(hash1).toHaveLength(64); // SHA-256 produces 64 hex chars
  });

  it('generates different hashes for different content', async () => {
    const hash1 = await hashContent('Content A');
    const hash2 = await hashContent('Content B');

    expect(hash1).not.toBe(hash2);
  });

  it('generates valid hex string', async () => {
    const hash = await hashContent('Test');
    expect(hash).toMatch(/^[0-9a-f]{64}$/);
  });

  it('handles unicode content', async () => {
    const hash = await hashContent('Unicode: 你好世界 🚀');
    expect(hash).toHaveLength(64);
    expect(hash).toMatch(/^[0-9a-f]{64}$/);
  });

  it('handles empty string', async () => {
    const hash = await hashContent('');
    expect(hash).toHaveLength(64);
    // SHA-256 of empty string is known
    expect(hash).toBe('e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855');
  });
});
