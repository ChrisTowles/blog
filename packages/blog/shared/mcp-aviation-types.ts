/**
 * Shared types for the MCP Aviation tool contract.
 *
 * IMPORTANT: This file is the contract between the MCP server (Unit 3) and the iframe
 * client (Unit 4). Any change here needs to be mirrored in both places.
 */

/**
 * The final answer payload for an aviation question.
 * The iframe reads this to render the hero, chart, SQL, and follow-up chips.
 */
export interface AviationToolResult {
  /** Validated, executed SQL (may be wrapped in a LIMIT 10000 guard). */
  sql: string;
  /** 1-2 sentence plain-English answer. */
  answer: string;
  /** Optional big-number headline, e.g. "4.2M". */
  hero_number?: string;
  /** Full ECharts option object; iframe calls chart.setOption(chart_option). */
  chart_option: Record<string, unknown>;
  /** Exactly 3 follow-up question strings. */
  followups: [string, string, string];
  /** Raw result rows; the iframe may render a table view. */
  rows: Array<Record<string, unknown>>;
  /** True if the LIMIT cap was reached. */
  truncated: boolean;
}

/**
 * The "pending" shape the `ask_aviation` tool returns immediately so the iframe
 * can mount and show a loading state before the slow pipeline (Anthropic call +
 * DuckDB query) has finished. The iframe POSTs `{ question }` to `queryUrl` and
 * streams progress + the final `AviationToolResult` via Server-Sent Events.
 *
 * This is what makes progressive loading work in Claude Desktop / Claude.ai:
 * the MCP tool response is near-instant, so the host can mount the iframe
 * right away, and the iframe itself drives the slow work visibly.
 */
export interface AviationPendingResult {
  pending: true;
  question: string;
  /** Absolute URL of the `/mcp/aviation/query` SSE endpoint. */
  queryUrl: string;
}

/**
 * Union the iframe sees in `structuredContent`:
 *   - Fresh tool calls → `AviationPendingResult` (iframe fetches result via SSE)
 *   - Persisted replays → `AviationToolResult` (iframe renders directly, inert)
 */
export type AviationStructuredContent = AviationPendingResult | AviationToolResult;

/**
 * SSE event the query endpoint streams while a request is in flight.
 *
 * Each line on the wire is `data: <json>\n\n` where `<json>` is one of these.
 * The stream ends after a single `result` (success) or `error` (failure) event.
 */
export type AviationQueryEvent =
  | { type: 'progress'; step: AviationProgressStep }
  | { type: 'result'; result: AviationToolResult }
  | { type: 'error'; message: string };

export type AviationProgressStep = 'planning' | 'validating' | 'querying' | 'rendering';

/** Human-friendly labels for each progress step, rendered inside the iframe. */
export const AVIATION_PROGRESS_LABELS: Record<AviationProgressStep, string> = {
  planning: 'Planning query…',
  validating: 'Validating SQL…',
  querying: 'Running query against DuckDB…',
  rendering: 'Rendering chart…',
};

/** URI for the aviation UI resource. */
export const AVIATION_UI_RESOURCE_URI = 'ui://aviation-answer';

/** Tool names. */
export const AVIATION_TOOL_NAMES = {
  ASK: 'ask_aviation',
  LIST_QUESTIONS: 'list_questions',
  SCHEMA: 'schema',
} as const;
