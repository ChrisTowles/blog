import type Anthropic from '@anthropic-ai/sdk'

/**
 * Capability definition - a package of procedural knowledge
 */
export interface Capability {
  slug: string
  name: string
  description: string
  systemPromptSegment: string // procedural knowledge for Claude
  tools: string[] // tool names from tools.ts
  knowledgeBases?: string[] // optional KB slugs for RAG filtering
  priority: number // ordering in system prompt
  isBuiltIn: boolean
}

/**
 * Theme configuration for chatbot UI
 */
export interface ChatbotTheme {
  primaryColor: string // Nuxt UI color name: 'blue', 'purple', 'green', etc.
  accentColor?: string // optional accent color
  icon: string // Lucide icon name
}

/**
 * Persona definition - a combination of capabilities with a unified identity
 */
export interface Persona {
  slug: string
  name: string
  description: string
  icon: string
  baseSystemPrompt: string
  capabilitySlugs: string[]
  isDefault: boolean
  isBuiltIn: boolean
  theme?: ChatbotTheme // optional theme for chatbot UI
}

/**
 * Knowledge base filter criteria for RAG
 */
export interface KnowledgeBaseFilter {
  slugPatterns?: string[]
  titlePatterns?: string[]
  excludePatterns?: string[]
}

/**
 * Knowledge base definition
 */
export interface KnowledgeBase {
  slug: string
  name: string
  description: string
  filter: KnowledgeBaseFilter
  isBuiltIn: boolean
}

/**
 * Result of loading a persona with all its capabilities
 */
export interface LoadedPersona {
  persona: Persona
  capabilities: Capability[]
  tools: Anthropic.Tool[]
  systemPrompt: string
  knowledgeBaseFilters: KnowledgeBaseFilter[]
}
