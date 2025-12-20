import type { Capability } from '../types'
import { blogAssistantCapability } from './_blog-assistant'
import { codeHelperCapability } from './_code-helper'
import { creativeWriterCapability } from './_creative-writer'
import { generalAssistantCapability } from './_general-assistant'

export { blogAssistantCapability } from './_blog-assistant'
export { codeHelperCapability } from './_code-helper'
export { creativeWriterCapability } from './_creative-writer'
export { generalAssistantCapability } from './_general-assistant'

/**
 * All built-in capabilities
 */
export const builtInCapabilities: Capability[] = [
  blogAssistantCapability,
  codeHelperCapability,
  creativeWriterCapability,
  generalAssistantCapability
]
