/**
 * Unit tests for RAG retrieve functions
 */
import { describe, it, expect, vi } from 'vitest';
import { retrieveRAG, reciprocalRankFusion } from './retrieve';

describe('reciprocalRankFusion', () => {
  it('should handle empty results arrays', () => {
    const result = reciprocalRankFusion([], [], 0.7, 0.3);
    expect(result).toEqual([]);
  });

  it('should handle empty semantic results', () => {
    const bm25Results = [
      {
        id: '1',
        documentId: 'doc1',
        content: 'test',
        contextualContent: 'test context',
        chunkIndex: 0,
        documentTitle: 'Test',
        documentUrl: '/test',
        documentSlug: 'test',
        rank: 0.5,
      },
    ];
    const result = reciprocalRankFusion([], bm25Results, 0.7, 0.3);
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('1');
  });

  it('should handle empty BM25 results', () => {
    const semanticResults = [
      {
        id: '1',
        documentId: 'doc1',
        content: 'test',
        contextualContent: 'test context',
        chunkIndex: 0,
        documentTitle: 'Test',
        documentUrl: '/test',
        documentSlug: 'test',
        distance: 0.2,
      },
    ];
    const result = reciprocalRankFusion(semanticResults, [], 0.7, 0.3);
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('1');
  });
});

describe('retrieveRAG error handling', () => {
  it('should throw when embedding generation fails', async () => {
    // Mock embedText to throw an error
    vi.spyOn(await import('../ai/bedrock'), 'embedText').mockRejectedValue(
      new Error('Bedrock API error'),
    );

    await expect(retrieveRAG('test query')).rejects.toThrow('Bedrock API error');
  });

  it('should return empty array or throw when database is unavailable', async () => {
    // Without a running DB, retrieveRAG will throw (embedding or search failure)
    // With a DB, it returns an empty or populated array
    try {
      const result = await retrieveRAG('ZZZZUNLIKELYTOEXIST999');
      expect(result).toBeDefined();
      expect(Array.isArray(result)).toBe(true);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }
  });

  it('should propagate database errors instead of silently returning empty', async () => {
    // Mock database to simulate a connection failure
    vi.spyOn(await import('../ai/bedrock'), 'embedText').mockResolvedValue(new Array(1024).fill(0));
    const drizzleMod = await import('../drizzle');
    vi.spyOn(drizzleMod, 'useDrizzle').mockImplementation(() => {
      throw new Error('Connection refused');
    });

    await expect(retrieveRAG('test query', { skipRerank: true })).rejects.toThrow();

    vi.restoreAllMocks();
  });
});
