import { describe, it, expect } from 'vitest';
import type { CallToolResult, ReadResourceResult, Tool } from '@modelcontextprotocol/sdk/types.js';
import { extractUiResource, extractUiResourceFromRead, toolUiResourceUri } from './client-pool';

describe('toolUiResourceUri', () => {
  it('returns the ui:// uri when _meta.ui.resourceUri is set', () => {
    const tool = {
      name: 'ask_aviation',
      description: '',
      inputSchema: { type: 'object', properties: {} },
      _meta: { ui: { resourceUri: 'ui://aviation-answer' } },
    } as unknown as Tool;
    expect(toolUiResourceUri(tool)).toBe('ui://aviation-answer');
  });

  it('returns undefined when the tool has no _meta', () => {
    const tool = {
      name: 'list_questions',
      description: '',
      inputSchema: { type: 'object', properties: {} },
    } as unknown as Tool;
    expect(toolUiResourceUri(tool)).toBeUndefined();
  });

  it('rejects non-ui:// schemes as a guard against spoofed references', () => {
    const tool = {
      name: 'x',
      description: '',
      inputSchema: { type: 'object', properties: {} },
      _meta: { ui: { resourceUri: 'https://evil.test/bundle.html' } },
    } as unknown as Tool;
    expect(toolUiResourceUri(tool)).toBeUndefined();
  });

  it('returns undefined for an undefined tool', () => {
    expect(toolUiResourceUri(undefined)).toBeUndefined();
  });
});

describe('extractUiResource (inline EmbeddedResource)', () => {
  it('returns the html + csp from an inline resource block', () => {
    const result: CallToolResult = {
      content: [
        { type: 'text', text: 'pending' },
        {
          type: 'resource',
          resource: {
            uri: 'ui://aviation-answer',
            mimeType: 'text/html',
            text: '<html>inline</html>',
            _meta: { ui: { csp: { connectDomains: ['https://chris.towles.dev'] } } },
          },
        },
      ],
    };
    const extracted = extractUiResource(result);
    expect(extracted).toEqual({
      uri: 'ui://aviation-answer',
      html: '<html>inline</html>',
      csp: { connectDomains: ['https://chris.towles.dev'] },
      permissions: undefined,
    });
  });

  it('returns undefined when there is no resource block', () => {
    const result: CallToolResult = {
      content: [{ type: 'text', text: 'pending' }],
    };
    expect(extractUiResource(result)).toBeUndefined();
  });

  it('ignores non-ui:// resource blocks', () => {
    const result: CallToolResult = {
      content: [
        {
          type: 'resource',
          resource: {
            uri: 'file:///etc/passwd',
            mimeType: 'text/plain',
            text: 'nope',
          },
        },
      ],
    };
    expect(extractUiResource(result)).toBeUndefined();
  });
});

describe('extractUiResourceFromRead (resources/read response)', () => {
  it('returns the html + csp for the requested uri', () => {
    const read: ReadResourceResult = {
      contents: [
        {
          uri: 'ui://aviation-answer',
          mimeType: 'text/html;profile=mcp-app',
          text: '<html>from-resources-read</html>',
          _meta: { ui: { csp: { connectDomains: ['https://example.test'] } } },
        },
      ],
    };
    const extracted = extractUiResourceFromRead('ui://aviation-answer', read);
    expect(extracted).toEqual({
      uri: 'ui://aviation-answer',
      html: '<html>from-resources-read</html>',
      csp: { connectDomains: ['https://example.test'] },
      permissions: undefined,
    });
  });

  it('returns undefined when no content matches the requested uri', () => {
    const read: ReadResourceResult = {
      contents: [
        {
          uri: 'ui://something-else',
          text: '<html>other</html>',
        },
      ],
    };
    expect(extractUiResourceFromRead('ui://aviation-answer', read)).toBeUndefined();
  });
});
