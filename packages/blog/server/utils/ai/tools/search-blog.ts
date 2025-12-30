import { tool } from '@anthropic-ai/claude-agent-sdk'
import { z } from 'zod'
import { retrieveRAG } from '../../rag/retrieve'
import { toolResult } from './helpers'

/**
 * Search blog content using RAG
 */
export const searchBlogContent = tool(
    'searchBlogContent',
    'Search blog posts for relevant information. Use this when users ask about topics that might be covered in the blog, such as AI/Claude, Vue/Nuxt, DevOps, best practices, or any technical topic. Returns relevant excerpts with source URLs.',
    {
        query: z.string().describe('The search query to find relevant blog content')
    },
    async (args) => {
        const results = await retrieveRAG(args.query, { topK: 5 })
        return toolResult({
            results: results.map(r => ({
                content: r.content,
                source: r.documentTitle,
                url: r.documentUrl
            })),
            hint: 'When referencing these results, use markdown links like [Title](url) to cite sources.'
        })
    }
)
