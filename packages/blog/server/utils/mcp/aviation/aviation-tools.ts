/**
 * ask_aviation / list_questions / schema — the three aviation MCP tools.
 *
 * ask_aviation shape (split architecture, SEP-1865 iframe loading):
 *   - `executeAskAviation` returns FAST with `{ question, pending: true, queryUrl }`
 *     so Claude Desktop / Claude.ai / any compliant host can mount the iframe
 *     immediately. The embedded resource carries the iframe bundle.
 *   - The actual pipeline (Anthropic SQL emit → validate → DuckDB) lives in
 *     `runAviationPipeline`. The iframe POSTs the question to the streaming
 *     `/mcp/aviation/query` endpoint and receives progress + result over SSE.
 *
 * Progress steps emitted by `runAviationPipeline`:
 *   planning → validating → querying → rendering
 */

import { z } from 'zod';
import { log } from 'evlog';
import type { CallToolResult } from '@modelcontextprotocol/sdk/types.js';
import { getAnthropicClient } from '../../ai/anthropic';
import { MODEL_SONNET } from '../../../../shared/models';
import { extractErrorMessage } from '../../../../shared/error-util';
import {
  AVIATION_TOOL_NAMES,
  type AviationPendingResult,
  type AviationProgressStep,
  type AviationToolResult,
} from '../../../../shared/mcp-aviation-types';
import {
  AVIATION_SCHEMA_BLOCK,
  AVIATION_STARTER_QUESTIONS,
  AVIATION_STRUCTURED_OUTPUT_SCHEMA,
  buildAviationSystemPrompt,
} from './aviation-prompt';
import {
  AVIATION_BUCKET_URL_PREFIX,
  openAviationConnection,
  runWithTimeout,
  DEFAULT_QUERY_TIMEOUT_MS,
} from './duckdb';
import { resolveChartOption } from './chart-bindings';
import { validateSql } from './sql-safety';

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

// ---------------- ask_aviation (fast return) ----------------

/**
 * Returns a small pending pointer. Compliant MCP hosts (Claude Desktop,
 * Claude.ai, the blog chat harness) fetch `ui://aviation-answer` via
 * `resources/read` using the `_meta.ui.resourceUri` declared on the tool;
 * the iframe bundle and its CSP live on the registered resource itself
 * (see `registerAviationUiResource` in `./ui-resource.ts`). Inlining the
 * ~726 KB bundle here caused Claude.ai to truncate results mid-JSON.
 *
 * @param args - parsed tool arguments ({ question })
 * @param queryUrl - absolute URL of the /mcp/aviation/query SSE endpoint the
 *        iframe will POST to. The server resolves this from runtime config at
 *        tool-call time (different per deploy).
 */
export function executeAskAviation(
  args: AskAviationArgs,
  queryUrl: string,
): CallToolResult & { structuredContent: AviationPendingResult } {
  // The LLM sees this text. It MUST NOT sound like an incomplete or failed
  // call — otherwise hosts like Claude.ai's model layer read "pending" as
  // "retry or apologize" and mark the tool call as an error. The user is
  // already seeing the SQL, narrative, chart, and follow-ups streaming into
  // the iframe; the model just needs to know the answer has been delivered
  // out-of-band so it can move on.
  const llmSummary =
    `Rendered an interactive aviation answer for: "${args.question}". ` +
    `The SQL, narrative explanation, ECharts visualization, and follow-up ` +
    `suggestions are already visible to the user in the iframe — the model ` +
    `does not need to repeat or summarize them. Proceed with the conversation.`;

  const pending: AviationPendingResult = {
    pending: true,
    question: args.question,
    queryUrl,
  };

  return {
    content: [{ type: 'text', text: llmSummary }],
    structuredContent: pending as unknown as Record<string, unknown>,
  } as CallToolResult & { structuredContent: AviationPendingResult };
}

// ---------------- aviation pipeline (slow, runs in SSE endpoint) ----------------

/**
 * Runs the full aviation pipeline — Anthropic SQL emit → validate → DuckDB
 * execute → chart_option bind. Emits progress at each step via `onProgress`.
 *
 * Thrown errors are the caller's responsibility to surface to the SSE stream
 * as a user-visible message. Known-safe errors (bad SQL, timeout) are returned
 * as a resolved `AviationToolResult` with an error-shaped answer, matching the
 * previous tool-level error behavior.
 */
export async function runAviationPipeline(
  args: AskAviationArgs,
  onProgress?: (step: AviationProgressStep) => void,
): Promise<AviationToolResult> {
  onProgress?.('planning');
  const llmOutput = await callAnthropicForStructuredOutput(args.question);

  onProgress?.('validating');
  const validation = await validateSql(llmOutput.sql);
  if (!validation.ok) {
    return emptyAnswer(
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
    const errorMessage = extractErrorMessage(e);
    log.error({
      tag: 'mcp-aviation',
      message: `SQL execution failed`,
      error: errorMessage,
      sql: sqlToRun,
    });
    return emptyAnswer(
      `The query failed to execute: ${errorMessage}. Try rephrasing or narrowing the question.`,
    );
  }

  onProgress?.('rendering');
  const truncated = validation.limitInjected && rows.length >= LIMIT_ROW_CAP;
  const resolvedChartOption = resolveChartOption(llmOutput.chart_option, rows) as Record<
    string,
    unknown
  >;

  return {
    sql: sqlToRun,
    answer: llmOutput.answer,
    hero_number: llmOutput.hero_number,
    chart_option: resolvedChartOption,
    followups: llmOutput.followups,
    rows,
    truncated,
  };
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

function emptyAnswer(message: string): AviationToolResult {
  return {
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
      bucket: AVIATION_BUCKET_URL_PREFIX.replace(/\/$/, ''),
      schema_markdown: AVIATION_SCHEMA_BLOCK,
    },
  };
}

// ---------------- registry ----------------

export const AVIATION_TOOL_DESCRIPTIONS = {
  [AVIATION_TOOL_NAMES.ASK]:
    'Answer a natural-language question about US commercial aviation (FAA fleet registry + BTS T-100 + OpenFlights). Returns an interactive ECharts visualization as a ui:// resource; the iframe streams the answer + chart in-place so hosts can show progress while the query runs.',
  [AVIATION_TOOL_NAMES.LIST_QUESTIONS]:
    'Return the curated starter questions suited to the dataset. Use when a client wants to surface example prompts.',
  [AVIATION_TOOL_NAMES.SCHEMA]:
    'Return the aviation dataset schema (tables, columns, semantic notes). Useful for an LLM that wants to introspect the data before asking a question.',
} as const;
