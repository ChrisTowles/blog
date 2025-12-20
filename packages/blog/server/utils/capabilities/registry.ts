import type Anthropic from '@anthropic-ai/sdk'
import type { Capability, Persona, KnowledgeBase, LoadedPersona, KnowledgeBaseFilter } from './types'
import { getToolsByNames } from '../ai/tools'
import { builtInCapabilities } from './builtin'
import { defaultPersonas } from './personas'
import { defaultKnowledgeBases } from './knowledge-bases'

/**
 * Capability Registry - manages capability definitions and loading
 */
class CapabilityRegistry {
  private capabilities = new Map<string, Capability>()
  private personas = new Map<string, Persona>()
  private knowledgeBases = new Map<string, KnowledgeBase>()

  constructor() {
    // Register built-in capabilities
    builtInCapabilities.forEach(capability => this.registerCapability(capability))

    // Register default personas
    defaultPersonas.forEach(persona => this.registerPersona(persona))

    // Register default knowledge bases
    defaultKnowledgeBases.forEach(kb => this.registerKnowledgeBase(kb))
  }

  // === Capabilities ===

  registerCapability(capability: Capability): void {
    this.capabilities.set(capability.slug, capability)
  }

  getCapability(slug: string): Capability | undefined {
    return this.capabilities.get(slug)
  }

  getAllCapabilities(): Capability[] {
    return Array.from(this.capabilities.values())
  }

  getCapabilitiesBySlug(slugs: string[]): Capability[] {
    return slugs
      .map((slug) => {
        const capability = this.capabilities.get(slug)
        if (!capability) {
          console.warn(`[registry] Capability "${slug}" not found. Check persona configuration.`)
        }
        return capability
      })
      .filter((s): s is Capability => s !== undefined)
      .sort((a, b) => a.priority - b.priority)
  }

  // === Personas ===

  registerPersona(persona: Persona): void {
    this.personas.set(persona.slug, persona)
  }

  getPersona(slug: string): Persona | undefined {
    return this.personas.get(slug)
  }

  getDefaultPersona(): Persona | undefined {
    return Array.from(this.personas.values()).find(p => p.isDefault)
  }

  getAllPersonas(): Persona[] {
    return Array.from(this.personas.values())
  }

  // === Knowledge Bases ===

  registerKnowledgeBase(kb: KnowledgeBase): void {
    this.knowledgeBases.set(kb.slug, kb)
  }

  getKnowledgeBase(slug: string): KnowledgeBase | undefined {
    return this.knowledgeBases.get(slug)
  }

  getAllKnowledgeBases(): KnowledgeBase[] {
    return Array.from(this.knowledgeBases.values())
  }

  // === Loading ===

  /**
   * Load a persona with all its capabilities, tools, and system prompt
   */
  loadPersona(personaSlug?: string): LoadedPersona {
    // Get persona (default if not specified)
    const persona = personaSlug
      ? this.getPersona(personaSlug)
      : this.getDefaultPersona()

    if (!persona) {
      throw new Error(`Persona not found: ${personaSlug || 'default'}`)
    }

    // Load capabilities for this persona
    const capabilities = this.getCapabilitiesBySlug(persona.capabilitySlugs)

    // Collect all tool names from capabilities
    const toolNames = new Set<string>()
    capabilities.forEach((capability) => {
      capability.tools.forEach(name => toolNames.add(name))
    })

    // Get tool definitions
    const tools = getToolsByNames(Array.from(toolNames))

    // Build combined system prompt
    const systemPrompt = this.buildSystemPrompt(persona, capabilities)

    // Collect knowledge base filters
    const knowledgeBaseFilters: KnowledgeBaseFilter[] = []
    capabilities.forEach((capability) => {
      capability.knowledgeBases?.forEach((kbSlug) => {
        const kb = this.getKnowledgeBase(kbSlug)
        if (kb) {
          knowledgeBaseFilters.push(kb.filter)
        } else {
          console.warn(`[registry] Knowledge base "${kbSlug}" not found for capability "${capability.slug}"`)
        }
      })
    })

    return {
      persona,
      capabilities,
      tools,
      systemPrompt,
      knowledgeBaseFilters
    }
  }

  /**
   * Build system prompt from persona and capabilities
   */
  buildSystemPrompt(persona: Persona, capabilities: Capability[]): string {
    const parts: string[] = []

    // Persona intro
    parts.push(persona.baseSystemPrompt)
    parts.push('')

    // Capabilities sections (sorted by priority)
    if (capabilities.length > 0) {
      parts.push('## Your Capabilities')
      parts.push('')

      capabilities.forEach((capability) => {
        parts.push(capability.systemPromptSegment)
        parts.push('')
      })
    }

    return parts.join('\n').trim()
  }

  /**
   * Get tools for a set of capabilities
   */
  getToolsForCapabilities(capabilitySlugs: string[]): Anthropic.Tool[] {
    const capabilities = this.getCapabilitiesBySlug(capabilitySlugs)
    const toolNames = new Set<string>()

    capabilities.forEach((capability) => {
      capability.tools.forEach(name => toolNames.add(name))
    })

    return getToolsByNames(Array.from(toolNames))
  }
}

// Singleton registry instance
export const capabilityRegistry = new CapabilityRegistry()

// Export class for testing
export { CapabilityRegistry }
