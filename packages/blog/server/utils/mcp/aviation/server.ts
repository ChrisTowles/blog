import { z } from 'zod';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
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
} from './aviation-tools';
import { registerAviationUiResource } from './ui-resource';

export function createAviationMcpServer(serverOrigin: string): McpServer {
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

  server.registerTool(
    AVIATION_TOOL_NAMES.LIST_QUESTIONS,
    {
      description: AVIATION_TOOL_DESCRIPTIONS[AVIATION_TOOL_NAMES.LIST_QUESTIONS],
      inputSchema: {},
    },
    async () => executeListQuestions(),
  );

  server.registerTool(
    AVIATION_TOOL_NAMES.SCHEMA,
    {
      description: AVIATION_TOOL_DESCRIPTIONS[AVIATION_TOOL_NAMES.SCHEMA],
      inputSchema: {},
    },
    async () => executeSchemaTool(),
  );

  // Returns fast with a pending pointer; the iframe drives the slow pipeline via /query.
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
