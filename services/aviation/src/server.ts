import { createServer, type IncomingMessage, type Server, type ServerResponse } from 'node:http';
import { z } from 'zod';
import {
  QueryTimeoutError,
  RejectedSqlError,
  type AviationEngine,
  type ParseResult,
  type QueryResult,
} from './engine.ts';

const MAX_BODY_BYTES = 64 * 1024;

const DEFAULT_TIMEOUT_MS = 30_000;

const MAX_TIMEOUT_MS = 120_000;

const bodySchema = z.object({
  sql: z.string().min(1).max(20_000),
  timeoutMs: z.number().int().positive().max(MAX_TIMEOUT_MS).optional(),
});

class BodyTooLargeError extends Error {}

type ResponseBody = QueryResult | ParseResult | { status: 'ok' } | { error: string };

function send(res: ServerResponse, status: number, body: ResponseBody): void {
  res.writeHead(status, { 'content-type': 'application/json' });
  res.end(JSON.stringify(body));
}

async function readBody(req: IncomingMessage): Promise<string> {
  const chunks: Buffer[] = [];
  let size = 0;

  for await (const chunk of req) {
    const buf = Buffer.from(chunk);
    size += buf.length;

    if (size > MAX_BODY_BYTES) throw new BodyTooLargeError('request body too large');

    chunks.push(buf);
  }

  return Buffer.concat(chunks).toString('utf8');
}

async function readJson(req: IncomingMessage): Promise<z.infer<typeof bodySchema>> {
  const raw = await readBody(req);

  return bodySchema.parse(JSON.parse(raw));
}

function errorStatus(error: Error): number {
  if (error instanceof BodyTooLargeError) return 413;

  if (error instanceof SyntaxError || error instanceof z.ZodError) return 400;

  if (error instanceof RejectedSqlError) return 403;

  if (error instanceof QueryTimeoutError) return 504;

  return 422;
}

async function route(
  engine: AviationEngine,
  req: IncomingMessage,
  res: ServerResponse,
): Promise<void> {
  if (req.method === 'GET' && req.url === '/health') {
    send(res, 200, { status: 'ok' });

    return;
  }

  if (req.method === 'POST' && req.url === '/query') {
    const { sql, timeoutMs } = await readJson(req);
    send(res, 200, await engine.query(sql, timeoutMs ?? DEFAULT_TIMEOUT_MS));

    return;
  }

  if (req.method === 'POST' && req.url === '/parse') {
    const { sql } = await readJson(req);
    send(res, 200, await engine.parse(sql));

    return;
  }

  send(res, 404, { error: 'not found' });
}

export function createAviationServer(engine: AviationEngine): Server {
  return createServer((req, res) => {
    route(engine, req, res).catch((error: Error) => {
      send(res, errorStatus(error), { error: error.message });
    });
  });
}
