/**
 * Canned AviationToolResult payloads for tests and the Playwright harness.
 * Shapes are modeled off the starter questions in aviation-prompt.ts; the actual
 * values are plausible-but-fake (nothing here claims to reflect real BTS data).
 */

export interface AviationToolResultFixture {
  sql: string;
  answer: string;
  hero_number?: string;
  chart_option: Record<string, unknown>;
  followups: [string, string, string];
  rows: Array<Record<string, unknown>>;
  truncated: boolean;
}

export const BAR_FIXTURE: AviationToolResultFixture = {
  sql: "SELECT manufacturer_name, COUNT(*) FROM read_parquet('gs://blog-mcp-aviation-prod/dims/aircraft.parquet') GROUP BY 1 ORDER BY 2 DESC LIMIT 5",
  answer: 'Cessna leads the US FAA registry by aircraft count, followed by Piper and Beech.',
  hero_number: '218,421',
  chart_option: {
    title: { text: 'Top manufacturers in the FAA Registry' },
    tooltip: {},
    xAxis: {
      type: 'category',
      data: ['CESSNA', 'PIPER', 'BEECH', 'BOEING', 'AIRBUS'],
    },
    yAxis: { type: 'value' },
    series: [{ type: 'bar', data: [218421, 95120, 48220, 7550, 2134] }],
  },
  followups: [
    'Which US operators have the oldest Boeing 737 fleets?',
    'How many Cessna aircraft are registered to Part 135 operators?',
    'What was the busiest US domestic route in 2025 by passengers?',
  ],
  rows: [
    { manufacturer_name: 'CESSNA', count: 218421 },
    { manufacturer_name: 'PIPER', count: 95120 },
    { manufacturer_name: 'BEECH', count: 48220 },
    { manufacturer_name: 'BOEING', count: 7550 },
    { manufacturer_name: 'AIRBUS', count: 2134 },
  ],
  truncated: false,
};

export const TABLE_FIXTURE: AviationToolResultFixture = {
  sql: "SELECT n_number, manufacturer_name, model_name FROM read_parquet('gs://.../dims/aircraft.parquet') LIMIT 3",
  answer: 'Three sample airframes from the FAA Registry.',
  chart_option: { __table: true },
  followups: ['a', 'b', 'c'],
  rows: [
    { n_number: 'N12345', manufacturer_name: 'CESSNA', model_name: '172' },
    { n_number: 'N67890', manufacturer_name: 'PIPER', model_name: 'PA-28' },
    { n_number: 'N54321', manufacturer_name: 'BEECH', model_name: 'A36' },
  ],
  truncated: false,
};

export const EMPTY_FIXTURE: AviationToolResultFixture = {
  sql: 'SELECT 1 WHERE FALSE',
  answer: 'No matching rows in the current dataset.',
  chart_option: { __table: true },
  followups: ['a', 'b', 'c'],
  rows: [],
  truncated: false,
};

export const TRUNCATED_FIXTURE: AviationToolResultFixture = {
  ...BAR_FIXTURE,
  truncated: true,
  answer: 'Top manufacturers (truncated).',
};

export const BROKEN_CHART_FIXTURE: AviationToolResultFixture = {
  ...BAR_FIXTURE,
  // Intentionally invalid: series is not an array.
  chart_option: { title: { text: 'broken' }, series: 'not-an-array' },
};
