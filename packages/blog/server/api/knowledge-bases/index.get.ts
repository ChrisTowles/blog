import { skillRegistry } from '../../utils/skills'

defineRouteMeta({
  openAPI: {
    description: 'List all available knowledge bases',
    tags: ['knowledge-bases']
  }
})

export default defineEventHandler(async () => {
  const knowledgeBases = skillRegistry.getAllKnowledgeBases()

  return knowledgeBases.map(kb => ({
    slug: kb.slug,
    name: kb.name,
    description: kb.description,
    isBuiltIn: kb.isBuiltIn
  }))
})
