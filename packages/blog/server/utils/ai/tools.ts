import { tool } from 'ai'
import { z } from 'zod'

/**
 * Get current date/time - useful for time-aware responses
 */
export const getCurrentDateTime = tool({
  description: 'Get the current date and time. Use when user asks about today, current time, or needs temporal context.',
  inputSchema: z.object({}),
  execute: async () => {
    const now = new Date()
    return {
      date: now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
      time: now.toLocaleTimeString('en-US'),
      iso: now.toISOString(),
      timestamp: now.getTime()
    }
  }
})

/**
 * Get information about the blog author
 */
export const getAuthorInfo = tool({
  description: 'Get information about Chris Towles, the blog author. Use when users ask about the author, his background, or expertise.',
  inputSchema: z.object({}),
  execute: async () => {
    return {
      name: 'Chris Towles',
      role: 'Software Engineer',
      topics: ['Vue', 'Nuxt', 'TypeScript', 'AI/ML', 'DevOps', 'Cloud Infrastructure'],
      blogUrl: 'https://emmer.dev',
      github: 'https://github.com/christowles'
    }
  }
})

/**
 * List available blog topics
 */
export const getBlogTopics = tool({
  description: 'Get a list of topics covered on the blog. Use to help users discover content areas.',
  inputSchema: z.object({}),
  execute: async () => {
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
})

/**
 * All available tools
 */
export const chatTools = {
  getCurrentDateTime,
  getAuthorInfo,
  getBlogTopics
}

export type ChatTools = typeof chatTools
