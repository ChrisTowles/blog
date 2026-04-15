/**
 * ask_aviation / list_questions / schema — the three aviation MCP tools.
 *
 * ask_aviation flow:
 *   1. Validate input (Zod, <500 chars).
 *   2. Call Anthropic via getAnthropicClient() with a schema-scoped system prompt,
 *      using tool_use "structured output" — i.e. we declare a single `emit_answer`
 *      tool whose input_schema is AVIATION_STRUCTURED_OUTPUT_SCHEMA, then the model
 *      must call that tool.
 *   3. Run sql-safety.validateSql on the emitted SQL.
 *   4. Execute under a hard 5s timeout. Count rows; set truncated if the cap hit.
 *   5. Return CallToolResult with text answer + EmbeddedResource(ui://aviation-answer)
 *      and structuredContent = AviationToolResult.
 *
 * Progress notifications (per plan line 149 — deferred, resolved here):
 *   We send notifications/progress at: LLM call start ("planning"),
 *   SQL execution start ("querying"), complete ("done"). Each is emitted via the
 *   SDK's `sendNotification` from RequestHandlerExtra when available.
 */

import { z } from 'zod';
import { log } from 'evlog';
import type {
  CallToolResult,
  EmbeddedResource,
  TextContent,
} from '@modelcontextprotocol/sdk/types.js';
import { getAnthropicClient } from '../../ai/anthropic';
import { MODEL_SONNET } from '../../../../shared/models';
import {
  AVIATION_TOOL_NAMES,
  AVIATION_UI_RESOURCE_URI,
  type AviationToolResult,
} from '../../../../shared/mcp-aviation-types';
import {
  AVIATION_SCHEMA_BLOCK,
  AVIATION_STARTER_QUESTIONS,
  AVIATION_STRUCTURED_OUTPUT_SCHEMA,
  buildAviationSystemPrompt,
} from './aviation-prompt';
import { openAviationConnection, runWithTimeout, DEFAULT_QUERY_TIMEOUT_MS } from './duckdb';
import { validateSql } from './sql-safety';
import { readAviationBundle } from './ui-resource';

const LIMIT_ROW_CAP = 10_000;

export const askAviationInputSchema = {
  question: z.string().min(1, 'question is required').max(500, 'question must be <= 500 chars'),
};

export interface AskAviationArgs {
  question: string;
}

/** Structured payload emitted by the model via the `emit_answer` tool_use. */
interface LlmStructuredOutput {
  sql: string;
  answer: string;
  hero_number?: string;
  chart_option: Record<string, unknown>;
  followups: [string, string, string];
}

// ---------------- ask_aviation ----------------

export async function executeAskAviation(
  args: AskAviationArgs,
  onProgress?: (step: string) => void,
): Promise<CallToolResult & { structuredContent: AviationToolResult }> {
  onProgress?.('planning');

  const llmOutput = await callAnthropicForStructuredOutput(args.question);
  onProgress?.('validating');

  const validation = await validateSql(llmOutput.sql);
  if (!validation.ok) {
    return toolErrorResult(
      `I wasn't able to produce a safe query for that question: ${validation.error}. ` +
        `Try rephrasing, e.g. "which US operators fly the most Boeing aircraft?"`,
    );
  }
  const sqlToRun = validation.sql;

  onProgress?.('querying');
  let rows: Array<Record<string, unknown>>;
  try {
    rows = await runSelect(sqlToRun);
  } catch (e) {
    log.error({
      tag: 'mcp-aviation',
      message: `SQL execution failed`,
      error: describe(e),
      sql: sqlToRun,
    });
    return toolErrorResult(
      `The query failed to execute: ${describe(e)}. Try rephrasing or narrowing the question.`,
    );
  }

  onProgress?.('done');

  const truncated = validation.limitInjected && rows.length >= LIMIT_ROW_CAP;
  const structured: AviationToolResult = {
    sql: sqlToRun,
    answer: llmOutput.answer,
    hero_number: llmOutput.hero_number,
    chart_option: llmOutput.chart_option,
    followups: llmOutput.followups,
    rows,
    truncated,
  };

  // Per Unit 4: the EmbeddedResource carries the same immutable iframe bundle
  // that `resources/read` returns. The structuredContent is what the iframe
  // renders — delivered to the App via `sendToolResult` at runtime, not
  // templated into HTML.
  const html = readAviationBundle();

  const textContent: TextContent = { type: 'text', text: llmOutput.answer };
  const uiContent: EmbeddedResource = {
    type: 'resource',
    resource: {
      uri: AVIATION_UI_RESOURCE_URI,
      mimeType: 'text/html;profile=mcp-app',
      text: html,
    },
  };

  return {
    content: [textContent, uiContent],
    structuredContent: structured as unknown as Record<string, unknown>,
  } as CallToolResult & { structuredContent: AviationToolResult };
}

async function callAnthropicForStructuredOutput(question: string): Promise<LlmStructuredOutput> {
  const client = getAnthropicClient();
  const response = await client.messages.create({
    model: MODEL_SONNET,
    max_tokens: 4096,
    system: buildAviationSystemPrompt(),
    tools: [
      {
        name: 'emit_answer',
        description: 'Emit the final structured answer for the aviation question.',
        input_schema: AVIATION_STRUCTURED_OUTPUT_SCHEMA as unknown as {
          type: 'object';
          properties?: Record<string, unknown>;
        },
      },
    ],
    tool_choice: { type: 'tool', name: 'emit_answer' },
    messages: [{ role: 'user', content: question }],
  });

  const block = response.content.find((b) => b.type === 'tool_use');
  if (!block || block.type !== 'tool_use' || block.name !== 'emit_answer') {
    throw new Error('LLM did not emit a structured answer');
  }
  const input = block.input as Partial<LlmStructuredOutput>;
  if (
    typeof input.sql !== 'string' ||
    typeof input.answer !== 'string' ||
    !input.chart_option ||
    !Array.isArray(input.followups) ||
    input.followups.length !== 3
  ) {
    throw new Error('LLM structured output failed shape check');
  }
  return {
    sql: input.sql,
    answer: input.answer,
    hero_number: input.hero_number,
    chart_option: input.chart_option,
    followups: input.followups as [string, string, string],
  };
}

async function runSelect(sql: string): Promise<Array<Record<string, unknown>>> {
  const conn = await openAviationConnection();
  try {
    const reader = await runWithTimeout(
      conn,
      (c) => c.runAndReadAll(sql),
      DEFAULT_QUERY_TIMEOUT_MS,
    );
    return reader.getRowObjectsJson() as Array<Record<string, unknown>>;
  } finally {
    conn.closeSync();
  }
}

function toolErrorResult(message: string): CallToolResult & {
  structuredContent: AviationToolResult;
} {
  const empty: AviationToolResult = {
    sql: '',
    answer: message,
    chart_option: { title: { text: 'No data' } },
    followups: [
      'Which US operators fly the most aircraft?',
      'What were the busiest US routes last year?',
      'Which Boeing 737 operators have the oldest fleets?',
    ],
    rows: [],
    truncated: false,
  };
  return {
    isError: true,
    content: [{ type: 'text', text: message }],
    structuredContent: empty as unknown as Record<string, unknown>,
  } as CallToolResult & { structuredContent: AviationToolResult };
}

function describe(e: unknown): string {
  if (e instanceof Error) return e.message;
  return String(e);
}

// ---------------- list_questions ----------------

export function executeListQuestions(): CallToolResult {
  const lines = AVIATION_STARTER_QUESTIONS.map((q, i) => `${i + 1}. ${q}`).join('\n');
  return {
    content: [{ type: 'text', text: lines }],
    structuredContent: { questions: AVIATION_STARTER_QUESTIONS },
  };
}

// ---------------- schema ----------------

export function executeSchemaTool(): CallToolResult {
  return {
    content: [{ type: 'text', text: AVIATION_SCHEMA_BLOCK }],
    structuredContent: {
      bucket: 'gs://blog-mcp-aviation-staging',
      schema_markdown: AVIATION_SCHEMA_BLOCK,
    },
  };
}

// ---------------- registry ----------------

export const AVIATION_TOOL_DESCRIPTIONS = {
  [AVIATION_TOOL_NAMES.ASK]:
    'Answer a natural-language question about US commercial aviation (FAA fleet registry + BTS T-100 + OpenFlights). Returns a text answer plus an interactive ECharts visualization as a ui:// resource.',
  [AVIATION_TOOL_NAMES.LIST_QUESTIONS]:
    'Return the curated starter questions suited to the dataset. Use when a client wants to surface example prompts.',
  [AVIATION_TOOL_NAMES.SCHEMA]:
    'Return the aviation dataset schema (tables, columns, semantic notes). Useful for an LLM that wants to introspect the data before asking a question.',
} as const;
