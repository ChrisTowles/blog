/**
 * Skill metadata from SKILL.md frontmatter
 */
export interface SkillMetadata {
  /** Unique skill identifier (lowercase, hyphens) */
  name: string
  /** Description of what skill does and when to trigger it */
  description: string
}

/**
 * A fully loaded skill with all resources
 */
export interface LoadedSkill {
  /** Parsed frontmatter metadata */
  metadata: SkillMetadata
  /** Markdown body (instructions after frontmatter) */
  body: string
  /** Bundled resources from scripts/, references/, assets/ */
  resources: Map<string, Buffer>
  /** Source path or identifier */
  source: string
}

/**
 * Skill stored in database
 */
export interface DbSkill {
  id: string
  slug: string
  name: string
  description: string
  content: string
  skillZip?: Buffer
  isBuiltIn: boolean
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}
