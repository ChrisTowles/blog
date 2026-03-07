/**
 * Shared utilities for Braintrust evals
 */
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Load the chatbot system prompt from the prompts directory.
 */
export function loadSystemPrompt(): string {
  const promptPath = resolve(__dirname, '../prompts/chatbot-system.txt');
  return readFileSync(promptPath, 'utf-8');
}
