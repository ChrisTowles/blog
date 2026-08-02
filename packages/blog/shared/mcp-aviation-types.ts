/**
 * The contract between the MCP aviation server and its iframe client — a change here
 * has to land on both sides at once.
 */

export interface AviationToolResult {
  /** May be wrapped in a LIMIT 10000 guard. */
  sql: string;
  answer: string;
  hero_number?: string;
  /** Passed to `chart.setOption` verbatim. */
  chart_option: Record<string, unknown>;
  followups: [string, string, string];
  rows: Array<Record<string, unknown>>;
  /** True if the LIMIT cap was reached. */
  truncated: boolean;
}

/**
 * Returned by `ask_aviation` immediately so the host can mount the iframe against a
 * loading state; the iframe then POSTs `{ question }` to `queryUrl` and streams the
 * real `AviationToolResult` over SSE.
 */
export interface AviationPendingResult {
  pending: true;
  question: string;
  queryUrl: string;
}

/** Pending on a fresh tool call, resolved on a persisted replay the iframe renders inert. */
export type AviationStructuredContent = AviationPendingResult | AviationToolResult;

/** One per `data: <json>` line; the stream ends after a single result or error. */
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
