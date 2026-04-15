/**
 * /mcp/aviation — Streamable HTTP MCP endpoint for the aviation demo.
 *
 * Session model: `Mcp-Session-Id` lives in-process per the SDK's
 * StreamableHTTPServerTransport. With min_instances=1 + session-affinity
 * (plan Key Decisions) this is good enough; clients silently reconnect on 404
 * when a pod rotates.
 *
 * Tools registered:
 *   - ask_aviation     — NL question → SQL → chart
 *   - list_questions   — curated starter questions
 *   - schema           — dataset schema surface for LLMs
 *
 * UI resources:
 *   - ui://aviation-answer  — the iframe bundle (stub until Unit 4)
 */

import type { IncomingMessage, ServerResponse } from 'node:http';
import { randomUUID } from 'node:crypto';
import { defineEventHandler, readBody, getHeader, setResponseStatus } from 'h3';
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

function createMcpServer(): McpServer {
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

  // ask_aviation — the MCP Apps tool
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
    async (args, extra) => {
      const parsed = z.object(askAviationInputSchema).parse(args);
      const progressSteps: Record<string, number> = {
        planning: 0.1,
        validating: 0.4,
        querying: 0.6,
        done: 1.0,
      };
      const result = await executeAskAviation(parsed, (step) => {
        // Emit progress notifications when the SDK gives us a channel.
        const token = extra?.requestId;
        if (extra?.sendNotification && token !== undefined) {
          void extra
            .sendNotification({
              method: 'notifications/progress',
              params: {
                progressToken: token,
                progress: progressSteps[step] ?? 0,
                message: step,
              },
            })
            .catch(() => {
              // best-effort
            });
        }
      });
      return result;
    },
  );

  registerAviationUiResource(server);
  return server;
}

async function getOrCreateSession(sessionId: string | undefined): Promise<SessionRecord> {
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
  const server = createMcpServer();
  await server.connect(transport);
  return { server, transport };
}

export default defineEventHandler(async (event) => {
  const req = event.node.req as IncomingMessage;
  const res = event.node.res as ServerResponse;

  try {
    const sessionId = getHeader(event, 'mcp-session-id');
    // h3's readBody handles JSON, x-www-form-urlencoded, etc.
    const body = req.method === 'POST' ? await readBody(event) : undefined;
    const record = await getOrCreateSession(sessionId);
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
