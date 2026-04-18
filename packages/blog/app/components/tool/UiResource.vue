<script setup lang="ts">
/**
 * <ToolUiResource> — renders a persisted or freshly-arrived MCP UI resource
 * (aviation-answer iframe) inside the chat thread.
 *
 * Lifecycle (adapted from ~/code/f/ext-apps/examples/basic-host/src/implementation.ts):
 *   1. Mount: compute sandbox URL from runtimeConfig.public.mcpSandboxUrl
 *      + iframe's CSP query-string (SEP-1865 sandbox pattern).
 *   2. Wait for `ui/notifications/sandbox-proxy-ready` postMessage from the
 *      sandbox iframe. **Origin validation (security-critical, plan line 569):**
 *      drop any message whose `event.origin` does not equal the sandbox
 *      origin we computed. Silent drop.
 *   3. Connect AppBridge via PostMessageTransport.
 *   4. Fetch the inner HTML bundle. When this component is created from a
 *      persisted UiResourcePart the bundle is re-fetched from the MCP
 *      server (HTTP-cached). When created from a fresh ask_aviation result
 *      the HTML is passed inline via the `html` prop.
 *   5. sendSandboxResourceReady + wait oninitialized.
 *   6. sendToolInput + sendToolResult(structuredContent) — REPLAY IS INERT.
 *   7. appBridge.onmessage = followup click → emit `followup` → parent calls
 *      useAviationMcp().callAsk() and appends a new UiResourcePart.
 *
 * Error handling:
 *   - Sandbox-proxy-unreachable fallback (plan line 568): 5s timeout on
 *     `sandbox-proxy-ready` → replace iframe with a bordered card showing
 *     structuredContent.answer + link.
 *   - Origin mismatch: silent drop (no toast, no log at info level).
 *   - Initialize handshake > 5s: logged warn; fallback card shown.
 *
 * Fullscreen (plan line 565): TODO — not in this slice. The button is wired
 * to emit `display-mode-change` but the modal overlay is punted to a
 * follow-up commit.
 */

import {
  AppBridge,
  PostMessageTransport,
  buildAllowAttribute,
  type McpUiResourceCsp,
  type McpUiResourcePermissions,
  type McpUiMessageRequest,
} from '@modelcontextprotocol/ext-apps/app-bridge';
import type { UiResourcePart, HostContextStatus } from '~~/shared/chat-types';
import { TEST_IDS } from '~~/shared/test-ids';

type StructuredRecord = Record<string, unknown>;

/** Pick a human-readable fallback string from the structuredContent payload. */
function fallbackDisplayText(sc: StructuredRecord): string {
  for (const key of ['answer', 'message', 'title', 'text']) {
    const value = sc[key];
    if (typeof value === 'string' && value.length > 0) return value;
  }
  return '';
}

const props = defineProps<{
  part: UiResourcePart;
  /**
   * Inline HTML bundle for fresh tool results. When absent (persisted
   * replay), we fetch by `uiResourceUri` from the MCP endpoint.
   */
  html?: string;
  /**
   * When true, chips in the iframe are disabled via
   * sendHostContextChange({ status: 'streaming' }).
   */
  streaming?: boolean;
}>();

const emit = defineEmits<{
  (e: 'followup', question: string): void;
}>();

const runtimeConfig = useRuntimeConfig();
const sandboxBaseUrl = runtimeConfig.public.mcpSandboxUrl as string;
const sandboxOrigin = computed(() => new URL(sandboxBaseUrl, window.location.href).origin);

const iframeRef = ref<HTMLIFrameElement | null>(null);
const status = ref<'pending' | 'ready' | 'error' | 'unreachable'>('pending');
const errorMessage = ref<string>('');

/** Exposed for tests — validates origin + drops silently on mismatch. */
function isOriginAllowed(origin: string): boolean {
  return origin === sandboxOrigin.value;
}

defineExpose({ isOriginAllowed });

let appBridge: AppBridge | null = null;
let cleanupFns: Array<() => void> = [];

const structured = computed<StructuredRecord>(() => {
  return (props.part.structuredContent ?? {}) as StructuredRecord;
});
const fallbackText = computed(() => fallbackDisplayText(structured.value));

/**
 * Wait for the sandbox-proxy-ready notification from the iframe, enforcing
 * origin validation. Rejects after 5s (plan line 568, fallback trigger).
 */
function waitForSandboxReady(iframe: HTMLIFrameElement, allowedOrigin: string): Promise<void> {
  return new Promise((resolve, reject) => {
    let settled = false;
    const timeout = setTimeout(() => {
      if (settled) return;
      settled = true;
      window.removeEventListener('message', listener);
      reject(new Error('sandbox-proxy-timeout'));
    }, 5_000);

    const listener = (event: MessageEvent) => {
      // Origin validation — drop silently on mismatch (plan line 569).
      if (event.origin !== allowedOrigin) return;
      if (event.source !== iframe.contentWindow) return;
      const data = event.data as { method?: string } | undefined;
      if (data?.method !== 'ui/notifications/sandbox-proxy-ready') return;
      if (settled) return;
      settled = true;
      clearTimeout(timeout);
      window.removeEventListener('message', listener);
      resolve();
    };
    window.addEventListener('message', listener);
    cleanupFns.push(() => {
      window.removeEventListener('message', listener);
      clearTimeout(timeout);
    });
  });
}

function resolveResourceEndpoint(uri: string): string {
  if (uri.startsWith('ui://echo-')) return `/mcp/echo/resource?uri=${encodeURIComponent(uri)}`;
  return `/mcp/aviation/resource?uri=${encodeURIComponent(uri)}`;
}

async function resolveHtml(): Promise<string> {
  if (props.html) return props.html;
  const endpoint = resolveResourceEndpoint(props.part.uiResourceUri);
  try {
    const text = await $fetch<string>(endpoint, { responseType: 'text' });
    return typeof text === 'string' ? text : '';
  } catch {
    return '';
  }
}

async function boot(iframe: HTMLIFrameElement): Promise<void> {
  const csp = props.part.csp;
  const permissions = props.part.permissions;

  iframe.setAttribute('sandbox', 'allow-scripts allow-same-origin allow-forms');
  const allow = buildAllowAttribute(permissions as McpUiResourcePermissions | undefined);
  if (allow) iframe.setAttribute('allow', allow);

  const src = new URL(sandboxBaseUrl, window.location.href);
  if (csp) src.searchParams.set('csp', JSON.stringify(csp));

  const readyPromise = waitForSandboxReady(iframe, sandboxOrigin.value);
  iframe.src = src.href;

  try {
    await readyPromise;
  } catch (e) {
    status.value = 'unreachable';
    errorMessage.value = e instanceof Error ? e.message : String(e);
    return;
  }

  const win = iframe.contentWindow;
  if (!win) {
    status.value = 'error';
    errorMessage.value = 'iframe has no contentWindow';
    return;
  }

  appBridge = new AppBridge(
    // Server client isn't known to the bridge on the host side — pass
    // undefined where the example uses `serverInfo.client`; the basic-host
    // passes the actual MCP client so the bridge can proxy arbitrary tools,
    // but we only use it for sandbox-resource + tool-input/result forwarding.
    undefined as unknown as import('@modelcontextprotocol/sdk/client/index.js').Client,
    { name: 'blog-chat-host', version: '0.1.0' },
    {
      openLinks: {},
      // Declare support for model context updates (spec-recommended).
      updateModelContext: { text: {} },
    },
    {
      hostContext: {
        theme: 'light',
        platform: 'web',
        containerDimensions: { maxHeight: 6000 },
        displayMode: 'inline',
        availableDisplayModes: ['inline', 'fullscreen'],
        // Local extension frozen in Unit 6:
        status: props.streaming ? 'streaming' : ('idle' satisfies HostContextStatus),
      },
    },
  );

  // Wire follow-up messages BEFORE connect (spec note: register handlers
  // before connect so early inbound requests aren't missed).
  appBridge.onmessage = async (params: McpUiMessageRequest['params']) => {
    const contentArr = params?.content ?? [];
    const textBlock = contentArr.find(
      (b): b is { type: 'text'; text: string } =>
        !!b && typeof b === 'object' && 'type' in b && b.type === 'text' && 'text' in b,
    );
    if (textBlock?.text) emit('followup', textBlock.text);
    return {};
  };

  appBridge.onsizechange = async ({ width, height }) => {
    if (height !== undefined) iframe.style.height = `${height}px`;
    if (width !== undefined) iframe.style.minWidth = `min(${width}px, 100%)`;
  };

  const oninitialized = new Promise<void>((resolve) => {
    const prev = appBridge!.oninitialized;
    appBridge!.oninitialized = (...args) => {
      resolve();
      appBridge!.oninitialized = prev;
      prev?.(...args);
    };
  });

  await appBridge.connect(new PostMessageTransport(win, win));

  const html = await resolveHtml();
  // `csp` / `permissions` come off `props.part`, which Vue wraps in a
  // reactive Proxy. postMessage's structured-clone algorithm can't handle
  // Proxies, so we deep-clone to plain JSON first. (Previously `csp` was
  // always undefined for fresh tool calls, so this never surfaced; now that
  // ask_aviation ships a real CSP per SEP-1865, we must scrub it.)
  const plainCsp = csp ? (JSON.parse(JSON.stringify(csp)) as typeof csp) : undefined;
  const plainPermissions = permissions
    ? (JSON.parse(JSON.stringify(permissions)) as typeof permissions)
    : undefined;
  await appBridge.sendSandboxResourceReady({
    html,
    csp: plainCsp,
    permissions: plainPermissions,
  });

  try {
    await withTimeout(oninitialized, 5_000, 'initialize-timeout');
  } catch (e) {
    status.value = 'error';
    errorMessage.value = e instanceof Error ? e.message : String(e);
    return;
  }

  // Replay is inert (plan line 567): persisted structuredContent drives both
  // fresh and reload renders. toRaw strips Vue's Proxy so postMessage's
  // structured-clone algorithm doesn't choke.
  appBridge.sendToolInput({ arguments: {} });
  appBridge.sendToolResult({
    content: [{ type: 'text', text: fallbackText.value }],
    structuredContent: toRaw(structured.value),
    isError: props.part.error ?? false,
  });

  status.value = 'ready';
}

function withTimeout<T>(p: Promise<T>, ms: number, label: string): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const t = setTimeout(() => reject(new Error(label)), ms);
    p.then((v) => {
      clearTimeout(t);
      resolve(v);
    }).catch((e) => {
      clearTimeout(t);
      reject(e);
    });
  });
}

watch(
  () => props.streaming,
  (next) => {
    if (!appBridge) return;
    appBridge.sendHostContextChange({
      // biome-ignore lint: local extension keyed under `status` (frozen in Unit 6).
      status: next ? 'streaming' : 'idle',
    } as Parameters<AppBridge['sendHostContextChange']>[0]);
  },
);

onMounted(async () => {
  await nextTick();
  if (!iframeRef.value) return;
  try {
    await boot(iframeRef.value);
  } catch (e) {
    status.value = 'error';
    errorMessage.value = e instanceof Error ? e.message : String(e);
  }
});

onBeforeUnmount(() => {
  for (const fn of cleanupFns) fn();
  cleanupFns = [];
  if (appBridge) {
    try {
      appBridge.close();
    } catch {
      // swallow
    }
    appBridge = null;
  }
});
</script>

<template>
  <div
    class="my-5 rounded-xl border border-muted/20 overflow-hidden"
    :data-testid="TEST_IDS.AVIATION.UI_RESOURCE"
  >
    <div
      v-if="status === 'unreachable' || status === 'error'"
      class="p-5 bg-muted/5"
      :data-testid="TEST_IDS.AVIATION.UI_RESOURCE_FALLBACK"
    >
      <div class="font-medium text-highlighted mb-2">
        {{ fallbackText || 'Interactive visualization unavailable' }}
      </div>
      <div class="text-xs text-muted">
        Interactive visualization unavailable
        <template v-if="errorMessage"> ({{ errorMessage }})</template>
        — see the
        <NuxtLink to="/blog" class="underline">companion blog post</NuxtLink> for details.
      </div>
    </div>

    <iframe
      v-show="status !== 'unreachable' && status !== 'error'"
      ref="iframeRef"
      :data-testid="TEST_IDS.AVIATION.UI_RESOURCE_IFRAME"
      class="w-full block bg-white dark:bg-zinc-900"
      style="height: 480px; border: 0"
      title="Aviation answer"
    />
  </div>
</template>
