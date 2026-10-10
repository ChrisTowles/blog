import type { getAnthropicClient } from '../../../../../blog/server/utils/ai/anthropic';

// Test seam — callers (and tests) may pass a stub client.
export type AnthropicLike = {
  messages: Pick<ReturnType<typeof getAnthropicClient>['messages'], 'create'>;
};
