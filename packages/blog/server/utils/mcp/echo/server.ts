import { z } from 'zod';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { registerAppTool } from '@modelcontextprotocol/ext-apps/server';
import type { EmbeddedResource, TextContent } from '@modelcontextprotocol/sdk/types.js';
import { pickDadJoke } from '../../../../shared/dad-jokes';
import { ECHO_TOOL_NAMES, ECHO_UI_RESOURCE_URI } from '../../../../shared/mcp-echo-types';
import { ECHO_UI_META, readEchoBundle, registerEchoUiResource } from './ui-resource';

const echoInputSchema = {
  message: z.string().min(1).max(500),
};

export function createEchoMcpServer(): McpServer {
  const server = new McpServer(
    { name: 'echo-mcp', version: '0.1.0' },
    { capabilities: { tools: {}, resources: {}, logging: {} } },
  );

  registerAppTool(
    server,
    ECHO_TOOL_NAMES.ECHO,
    {
      description:
        'Returns a random bad dad joke with a timestamp. Minimal MCP UI test tool — groans guaranteed.',
      inputSchema: echoInputSchema,
      _meta: {
        ui: { resourceUri: ECHO_UI_RESOURCE_URI },
      },
    },
    async (args) => {
      z.object(echoInputSchema).parse(args);
      const message = pickDadJoke();
      const structured = { message, timestamp: new Date().toISOString() };
      const textContent: TextContent = { type: 'text', text: message };

      const uiContent: EmbeddedResource = {
        type: 'resource',
        resource: {
          uri: ECHO_UI_RESOURCE_URI,
          mimeType: 'text/html;profile=mcp-app',
          text: await readEchoBundle(),
          _meta: ECHO_UI_META,
        },
      };

      return {
        content: [textContent, uiContent],
        structuredContent: structured,
      };
    },
  );

  registerEchoUiResource(server);

  return server;
}
