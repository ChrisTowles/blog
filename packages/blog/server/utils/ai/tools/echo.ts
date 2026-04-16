import { tool } from '@anthropic-ai/claude-agent-sdk';
import { z } from 'zod';
import { toolResult } from './helpers';

/**
 * Echo tool — minimal MCP UI test surface.
 * Echoes a message back with a timestamp. Used to verify the MCP UI resource
 * pipeline (iframe rendering, AppBridge, structured content) is working.
 */
export const echoTest = tool(
  'echoTest',
  'Echo a message back with a timestamp. Use this when the user wants to test the MCP echo tool or verify the MCP UI pipeline is working.',
  {
    message: z.string().min(1).max(500).describe('The message to echo back'),
  },
  async (args) => {
    return toolResult({
      message: args.message,
      timestamp: new Date().toISOString(),
    });
  },
);
