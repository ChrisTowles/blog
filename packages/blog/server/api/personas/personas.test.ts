describe('Personas API', () => {
  describe('GET /api/personas (list)', () => {
    it('returns all personas', () => {
      const personas = capabilityRegistry.getAllPersonas()

      expect(personas.length).toBeGreaterThanOrEqual(4)

      const slugs = personas.map(p => p.slug)
      expect(slugs).toContain('blog-guide')
      expect(slugs).toContain('code-reviewer')
      expect(slugs).toContain('creative-companion')
      expect(slugs).toContain('full-assistant')
    })

    it('returns personas with required display properties', () => {
      const personas = capabilityRegistry.getAllPersonas()

      for (const persona of personas) {
        expect(persona.slug).toBeTruthy()
        expect(persona.name).toBeTruthy()
        expect(persona.description).toBeTruthy()
        expect(persona.icon).toMatch(/^i-lucide-/)
        expect(persona.capabilitySlugs).toBeDefined()
        expect(Array.isArray(persona.capabilitySlugs)).toBe(true)
        expect(typeof persona.isDefault).toBe('boolean')
        expect(typeof persona.isBuiltIn).toBe('boolean')
      }
    })

    it('has exactly one default persona', () => {
      const personas = capabilityRegistry.getAllPersonas()
      const defaults = personas.filter(p => p.isDefault)

      expect(defaults.length).toBe(1)
      expect(defaults[0]?.slug).toBe('blog-guide')
    })

    it('all built-in personas have theme configuration', () => {
      const personas = capabilityRegistry.getAllPersonas()
      const builtInPersonas = personas.filter(p => p.isBuiltIn)

      for (const persona of builtInPersonas) {
        expect(persona.theme).toBeDefined()
        expect(persona.theme?.primaryColor).toBeTruthy()
        expect(persona.theme?.icon).toMatch(/^i-lucide-/)
      }
    })
  })

  describe('GET /api/personas/[slug] (detail)', () => {
    it('returns 404 for non-existent persona', () => {
      expect(() => capabilityRegistry.loadPersona('non-existent-persona')).toThrow(
        'Persona not found'
      )
    })

    it('loads blog-guide persona with full config', () => {
      const loaded = capabilityRegistry.loadPersona('blog-guide')

      expect(loaded.persona.slug).toBe('blog-guide')
      expect(loaded.persona.name).toBe('Blog Guide')
      expect(loaded.persona.isDefault).toBe(true)
      expect(loaded.capabilities.length).toBeGreaterThan(0)
      expect(loaded.tools.length).toBeGreaterThan(0)
      expect(loaded.systemPrompt).toBeTruthy()
    })

    it('loads persona with capabilities', () => {
      const loaded = capabilityRegistry.loadPersona('code-reviewer')

      expect(loaded.persona.slug).toBe('code-reviewer')
      expect(loaded.capabilities.length).toBeGreaterThan(0)

      for (const capability of loaded.capabilities) {
        expect(capability.slug).toBeTruthy()
        expect(capability.name).toBeTruthy()
        expect(capability.description).toBeTruthy()
        expect(Array.isArray(capability.tools)).toBe(true)
      }
    })

    it('includes system prompt in loaded persona', () => {
      const loaded = capabilityRegistry.loadPersona('blog-guide')

      expect(loaded.systemPrompt).toBeTruthy()
      expect(loaded.systemPrompt.length).toBeGreaterThan(0)
      expect(loaded.systemPrompt).toContain('## Your Capabilities')
    })

    it('collects tools from all capabilities', () => {
      const loaded = capabilityRegistry.loadPersona('full-assistant')

      expect(loaded.tools.length).toBeGreaterThan(0)
      const toolNames = loaded.tools.map(t => t.name)
      expect(toolNames).toContain('searchBlogContent')
    })

    it('deduplicates tools across capabilities', () => {
      const loaded = capabilityRegistry.loadPersona('code-reviewer')

      const toolNames = loaded.tools.map(t => t.name)
      const uniqueToolNames = new Set(toolNames)
      expect(uniqueToolNames.size).toBe(toolNames.length)
    })
  })
})

describe('Capabilities API', () => {
  describe('GET /api/capabilities (list)', () => {
    it('returns all capabilities', () => {
      const capabilities = capabilityRegistry.getAllCapabilities()

      expect(capabilities.length).toBeGreaterThanOrEqual(4)

      const slugs = capabilities.map(c => c.slug)
      expect(slugs).toContain('blog-assistant')
      expect(slugs).toContain('code-helper')
      expect(slugs).toContain('creative-writer')
      expect(slugs).toContain('general-assistant')
    })

    it('returns capabilities with required properties', () => {
      const capabilities = capabilityRegistry.getAllCapabilities()

      for (const capability of capabilities) {
        expect(capability.slug).toBeTruthy()
        expect(capability.name).toBeTruthy()
        expect(capability.description).toBeTruthy()
        expect(Array.isArray(capability.tools)).toBe(true)
        expect(typeof capability.priority).toBe('number')
        expect(typeof capability.isBuiltIn).toBe('boolean')
      }
    })

    it('has unique slugs for all capabilities', () => {
      const capabilities = capabilityRegistry.getAllCapabilities()
      const slugs = capabilities.map(c => c.slug)
      const uniqueSlugs = new Set(slugs)

      expect(uniqueSlugs.size).toBe(slugs.length)
    })

    it('all capabilities have non-empty tool lists', () => {
      const capabilities = capabilityRegistry.getAllCapabilities()

      for (const capability of capabilities) {
        expect(capability.tools.length).toBeGreaterThan(0)
      }
    })
  })

  describe('GET /api/capabilities/[slug] (detail)', () => {
    it('returns 404 for non-existent capability', () => {
      const capability = capabilityRegistry.getCapability('non-existent-capability')

      expect(capability).toBeUndefined()
    })

    it('returns capability details for blog-assistant', () => {
      const capability = capabilityRegistry.getCapability('blog-assistant')

      expect(capability).toBeDefined()
      expect(capability?.slug).toBe('blog-assistant')
      expect(capability?.name).toBe('Blog Assistant')
      expect(capability?.description).toBeTruthy()
      expect(capability?.systemPromptSegment).toBeTruthy()
      expect(Array.isArray(capability?.tools)).toBe(true)
      expect(capability?.tools.length).toBeGreaterThan(0)
      expect(capability?.isBuiltIn).toBe(true)
      expect(typeof capability?.priority).toBe('number')
    })

    it('returns capability details for code-helper', () => {
      const capability = capabilityRegistry.getCapability('code-helper')

      expect(capability).toBeDefined()
      expect(capability?.slug).toBe('code-helper')
      expect(capability?.name).toBe('Code Helper')
      expect(capability?.tools).toContain('searchBlogContent')
      expect(capability?.isBuiltIn).toBe(true)
    })

    it('capability has system prompt segment', () => {
      const capability = capabilityRegistry.getCapability('creative-writer')

      expect(capability).toBeDefined()
      expect(capability?.systemPromptSegment).toBeTruthy()
      expect(capability?.systemPromptSegment.length).toBeGreaterThan(50)
    })

    it('capability priority is positive integer', () => {
      const capabilities = capabilityRegistry.getAllCapabilities()

      for (const capability of capabilities) {
        expect(capability.priority).toBeGreaterThan(0)
        expect(Number.isInteger(capability.priority)).toBe(true)
      }
    })

    it('all capabilities have unique priorities', () => {
      const capabilities = capabilityRegistry.getAllCapabilities()
      const priorities = capabilities.map(c => c.priority)
      const uniquePriorities = new Set(priorities)

      expect(uniquePriorities.size).toBe(priorities.length)
    })
  })

  describe('Capability-Persona Relationships', () => {
    it('all persona capability slugs reference existing capabilities', () => {
      const personas = capabilityRegistry.getAllPersonas()
      const capabilities = capabilityRegistry.getAllCapabilities()
      const capabilityMap = new Map(capabilities.map(c => [c.slug, c]))

      for (const persona of personas) {
        for (const capSlug of persona.capabilitySlugs) {
          expect(capabilityMap.has(capSlug)).toBe(true)
        }
      }
    })

    it('full-assistant has all capabilities', () => {
      const fullAssistant = capabilityRegistry.getPersona('full-assistant')
      const allCapabilities = capabilityRegistry.getAllCapabilities()

      expect(fullAssistant).toBeDefined()
      expect(fullAssistant?.capabilitySlugs.length).toBe(allCapabilities.length)

      const capSlugs = allCapabilities.map(c => c.slug)
      for (const slug of capSlugs) {
        expect(fullAssistant?.capabilitySlugs).toContain(slug)
      }
    })

    it('capabilities are properly loaded from persona', () => {
      const loaded = capabilityRegistry.loadPersona('blog-guide')

      for (const capability of loaded.capabilities) {
        expect(capability.slug).toBeTruthy()
        expect(loaded.persona.capabilitySlugs).toContain(capability.slug)
      }
    })
  })
})
