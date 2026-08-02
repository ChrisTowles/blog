/**
 * Resolves `$rows.*` placeholders in an LLM-emitted chart_option: the model can't
 * know row values at emit time, so it names columns and these are substituted once
 * the SQL runs. Three shapes — `"$rows.col"`, `{ $rows: { key: col } }` and
 * `{ $rows: [colA, colB] }`. Unknown columns resolve to null, so charts blank out.
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
