/**
 * RAG Integration Tests
 *
 * These tests require:
 * - AWS credentials configured (for Bedrock embeddings/reranking)
 *
 * Run with: pnpm test -- --run rag.integration
 */
import { describe, it, expect } from 'vitest'

// Check if AWS is configured
const hasAWSConfig = !!(process.env.AWS_REGION || process.env.AWS_ACCESS_KEY_ID)

describe.skipIf(!hasAWSConfig)('Bedrock Embeddings Integration', () => {
  it('generates embeddings with correct dimensions', async () => {
    const { embedText } = await import('../ai/bedrock')

    const embedding = await embedText('This is a test sentence for embedding.')

    expect(Array.isArray(embedding)).toBe(true)
    expect(embedding).toHaveLength(1024) // Titan v2 1024 dimensions
    expect(embedding.every((n: number) => typeof n === 'number')).toBe(true)
  })

  it('generates consistent embeddings for same text', async () => {
    const { embedText } = await import('../ai/bedrock')
    const text = 'Consistent embedding test'

    const embedding1 = await embedText(text)
    const embedding2 = await embedText(text)

    // Embeddings should be very similar (allowing for floating point)
    const similarity = cosineSimilarity(embedding1, embedding2)
    expect(similarity).toBeGreaterThan(0.99)
  })

  it('generates different embeddings for different text', async () => {
    const { embedText } = await import('../ai/bedrock')

    const embedding1 = await embedText('The quick brown fox')
    const embedding2 = await embedText('Machine learning algorithms')

    const similarity = cosineSimilarity(embedding1, embedding2)
    expect(similarity).toBeLessThan(0.9) // Should be meaningfully different
  })

  it('handles batch embedding', async () => {
    const { embedTexts } = await import('../ai/bedrock')
    const texts = [
      'First test document',
      'Second test document',
      'Third test document'
    ]

    const results = await embedTexts(texts)

    expect(results).toHaveLength(3)
    results.forEach((result) => {
      expect(result.embedding).toHaveLength(1024)
      expect(result.inputTextTokenCount).toBeGreaterThan(0)
    })
  })

  it('handles unicode and special characters', async () => {
    const { embedText } = await import('../ai/bedrock')

    const embedding = await embedText('Unicode test: 你好世界 🚀 émojis & spëcial chârs')

    expect(embedding).toHaveLength(1024)
  })
})

describe.skipIf(!hasAWSConfig)('Bedrock Reranking Integration', () => {
  it('reranks documents by relevance', async () => {
    const { rerankDocuments } = await import('../ai/bedrock')

    const query = 'How to configure TypeScript'
    const documents = [
      'Python is a programming language used for data science.',
      'TypeScript configuration involves tsconfig.json settings.',
      'Java is an object-oriented programming language.',
      'Configure your TypeScript compiler options for best results.'
    ]

    const results = await rerankDocuments(query, documents, 3)

    expect(results).toHaveLength(3)

    // TypeScript docs should rank higher than Python/Java
    const topIndices = results.map(r => r.index)
    expect(topIndices).toContain(1) // tsconfig doc
    expect(topIndices).toContain(3) // compiler options doc

    // Verify scores are in descending order
    for (let i = 1; i < results.length; i++) {
      const prevScore = results[i - 1]?.relevanceScore ?? 0
      const currScore = results[i]?.relevanceScore ?? 0
      expect(prevScore).toBeGreaterThanOrEqual(currScore)
    }
  })

  it('returns scores between 0 and 1', async () => {
    const { rerankDocuments } = await import('../ai/bedrock')

    const results = await rerankDocuments(
      'test query',
      ['document one', 'document two'],
      2
    )

    results.forEach((result) => {
      expect(result.relevanceScore).toBeGreaterThanOrEqual(0)
      expect(result.relevanceScore).toBeLessThanOrEqual(1)
    })
  })
})

describe('RAG Retrieval Integration', () => {
  // These tests verify the RRF algorithm logic (no DB required)

  it('reciprocal rank fusion combines results correctly', async () => {
    // Test the RRF algorithm directly
    const { reciprocalRankFusion } = await import('./retrieve')

    const makeCandidate = (id: string) => ({
      id,
      documentId: 'doc-1',
      content: 'test content',
      contextualContent: 'test context',
      chunkIndex: 0,
      documentTitle: 'Test Doc',
      documentUrl: '/blog/test',
      documentSlug: 'test'
    })

    const semanticResults = [
      { ...makeCandidate('a'), distance: 0.1 },
      { ...makeCandidate('b'), distance: 0.2 },
      { ...makeCandidate('c'), distance: 0.3 }
    ]

    const bm25Results = [
      { ...makeCandidate('b'), rank: 0.95 },
      { ...makeCandidate('a'), rank: 0.85 },
      { ...makeCandidate('d'), rank: 0.75 }
    ]

    const fused = reciprocalRankFusion(semanticResults, bm25Results, 0.7, 0.3)

    // 'a' and 'b' should rank highest since they appear in both
    const topIds = fused.slice(0, 2).map(r => r.id)
    expect(topIds).toContain('a')
    expect(topIds).toContain('b')

    // All unique IDs should be present
    const allIds = fused.map(r => r.id)
    expect(allIds).toContain('a')
    expect(allIds).toContain('b')
    expect(allIds).toContain('c')
    expect(allIds).toContain('d')
  })

  it('RRF scores are properly weighted', async () => {
    const { reciprocalRankFusion } = await import('./retrieve')

    const makeCandidate = (id: string) => ({
      id,
      documentId: 'doc-1',
      content: 'test content',
      contextualContent: 'test context',
      chunkIndex: 0,
      documentTitle: 'Test Doc',
      documentUrl: '/blog/test',
      documentSlug: 'test'
    })

    // If same doc is #1 in both, it should score highest
    const semantic = [
      { ...makeCandidate('winner'), distance: 0.1 },
      { ...makeCandidate('loser'), distance: 0.5 }
    ]
    const bm25 = [
      { ...makeCandidate('winner'), rank: 1 },
      { ...makeCandidate('other'), rank: 0.5 }
    ]

    const fused = reciprocalRankFusion(semantic, bm25, 0.7, 0.3)

    expect(fused[0]?.id).toBe('winner')
    expect(fused[0]?.score).toBeGreaterThan(fused[1]?.score ?? 0)
  })
})

describe('Hash Deduplication', () => {
  it('same content produces same hash', async () => {
    const { hashContent } = await import('./chunker')

    const content = '# Test Blog Post\n\nThis is the content.'
    const hash1 = await hashContent(content)
    const hash2 = await hashContent(content)

    expect(hash1).toBe(hash2)
  })

  it('different content produces different hash', async () => {
    const { hashContent } = await import('./chunker')

    const hash1 = await hashContent('Version 1 of the post')
    const hash2 = await hashContent('Version 2 of the post')

    expect(hash1).not.toBe(hash2)
  })

  it('whitespace changes affect hash', async () => {
    const { hashContent } = await import('./chunker')

    const hash1 = await hashContent('No trailing space')
    const hash2 = await hashContent('No trailing space ')

    expect(hash1).not.toBe(hash2)
  })
})

// Helper: Calculate cosine similarity between two vectors
function cosineSimilarity(a: number[], b: number[]): number {
  if (a.length !== b.length) throw new Error('Vectors must have same length')

  let dotProduct = 0
  let normA = 0
  let normB = 0

  for (let i = 0; i < a.length; i++) {
    const aVal = a[i] ?? 0
    const bVal = b[i] ?? 0
    dotProduct += aVal * bVal
    normA += aVal * aVal
    normB += bVal * bVal
  }

  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB))
}
