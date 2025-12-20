import { describe, it, expect } from 'vitest'

describe('Chatbot API', () => {
  describe('GET /api/chatbots (list)', () => {
    it('returns all personas as chatbot flavors', () => {
      const personas = capabilityRegistry.getAllPersonas()

      expect(personas.length).toBeGreaterThanOrEqual(4)

      const slugs = personas.map(p => p.slug)
      expect(slugs).toContain('blog-guide')
      expect(slugs).toContain('code-reviewer')
      expect(slugs).toContain('creative-companion')
      expect(slugs).toContain('full-assistant')
    })

    it('each chatbot has required display properties', () => {
      const personas = capabilityRegistry.getAllPersonas()

      for (const persona of personas) {
        expect(persona.slug).toBeTruthy()
        expect(persona.name).toBeTruthy()
        expect(persona.description).toBeTruthy()
        expect(persona.icon).toMatch(/^i-lucide-/)
      }
    })

    it('each built-in chatbot has theme configuration', () => {
      const personas = capabilityRegistry.getAllPersonas()
      const builtInPersonas = personas.filter(p => p.isBuiltIn)

      for (const persona of builtInPersonas) {
        expect(persona.theme).toBeDefined()
        expect(persona.theme?.primaryColor).toBeTruthy()
        expect(persona.theme?.icon).toMatch(/^i-lucide-/)
      }
    })

    it('has exactly one default chatbot', () => {
      const personas = capabilityRegistry.getAllPersonas()
      const defaults = personas.filter(p => p.isDefault)

      expect(defaults.length).toBe(1)
      expect(defaults[0]?.slug).toBe('blog-guide')
    })
  })

  describe('GET /api/chatbots/[slug] (detail)', () => {
    it('loads blog-guide chatbot with full config', () => {
      const loaded = capabilityRegistry.loadPersona('blog-guide')

      expect(loaded.persona.slug).toBe('blog-guide')
      expect(loaded.persona.name).toBe('Blog Guide')
      expect(loaded.persona.theme?.primaryColor).toBe('blue')
      expect(loaded.capabilities.length).toBeGreaterThan(0)
      expect(loaded.tools.length).toBeGreaterThan(0)
      expect(loaded.systemPrompt).toBeTruthy()
    })

    it('loads code-reviewer chatbot with purple theme', () => {
      const loaded = capabilityRegistry.loadPersona('code-reviewer')

      expect(loaded.persona.slug).toBe('code-reviewer')
      expect(loaded.persona.theme?.primaryColor).toBe('purple')
      expect(loaded.capabilities.some(c => c.slug === 'code-helper')).toBe(true)
    })

    it('loads creative-companion chatbot with pink theme', () => {
      const loaded = capabilityRegistry.loadPersona('creative-companion')

      expect(loaded.persona.slug).toBe('creative-companion')
      expect(loaded.persona.theme?.primaryColor).toBe('pink')
      expect(loaded.capabilities.some(c => c.slug === 'creative-writer')).toBe(true)
    })

    it('loads full-assistant chatbot with green theme', () => {
      const loaded = capabilityRegistry.loadPersona('full-assistant')

      expect(loaded.persona.slug).toBe('full-assistant')
      expect(loaded.persona.theme?.primaryColor).toBe('green')
      // Should have all capabilities
      expect(loaded.capabilities.length).toBeGreaterThanOrEqual(4)
    })

    it('throws error for non-existent chatbot', () => {
      expect(() => capabilityRegistry.loadPersona('fake-bot')).toThrow('Persona not found')
    })

    it('includes system prompt from persona base', () => {
      const loaded = capabilityRegistry.loadPersona('blog-guide')

      expect(loaded.systemPrompt).toContain('knowledgeable and friendly guide')
    })

    it('includes capability system prompt segments', () => {
      const loaded = capabilityRegistry.loadPersona('creative-companion')

      // creative-companion has creative-writer capability
      expect(loaded.systemPrompt).toContain('Creative Writer')
    })

    it('collects tools from all capabilities', () => {
      const loaded = capabilityRegistry.loadPersona('full-assistant')

      const toolNames = loaded.tools.map(t => t.name)
      expect(toolNames).toContain('searchBlogContent')
      expect(toolNames).toContain('rollDice')
      expect(toolNames).toContain('getWeather')
    })
  })

  describe('Chatbot Theme Configuration', () => {
    it('all themes use valid Nuxt UI color names', () => {
      const validColors = ['blue', 'purple', 'pink', 'green', 'red', 'yellow', 'orange', 'sky', 'violet', 'rose', 'emerald']
      const personas = capabilityRegistry.getAllPersonas()

      for (const persona of personas) {
        if (persona.theme?.primaryColor) {
          expect(validColors).toContain(persona.theme.primaryColor)
        }
        if (persona.theme?.accentColor) {
          expect(validColors).toContain(persona.theme.accentColor)
        }
      }
    })

    it('each chatbot has unique theme color', () => {
      const personas = capabilityRegistry.getAllPersonas()
      const builtInPersonas = personas.filter(p => p.isBuiltIn)
      const colors = builtInPersonas.map(p => p.theme?.primaryColor).filter(Boolean)

      const uniqueColors = new Set(colors)
      expect(uniqueColors.size).toBe(colors.length)
    })

    it('theme icon matches persona icon for built-ins', () => {
      const personas = capabilityRegistry.getAllPersonas()
      const builtInPersonas = personas.filter(p => p.isBuiltIn)

      for (const persona of builtInPersonas) {
        expect(persona.theme?.icon).toBe(persona.icon)
      }
    })
  })
})
