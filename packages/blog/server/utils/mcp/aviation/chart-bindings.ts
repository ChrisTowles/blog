/**
 * Resolves `$rows.*` placeholders in an LLM-emitted chart_option: the model can't
 * know row values at emit time, so it names columns and these are substituted once
 * the SQL runs. Three shapes — `"$rows.col"`, `{ $rows: { key: col } }` and
 * `{ $rows: [colA, colB] }`. Unknown columns resolve to null, so charts blank out.
 */

import { z } from 'zod';
import type { JsonObject, JsonValue } from '../../../../shared/json-types';

export type Row = JsonObject;

const columnNameSchema = z.string();

const jsonObjectSchema = z.record(z.string(), z.json());

function cell(row: Row, template: JsonValue): JsonValue {
  const column = columnNameSchema.safeParse(template);

  return column.success ? (row[column.data] ?? null) : template;
}

function resolveString(template: string, rows: readonly Row[]): JsonValue[] | string {
  const match = /^\$rows\.(.+)$/.exec(template);

  if (!match) return template;
  const col = match[1]!;

  return rows.map((r) => r[col] ?? null);
}

function resolveObject(obj: JsonObject, rows: readonly Row[]): JsonValue | undefined {
  if (!Object.hasOwn(obj, '$rows')) return undefined;
  const spec = obj.$rows;

  if (Array.isArray(spec)) {
    // [colA, colB] → rows.map(r => [r.colA, r.colB])
    return rows.map((r) => spec.map((c) => cell(r, c)));
  }

  const tmpl = jsonObjectSchema.safeParse(spec);

  if (tmpl.success) {
    // { name: colA, value: colB } → rows.map(r => ({ name: r.colA, value: r.colB }))
    // Non-string leaves (numbers, objects, arrays) pass through as literals;
    // string leaves are treated as column names and resolve to null when the
    // column is missing (same contract as the string-array path).
    const entries = Object.entries(tmpl.data);

    return rows.map((r) => Object.fromEntries(entries.map(([k, v]) => [k, cell(r, v)])));
  }

  return undefined;
}

export function resolveChartOption(option: JsonValue, rows: readonly Row[]): JsonValue {
  if (option === null) return option;
  const str = columnNameSchema.safeParse(option);

  if (str.success) return resolveString(str.data, rows);

  if (Array.isArray(option)) return option.map((v) => resolveChartOption(v, rows));
  const obj = jsonObjectSchema.safeParse(option);

  if (obj.success) {
    const resolvedRows = resolveObject(obj.data, rows);

    if (resolvedRows !== undefined) return resolvedRows;

    return Object.fromEntries(
      Object.entries(obj.data).map(([k, v]) => [k, resolveChartOption(v, rows)]),
    );
  }

  return option;
}

export function resolveChartOptionObject(option: JsonObject, rows: readonly Row[]): JsonObject {
  return Object.fromEntries(
    Object.entries(option).map(([k, v]) => [k, resolveChartOption(v, rows)]),
  );
}
