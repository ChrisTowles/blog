#!/usr/bin/env tsx
/**
 * CLI runner for Braintrust evaluations.
 *
 * Usage:
 *   tsx braintrust/run.ts                    # Run all evals
 *   tsx braintrust/run.ts --eval chatbot     # Run chatbot eval only
 *   tsx braintrust/run.ts --eval rag         # Run RAG eval only
 *
 * Requires:
 *   BRAINTRUST_API_KEY - Braintrust API key
 *   ANTHROPIC_API_KEY  - Anthropic API key (for chatbot eval)
 *   DATABASE_URL       - PostgreSQL connection (for RAG eval)
 */
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { config } from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load .env from repo root
config({
  path: resolve(__dirname, '../../../.env'),
});

// Validate required env vars
if (!process.env.BRAINTRUST_API_KEY) {
  console.error('BRAINTRUST_API_KEY not found in environment.');
  console.error('Set it in .env or export BRAINTRUST_API_KEY=...');
  process.exit(1);
}

// Parse CLI args
const args = process.argv.slice(2);
const evalFlagIndex = args.indexOf('--eval');
const evalName = evalFlagIndex !== -1 ? args[evalFlagIndex + 1] : undefined;

async function main() {
  const evals: string[] = [];

  if (!evalName || evalName === 'chatbot') {
    if (!process.env.ANTHROPIC_API_KEY) {
      console.error('ANTHROPIC_API_KEY required for chatbot eval. Skipping.');
    } else {
      console.log('Running chatbot eval...\n');
      const { runChatbotEval } = await import('./chatbot-eval.ts');
      await runChatbotEval();
      evals.push('chatbot');
    }
  }

  if (!evalName || evalName === 'rag') {
    if (!process.env.DATABASE_URL) {
      console.error('DATABASE_URL required for RAG eval. Skipping.');
    } else {
      console.log('Running RAG eval...\n');
      const { runRAGEval } = await import('./rag-eval.ts');
      await runRAGEval();
      evals.push('rag');
    }
  }

  if (evals.length === 0) {
    console.error('\nNo evals ran. Check environment variables.');
    process.exit(1);
  }

  console.log(`\nCompleted evals: ${evals.join(', ')}`);
  console.log('View results at https://www.braintrust.dev');
}

main().catch((err) => {
  console.error('Eval failed:', err);
  process.exit(1);
});
