/**
 * POST /mcp/aviation/query — SSE endpoint the aviation iframe POSTs to.
 *
 * This exists because MCP tool calls are synchronous: the host can't mount the
 * iframe until the tool returns. We split the slow pipeline out of the
 * `ask_aviation` tool so the tool returns near-instant with just the iframe +
 * a pending pointer, and the iframe streams progress + the final result from
 * here. That's the only way to show a live loading state in Claude Desktop /
 * Claude.ai (SEP-1865 hosts don't expose an iframe until tool completion).
 *
 * Protocol:
 *   Request: JSON body `{ question: string }` (≤500 chars).
 *   Response: `text/event-stream` with `data: <json>\n\n` events, where each
 *             payload matches `AviationQueryEvent`:
 *               { type: 'progress', step: 'planning'|'validating'|'querying'|'rendering' }
 *               { type: 'result', result: AviationToolResult }
 *               { type: 'error',  message: string }
 *
 * CORS: the iframe runs in the MCP host's sandbox origin (`sandbox.towles.dev`
 * locally, `*.claudemcpcontent.com` in Claude) — always cross-origin. We reply
 * with `Access-Control-Allow-Origin: *` since the endpoint is anonymous and
 * never reads cookies. The companion `query.options.ts` handles preflight.
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
