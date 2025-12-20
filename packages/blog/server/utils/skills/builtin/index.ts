import type { Skill } from '../types'
import { blogAssistantSkill } from './blog-assistant'
import { codeHelperSkill } from './code-helper'
import { creativeWriterSkill } from './creative-writer'
import { generalAssistantSkill } from './general-assistant'

export { blogAssistantSkill } from './blog-assistant'
export { codeHelperSkill } from './code-helper'
export { creativeWriterSkill } from './creative-writer'
export { generalAssistantSkill } from './general-assistant'

/**
 * All built-in skills
 */
export const builtInSkills: Skill[] = [
  blogAssistantSkill,
  codeHelperSkill,
  creativeWriterSkill,
  generalAssistantSkill
]
