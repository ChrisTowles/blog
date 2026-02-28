import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { SYSTEM_PROMPT } from '../../packages/blog/server/utils/ai/agent';
import { TITLE_GENERATION_PROMPT } from '../../packages/blog/server/utils/ai/chat-prompts';
import { ARTIFACTS_SYSTEM_PROMPT } from '../../packages/blog/server/utils/ai/artifacts-prompts';
import { LOAN_INTAKE_SYSTEM_PROMPT } from '../../packages/blog/server/utils/ai/loan-system-prompt';

describe('prompt sync', () => {
  it('chatbot-system.txt matches agent.ts SYSTEM_PROMPT', () => {
    const fileContent = readFileSync(join(__dirname, 'prompts/chatbot-system.txt'), 'utf-8');
    expect(fileContent.trim()).toBe(SYSTEM_PROMPT.trim());
  });

  it('title-gen.txt matches TITLE_GENERATION_PROMPT', () => {
    const fileContent = readFileSync(join(__dirname, 'prompts/title-gen.txt'), 'utf-8');
    expect(fileContent.trim()).toBe(TITLE_GENERATION_PROMPT.trim());
  });

  it('artifacts.txt matches ARTIFACTS_SYSTEM_PROMPT', () => {
    const fileContent = readFileSync(join(__dirname, 'prompts/artifacts.txt'), 'utf-8');
    expect(fileContent.trim()).toBe(ARTIFACTS_SYSTEM_PROMPT.trim());
  });

  it('loan-intake.txt matches LOAN_INTAKE_SYSTEM_PROMPT', () => {
    const fileContent = readFileSync(join(__dirname, 'prompts/loan-intake.txt'), 'utf-8');
    expect(fileContent.trim()).toBe(LOAN_INTAKE_SYSTEM_PROMPT.trim());
  });
});
