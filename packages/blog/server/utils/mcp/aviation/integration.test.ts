/**
 * End-to-end test via an in-memory linked-transport pair:
 *   Client  <->  InMemoryTransport  <->  McpServer (same-process)
 *
 * Exercises the transport contract that the real Streamable HTTP route serves.
 * Does NOT require a running Nitro server — runs in the default vitest environment.
 */

import { describe, it, expect, beforeAll } from 'vitest';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { InMemoryTransport } from '@modelcontextprotocol/sdk/inMemory.js';
import { registerAppTool } from '@modelcontextprotocol/ext-apps/server';
import {
  AVIATION_TOOL_NAMES,
  AVIATION_UI_RESOURCE_URI,
} from '../../../../shared/mcp-aviation-types';
import {
  askAviationInputSchema,
  executeListQuestions,
  executeSchemaTool,
  AVIATION_TOOL_DESCRIPTIONS,
} from './aviation-tools';
import { registerAviationUiResource } from './ui-resource';

async function createLinkedPair(): Promise<{ client: Client; close: () => Promise<void> }> {
  const server = new McpServer(
    { name: 'aviation-mcp-test', version: '0.0.1' },
    { capabilities: { tools: {}, resources: {} } },
  );

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
  // ask_aviation registered for discovery only; we don't execute it here because the
  // real tool body makes an Anthropic call. The transport contract test covers
  // tools/list and the two lightweight tools; ask_aviation's logic is covered in
  // aviation-tools.test.ts against a stubbed LLM.
  registerAppTool(
    server,
    AVIATION_TOOL_NAMES.ASK,
    {
      description: AVIATION_TOOL_DESCRIPTIONS[AVIATION_TOOL_NAMES.ASK],
      inputSchema: askAviationInputSchema,
      _meta: { ui: { resourceUri: AVIATION_UI_RESOURCE_URI } },
    },
    async () => ({
      content: [{ type: 'text', text: 'stub' }],
    }),
  );
  registerAviationUiResource(server, 'https://test.example');

  const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair();
  const client = new Client({ name: 'test-client', version: '0.0.1' }, {});
  await Promise.all([client.connect(clientTransport), server.connect(serverTransport)]);
  return {
    client,
    close: async () => {
      await client.close();
      await server.close();
    },
  };
}

describe('aviation MCP transport contract', () => {
  let pair: Awaited<ReturnType<typeof createLinkedPair>>;

  beforeAll(async () => {
    pair = await createLinkedPair();
  });

  it('tools/list returns the three aviation tools', async () => {
    const { tools } = await pair.client.listTools();
    const names = tools.map((t) => t.name).sort();
    expect(names).toEqual(
      [
        AVIATION_TOOL_NAMES.ASK,
        AVIATION_TOOL_NAMES.LIST_QUESTIONS,
        AVIATION_TOOL_NAMES.SCHEMA,
      ].sort(),
    );
    // ask_aviation must advertise its UI resource per MCP Apps
    const ask = tools.find((t) => t.name === AVIATION_TOOL_NAMES.ASK);
    const meta = ask?._meta as
      | { ui?: { resourceUri?: string }; 'ui/resourceUri'?: string }
      | undefined;
    const uri = meta?.ui?.resourceUri ?? meta?.['ui/resourceUri'];
    expect(uri).toBe(AVIATION_UI_RESOURCE_URI);
  });

  it('list_questions returns 10 starter questions', async () => {
    const result = await pair.client.callTool({
      name: AVIATION_TOOL_NAMES.LIST_QUESTIONS,
      arguments: {},
    });
    const content = Array.isArray(result.content) ? result.content[0] : undefined;
    expect(content?.type).toBe('text');
    const structured = result.structuredContent as { questions: string[] } | undefined;
    expect(structured?.questions.length).toBe(10);
  });

  it('schema tool returns the dataset surface', async () => {
    const result = await pair.client.callTool({
      name: AVIATION_TOOL_NAMES.SCHEMA,
      arguments: {},
    });
    const content = Array.isArray(result.content) ? result.content[0] : undefined;
    expect(content?.type).toBe('text');
    if (content?.type !== 'text') throw new Error('type narrow');
    expect(content.text).toContain('dims/aircraft.parquet');
    expect(content.text).toContain('bts_t100');
  });

  it('resources/list exposes the aviation ui resource', async () => {
    const result = await pair.client.listResources();
    const uris = result.resources.map((r) => r.uri);
    expect(uris).toContain(AVIATION_UI_RESOURCE_URI);
  });

  it('resources/read returns text/html;profile=mcp-app', async () => {
    const result = await pair.client.readResource({ uri: AVIATION_UI_RESOURCE_URI });
    const content = result.contents[0];
    expect(content?.mimeType).toBe('text/html;profile=mcp-app');
    // Text contents have a .text field; blob contents would have .blob instead.
    const maybeText = content && 'text' in content ? content.text : undefined;
    expect(typeof maybeText).toBe('string');
  });
});
