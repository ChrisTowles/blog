import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { SYSTEM_PROMPT } from '../blog/server/utils/ai/agent';
import { TITLE_GENERATION_PROMPT } from '../blog/server/utils/ai/chat-prompts';
import { ARTIFACTS_SYSTEM_PROMPT } from '../blog/server/utils/ai/artifacts-prompts';
import { LOAN_INTAKE_SYSTEM_PROMPT } from '../blog/server/utils/ai/loan-system-prompt';

const PROMPT_PAIRS = [
  { file: 'chatbot-system.txt', prompt: SYSTEM_PROMPT, label: 'agent.ts SYSTEM_PROMPT' },
  { file: 'title-gen.txt', prompt: TITLE_GENERATION_PROMPT, label: 'TITLE_GENERATION_PROMPT' },
  { file: 'artifacts.txt', prompt: ARTIFACTS_SYSTEM_PROMPT, label: 'ARTIFACTS_SYSTEM_PROMPT' },
  {
    file: 'loan-intake.txt',
    prompt: LOAN_INTAKE_SYSTEM_PROMPT,
    label: 'LOAN_INTAKE_SYSTEM_PROMPT',
  },
];

describe('prompt sync', () => {
  it.each(PROMPT_PAIRS)('$file matches $label', ({ file, prompt }) => {
    const fileContent = readFileSync(join(__dirname, 'prompts', file), 'utf-8');
    expect(fileContent.trim()).toBe(prompt.trim());
  });
});
