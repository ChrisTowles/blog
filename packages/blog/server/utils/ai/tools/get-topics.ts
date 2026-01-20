import { tool } from '@anthropic-ai/claude-agent-sdk';
import { toolResult } from './helpers';

/**
 * Get list of blog topics
 */
export const getBlogTopics = tool(
  'getBlogTopics',
  'Get a list of topics covered on the blog. Use to help users discover content areas.',
  {},
  async () => {
    return toolResult({
      topics: [
        {
          name: 'AI & Machine Learning',
          keywords: ['Claude', 'Anthropic', 'AI SDK', 'Ollama', 'ComfyUI', 'context engineering'],
        },
        {
          name: 'Vue & Nuxt',
          keywords: ['Vue 3', 'Nuxt', 'Vite', 'Vitest', 'composition API'],
        },
        {
          name: 'DevOps & Infrastructure',
          keywords: ['Terraform', 'GCP', 'AWS', 'Docker', 'CI/CD'],
        },
        {
          name: 'Developer Tools',
          keywords: ['VS Code', 'Git', 'pnpm', 'conventional commits', 'dotfiles'],
        },
        {
          name: 'Best Practices',
          keywords: ['testing', 'TypeScript', 'code review', 'ITIL'],
        },
      ],
      blogPath: '/blog',
    });
  },
);
