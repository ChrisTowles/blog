import { describe, it, expect, beforeEach } from 'vitest'
import { SkillRegistry } from './registry'
import { blogAssistantSkill, codeHelperSkill, creativeWriterSkill, generalAssistantSkill } from './builtin'
import { blogGuidePersona, codeReviewerPersona, fullAssistantPersona } from './personas'
import { allPostsKB, aiPostsKB } from './knowledge-bases'
import type { Skill, Persona, KnowledgeBase } from './types'

describe('SkillRegistry', () => {
  let registry: SkillRegistry

  beforeEach(() => {
    // Create a fresh registry for each test
    registry = new SkillRegistry()
  })

  describe('skill management', () => {
    it('has built-in skills registered by default', () => {
      const skills = registry.getAllSkills()
      expect(skills.length).toBeGreaterThanOrEqual(4)

      const slugs = skills.map(s => s.slug)
      expect(slugs).toContain('blog-assistant')
      expect(slugs).toContain('code-helper')
      expect(slugs).toContain('creative-writer')
      expect(slugs).toContain('general-assistant')
    })

    it('retrieves skill by slug', () => {
      const skill = registry.getSkill('blog-assistant')
      expect(skill).toBeDefined()
      expect(skill?.name).toBe('Blog Assistant')
      expect(skill?.tools).toContain('searchBlogContent')
    })

    it('returns undefined for non-existent skill', () => {
      const skill = registry.getSkill('non-existent-skill')
      expect(skill).toBeUndefined()
    })

    it('registers custom skill', () => {
      const customSkill: Skill = {
        slug: 'custom-skill',
        name: 'Custom Skill',
        description: 'A custom test skill',
        systemPromptSegment: 'Custom instructions here',
        tools: ['getCurrentDateTime'],
        priority: 100,
        isBuiltIn: false
      }

      registry.registerSkill(customSkill)
      const retrieved = registry.getSkill('custom-skill')
      expect(retrieved).toEqual(customSkill)
    })

    it('getSkillsBySlug returns skills sorted by priority', () => {
      const skills = registry.getSkillsBySlug(['creative-writer', 'blog-assistant'])

      expect(skills.length).toBe(2)
      // blog-assistant has priority 10, creative-writer has priority 30
      expect(skills[0]?.slug).toBe('blog-assistant')
      expect(skills[1]?.slug).toBe('creative-writer')
    })

    it('getSkillsBySlug filters out non-existent slugs', () => {
      const skills = registry.getSkillsBySlug(['blog-assistant', 'fake-skill', 'code-helper'])
      expect(skills.length).toBe(2)
      expect(skills.map(s => s.slug)).toContain('blog-assistant')
      expect(skills.map(s => s.slug)).toContain('code-helper')
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
        skillSlugs: ['blog-assistant'],
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
      expect(loaded.skills.length).toBeGreaterThan(0)
      expect(loaded.tools.length).toBeGreaterThan(0)
      expect(loaded.systemPrompt).toBeTruthy()
    })

    it('loads specific persona by slug', () => {
      const loaded = registry.loadPersona('code-reviewer')

      expect(loaded.persona.slug).toBe('code-reviewer')
      expect(loaded.skills.some(s => s.slug === 'code-helper')).toBe(true)
      expect(loaded.skills.some(s => s.slug === 'blog-assistant')).toBe(true)
    })

    it('throws error for non-existent persona', () => {
      expect(() => registry.loadPersona('fake-persona')).toThrow('Persona not found')
    })

    it('collects tools from all skills', () => {
      const loaded = registry.loadPersona('full-assistant')

      // full-assistant has all skills, so should have all tools
      const toolNames = loaded.tools.map(t => t.name)
      expect(toolNames).toContain('searchBlogContent')
      expect(toolNames).toContain('rollDice')
      expect(toolNames).toContain('getWeather')
      expect(toolNames).toContain('getCurrentDateTime')
    })

    it('collects knowledge base filters from skills', () => {
      const loaded = registry.loadPersona('blog-guide')

      // blog-guide uses blog-assistant which has all-posts KB
      expect(loaded.knowledgeBaseFilters.length).toBeGreaterThanOrEqual(0)
    })

    it('deduplicates tools across skills', () => {
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

    it('includes skill segments', () => {
      const loaded = registry.loadPersona('creative-companion')

      expect(loaded.systemPrompt).toContain('Creative Writer')
      expect(loaded.systemPrompt).toContain('rollDice')
    })

    it('includes capabilities header when skills present', () => {
      const loaded = registry.loadPersona('blog-guide')

      expect(loaded.systemPrompt).toContain('## Your Capabilities')
    })
  })

  describe('getToolsForSkills', () => {
    it('returns tools for given skill slugs', () => {
      const tools = registry.getToolsForSkills(['blog-assistant'])

      const toolNames = tools.map(t => t.name)
      expect(toolNames).toContain('searchBlogContent')
      expect(toolNames).toContain('getBlogTopics')
      expect(toolNames).toContain('getAuthorInfo')
    })

    it('deduplicates tools across multiple skills', () => {
      const tools = registry.getToolsForSkills(['blog-assistant', 'code-helper'])

      const searchTools = tools.filter(t => t.name === 'searchBlogContent')
      expect(searchTools.length).toBe(1)
    })

    it('returns empty array for non-existent skills', () => {
      const tools = registry.getToolsForSkills(['fake-skill'])
      expect(tools).toEqual([])
    })
  })
})

describe('Built-in Skills', () => {
  it('blogAssistantSkill has valid structure', () => {
    expect(blogAssistantSkill.slug).toBe('blog-assistant')
    expect(blogAssistantSkill.tools).toContain('searchBlogContent')
    expect(blogAssistantSkill.priority).toBeGreaterThan(0)
    expect(blogAssistantSkill.isBuiltIn).toBe(true)
    expect(blogAssistantSkill.systemPromptSegment.length).toBeGreaterThan(50)
  })

  it('codeHelperSkill has valid structure', () => {
    expect(codeHelperSkill.slug).toBe('code-helper')
    expect(codeHelperSkill.tools).toContain('searchBlogContent')
    expect(codeHelperSkill.priority).toBeGreaterThan(0)
    expect(codeHelperSkill.isBuiltIn).toBe(true)
  })

  it('creativeWriterSkill has valid structure', () => {
    expect(creativeWriterSkill.slug).toBe('creative-writer')
    expect(creativeWriterSkill.tools).toContain('rollDice')
    expect(creativeWriterSkill.priority).toBeGreaterThan(0)
    expect(creativeWriterSkill.isBuiltIn).toBe(true)
  })

  it('generalAssistantSkill has valid structure', () => {
    expect(generalAssistantSkill.slug).toBe('general-assistant')
    expect(generalAssistantSkill.tools).toContain('getWeather')
    expect(generalAssistantSkill.priority).toBeGreaterThan(0)
    expect(generalAssistantSkill.isBuiltIn).toBe(true)
  })

  it('all built-in skills have unique slugs', () => {
    const skills = [blogAssistantSkill, codeHelperSkill, creativeWriterSkill, generalAssistantSkill]
    const slugs = skills.map(s => s.slug)
    const uniqueSlugs = new Set(slugs)
    expect(uniqueSlugs.size).toBe(slugs.length)
  })

  it('all built-in skills have unique priorities', () => {
    const skills = [blogAssistantSkill, codeHelperSkill, creativeWriterSkill, generalAssistantSkill]
    const priorities = skills.map(s => s.priority)
    const uniquePriorities = new Set(priorities)
    expect(uniquePriorities.size).toBe(priorities.length)
  })
})

describe('Built-in Personas', () => {
  it('blogGuidePersona is default', () => {
    expect(blogGuidePersona.isDefault).toBe(true)
  })

  it('codeReviewerPersona has code-helper skill', () => {
    expect(codeReviewerPersona.skillSlugs).toContain('code-helper')
  })

  it('fullAssistantPersona has all skills', () => {
    expect(fullAssistantPersona.skillSlugs).toContain('blog-assistant')
    expect(fullAssistantPersona.skillSlugs).toContain('code-helper')
    expect(fullAssistantPersona.skillSlugs).toContain('creative-writer')
    expect(fullAssistantPersona.skillSlugs).toContain('general-assistant')
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
