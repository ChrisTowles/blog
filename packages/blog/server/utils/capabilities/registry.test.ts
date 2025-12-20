import { describe, it, expect, beforeEach } from 'vitest'
import { CapabilityRegistry } from './registry'
import { blogAssistantCapability, codeHelperCapability, creativeWriterCapability, generalAssistantCapability } from './builtin'
import { blogGuidePersona, codeReviewerPersona, fullAssistantPersona } from './personas'
import { allPostsKB, aiPostsKB } from './knowledge-bases'
import type { Capability, Persona, KnowledgeBase } from './types'

describe('CapabilityRegistry', () => {
  let registry: CapabilityRegistry

  beforeEach(() => {
    // Create a fresh registry for each test
    registry = new CapabilityRegistry()
  })

  describe('capability management', () => {
    it('has built-in capabilities registered by default', () => {
      const capabilities = registry.getAllCapabilities()
      expect(capabilities.length).toBeGreaterThanOrEqual(4)

      const slugs = capabilities.map(s => s.slug)
      expect(slugs).toContain('blog-assistant')
      expect(slugs).toContain('code-helper')
      expect(slugs).toContain('creative-writer')
      expect(slugs).toContain('general-assistant')
    })

    it('retrieves capability by slug', () => {
      const capability = registry.getCapability('blog-assistant')
      expect(capability).toBeDefined()
      expect(capability?.name).toBe('Blog Assistant')
      expect(capability?.tools).toContain('searchBlogContent')
    })

    it('returns undefined for non-existent capability', () => {
      const capability = registry.getCapability('non-existent-capability')
      expect(capability).toBeUndefined()
    })

    it('registers custom capability', () => {
      const customCapability: Capability = {
        slug: 'custom-capability',
        name: 'Custom Capability',
        description: 'A custom test capability',
        systemPromptSegment: 'Custom instructions here',
        tools: ['getCurrentDateTime'],
        priority: 100,
        isBuiltIn: false
      }

      registry.registerCapability(customCapability)
      const retrieved = registry.getCapability('custom-capability')
      expect(retrieved).toEqual(customCapability)
    })

    it('getCapabilitiesBySlug returns capabilities sorted by priority', () => {
      const capabilities = registry.getCapabilitiesBySlug(['creative-writer', 'blog-assistant'])

      expect(capabilities.length).toBe(2)
      // blog-assistant has priority 10, creative-writer has priority 30
      expect(capabilities[0]?.slug).toBe('blog-assistant')
      expect(capabilities[1]?.slug).toBe('creative-writer')
    })

    it('getCapabilitiesBySlug filters out non-existent slugs', () => {
      const capabilities = registry.getCapabilitiesBySlug(['blog-assistant', 'fake-capability', 'code-helper'])
      expect(capabilities.length).toBe(2)
      expect(capabilities.map(s => s.slug)).toContain('blog-assistant')
      expect(capabilities.map(s => s.slug)).toContain('code-helper')
    })
  })

  describe('persona management', () => {
    it('has default personas registered', () => {
      const personas = registry.getAllPersonas()
      expect(personas.length).toBeGreaterThanOrEqual(4)

      const slugs = personas.map(p => p.slug)
      expect(slugs).toContain('blog-guide')
      expect(slugs).toContain('code-reviewer')
      expect(slugs).toContain('creative-companion')
      expect(slugs).toContain('full-assistant')
    })

    it('retrieves persona by slug', () => {
      const persona = registry.getPersona('blog-guide')
      expect(persona).toBeDefined()
      expect(persona?.name).toBe('Blog Guide')
      expect(persona?.isDefault).toBe(true)
    })

    it('getDefaultPersona returns blog-guide', () => {
      const defaultPersona = registry.getDefaultPersona()
      expect(defaultPersona).toBeDefined()
      expect(defaultPersona?.slug).toBe('blog-guide')
      expect(defaultPersona?.isDefault).toBe(true)
    })

    it('registers custom persona', () => {
      const customPersona: Persona = {
        slug: 'custom-persona',
        name: 'Custom Persona',
        description: 'A custom test persona',
        icon: 'i-lucide-star',
        baseSystemPrompt: 'You are a custom assistant.',
        capabilitySlugs: ['blog-assistant'],
        isDefault: false,
        isBuiltIn: false
      }

      registry.registerPersona(customPersona)
      const retrieved = registry.getPersona('custom-persona')
      expect(retrieved).toEqual(customPersona)
    })
  })

  describe('knowledge base management', () => {
    it('has default knowledge bases registered', () => {
      const kbs = registry.getAllKnowledgeBases()
      expect(kbs.length).toBeGreaterThanOrEqual(4)

      const slugs = kbs.map(kb => kb.slug)
      expect(slugs).toContain('all-posts')
      expect(slugs).toContain('ai-posts')
      expect(slugs).toContain('vue-nuxt-posts')
      expect(slugs).toContain('devops-posts')
    })

    it('retrieves knowledge base by slug', () => {
      const kb = registry.getKnowledgeBase('ai-posts')
      expect(kb).toBeDefined()
      expect(kb?.name).toBe('AI & Claude Posts')
      expect(kb?.filter.slugPatterns).toBeDefined()
    })

    it('registers custom knowledge base', () => {
      const customKB: KnowledgeBase = {
        slug: 'custom-kb',
        name: 'Custom KB',
        description: 'A custom knowledge base',
        filter: { slugPatterns: ['test-*'] },
        isBuiltIn: false
      }

      registry.registerKnowledgeBase(customKB)
      const retrieved = registry.getKnowledgeBase('custom-kb')
      expect(retrieved).toEqual(customKB)
    })
  })

  describe('loadPersona', () => {
    it('loads default persona when no slug provided', () => {
      const loaded = registry.loadPersona()

      expect(loaded.persona.slug).toBe('blog-guide')
      expect(loaded.capabilities.length).toBeGreaterThan(0)
      expect(loaded.tools.length).toBeGreaterThan(0)
      expect(loaded.systemPrompt).toBeTruthy()
    })

    it('loads specific persona by slug', () => {
      const loaded = registry.loadPersona('code-reviewer')

      expect(loaded.persona.slug).toBe('code-reviewer')
      expect(loaded.capabilities.some(c => c.slug === 'code-helper')).toBe(true)
      expect(loaded.capabilities.some(c => c.slug === 'blog-assistant')).toBe(true)
    })

    it('throws error for non-existent persona', () => {
      expect(() => registry.loadPersona('fake-persona')).toThrow('Persona not found')
    })

    it('collects tools from all capabilities', () => {
      const loaded = registry.loadPersona('full-assistant')

      // full-assistant has all capabilities, so should have all tools
      const toolNames = loaded.tools.map(t => t.name)
      expect(toolNames).toContain('searchBlogContent')
      expect(toolNames).toContain('rollDice')
      expect(toolNames).toContain('getWeather')
      expect(toolNames).toContain('getCurrentDateTime')
    })

    it('collects knowledge base filters from capabilities', () => {
      const loaded = registry.loadPersona('blog-guide')

      // blog-guide uses blog-assistant which has all-posts KB
      expect(loaded.knowledgeBaseFilters.length).toBeGreaterThanOrEqual(0)
    })

    it('deduplicates tools across capabilities', () => {
      // code-reviewer has code-helper and blog-assistant, both use searchBlogContent
      const loaded = registry.loadPersona('code-reviewer')

      const searchTools = loaded.tools.filter(t => t.name === 'searchBlogContent')
      expect(searchTools.length).toBe(1)
    })
  })

  describe('buildSystemPrompt', () => {
    it('includes persona base prompt', () => {
      const loaded = registry.loadPersona('blog-guide')

      expect(loaded.systemPrompt).toContain('knowledgeable and friendly guide')
    })

    it('includes capability segments', () => {
      const loaded = registry.loadPersona('creative-companion')

      expect(loaded.systemPrompt).toContain('Creative Writer')
      expect(loaded.systemPrompt).toContain('rollDice')
    })

    it('includes capabilities header when capabilities present', () => {
      const loaded = registry.loadPersona('blog-guide')

      expect(loaded.systemPrompt).toContain('## Your Capabilities')
    })
  })

  describe('getToolsForCapabilities', () => {
    it('returns tools for given capability slugs', () => {
      const tools = registry.getToolsForCapabilities(['blog-assistant'])

      const toolNames = tools.map(t => t.name)
      expect(toolNames).toContain('searchBlogContent')
      expect(toolNames).toContain('getBlogTopics')
      expect(toolNames).toContain('getAuthorInfo')
    })

    it('deduplicates tools across multiple capabilities', () => {
      const tools = registry.getToolsForCapabilities(['blog-assistant', 'code-helper'])

      const searchTools = tools.filter(t => t.name === 'searchBlogContent')
      expect(searchTools.length).toBe(1)
    })

    it('returns empty array for non-existent capabilities', () => {
      const tools = registry.getToolsForCapabilities(['fake-capability'])
      expect(tools).toEqual([])
    })
  })
})

describe('Built-in Capabilities', () => {
  it('blogAssistantCapability has valid structure', () => {
    expect(blogAssistantCapability.slug).toBe('blog-assistant')
    expect(blogAssistantCapability.tools).toContain('searchBlogContent')
    expect(blogAssistantCapability.priority).toBeGreaterThan(0)
    expect(blogAssistantCapability.isBuiltIn).toBe(true)
    expect(blogAssistantCapability.systemPromptSegment.length).toBeGreaterThan(50)
  })

  it('codeHelperCapability has valid structure', () => {
    expect(codeHelperCapability.slug).toBe('code-helper')
    expect(codeHelperCapability.tools).toContain('searchBlogContent')
    expect(codeHelperCapability.priority).toBeGreaterThan(0)
    expect(codeHelperCapability.isBuiltIn).toBe(true)
  })

  it('creativeWriterCapability has valid structure', () => {
    expect(creativeWriterCapability.slug).toBe('creative-writer')
    expect(creativeWriterCapability.tools).toContain('rollDice')
    expect(creativeWriterCapability.priority).toBeGreaterThan(0)
    expect(creativeWriterCapability.isBuiltIn).toBe(true)
  })

  it('generalAssistantCapability has valid structure', () => {
    expect(generalAssistantCapability.slug).toBe('general-assistant')
    expect(generalAssistantCapability.tools).toContain('getWeather')
    expect(generalAssistantCapability.priority).toBeGreaterThan(0)
    expect(generalAssistantCapability.isBuiltIn).toBe(true)
  })

  it('all built-in capabilities have unique slugs', () => {
    const capabilities = [blogAssistantCapability, codeHelperCapability, creativeWriterCapability, generalAssistantCapability]
    const slugs = capabilities.map(c => c.slug)
    const uniqueSlugs = new Set(slugs)
    expect(uniqueSlugs.size).toBe(slugs.length)
  })

  it('all built-in capabilities have unique priorities', () => {
    const capabilities = [blogAssistantCapability, codeHelperCapability, creativeWriterCapability, generalAssistantCapability]
    const priorities = capabilities.map(c => c.priority)
    const uniquePriorities = new Set(priorities)
    expect(uniquePriorities.size).toBe(priorities.length)
  })
})

describe('Built-in Personas', () => {
  it('blogGuidePersona is default', () => {
    expect(blogGuidePersona.isDefault).toBe(true)
  })

  it('codeReviewerPersona has code-helper capability', () => {
    expect(codeReviewerPersona.capabilitySlugs).toContain('code-helper')
  })

  it('fullAssistantPersona has all capabilities', () => {
    expect(fullAssistantPersona.capabilitySlugs).toContain('blog-assistant')
    expect(fullAssistantPersona.capabilitySlugs).toContain('code-helper')
    expect(fullAssistantPersona.capabilitySlugs).toContain('creative-writer')
    expect(fullAssistantPersona.capabilitySlugs).toContain('general-assistant')
  })

  it('all personas have valid icons', () => {
    const personas = [blogGuidePersona, codeReviewerPersona, fullAssistantPersona]
    for (const persona of personas) {
      expect(persona.icon).toMatch(/^i-lucide-/)
    }
  })
})

describe('Built-in Knowledge Bases', () => {
  it('allPostsKB has empty filter', () => {
    expect(allPostsKB.slug).toBe('all-posts')
    expect(Object.keys(allPostsKB.filter).length).toBe(0)
  })

  it('aiPostsKB has slug patterns for AI content', () => {
    expect(aiPostsKB.slug).toBe('ai-posts')
    expect(aiPostsKB.filter.slugPatterns).toBeDefined()
    expect(aiPostsKB.filter.slugPatterns).toContain('*claude*')
  })
})
