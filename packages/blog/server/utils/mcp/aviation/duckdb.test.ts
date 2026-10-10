import { describe, expect, it } from 'vitest';
import {
  AviationQueryError,
  DEFAULT_QUERY_TIMEOUT_MS,
  createAviationClient,
  type AviationFetcher,
} from './duckdb';
import type { JsonObject } from '../../../../shared/json-types';

interface RecordedCall {
  url: string;
  method: string | undefined;
  body: BodyInit | null | undefined;
  signal: AbortSignal | null | undefined;
}

class FakeAviation implements AviationFetcher {
  readonly calls: RecordedCall[] = [];

  constructor(private readonly respond: (url: string) => Response) {}

  async fetch(input: string, init?: RequestInit): Promise<Response> {
    this.calls.push({
      url: input,
      method: init?.method,
      body: init?.body,
      signal: init?.signal,
    });

    return this.respond(input);
  }
}

function sentJson(call: RecordedCall): JsonObject {
  return JSON.parse(String(call.body));
}

function json(status: number, body: JsonObject): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json' },
  });
}

describe('aviation container client', () => {
  it('posts the SQL and timeout to /query and returns columns and rows', async () => {
    const fake = new FakeAviation(() =>
      json(200, { columns: ['n'], rows: [{ n: '19' }, { n: '20' }] }),
    );

    const result = await createAviationClient(fake).query('SELECT 1 AS n', 5_000);

    expect(result).toEqual({ columns: ['n'], rows: [{ n: '19' }, { n: '20' }] });
    expect(fake.calls).toHaveLength(1);
    expect(fake.calls[0]!.url).toBe('http://container/query');
    expect(fake.calls[0]!.method).toBe('POST');
    expect(sentJson(fake.calls[0]!)).toEqual({ sql: 'SELECT 1 AS n', timeoutMs: 5_000 });
  });

  it('defaults to the standard query timeout', async () => {
    const fake = new FakeAviation(() => json(200, { columns: [], rows: [] }));

    await createAviationClient(fake).query('SELECT 1');

    expect(sentJson(fake.calls[0]!).timeoutMs).toBe(DEFAULT_QUERY_TIMEOUT_MS);
    expect(fake.calls[0]!.signal?.aborted).toBe(false);
  });

  it('surfaces the container error message and status', async () => {
    const fake = new FakeAviation(() => json(403, { error: 'only SELECT statements are allowed' }));

    const failure = createAviationClient(fake).query('DROP TABLE x');

    await expect(failure).rejects.toBeInstanceOf(AviationQueryError);
    await expect(failure).rejects.toMatchObject({
      message: 'only SELECT statements are allowed',
      status: 403,
    });
  });

  it('falls back to the raw body when the error is not JSON', async () => {
    const fake = new FakeAviation(() => new Response('upstream exploded', { status: 502 }));

    await expect(createAviationClient(fake).query('SELECT 1')).rejects.toThrow('upstream exploded');
  });

  it('rejects a container reply that does not match the contract', async () => {
    const fake = new FakeAviation(() => json(200, { columns: 'n', rows: [] }));

    await expect(createAviationClient(fake).query('SELECT 1')).rejects.toThrow();
  });

  it('parses statements through /parse', async () => {
    const fake = new FakeAviation(() =>
      json(200, { statementCount: 1, tableNames: ['aviation://dims/aircraft.parquet'] }),
    );

    const parsed = await createAviationClient(fake).parse('SELECT * FROM x');

    expect(parsed).toEqual({
      statementCount: 1,
      tableNames: ['aviation://dims/aircraft.parquet'],
    });
    expect(fake.calls[0]!.url).toBe('http://container/parse');
  });

  it('health succeeds on 200 and throws on a failing container', async () => {
    const healthy = new FakeAviation(() => json(200, { status: 'ok' }));
    await expect(createAviationClient(healthy).health()).resolves.toBeUndefined();
    expect(healthy.calls[0]!.url).toBe('http://container/health');

    const down = new FakeAviation(() => json(503, { error: 'starting' }));
    await expect(createAviationClient(down).health()).rejects.toThrow('starting');
  });
});
