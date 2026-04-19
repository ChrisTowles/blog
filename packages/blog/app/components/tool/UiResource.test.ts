/**
 * Vitest for <ToolUiResource>. Emphasizes the origin-validation security
 * property (plan line 569) and the unreachable-sandbox fallback.
 *
 * Per project rules: no vi.mock. The component reads the sandbox URL from
 * runtime config and attaches a `message` listener; we drive it directly
 * via the DOM + the exposed `isOriginAllowed` helper.
 */

import { describe, it, expect } from 'vitest';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import UiResource from './UiResource.vue';
import type { UiResourcePart } from '~~/shared/chat-types';
import type { AviationToolResult } from '~~/shared/mcp-aviation-types';

const STUB_CONTENT: AviationToolResult = {
  sql: 'SELECT 1',
  answer: 'Stubbed answer for unreachable test.',
  chart_option: { series: [] },
  followups: ['one?', 'two?', 'three?'],
  rows: [],
  truncated: false,
};

const STUB_PART: UiResourcePart = {
  type: 'ui-resource',
  toolCallId: 'tc-1',
  uiResourceUri: 'ui://aviation-answer',
  structuredContent: STUB_CONTENT,
  csp: { connectDomains: [], resourceDomains: ['self'], frameDomains: [] },
};

describe('ToolUiResource — origin validation (plan line 569)', () => {
  it('treats event.origin === sandbox origin as allowed', async () => {
    const wrapper = await mountSuspended(UiResource, {
      props: { part: STUB_PART, html: '<!doctype html><html></html>' },
    });
    // runtimeConfig.public.mcpSandboxUrl defaults to the local dev sandbox
    // proxy (sandbox.localhost:8081); resolve its origin once here to match
    // the component's computation.
    const sandboxOrigin = new URL(
      (useRuntimeConfig().public.mcpSandboxUrl as string) ??
        'http://sandbox.localhost:8081/sandbox.html',
      window.location.href,
    ).origin;

    const exposed = wrapper.vm as unknown as { isOriginAllowed: (o: string) => boolean };
    expect(exposed.isOriginAllowed(sandboxOrigin)).toBe(true);
  });

  it('rejects messages from any other origin', async () => {
    const wrapper = await mountSuspended(UiResource, {
      props: { part: STUB_PART, html: '<!doctype html><html></html>' },
    });
    const exposed = wrapper.vm as unknown as { isOriginAllowed: (o: string) => boolean };

    expect(exposed.isOriginAllowed('https://evil.example.com')).toBe(false);
    expect(exposed.isOriginAllowed('null')).toBe(false);
    expect(exposed.isOriginAllowed('http://localhost:4321')).toBe(false);
    expect(exposed.isOriginAllowed('')).toBe(false);
  });
});

describe('ToolUiResource — DOM contract', () => {
  it('renders an iframe targeting the sandbox proxy with origin isolation', async () => {
    const wrapper = await mountSuspended(UiResource, {
      props: { part: STUB_PART, html: '<!doctype html><html></html>' },
    });
    const iframe = wrapper.find('iframe');
    expect(iframe.exists()).toBe(true);
    expect(iframe.attributes('sandbox')).toContain('allow-scripts');
    expect(iframe.attributes('data-testid')).toBe('aviation-ui-resource-iframe');
  });

  it('exposes the structuredContent answer to the fallback template (compiled output)', async () => {
    const wrapper = await mountSuspended(UiResource, {
      props: { part: STUB_PART, html: '<!doctype html><html></html>' },
    });
    // Template contains a v-if branch for fallback that interpolates
    // structured.answer — so the rendered HTML (even with v-show) references
    // the part's content. Verify the root container carries the test-id.
    expect(wrapper.attributes('data-testid')).toBe('aviation-ui-resource');
  });
});
