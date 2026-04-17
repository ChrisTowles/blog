/**
 * Resolve `$rows.*` placeholders inside a chart_option returned by the LLM.
 *
 * The LLM can't know actual SQL row values at emit time, so it leaves chart
 * data arrays as placeholders referring to column names. We substitute in the
 * real values after the SQL executes.
 *
 * Supported placeholder shapes (anywhere inside chart_option):
 *
 *   1. String — simple array of values from one column:
 *        "data": "$rows.avg_age_years"
 *      → rows.map(r => r.avg_age_years)
 *
 *   2. Object { $rows: {...tmpl} } — array of objects (pie, bar with labels):
 *        "data": { "$rows": { "name": "operator_name", "value": "fleet_size" } }
 *      → rows.map(r => ({ name: r.operator_name, value: r.fleet_size }))
 *
 *   3. Object { $rows: [colA, colB] } — array of pairs (scatter, heatmap):
 *        "data": { "$rows": ["year", "passengers"] }
 *      → rows.map(r => [r.year, r.passengers])
 *
 * String values referencing unknown columns resolve to null entries; the chart
 * will render blanks rather than crash. Walks arrays and objects recursively.
 */

export type Row = Record<string, unknown>;

function resolveString(template: string, rows: readonly Row[]): unknown[] | string {
  const match = /^\$rows\.(.+)$/.exec(template);
  if (!match) return template;
  const col = match[1]!;
  return rows.map((r) => r[col] ?? null);
}

function resolveObject(obj: Record<string, unknown>, rows: readonly Row[]): unknown {
  if (!Object.hasOwn(obj, '$rows')) return undefined;
  const spec = obj.$rows;
  if (Array.isArray(spec)) {
    // [colA, colB] → rows.map(r => [r.colA, r.colB])
    return rows.map((r) => spec.map((c) => (typeof c === 'string' ? (r[c] ?? null) : c)));
  }
  if (spec && typeof spec === 'object') {
    // { name: colA, value: colB } → rows.map(r => ({ name: r.colA, value: r.colB }))
    // Non-string leaves (numbers, objects, arrays) pass through as literals;
    // string leaves are treated as column names and resolve to null when the
    // column is missing (same contract as the string-array path).
    const tmpl = spec as Record<string, unknown>;
    return rows.map((r) => {
      const out: Record<string, unknown> = {};
      for (const [k, v] of Object.entries(tmpl)) {
        out[k] = typeof v === 'string' ? (r[v] ?? null) : v;
      }
      return out;
    });
  }
  return undefined;
}

export function resolveChartOption(option: unknown, rows: readonly Row[]): unknown {
  if (option == null) return option;
  if (typeof option === 'string') return resolveString(option, rows);
  if (Array.isArray(option)) return option.map((v) => resolveChartOption(v, rows));
  if (typeof option === 'object') {
    const obj = option as Record<string, unknown>;
    const resolvedRows = resolveObject(obj, rows);
    if (resolvedRows !== undefined) return resolvedRows;
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(obj)) out[k] = resolveChartOption(v, rows);
    return out;
  }
  return option;
}
