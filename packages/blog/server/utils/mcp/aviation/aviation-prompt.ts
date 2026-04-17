/**
 * LLM prompt + structured-output schema for ask_aviation.
 *
 * Scoping strategy: the schema described in
 *   docs/plans/2026-04-14-001-aviation-schema.md
 * is re-expressed here as a compact, instruction-tuned block. We deliberately
 * inline *every* column the LLM is allowed to reference and *every* Parquet URL
 * prefix. The sql-safety layer is the final enforcer, but the prompt aims for
 * the first-try emission to be a valid query, so users don't hit the rephrase
 * path often.
 */

import { AVIATION_BUCKET_URL_PREFIX } from './duckdb';

// Trim trailing slash so callers can write `${BUCKET}/dims/...` consistently.
const BUCKET = AVIATION_BUCKET_URL_PREFIX.replace(/\/$/, '');

/**
 * Dataset schema surface — one block the LLM reads. Keep it short and denormalized;
 * the plan's schema doc is the source of truth, but the LLM doesn't need it all.
 */
export const AVIATION_SCHEMA_BLOCK = `
DATASET: US commercial aviation (FAA Aircraft Registry + BTS T-100 Market + OpenFlights).
ALL FILES ARE PARQUET IN GCS; READ VIA read_parquet('${BUCKET}/<path>').

DIMENSIONS
- ${BUCKET}/dims/aircraft.parquet  — one row per tail number
    n_number (VARCHAR), mfr_mdl_code (VARCHAR), year_manufactured (INT),
    registrant_name (VARCHAR, UPPER), registrant_city (VARCHAR),
    registrant_state (VARCHAR, 2-letter), registrant_country (VARCHAR),
    status_code (VARCHAR), manufacturer_name (VARCHAR), model_name (VARCHAR),
    number_of_seats (INT), number_of_engines (INT)
- ${BUCKET}/dims/aircraft_types.parquet  — one row per manufacturer/model
    mfr_mdl_code (VARCHAR), manufacturer_name, model_name, number_of_engines,
    number_of_seats, weight_class, cruise_speed_knots
- ${BUCKET}/dims/airports.parquet  — OpenFlights airports
    iata (VARCHAR, 3-letter), icao (VARCHAR, 4-letter), airport_name, city,
    country, latitude (DOUBLE), longitude (DOUBLE), altitude_ft,
    timezone_db (VARCHAR), kind (VARCHAR)
- ${BUCKET}/dims/airlines.parquet  — OpenFlights airlines
    iata (VARCHAR), icao (VARCHAR), airline_name, callsign, country,
    active (VARCHAR 'Y'/'N')
- ${BUCKET}/dims/routes.parquet  — OpenFlights routes (codeshare catalog)
    airline_iata, source_airport_iata, dest_airport_iata, codeshare, stops, equipment

FACTS
- ${BUCKET}/facts/bts_t100_<yyyymm>.parquet  — monthly segment operations
  USE GLOB: read_parquet('${BUCKET}/facts/bts_t100_*.parquet')
    passengers (BIGINT), freight_lbs (BIGINT), mail_lbs (BIGINT),
    distance_miles (INT), carrier_code (VARCHAR), carrier_name (VARCHAR),
    origin_iata, origin_city, origin_state, dest_iata, dest_city, dest_state,
    year (INT), month (INT), aircraft_type_code (INT), service_class (VARCHAR,
    'F' = scheduled pax/cargo, 'G' = non-scheduled)

REFERENCE
- ${BUCKET}/ref/carrier_to_operator.parquet  — bridges BTS carrier_code to FAA registrant
    bts_carrier_code, faa_registrant_name, display_name, notes

SEMANTIC NOTES
- passengers is a monthly enplaned total; use SUM for annual totals.
- distance_miles is great-circle, not actual flown miles.
- year_manufactured is aircraft model-year (aircraft age, not ownership length).
- manufacturer_name is freeform ('BOEING', 'AIRBUS'); use LIKE for family queries
  (e.g. model_name LIKE '737%' for the 737 family).
- Most questions should filter BTS to service_class = 'F'.
- BTS and FAA do not align by name; always LEFT JOIN carrier_to_operator.
- The only permitted table function is read_parquet against ${BUCKET}/*.
- SELECT-only. No ATTACH / INSTALL / LOAD / PRAGMA / SET / COPY / DDL / DML.

CHART DATA BINDING (CRITICAL — charts are empty without this)
You cannot know actual SQL row values at emit time. The server runs your SQL
and then substitutes placeholders in chart_option. You MUST use placeholders,
NOT empty arrays, anywhere chart data would appear.

Placeholder forms — pick the one that matches your chart type:

  1) Array of values from ONE column (bar data, line data, category axis):
       "data": "$rows.COLUMN_NAME"

  2) Array of objects from TWO columns (pie slices, bar with named labels):
       "data": { "$rows": { "name": "NAME_COLUMN", "value": "VALUE_COLUMN" } }

  3) Array of [x, y] pairs (scatter, heatmap):
       "data": { "$rows": ["X_COLUMN", "Y_COLUMN"] }

Examples — copy these patterns:

  // Horizontal bar: operator on yAxis, value on xAxis
  {
    "xAxis": { "type": "value" },
    "yAxis": { "type": "category", "data": "$rows.operator_name" },
    "series": [{ "type": "bar", "data": "$rows.avg_age_years" }]
  }

  // Line chart over years
  {
    "xAxis": { "type": "category", "data": "$rows.year" },
    "yAxis": { "type": "value" },
    "series": [{ "type": "line", "data": "$rows.total_passengers" }]
  }

  // Pie chart
  {
    "series": [{
      "type": "pie",
      "data": { "$rows": { "name": "manufacturer", "value": "share_pct" } }
    }]
  }

  // Scatter
  {
    "xAxis": { "type": "value", "name": "distance_miles" },
    "yAxis": { "type": "value", "name": "passengers" },
    "series": [{ "type": "scatter", "data": { "$rows": ["distance_miles", "passengers"] } }]
  }

NEVER emit empty "data": [] arrays — use a placeholder. NEVER hardcode values.
Your SQL's SELECT columns ARE the only legal column names in placeholders.

ALIAS RULES (CRITICAL — parser-sensitive)
- ALWAYS introduce table and subquery aliases with the keyword AS, e.g.
    FROM read_parquet('${BUCKET}/dims/aircraft.parquet') AS aircraft
  NEVER use bare aliases like \`... AS a\` dropped to \`... a\`. DuckDB will
  misparse certain bare aliases as clause keywords and fail.
- ALWAYS use descriptive alias names (aircraft, types, airports, airlines,
  routes, bts, carrier_map, fleet, stats, ranked). Avoid short 1-2 letter
  aliases.
- NEVER use any of these as an alias — they are DuckDB reserved keywords and
  will cause a parse error: at, as, from, select, where, group, order, by,
  having, join, on, using, limit, offset, with, union, intersect, except,
  case, when, then, else, end, and, or, not, in, is, null, true, false,
  between, like, ilike, similar, asc, desc, collate, cast, default, of, to,
  for, all, any, some, distinct, values, window, range, rows, natural, full,
  inner, outer, left, right, cross, lateral.
- Same rule for column aliases: use AS and avoid reserved words.
`.trim();

/**
 * The JSON schema the LLM must match for its structured output. Matches
 * AviationToolResult (shared/mcp-aviation-types.ts) minus server-computed fields
 * (rows, truncated).
 */
export const AVIATION_STRUCTURED_OUTPUT_SCHEMA = {
  type: 'object',
  required: ['sql', 'answer', 'chart_option', 'followups'],
  additionalProperties: false,
  properties: {
    sql: {
      type: 'string',
      description:
        'A single SELECT (or WITH ... SELECT) statement that answers the question. Must only reference read_parquet(...) against the aviation bucket. No DDL, no DML, no PRAGMA, no SET.',
    },
    answer: {
      type: 'string',
      description:
        'One to two plain-English sentences summarizing the answer for a non-technical reader. Mention the hero number if relevant.',
    },
    hero_number: {
      type: 'string',
      description:
        'Optional short headline metric (e.g. "4.2M passengers", "138 routes"). Omit if no single number anchors the story.',
    },
    chart_option: {
      type: 'object',
      description:
        'A full Apache ECharts option object. Iframe calls chart.setOption(chart_option) blindly. Use bar for categorical totals, line for time series, scatter for two-metric distributions, pie for small-share breakdowns, treemap for hierarchies. DO NOT use geo / map / lines — not supported at launch.',
      additionalProperties: true,
    },
    followups: {
      type: 'array',
      minItems: 3,
      maxItems: 3,
      items: { type: 'string' },
      description:
        'Exactly 3 short follow-up questions a curious reader might ask next. Same domain; phrased as questions, not commands.',
    },
  },
} as const;

/**
 * System prompt. Shape modeled on hustcc/mcp-echarts's LLM prompts — schema-first,
 * structured-output focused, with explicit instructions about which ECharts types to use.
 */
export function buildAviationSystemPrompt(): string {
  return `You are the aviation-analyst LLM backing a read-only MCP tool called ask_aviation.

For each user question you MUST emit a JSON object with:
  - sql: a single DuckDB SELECT/CTE statement against the dataset below
  - answer: one or two plain-English sentences
  - hero_number (optional): a short headline metric
  - chart_option: a complete ECharts option object (no geo/map/lines-on-geo)
  - followups: exactly three follow-up question strings

STRICT SQL RULES
${AVIATION_SCHEMA_BLOCK}

CHART SELECTION
- Bar chart (xAxis + yAxis + type:'bar'): categorical totals, rankings, "top N by X".
- Line chart (xAxis time/category + type:'line'): time series, trends.
- Scatter (type:'scatter'): two-metric relationships.
- Pie (series[0].type:'pie'): share-of-total when there are <= 8 categories.
- Treemap (series[0].type:'treemap'): nested categorical totals.
- When the result shape doesn't fit the above, return a chart_option that renders
  an empty chart and let the iframe fall back to a table.

FAIL-CLOSED: If you can't answer with the given schema, still emit the JSON:
  - sql: a safe query like SELECT 'insufficient data' AS note LIMIT 1
  - answer: explain the gap
  - chart_option: minimal valid option (e.g. { title: { text: 'No data' } })
  - followups: three related questions the dataset can answer.

Never emit prose outside the JSON. Never reference tables not in the schema block.
Never use INSERT/UPDATE/DELETE/CREATE/DROP/ATTACH/INSTALL/LOAD/PRAGMA/SET/COPY.

ALIAS EXAMPLES (follow exactly; bare aliases will break the parser)
  -- CORRECT
  FROM read_parquet('${BUCKET}/dims/aircraft.parquet') AS aircraft
  FROM read_parquet('${BUCKET}/dims/aircraft_types.parquet') AS types
  FROM read_parquet('${BUCKET}/facts/bts_t100_*.parquet') AS bts
  FROM read_parquet('${BUCKET}/ref/carrier_to_operator.parquet') AS carrier_map
  -- WRONG (will fail parse)
  FROM read_parquet('${BUCKET}/dims/aircraft.parquet') a
  FROM read_parquet('${BUCKET}/dims/aircraft_types.parquet') at
  FROM read_parquet('${BUCKET}/facts/bts_t100_*.parquet') t`;
}

/**
 * Starter-question catalog. 10 curated questions; each one produces a
 * schema-compatible SQL query against the dataset. Documented as the source of
 * truth for Unit 5's `list_questions` tool.
 *
 * Verified: each question can be answered via SELECT against
 *   - dims/aircraft.parquet
 *   - dims/aircraft_types.parquet
 *   - dims/airports.parquet
 *   - dims/airlines.parquet
 *   - facts/bts_t100_*.parquet
 *   - ref/carrier_to_operator.parquet
 * No geo/map charts — covered by bar/line/scatter/treemap/table.
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
];
