/**
 * Shared types for the MCP Aviation tool contract.
 *
 * IMPORTANT: This file is the contract between the MCP server (Unit 3) and the iframe
 * client (Unit 4). Any change here needs to be mirrored in both places.
 */

/**
 * The structuredContent payload returned by ask_aviation.
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

/** URI for the aviation UI resource. */
export const AVIATION_UI_RESOURCE_URI = 'ui://aviation-answer';

/** Tool names. */
export const AVIATION_TOOL_NAMES = {
  ASK: 'ask_aviation',
  LIST_QUESTIONS: 'list_questions',
  SCHEMA: 'schema',
} as const;
