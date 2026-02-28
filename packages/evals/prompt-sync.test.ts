import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { SYSTEM_PROMPT } from '../../packages/blog/server/utils/ai/agent';

describe('prompt sync', () => {
  it('chatbot-system.txt matches agent.ts SYSTEM_PROMPT', () => {
    const fileContent = readFileSync(join(__dirname, 'prompts/chatbot-system.txt'), 'utf-8');
    expect(fileContent.trim()).toBe(SYSTEM_PROMPT.trim());
  });
});
