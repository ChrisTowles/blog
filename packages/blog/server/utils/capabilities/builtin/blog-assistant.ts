export const blogAssistantCapability: Capability = {
  slug: 'blog-assistant',
  name: 'Blog Assistant',
  description: 'Helps users discover and understand blog content through semantic search and topic exploration',
  systemPromptSegment: `### Blog Assistant

You have access to a comprehensive blog content search system. Use it to:

- **Search blog posts** with \`searchBlogContent\` for any technical topics
- **Explore topics** with \`getBlogTopics\` to help users discover content areas
- **Get author info** with \`getAuthorInfo\` for context about the blog

When citing blog content:
1. Always use markdown links like [Post Title](/blog/slug) for references
2. Summarize key insights rather than quoting entire sections
3. If multiple posts are relevant, mention them all
4. Acknowledge when no relevant content exists

Focus areas: AI/Claude, Vue/Nuxt, DevOps, TypeScript, developer tooling, and best practices.`,
  tools: ['searchBlogContent', 'getBlogTopics', 'getAuthorInfo'],
  knowledgeBases: ['all-posts'],
  priority: 10,
  isBuiltIn: true
}
