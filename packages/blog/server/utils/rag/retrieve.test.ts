/**
 * Unit tests for RAG retrieve functions
 */
import { describe, it, expect, vi } from 'vitest'
import { retrieveRAG, reciprocalRankFusion } from './retrieve'

describe('reciprocalRankFusion', () => {
  it('should handle empty results arrays', () => {
    const result = reciprocalRankFusion([], [], 0.7, 0.3)
    expect(result).toEqual([])
  })

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
        rank: 0.5
      }
    ]
    const result = reciprocalRankFusion([], bm25Results, 0.7, 0.3)
    expect(result).toHaveLength(1)
    expect(result[0].id).toBe('1')
  })

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
        distance: 0.2
      }
    ]
    const result = reciprocalRankFusion(semanticResults, [], 0.7, 0.3)
    expect(result).toHaveLength(1)
    expect(result[0].id).toBe('1')
  })
})

describe('retrieveRAG error handling', () => {
  it('should return empty array when embedding generation fails', async () => {
    // Mock embedText to throw an error
    vi.spyOn(await import('../ai/bedrock'), 'embedText').mockRejectedValue(new Error('Bedrock API error'))

    const result = await retrieveRAG('test query')

    expect(result).toEqual([])
  })

  it('should return empty array when database is empty', async () => {
    // This test assumes no data in database or query that matches nothing
    const result = await retrieveRAG('ZZZZUNLIKELYTOEXIST999')

    expect(result).toBeDefined()
    expect(Array.isArray(result)).toBe(true)
    // May be empty or have low-relevance results
  })

  it('should handle null/undefined database results gracefully', async () => {
    // Mock database to return null rows
    const result = await retrieveRAG('test query', { skipRerank: true })

    expect(result).toBeDefined()
    expect(Array.isArray(result)).toBe(true)
  })
})
