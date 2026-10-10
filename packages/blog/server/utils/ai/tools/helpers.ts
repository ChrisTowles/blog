/**
 * Helper utilities for Agent SDK tools
 */

import type { ToolPayload } from '../tool-payload';

/**
 * Standard tool result format
 * Wraps data in the expected Agent SDK content structure
 */
export function toolResult(data: ToolPayload) {
  return {
    content: [
      {
        type: 'text' as const,
        text: JSON.stringify(data, null, 2),
      },
    ],
  };
}

/**
 * Error result format for tools
 */
export function toolError(message: string) {
  return {
    content: [
      {
        type: 'text' as const,
        text: JSON.stringify({ error: message }),
      },
    ],
    isError: true,
  };
}
