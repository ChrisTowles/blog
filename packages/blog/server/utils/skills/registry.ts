import type Anthropic from '@anthropic-ai/sdk'
import type { Skill, Persona, KnowledgeBase, LoadedPersona, KnowledgeBaseFilter } from './types'
import { getToolsByNames } from '../ai/tools'
import { builtInSkills } from './builtin'
import { defaultPersonas } from './personas'
import { defaultKnowledgeBases } from './knowledge-bases'

/**
 * Skills Registry - manages skill definitions and loading
 */
class SkillRegistry {
  private skills = new Map<string, Skill>()
  private personas = new Map<string, Persona>()
  private knowledgeBases = new Map<string, KnowledgeBase>()

  constructor() {
    // Register built-in skills
    builtInSkills.forEach(skill => this.registerSkill(skill))

    // Register default personas
    defaultPersonas.forEach(persona => this.registerPersona(persona))

    // Register default knowledge bases
    defaultKnowledgeBases.forEach(kb => this.registerKnowledgeBase(kb))
  }

  // === Skills ===

  registerSkill(skill: Skill): void {
    this.skills.set(skill.slug, skill)
  }

  getSkill(slug: string): Skill | undefined {
    return this.skills.get(slug)
  }

  getAllSkills(): Skill[] {
    return Array.from(this.skills.values())
  }

  getSkillsBySlug(slugs: string[]): Skill[] {
    return slugs
      .map(slug => this.skills.get(slug))
      .filter((s): s is Skill => s !== undefined)
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
   * Load a persona with all its skills, tools, and system prompt
   */
  loadPersona(personaSlug?: string): LoadedPersona {
    // Get persona (default if not specified)
    const persona = personaSlug
      ? this.getPersona(personaSlug)
      : this.getDefaultPersona()

    if (!persona) {
      throw new Error(`Persona not found: ${personaSlug || 'default'}`)
    }

    // Load skills for this persona
    const skills = this.getSkillsBySlug(persona.skillSlugs)

    // Collect all tool names from skills
    const toolNames = new Set<string>()
    skills.forEach((skill) => {
      skill.tools.forEach(name => toolNames.add(name))
    })

    // Get tool definitions
    const tools = getToolsByNames(Array.from(toolNames))

    // Build combined system prompt
    const systemPrompt = this.buildSystemPrompt(persona, skills)

    // Collect knowledge base filters
    const knowledgeBaseFilters: KnowledgeBaseFilter[] = []
    skills.forEach((skill) => {
      skill.knowledgeBases?.forEach((kbSlug) => {
        const kb = this.getKnowledgeBase(kbSlug)
        if (kb) {
          knowledgeBaseFilters.push(kb.filter)
        }
      })
    })

    return {
      persona,
      skills,
      tools,
      systemPrompt,
      knowledgeBaseFilters
    }
  }

  /**
   * Build system prompt from persona and skills
   */
  buildSystemPrompt(persona: Persona, skills: Skill[]): string {
    const parts: string[] = []

    // Persona intro
    parts.push(persona.baseSystemPrompt)
    parts.push('')

    // Skills sections (sorted by priority)
    if (skills.length > 0) {
      parts.push('## Your Capabilities')
      parts.push('')

      skills.forEach((skill) => {
        parts.push(skill.systemPromptSegment)
        parts.push('')
      })
    }

    return parts.join('\n').trim()
  }

  /**
   * Get tools for a set of skills
   */
  getToolsForSkills(skillSlugs: string[]): Anthropic.Tool[] {
    const skills = this.getSkillsBySlug(skillSlugs)
    const toolNames = new Set<string>()

    skills.forEach((skill) => {
      skill.tools.forEach(name => toolNames.add(name))
    })

    return getToolsByNames(Array.from(toolNames))
  }
}

// Singleton registry instance
export const skillRegistry = new SkillRegistry()

// Export class for testing
export { SkillRegistry }
