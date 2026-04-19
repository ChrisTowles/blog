/**
 * /mcp/aviation — Streamable HTTP MCP endpoint for the aviation demo.
 *
 * Session model: `Mcp-Session-Id` lives in-process per the SDK's
 * StreamableHTTPServerTransport. With min_instances=1 + session-affinity
 * (plan Key Decisions) this is good enough; clients silently reconnect on 404
 * when a pod rotates.
 *
 * Tools registered:
 *   - ask_aviation     — returns an iframe + pending pointer; the iframe
 *                        streams the answer from /mcp/aviation/query
 *   - list_questions   — curated starter questions
 *   - schema           — dataset schema surface for LLMs
 *
 * UI resources:
 *   - ui://aviation-answer  — the iframe bundle
 */

import type { IncomingMessage, ServerResponse } from 'node:http';
import { randomUUID } from 'node:crypto';
import { defineEventHandler, readBody, getHeader, setResponseStatus } from 'h3';
import { useRuntimeConfig } from '#imports';
import { z } from 'zod';
import { log } from 'evlog';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import { registerAppTool } from '@modelcontextprotocol/ext-apps/server';
import {
  AVIATION_TOOL_NAMES,
  AVIATION_UI_RESOURCE_URI,
} from '../../../../shared/mcp-aviation-types';
import {
  askAviationInputSchema,
  executeAskAviation,
  executeListQuestions,
  executeSchemaTool,
  AVIATION_TOOL_DESCRIPTIONS,
} from '../../../utils/mcp/aviation/aviation-tools';
import { registerAviationUiResource } from '../../../utils/mcp/aviation/ui-resource';

type SessionRecord = {
  server: McpServer;
  transport: StreamableHTTPServerTransport;
};

// Per-pod session map. Lives in-process; acceptable per plan Key Decisions (session-ID-per-instance).
const sessions = new Map<string, SessionRecord>();

function createMcpServer(serverOrigin: string): McpServer {
  const server = new McpServer(
    {
      name: 'aviation-mcp',
      version: '0.1.0',
    },
    {
      capabilities: {
        tools: {},
        resources: {},
        logging: {},
      },
    },
  );

  const queryUrl = `${serverOrigin.replace(/\/$/, '')}/mcp/aviation/query`;

  // list_questions
  server.registerTool(
    AVIATION_TOOL_NAMES.LIST_QUESTIONS,
    {
      description: AVIATION_TOOL_DESCRIPTIONS[AVIATION_TOOL_NAMES.LIST_QUESTIONS],
      inputSchema: {},
    },
    async () => executeListQuestions(),
  );

  // schema
  server.registerTool(
    AVIATION_TOOL_NAMES.SCHEMA,
    {
      description: AVIATION_TOOL_DESCRIPTIONS[AVIATION_TOOL_NAMES.SCHEMA],
      inputSchema: {},
    },
    async () => executeSchemaTool(),
  );

  // ask_aviation — returns fast with a pending pointer; iframe drives the work.
  registerAppTool(
    server,
    AVIATION_TOOL_NAMES.ASK,
    {
      description: AVIATION_TOOL_DESCRIPTIONS[AVIATION_TOOL_NAMES.ASK],
      inputSchema: askAviationInputSchema,
      _meta: {
        ui: {
          resourceUri: AVIATION_UI_RESOURCE_URI,
        },
      },
    },
    async (args) => {
      const parsed = z.object(askAviationInputSchema).parse(args);
      return executeAskAviation(parsed, queryUrl);
    },
  );

  registerAviationUiResource(server, serverOrigin);
  return server;
}

async function getOrCreateSession(
  sessionId: string | undefined,
  serverOrigin: string,
): Promise<SessionRecord> {
  if (sessionId && sessions.has(sessionId)) {
    return sessions.get(sessionId)!;
  }
  const transport = new StreamableHTTPServerTransport({
    sessionIdGenerator: () => randomUUID(),
    onsessioninitialized: (id: string) => {
      sessions.set(id, { server, transport });
    },
  });
  transport.onclose = () => {
    if (transport.sessionId) sessions.delete(transport.sessionId);
  };
  const server = createMcpServer(serverOrigin);
  await server.connect(transport);
  return { server, transport };
}

export default defineEventHandler(async (event) => {
  const req = event.node.req as IncomingMessage;
  const res = event.node.res as ServerResponse;

  try {
    const sessionId = getHeader(event, 'mcp-session-id');
    const serverOrigin = (useRuntimeConfig(event).public.siteUrl as string) ?? '';
    // h3's readBody handles JSON, x-www-form-urlencoded, etc.
    const body = req.method === 'POST' ? await readBody(event) : undefined;
    const record = await getOrCreateSession(sessionId, serverOrigin);
    await record.transport.handleRequest(req, res, body);
  } catch (e) {
    log.error({
      tag: 'mcp-aviation',
      message: 'MCP transport error',
      error: e instanceof Error ? e.message : String(e),
    });
    if (!res.headersSent) {
      setResponseStatus(event, 500);
      return { error: 'internal_error' };
    }
  }
});
