import { describe, it, expect, vi } from 'vitest';
import { reviewStorySafety, BLOCKLIST } from './story-safety';

// Mock the Anthropic client — only the AI stage, blocklist is pure logic
vi.mock('../ai/anthropic', () => ({
  getAnthropicClient: () => ({
    messages: {
      create: vi.fn().mockResolvedValue({
        content: [{ type: 'text', text: '{ "safe": true, "reason": "Appropriate content" }' }],
      }),
    },
  }),
}));

describe('reviewStorySafety', () => {
  describe('blocklist scan', () => {
    it('catches every blocklist word', async () => {
      for (const word of BLOCKLIST) {
        const result = await reviewStorySafety(`The ${word} appeared.`);
        expect(result.safe, `"${word}" should be blocked`).toBe(false);
        expect(result.reason).toContain(word);
      }
    });

    it('is case-insensitive', async () => {
      const result = await reviewStorySafety('The MONSTER appeared!');
      expect(result.safe).toBe(false);
      expect(result.reason).toContain('monster');
    });

    it('does not false-positive on words containing blocklist substrings', async () => {
      // "father" contains "fat", "hello" contains "hell", "shell" contains "hell"
      const safeStories = [
        'Her father smiled warmly.',
        'Hello there, good morning!',
        'The shell was on the beach.',
      ];
      for (const story of safeStories) {
        const result = await reviewStorySafety(story);
        expect(result.safe, `"${story}" should be safe`).toBe(true);
      }
    });
  });

  describe('AI review (mocked)', () => {
    it('returns safe for clean content when AI approves', async () => {
      const result = await reviewStorySafety('The cat sat on the mat and smiled.');
      expect(result.safe).toBe(true);
    });
  });
});
