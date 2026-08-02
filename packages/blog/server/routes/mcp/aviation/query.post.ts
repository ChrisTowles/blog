/**
 * POST /mcp/aviation/query — the SSE endpoint the aviation iframe POSTs to. MCP
 * tool calls are synchronous and no SEP-1865 host mounts an iframe before the tool
 * returns, so `ask_aviation` answers instantly with a pending pointer and the slow
 * pipeline streams from here. Anonymous and cookie-free, hence `Allow-Origin: *`.
 */

import { defineEventHandler, readBody, setResponseHeader, setResponseStatus } from 'h3';
import { z } from 'zod';
import { log } from 'evlog';
import type {
  AviationQueryEvent,
  AviationProgressStep,
} from '../../../../shared/mcp-aviation-types';
import {
  askAviationInputSchema,
  runAviationPipeline,
} from '../../../utils/mcp/aviation/aviation-tools';

const bodySchema = z.object(askAviationInputSchema);

const encoder = new TextEncoder();

function sseFrame(event: AviationQueryEvent): Uint8Array {
  return encoder.encode(`data: ${JSON.stringify(event)}\n\n`);
}

export default defineEventHandler(async (event) => {
  // CORS — always set on the response so even errors aren't blocked by the
  // browser before the iframe can read them.
  setResponseHeader(event, 'Access-Control-Allow-Origin', '*');
  setResponseHeader(event, 'Vary', 'Origin');

  let parsed: { question: string };
  try {
    const body = await readBody(event);
    parsed = bodySchema.parse(body);
  } catch (err) {
    setResponseStatus(event, 400);
    return { error: err instanceof Error ? err.message : 'bad_request' };
  }

  setResponseHeader(event, 'Content-Type', 'text/event-stream');
  setResponseHeader(event, 'Cache-Control', 'no-cache, no-transform');
  setResponseHeader(event, 'Connection', 'keep-alive');
  // Disable buffering for Nginx-style proxies and Cloud Run's L7 LB.
  setResponseHeader(event, 'X-Accel-Buffering', 'no');

  return new ReadableStream<Uint8Array>({
    async start(controller) {
      const onProgress = (step: AviationProgressStep): void => {
        try {
          controller.enqueue(sseFrame({ type: 'progress', step }));
        } catch {
          // Client disconnected — controller.close() already called.
        }
      };

      try {
        const result = await runAviationPipeline(parsed, onProgress);
        controller.enqueue(sseFrame({ type: 'result', result }));
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        log.error({
          tag: 'mcp-aviation',
          message: 'query pipeline failed',
          error: message,
          question: parsed.question,
        });
        try {
          controller.enqueue(sseFrame({ type: 'error', message }));
        } catch {
          // best-effort
        }
      } finally {
        controller.close();
      }
    },
  });
});
