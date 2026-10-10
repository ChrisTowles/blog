/**
 * Client for the aviation DuckDB container (`services/aviation`); a Worker cannot host DuckDB.
 * SQL addresses data as `aviation://…`, which the container maps onto its own environment's
 * R2 bucket, so prompts and the allowlist are identical in staging and production.
 */

import { z } from 'zod';
import { useEvent } from 'nitropack/runtime';
import type { JsonObject, JsonValue } from '../../../../shared/json-types';

export const AVIATION_BUCKET_URL_PREFIX = 'aviation://';

export const DEFAULT_QUERY_TIMEOUT_MS = 30_000;

/** One named instance serves all traffic; DuckDB handles concurrent connections itself. */
export const AVIATION_INSTANCE_NAME = 'primary';

/** A stopped container needs this long to boot and open its port before the first query. */
export const COLD_START_GRACE_MS = 20_000;

const CONTAINER_ORIGIN = 'http://container';

export interface AviationFetcher {
  fetch(input: string, init?: RequestInit): Promise<Response>;
}

export interface AviationNamespace {
  getByName(name: string): AviationFetcher;
}

export interface AviationRows {
  columns: string[];
  rows: JsonObject[];
}

export interface AviationParse {
  statementCount: number;
  tableNames: string[];
}

export interface AviationClient {
  query(sql: string, timeoutMs?: number): Promise<AviationRows>;
  parse(sql: string): Promise<AviationParse>;
  health(): Promise<void>;
}

export class AviationQueryError extends Error {
  readonly status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = 'AviationQueryError';
    this.status = status;
  }
}

const rowsSchema = z.object({
  columns: z.array(z.string()),
  rows: z.array(z.record(z.string(), z.json())),
});

const parseSchema = z.object({
  statementCount: z.number().int(),
  tableNames: z.array(z.string()),
});

const errorSchema = z.object({ error: z.string() });

async function failure(res: Response): Promise<AviationQueryError> {
  const text = await res.text();
  const body = errorSchema.safeParse(parseJsonOrNull(text));

  return new AviationQueryError(body.success ? body.data.error : text.slice(0, 200), res.status);
}

function parseJsonOrNull(text: string): JsonValue {
  try {
    return z.json().parse(JSON.parse(text));
  } catch {
    return null;
  }
}

export function createAviationClient(fetcher: AviationFetcher): AviationClient {
  async function post(path: string, body: JsonObject, budgetMs: number): Promise<Response> {
    return fetcher.fetch(`${CONTAINER_ORIGIN}${path}`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(budgetMs),
    });
  }

  return {
    async query(sql, timeoutMs = DEFAULT_QUERY_TIMEOUT_MS) {
      const res = await post('/query', { sql, timeoutMs }, timeoutMs + COLD_START_GRACE_MS);

      if (!res.ok) throw await failure(res);

      return rowsSchema.parse(await res.json());
    },

    async parse(sql) {
      const res = await post('/parse', { sql }, DEFAULT_QUERY_TIMEOUT_MS + COLD_START_GRACE_MS);

      if (!res.ok) throw await failure(res);

      return parseSchema.parse(await res.json());
    },

    async health() {
      const res = await fetcher.fetch(`${CONTAINER_ORIGIN}/health`, {
        signal: AbortSignal.timeout(COLD_START_GRACE_MS),
      });

      if (!res.ok) throw await failure(res);

      await res.body?.cancel();
    },
  };
}

/** The client for the current request, bound to the `AVIATION` container namespace. */
export function getAviationClient(): AviationClient {
  const namespace: AviationNamespace | undefined = useEvent().context.cloudflare?.env?.AVIATION;

  if (!namespace) {
    throw new Error('aviation: the AVIATION container binding is missing from this environment');
  }

  return createAviationClient(namespace.getByName(AVIATION_INSTANCE_NAME));
}

/** Boots the container if it is asleep so the first real question skips the cold start. */
export async function warmAviationContainer(): Promise<void> {
  await getAviationClient().health();
}
