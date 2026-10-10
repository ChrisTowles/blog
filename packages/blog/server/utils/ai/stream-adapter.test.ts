/**
 * Unit tests for Agent SDK to SSE stream adapter
 */
import { describe, it, expect } from 'vitest';
import type { SSEEvent } from '~~/shared/chat-types';
import { adaptAgentToSSE, sendSSE, type AgentMessage } from './stream-adapter';

describe('stream-adapter', () => {
  describe('adaptAgentToSSE', () => {
    it('should yield text events from assistant messages', async () => {
      const messages: AgentMessage[] = [
        {
          type: 'assistant',
          uuid: 'test-uuid',
          session_id: 'test-session',
          message: {
            content: [{ type: 'text', text: 'Hello world' }],
            stop_reason: 'end_turn',
          },
        },
      ];

      const events = [];

      for await (const event of adaptAgentToSSE(asyncIterator(messages))) {
        events.push(event);
      }

      expect(events).toContainEqual({ type: 'text', text: 'Hello world' });
      expect(events[events.length - 1]).toEqual({ type: 'done', messageId: expect.any(String) });
    });

    it('should yield reasoning events from thinking blocks', async () => {
      const messages: AgentMessage[] = [
        {
          type: 'assistant',
          uuid: 'test-uuid',
          session_id: 'test-session',
          message: {
            content: [{ type: 'thinking', thinking: 'Let me think...' }],
            stop_reason: 'end_turn',
          },
        },
      ];

      const events = [];

      for await (const event of adaptAgentToSSE(asyncIterator(messages))) {
        events.push(event);
      }

      expect(events).toContainEqual({ type: 'reasoning', text: 'Let me think...' });
    });

    it('should yield tool_start events from tool_use blocks', async () => {
      const messages: AgentMessage[] = [
        {
          type: 'assistant',
          uuid: 'test-uuid',
          session_id: 'test-session',
          message: {
            content: [
              {
                type: 'tool_use',
                id: 'tool-123',
                name: 'searchBlogContent',
                input: { query: 'test query' },
              },
            ],
            stop_reason: 'tool_use',
          },
        },
      ];

      const events = [];

      for await (const event of adaptAgentToSSE(asyncIterator(messages))) {
        events.push(event);
      }

      expect(events).toContainEqual({
        type: 'tool_start',
        tool: 'searchBlogContent',
        toolCallId: 'tool-123',
        args: { query: 'test query' },
      });
    });

    it('should yield error events from failed results', async () => {
      const messages: AgentMessage[] = [
        {
          type: 'result',
          subtype: 'error_during_execution',
          session_id: 'test-session',
          is_error: true,
          result: 'Something went wrong',
          total_cost_usd: 0.01,
          num_turns: 1,
        },
      ];

      const events = [];

      for await (const event of adaptAgentToSSE(asyncIterator(messages))) {
        events.push(event);
      }

      expect(events).toContainEqual({ type: 'error', error: 'Something went wrong' });
    });

    it('should handle streaming text deltas', async () => {
      const messages: AgentMessage[] = [
        {
          type: 'stream_event',
          event: {
            type: 'content_block_delta',
            delta: { type: 'text_delta', text: 'Hello ' },
          },
        },
        {
          type: 'stream_event',
          event: {
            type: 'content_block_delta',
            delta: { type: 'text_delta', text: 'world!' },
          },
        },
      ];

      const events = [];

      for await (const event of adaptAgentToSSE(asyncIterator(messages))) {
        events.push(event);
      }

      expect(events).toContainEqual({ type: 'text', text: 'Hello ' });
      expect(events).toContainEqual({ type: 'text', text: 'world!' });
    });

    it('should handle streaming thinking deltas', async () => {
      const messages: AgentMessage[] = [
        {
          type: 'stream_event',
          event: {
            type: 'content_block_delta',
            delta: { type: 'thinking_delta', thinking: 'Processing...' },
          },
        },
      ];

      const events = [];

      for await (const event of adaptAgentToSSE(asyncIterator(messages))) {
        events.push(event);
      }

      expect(events).toContainEqual({ type: 'reasoning', text: 'Processing...' });
    });

    it('should accumulate tool input JSON and emit on block stop', async () => {
      const messages: AgentMessage[] = [
        {
          type: 'stream_event',
          event: {
            type: 'content_block_start',
            content_block: { type: 'tool_use', id: 'tool-456', name: 'getWeather' },
          },
        },
        {
          type: 'stream_event',
          event: {
            type: 'content_block_delta',
            delta: { type: 'input_json_delta', partial_json: '{"location":' },
          },
        },
        {
          type: 'stream_event',
          event: {
            type: 'content_block_delta',
            delta: { type: 'input_json_delta', partial_json: '"London"}' },
          },
        },
        {
          type: 'stream_event',
          event: { type: 'content_block_stop' },
        },
      ];

      const events = [];

      for await (const event of adaptAgentToSSE(asyncIterator(messages))) {
        events.push(event);
      }

      expect(events).toContainEqual({
        type: 'tool_start',
        tool: 'getWeather',
        toolCallId: 'tool-456',
        args: { location: 'London' },
      });
    });

    it('should call onComplete callback with accumulated text', async () => {
      const messages: AgentMessage[] = [
        {
          type: 'assistant',
          uuid: 'test-uuid',
          session_id: 'test-session',
          message: {
            content: [
              { type: 'thinking', thinking: 'Thinking...' },
              { type: 'text', text: 'Response text' },
            ],
            stop_reason: 'end_turn',
          },
        },
      ];

      let completionResult: { text: string; reasoning: string } | null = null;
      const events = [];

      for await (const event of adaptAgentToSSE(asyncIterator(messages), {
        onComplete: (result) => {
          completionResult = result;
        },
      })) {
        events.push(event);
      }

      expect(completionResult).toEqual({
        text: 'Response text',
        reasoning: 'Thinking...',
      });
    });

    it('should ignore system messages', async () => {
      const messages: AgentMessage[] = [
        {
          type: 'system',
          subtype: 'init',
          session_id: 'test-session',
          tools: ['Read', 'Write'],
          model: 'sonnet',
        },
      ];

      const events = [];

      for await (const event of adaptAgentToSSE(asyncIterator(messages))) {
        events.push(event);
      }

      // Should only have the done event
      expect(events.length).toBe(1);
      expect(events[0]!.type).toBe('done');
    });
  });

  describe('sendSSE', () => {
    it('should encode SSE event correctly', async () => {
      const encoded = await encodeSSE({ type: 'text', text: 'Hello' });

      expect(encoded).toBe('data: {"type":"text","text":"Hello"}\n\n');
    });

    it('should handle complex SSE events', async () => {
      const encoded = await encodeSSE({
        type: 'tool_start',
        tool: 'searchBlogContent',
        toolCallId: 'abc-123',
        args: { query: 'test' },
      });

      expect(encoded).toContain('"type":"tool_start"');
      expect(encoded).toContain('"tool":"searchBlogContent"');
      expect(encoded).toContain('"toolCallId":"abc-123"');
    });
  });
});

// Helper to create async iterator from array
async function* asyncIterator<T>(items: T[]): AsyncIterable<T> {
  for (const item of items) {
    yield item;
  }
}

async function encodeSSE(event: SSEEvent): Promise<string> {
  const stream = new ReadableStream<Uint8Array>({
    start(controller) {
      sendSSE(controller, event);
      controller.close();
    },
  });

  return new Response(stream).text();
}
