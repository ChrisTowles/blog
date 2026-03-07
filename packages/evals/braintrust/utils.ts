/**
 * Shared utilities for Braintrust evals
 */
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

let _cachedPrompt: string | null = null;

/**
 * Load the chatbot system prompt from the prompts directory.
 * Caches the result to avoid repeated file reads across eval cases.
 */
export function loadSystemPrompt(): string {
  if (_cachedPrompt) return _cachedPrompt;
  const promptPath = resolve(
    dirname(fileURLToPath(import.meta.url)),
    '../prompts/chatbot-system.txt',
  );
  _cachedPrompt = readFileSync(promptPath, 'utf-8');
  return _cachedPrompt;
}
