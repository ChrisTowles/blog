/**
 * Compile-time mirror of the server's `list_questions` tool output.
 *
 * Per plan line 563 (product-lens): avoid a page-load round-trip just to
 * render the pill grid. The authoritative list lives in
 * `packages/blog/server/utils/mcp/aviation/aviation-prompt.ts` — keep this
 * mirror in sync by hand when the server list changes.
 */

export const AVIATION_STARTER_QUESTIONS: readonly string[] = [
  'Which operators have the oldest Boeing 737 fleets?',
  'How are US-registered aircraft distributed by number of engines?',
  'What were the 10 busiest US routes by passenger count in 2025?',
  'Which US carrier flew the most total passenger miles in 2025?',
  'Which countries have the most airports in the OpenFlights dataset?',
  'Which aircraft models have the highest average seat count in the US fleet?',
  'How has the share of Airbus vs Boeing in the US fleet changed over time?',
  'Which airports see the most distinct airline carriers?',
  'Which operators fly the most diverse fleet (count of distinct model names)?',
  'What fraction of US-registered airliners are still in status V (valid)?',
] as const;
