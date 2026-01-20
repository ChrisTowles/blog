import { tool } from '@anthropic-ai/claude-agent-sdk';
import { toolResult } from './helpers';

/**
 * Get blog author information
 */
export const getAuthorInfo = tool(
  'getAuthorInfo',
  'Get information about Chris Towles, the blog author. Use when users ask about the author, his background, or expertise.',
  {},
  async () => {
    return toolResult({
      name: 'Chris Towles',
      role: 'Software Engineer',
      topics: ['Vue', 'Nuxt', 'TypeScript', 'AI/ML', 'DevOps', 'Cloud Infrastructure'],
      blogUrl: 'https://chris.towles.dev',
      github: 'https://github.com/christowles',
    });
  },
);
