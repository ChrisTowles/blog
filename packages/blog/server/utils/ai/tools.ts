import type Anthropic from '@anthropic-ai/sdk'
import { retrieveRAG } from '../rag/retrieve'

/**
 * Tool definitions for Anthropic SDK
 */
export const chatTools: Anthropic.Tool[] = [
  {
    name: 'searchBlogContent',
    description: 'Search blog posts for relevant information. Use this when users ask about topics that might be covered in the blog, such as AI/Claude, Vue/Nuxt, DevOps, best practices, or any technical topic. Returns relevant excerpts with source URLs.',
    input_schema: {
      type: 'object' as const,
      properties: {
        query: {
          type: 'string',
          description: 'The search query to find relevant blog content'
        }
      },
      required: ['query']
    }
  },
  {
    name: 'getCurrentDateTime',
    description: 'Get the current date and time. Use when user asks about today, current time, or needs temporal context.',
    input_schema: {
      type: 'object' as const,
      properties: {},
      required: []
    }
  },
  {
    name: 'getAuthorInfo',
    description: 'Get information about Chris Towles, the blog author. Use when users ask about the author, his background, or expertise.',
    input_schema: {
      type: 'object' as const,
      properties: {},
      required: []
    }
  },
  {
    name: 'getBlogTopics',
    description: 'Get a list of topics covered on the blog. Use to help users discover content areas.',
    input_schema: {
      type: 'object' as const,
      properties: {},
      required: []
    }
  }
]

/**
 * Execute a tool by name
 * Some tools are async (like searchBlogContent)
 */
export async function executeTool(name: string, args?: Record<string, unknown>): Promise<unknown> {
  switch (name) {
    case 'searchBlogContent': {
      const query = args?.query as string
      if (!query) {
        return { error: 'Query is required' }
      }
      const results = await retrieveRAG(query, { topK: 5 })
      return {
        results: results.map(r => ({
          content: r.content,
          source: r.documentTitle,
          url: r.documentUrl // e.g., "/blog/tips-for-claude-code"
        })),
        hint: 'When referencing these results, use markdown links like [Title](url) to cite sources.'
      }
    }
    case 'getCurrentDateTime': {
      const now = new Date()
      return {
        date: now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
        time: now.toLocaleTimeString('en-US'),
        iso: now.toISOString(),
        timestamp: now.getTime()
      }
    }
    case 'getAuthorInfo': {
      return {
        name: 'Chris Towles',
        role: 'Software Engineer',
        topics: ['Vue', 'Nuxt', 'TypeScript', 'AI/ML', 'DevOps', 'Cloud Infrastructure'],
        blogUrl: 'https://emmer.dev',
        github: 'https://github.com/christowles'
      }
    }
    case 'getBlogTopics': {
      return {
        topics: [
          { name: 'AI & Machine Learning', keywords: ['Claude', 'Anthropic', 'AI SDK', 'Ollama', 'ComfyUI', 'context engineering'] },
          { name: 'Vue & Nuxt', keywords: ['Vue 3', 'Nuxt', 'Vite', 'Vitest', 'composition API'] },
          { name: 'DevOps & Infrastructure', keywords: ['Terraform', 'GCP', 'AWS', 'Docker', 'CI/CD'] },
          { name: 'Developer Tools', keywords: ['VS Code', 'Git', 'pnpm', 'conventional commits', 'dotfiles'] },
          { name: 'Best Practices', keywords: ['testing', 'TypeScript', 'code review', 'ITIL'] }
        ],
        blogPath: '/blog'
      }
    }
    default:
      throw new Error(`Unknown tool: ${name}`)
  }
}
