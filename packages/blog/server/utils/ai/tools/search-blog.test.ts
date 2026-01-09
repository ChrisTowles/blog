/**
 * Integration tests for searchBlogContent tool
 * Uses Nuxt test environment with database access
 */
import { describe, it, expect } from 'vitest'
import { searchBlogContent } from './search-blog'

describe('searchBlogContent', () => {
  it('should have correct tool metadata', () => {
    expect(searchBlogContent.name).toBe('searchBlogContent')
    expect(searchBlogContent.description).toContain('Search blog posts')
    expect(searchBlogContent.inputSchema).toHaveProperty('query')
  })

  describe('RAG integration', () => {
    it('should return results for a topic covered in the blog', async () => {
      const result = await searchBlogContent.handler({ query: 'Vue Nuxt development' }, undefined) as {
        content: Array<{ text: string }>
      }

      const data = JSON.parse(result.content[0].text)

      expect(data.results).toBeDefined()
      expect(Array.isArray(data.results)).toBe(true)
      expect(data.hint).toContain('markdown links')
    })

    it('should return results with required fields', async () => {
      const result = await searchBlogContent.handler({ query: 'TypeScript' }, undefined) as {
        content: Array<{ text: string }>
      }

      const data = JSON.parse(result.content[0].text)

      if (data.results.length > 0) {
        const firstResult = data.results[0]
        expect(firstResult).toHaveProperty('content')
        expect(firstResult).toHaveProperty('source')
        expect(firstResult).toHaveProperty('url')
      }
    })

    it('should handle nonsense query gracefully', async () => {
      const result = await searchBlogContent.handler({ query: 'xyzzy123nonsensequery456' }, undefined) as {
        content: Array<{ text: string }>
      }

      const data = JSON.parse(result.content[0].text)

      // RAG may still return low-relevance results, just verify structure
      expect(data.results).toBeDefined()
      expect(Array.isArray(data.results)).toBe(true)
    })

    it('should find AI/Claude related content', async () => {
      const result = await searchBlogContent.handler({ query: 'Claude AI assistant' }, undefined) as {
        content: Array<{ text: string }>
      }

      const data = JSON.parse(result.content[0].text)

      expect(data.results).toBeDefined()
      if (data.results.length > 0) {
        const hasAIContent = data.results.some((r: { content: string, source: string }) =>
          r.content.toLowerCase().includes('ai')
          || r.content.toLowerCase().includes('claude')
          || r.source.toLowerCase().includes('ai')
        )
        expect(hasAIContent).toBe(true)
      }
    })

    it('should respect topK limit of 5', async () => {
      const result = await searchBlogContent.handler({ query: 'development programming code' }, undefined) as {
        content: Array<{ text: string }>
      }

      const data = JSON.parse(result.content[0].text)

      expect(data.results.length).toBeLessThanOrEqual(5)
    })

    it('should handle empty database gracefully', async () => {
      // Test with query unlikely to match anything
      const result = await searchBlogContent.handler({ query: 'ZZZZUNLIKELYTOEXIST999' }, undefined) as {
        content: Array<{ text: string }>
      }

      const data = JSON.parse(result.content[0].text)

      // Should return empty results array with helpful hint
      expect(data.results).toBeDefined()
      expect(Array.isArray(data.results)).toBe(true)
      expect(data.hint).toBeDefined()
    })
  })
})
