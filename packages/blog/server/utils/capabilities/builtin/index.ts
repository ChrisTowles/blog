import type { Capability } from '../types'
import { blogAssistantCapability } from './blog-assistant'
import { codeHelperCapability } from './code-helper'
import { creativeWriterCapability } from './creative-writer'
import { generalAssistantCapability } from './general-assistant'

export { blogAssistantCapability } from './blog-assistant'
export { codeHelperCapability } from './code-helper'
export { creativeWriterCapability } from './creative-writer'
export { generalAssistantCapability } from './general-assistant'

/**
 * All built-in capabilities
 */
export const builtInCapabilities: Capability[] = [
  blogAssistantCapability,
  codeHelperCapability,
  creativeWriterCapability,
  generalAssistantCapability
]
