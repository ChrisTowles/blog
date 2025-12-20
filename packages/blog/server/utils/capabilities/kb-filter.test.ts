import { describe, it, expect } from 'vitest'
import type { KnowledgeBaseFilter } from './types'

// We need to test the filtering logic from retrieve.ts
// Since those functions are not exported, we'll recreate the logic here for testing
// This tests the core filtering algorithm

interface MockResult {
  documentSlug: string
  documentTitle: string
  score: number
}

function buildSlugFilter(filters: KnowledgeBaseFilter[]): { include: string[], exclude: string[] } {
  const include: string[] = []
  const exclude: string[] = []

  for (const filter of filters) {
    if (filter.slugPatterns) {
      include.push(...filter.slugPatterns.map(p => p.replace(/\*/g, '%')))
    }
    if (filter.titlePatterns) {
      include.push(...filter.titlePatterns.map(p => `%${p}%`))
    }
    if (filter.excludePatterns) {
      exclude.push(...filter.excludePatterns.map(p => p.replace(/\*/g, '%')))
    }
  }

  return { include, exclude }
}

function hasActiveFilters(filters: KnowledgeBaseFilter[]): boolean {
  return filters.some((f) => {
    const hasSlug = f.slugPatterns && f.slugPatterns.length > 0
    const hasTitle = f.titlePatterns && f.titlePatterns.length > 0
    const hasExclude = f.excludePatterns && f.excludePatterns.length > 0
    return hasSlug || hasTitle || hasExclude
  })
}

function applyKnowledgeBaseFilters(
  results: MockResult[],
  filters: KnowledgeBaseFilter[]
): MockResult[] {
  if (!hasActiveFilters(filters)) {
    return results
  }

  const { include, exclude } = buildSlugFilter(filters)

  return results.filter((result) => {
    const slug = result.documentSlug.toLowerCase()
    const title = result.documentTitle.toLowerCase()

    // Check excludes first
    for (const pattern of exclude) {
      const regex = new RegExp(`^${pattern.toLowerCase().replace(/%/g, '.*')}$`)
      if (regex.test(slug)) {
        return false
      }
    }

    // If no includes, accept all non-excluded
    if (include.length === 0) {
      return true
    }

    // Check if matches any include pattern (slug or title)
    for (const pattern of include) {
      const regex = new RegExp(`^${pattern.toLowerCase().replace(/%/g, '.*')}$`)
      if (regex.test(slug) || regex.test(title)) {
        return true
      }
    }

    return false
  })
}

describe('Knowledge Base Filtering', () => {
  const mockResults: MockResult[] = [
    { documentSlug: 'claude-tips', documentTitle: 'Tips for Claude', score: 0.9 },
    { documentSlug: 'vue-components', documentTitle: 'Vue Component Best Practices', score: 0.8 },
    { documentSlug: 'ai-workflows', documentTitle: 'AI Workflow Automation', score: 0.7 },
    { documentSlug: 'terraform-gcp', documentTitle: 'Terraform on GCP', score: 0.6 },
    { documentSlug: 'nuxt-content', documentTitle: 'Using Nuxt Content', score: 0.5 },
    { documentSlug: 'ollama-setup', documentTitle: 'Setting up Ollama', score: 0.4 }
  ]

  describe('hasActiveFilters', () => {
    it('returns false for empty filters', () => {
      expect(hasActiveFilters([])).toBe(false)
    })

    it('returns false for filter with empty patterns', () => {
      expect(hasActiveFilters([{}])).toBe(false)
      expect(hasActiveFilters([{ slugPatterns: [] }])).toBe(false)
    })

    it('returns true for filter with slug patterns', () => {
      expect(hasActiveFilters([{ slugPatterns: ['*claude*'] }])).toBe(true)
    })

    it('returns true for filter with title patterns', () => {
      expect(hasActiveFilters([{ titlePatterns: ['Vue'] }])).toBe(true)
    })

    it('returns true for filter with exclude patterns', () => {
      expect(hasActiveFilters([{ excludePatterns: ['draft-*'] }])).toBe(true)
    })
  })

  describe('buildSlugFilter', () => {
    it('converts glob patterns to SQL-like patterns', () => {
      const filter: KnowledgeBaseFilter = {
        slugPatterns: ['*claude*', 'ai-*']
      }

      const { include, exclude } = buildSlugFilter([filter])
      expect(include).toContain('%claude%')
      expect(include).toContain('ai-%')
      expect(exclude).toEqual([])
    })

    it('wraps title patterns with wildcards', () => {
      const filter: KnowledgeBaseFilter = {
        titlePatterns: ['Vue', 'Nuxt']
      }

      const { include } = buildSlugFilter([filter])
      expect(include).toContain('%Vue%')
      expect(include).toContain('%Nuxt%')
    })

    it('handles exclude patterns', () => {
      const filter: KnowledgeBaseFilter = {
        excludePatterns: ['draft-*', 'test-*']
      }

      const { exclude } = buildSlugFilter([filter])
      expect(exclude).toContain('draft-%')
      expect(exclude).toContain('test-%')
    })

    it('combines multiple filters', () => {
      const filters: KnowledgeBaseFilter[] = [
        { slugPatterns: ['claude-*'] },
        { slugPatterns: ['ai-*'] }
      ]

      const { include } = buildSlugFilter(filters)
      expect(include).toContain('claude-%')
      expect(include).toContain('ai-%')
    })
  })

  describe('applyKnowledgeBaseFilters', () => {
    it('returns all results when no filters', () => {
      const filtered = applyKnowledgeBaseFilters(mockResults, [])
      expect(filtered.length).toBe(mockResults.length)
    })

    it('returns all results when filter is empty', () => {
      const filtered = applyKnowledgeBaseFilters(mockResults, [{}])
      expect(filtered.length).toBe(mockResults.length)
    })

    it('filters by slug pattern', () => {
      const filter: KnowledgeBaseFilter = {
        slugPatterns: ['*claude*']
      }

      const filtered = applyKnowledgeBaseFilters(mockResults, [filter])
      expect(filtered.length).toBe(1)
      expect(filtered[0]?.documentSlug).toBe('claude-tips')
    })

    it('filters by multiple slug patterns (OR logic)', () => {
      const filter: KnowledgeBaseFilter = {
        slugPatterns: ['*claude*', 'ai-*']
      }

      const filtered = applyKnowledgeBaseFilters(mockResults, [filter])
      expect(filtered.length).toBe(2)
      expect(filtered.map(r => r.documentSlug)).toContain('claude-tips')
      expect(filtered.map(r => r.documentSlug)).toContain('ai-workflows')
    })

    it('filters by title pattern', () => {
      const filter: KnowledgeBaseFilter = {
        titlePatterns: ['Vue']
      }

      const filtered = applyKnowledgeBaseFilters(mockResults, [filter])
      expect(filtered.length).toBe(1)
      expect(filtered[0]?.documentSlug).toBe('vue-components')
    })

    it('applies exclude patterns', () => {
      const filter: KnowledgeBaseFilter = {
        excludePatterns: ['terraform-*']
      }

      const filtered = applyKnowledgeBaseFilters(mockResults, [filter])
      expect(filtered.length).toBe(5)
      expect(filtered.map(r => r.documentSlug)).not.toContain('terraform-gcp')
    })

    it('exclude takes precedence over include', () => {
      const filter: KnowledgeBaseFilter = {
        slugPatterns: ['*-*'], // Would match all
        excludePatterns: ['vue-*']
      }

      const filtered = applyKnowledgeBaseFilters(mockResults, [filter])
      expect(filtered.map(r => r.documentSlug)).not.toContain('vue-components')
    })

    it('case insensitive matching', () => {
      const filter: KnowledgeBaseFilter = {
        titlePatterns: ['CLAUDE']
      }

      const filtered = applyKnowledgeBaseFilters(mockResults, [filter])
      expect(filtered.length).toBe(1)
      expect(filtered[0]?.documentSlug).toBe('claude-tips')
    })

    it('combines include patterns from multiple filters', () => {
      const filters: KnowledgeBaseFilter[] = [
        { slugPatterns: ['claude-*'] },
        { slugPatterns: ['vue-*'] }
      ]

      const filtered = applyKnowledgeBaseFilters(mockResults, filters)
      expect(filtered.length).toBe(2)
      expect(filtered.map(r => r.documentSlug)).toContain('claude-tips')
      expect(filtered.map(r => r.documentSlug)).toContain('vue-components')
    })

    it('preserves order and scores', () => {
      const filter: KnowledgeBaseFilter = {
        slugPatterns: ['*-*'] // Match all
      }

      const filtered = applyKnowledgeBaseFilters(mockResults, [filter])
      expect(filtered[0]?.score).toBe(0.9)
      expect(filtered[5]?.score).toBe(0.4)
    })

    it('handles AI-related KB filter', () => {
      // Simulating the aiPostsKB filter
      const filter: KnowledgeBaseFilter = {
        slugPatterns: ['*claude*', '*ai*', '*anthropic*', '*ollama*', '*comfy*'],
        titlePatterns: ['AI', 'Claude', 'Anthropic', 'Machine Learning', 'LLM']
      }

      const filtered = applyKnowledgeBaseFilters(mockResults, [filter])
      expect(filtered.length).toBe(3)
      expect(filtered.map(r => r.documentSlug)).toContain('claude-tips')
      expect(filtered.map(r => r.documentSlug)).toContain('ai-workflows')
      expect(filtered.map(r => r.documentSlug)).toContain('ollama-setup')
    })
  })
})

describe('Tool Registry Integration', () => {
  // These tests verify that the tool registry exports the correct functions
  it('tool registry exports getToolsByNames', async () => {
    const { getToolsByNames } = await import('../ai/tools')
    expect(typeof getToolsByNames).toBe('function')

    const tools = getToolsByNames(['getCurrentDateTime', 'searchBlogContent'])
    expect(tools.length).toBe(2)
  })

  it('tool registry exports getAllToolNames', async () => {
    const { getAllToolNames } = await import('../ai/tools')
    expect(typeof getAllToolNames).toBe('function')

    const names = getAllToolNames()
    expect(names).toContain('searchBlogContent')
    expect(names).toContain('rollDice')
    expect(names).toContain('getWeather')
  })

  it('tool registry has all expected tools', async () => {
    const { getAllToolNames } = await import('../ai/tools')
    const names = getAllToolNames()

    expect(names).toContain('searchBlogContent')
    expect(names).toContain('getCurrentDateTime')
    expect(names).toContain('getAuthorInfo')
    expect(names).toContain('getBlogTopics')
    expect(names).toContain('getWeather')
    expect(names).toContain('rollDice')
  })
})
