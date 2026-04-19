<script setup lang="ts">
/**
 * Aviation MCP demo landing page — "Add to Claude Desktop" onboarding.
 *
 * Per plan Unit 7 line 624, the page file is `aviation.vue` (not `mcp.vue`)
 * because Nuxt Content would map `/mcp` onto the `/mcp/aviation` route
 * namespace and fight the server MCP endpoint.
 *
 * Claude Desktop config format:
 *   Plan line 776 flagged the native remote-HTTP shape as unverified at
 *   ship time. We ship the `mcp-remote` wrapper variant because:
 *     1. It works on every Claude Desktop version that supports MCP
 *        (stdio-first, which is all of them).
 *     2. Native remote Streamable HTTP support in claude_desktop_config
 *        is still gated behind the in-progress SEP-for-remote spec.
 *     3. Once native remote HTTP ships, we'll update the snippet — the
 *        server-side transport does not change.
 *   We show both shapes so a reader on a Claude Desktop version that
 *   already supports native remote HTTP can pick the cleaner one.
 *
 * Screenshots: 2-3 product shots of the iframe rendering in Claude Desktop
 * are TODO (plan line 654) — captured post-deploy. We reference
 * `/images/mcp-ui-in-chat/*.png` as placeholders; ops report flags the
 * missing assets.
 */

import { TEST_IDS } from '~~/shared/test-ids';

const runtimeConfig = useRuntimeConfig();
const mcpEndpoint = computed(() => {
  const base = runtimeConfig.public.siteUrl || 'https://chris.towles.dev';
  return `${base.replace(/\/$/, '')}/mcp/aviation`;
});

const configWrapped = computed(
  () => `{
  "mcpServers": {
    "aviation": {
      "command": "npx",
      "args": ["-y", "mcp-remote", "${mcpEndpoint.value}"]
    }
  }
}`,
);

const configNative = computed(
  () => `{
  "mcpServers": {
    "aviation": {
      "transport": {
        "type": "streamable-http",
        "url": "${mcpEndpoint.value}"
      }
    }
  }
}`,
);

const toast = useToast();
async function copy(text: string, label: string) {
  try {
    await navigator.clipboard.writeText(text);
    toast.add({ description: `${label} copied`, color: 'success', icon: 'i-heroicons-check' });
  } catch (err) {
    toast.add({
      description: `Copy failed: ${err instanceof Error ? err.message : String(err)}`,
      color: 'error',
      icon: 'i-heroicons-x-mark',
    });
  }
}

useSeoMeta({
  title: 'Aviation MCP demo — add to Claude Desktop',
  description:
    'An MCP Apps aviation-analytics demo you can add to Claude Desktop, or try in the blog chat.',
});
</script>

<template>
  <UContainer class="py-10 space-y-10" :data-testid="TEST_IDS.NAVIGATION.AVIATION_LINK">
    <section class="space-y-3">
      <h1 class="text-3xl sm:text-4xl text-highlighted font-bold">Aviation MCP demo</h1>
      <p class="text-muted max-w-2xl">
        Ask questions about US commercial aviation — airports, fleets, operators — and get a chart
        back inside your chat. The demo pairs three public-domain datasets (BTS T-100 + FAA Registry
        + OpenFlights) with an MCP server that hands the LLM a schema-scoped SQL surface and returns
        an interactive ECharts iframe.
      </p>
      <p class="text-sm text-dimmed max-w-2xl">
        The same server speaks two hosts: this blog's
        <NuxtLink to="/chat" class="underline">AI chat</NuxtLink> and Claude Desktop. Architecture
        walkthrough in the companion blog post (link below).
      </p>
    </section>

    <section class="space-y-4">
      <h2 class="text-xl font-semibold text-highlighted">Add to Claude Desktop</h2>

      <UAlert
        icon="i-heroicons-information-circle"
        color="info"
        variant="subtle"
        title="Preconditions"
        description="Requires Claude Desktop with MCP support (any recent build). The wrapped variant additionally needs Node.js 18+ on your PATH — npx installs mcp-remote on first run."
      />

      <UCard>
        <template #header>
          <div class="flex items-center justify-between gap-4">
            <div>
              <div class="font-medium text-highlighted">
                Option A — npx mcp-remote (recommended)
              </div>
              <div class="text-xs text-dimmed">
                Broadest compatibility. Bridges Claude Desktop's stdio transport to our Streamable
                HTTP endpoint.
              </div>
            </div>
            <UButton
              size="xs"
              color="neutral"
              variant="outline"
              icon="i-heroicons-clipboard"
              label="Copy"
              @click="copy(configWrapped, 'mcp-remote config')"
            />
          </div>
        </template>
        <pre class="text-xs leading-relaxed overflow-x-auto"><code>{{ configWrapped }}</code></pre>
        <template #footer>
          <p class="text-xs text-dimmed">
            Paste into
            <code>~/Library/Application Support/Claude/claude_desktop_config.json</code> (macOS) or
            <code>%APPDATA%\Claude\claude_desktop_config.json</code> (Windows), then restart Claude
            Desktop.
          </p>
        </template>
      </UCard>

      <UCard>
        <template #header>
          <div class="flex items-center justify-between gap-4">
            <div>
              <div class="font-medium text-highlighted">
                Option B — native Streamable HTTP (newer Claude Desktop)
              </div>
              <div class="text-xs text-dimmed">
                Skips the Node bridge. Verify your Claude Desktop build supports the
                <code>streamable-http</code> transport before using this shape.
              </div>
            </div>
            <UButton
              size="xs"
              color="neutral"
              variant="outline"
              icon="i-heroicons-clipboard"
              label="Copy"
              @click="copy(configNative, 'native HTTP config')"
            />
          </div>
        </template>
        <pre class="text-xs leading-relaxed overflow-x-auto"><code>{{ configNative }}</code></pre>
      </UCard>
    </section>

    <section class="space-y-4">
      <h2 class="text-xl font-semibold text-highlighted">How it looks</h2>
      <p class="text-sm text-muted">
        Screenshots to be captured post-deploy (tracked in the Unit 7 report).
      </p>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <img
          src="/images/mcp-ui-in-chat/claude-desktop-chart.png"
          alt="Chart iframe rendering inside Claude Desktop"
          class="rounded-lg border border-muted/20 bg-muted/5"
          loading="lazy"
        />
        <img
          src="/images/mcp-ui-in-chat/blog-chat-chart.png"
          alt="Chart iframe rendering inside the blog chat"
          class="rounded-lg border border-muted/20 bg-muted/5"
          loading="lazy"
        />
        <img
          src="/images/mcp-ui-in-chat/followup-chips.png"
          alt="Follow-up chip click appends a new chart"
          class="rounded-lg border border-muted/20 bg-muted/5"
          loading="lazy"
        />
      </div>
    </section>

    <section class="space-y-3">
      <h2 class="text-xl font-semibold text-highlighted">Architecture</h2>
      <p class="text-muted max-w-2xl">
        Companion blog post walkthrough: <em>link TBD</em> (Unit 8). The MCP server lives at
        <code>{{ mcpEndpoint }}</code> and speaks JSON-RPC over Streamable HTTP. DuckDB reads
        Parquet from a private GCS bucket via HMAC-authenticated httpfs; chart options are generated
        by Claude Sonnet with defense-in-depth SQL safety (AST allowlist + row cap + query timeout).
      </p>
    </section>
  </UContainer>
</template>
