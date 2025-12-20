defineRouteMeta({
  openAPI: {
    description: 'List all available capabilities',
    tags: ['capabilities']
  }
})

export default defineEventHandler(async () => {
  const capabilities = capabilityRegistry.getAllCapabilities()

  return capabilities.map(capability => ({
    slug: capability.slug,
    name: capability.name,
    description: capability.description,
    tools: capability.tools,
    isBuiltIn: capability.isBuiltIn,
    priority: capability.priority
  }))
})
