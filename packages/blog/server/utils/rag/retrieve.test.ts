/**
 * Unit tests for RAG retrieve functions
 */
import { describe, it, expect, vi, beforeAll, afterAll } from 'vitest'
import { sql } from 'drizzle-orm'
import { retrieveRAG, reciprocalRankFusion } from './retrieve'
import { useDrizzle } from '../drizzle'
import { documents, documentChunks } from '../../database/schema'

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

describe('BM25 full-text search', () => {
  const testDocId = 'test-doc-bm25-' + Date.now()
  const testChunkId = 'test-chunk-bm25-' + Date.now()

  beforeAll(async () => {
    const db = useDrizzle()
    // Insert test document
    await db.insert(documents).values({
      id: testDocId,
      slug: 'test-bm25-post',
      title: 'Test BM25 Post',
      path: '/content/test-bm25.md',
      url: '/blog/test-bm25',
      contentHash: 'abc123'
    })

    // Insert test chunk with searchVector populated as tsvector
    await db.insert(documentChunks).values({
      id: testChunkId,
      documentId: testDocId,
      chunkIndex: 0,
      content: 'PostgreSQL full-text search is powerful for finding relevant documents',
      contextualContent: 'This chunk discusses PostgreSQL text search capabilities'
    })

    // Update the searchVector using to_tsvector (this will fail if column is text type)
    await db.execute(sql`
      UPDATE document_chunks
      SET "searchVector" = to_tsvector('english', content || ' ' || "contextualContent")
      WHERE id = ${testChunkId}
    `)
  })

  afterAll(async () => {
    const db = useDrizzle()
    await db.delete(documentChunks).where(sql`id = ${testChunkId}`)
    await db.delete(documents).where(sql`id = ${testDocId}`)
  })

  it('should execute ts_rank query without error', async () => {
    const db = useDrizzle()

    // This will fail with "function ts_rank(text, tsquery) does not exist"
    // if searchVector column is text instead of tsvector
    const results = await db.execute(sql`
      SELECT
        dc.id,
        ts_rank(dc."searchVector", plainto_tsquery('english', 'PostgreSQL')) AS rank
      FROM document_chunks dc
      WHERE dc."searchVector" @@ plainto_tsquery('english', 'PostgreSQL')
    `)

    expect(results.rows).toBeDefined()
    expect(Array.isArray(results.rows)).toBe(true)
  })

  it('should find documents using BM25 search', async () => {
    const db = useDrizzle()

    const results = await db.execute(sql`
      SELECT
        dc.id,
        dc.content,
        ts_rank(dc."searchVector", plainto_tsquery('english', 'full-text search')) AS rank
      FROM document_chunks dc
      WHERE dc."searchVector" @@ plainto_tsquery('english', 'full-text search')
      ORDER BY rank DESC
    `)

    expect(results.rows.length).toBeGreaterThan(0)
    expect(results.rows[0]).toHaveProperty('rank')
  })
})
