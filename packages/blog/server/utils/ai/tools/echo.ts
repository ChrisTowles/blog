import { tool } from '@anthropic-ai/claude-agent-sdk';
import { z } from 'zod';
import { pickDadJoke } from '~~/shared/dad-jokes';
import { toolResult } from './helpers';

export const echoTest = tool(
  'echoTest',
  'Returns a random bad dad joke with a timestamp. Use this when the user wants a dad joke, groan-worthy humor, or to test the MCP echo UI pipeline.',
  {
    message: z.string().min(1).max(500).describe('Any prompt string — contents are ignored.'),
  },
  async () => {
    return toolResult({
      message: pickDadJoke(),
      timestamp: new Date().toISOString(),
    });
  },
);
