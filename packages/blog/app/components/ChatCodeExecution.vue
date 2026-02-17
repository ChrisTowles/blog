<script setup lang="ts">
import type { CodeExecutionPart } from '~~/shared/chat-types';

defineProps<{
  execution: CodeExecutionPart;
}>();

const showCode = ref(false);
</script>

<template>
  <div class="my-2 space-y-2">
    <!-- Running indicator -->
    <div v-if="execution.state === 'running'" class="flex items-center gap-2 text-sm text-muted">
      <UIcon name="i-lucide-loader-2" class="size-4 animate-spin" />
      <span>Running code...</span>
    </div>

    <!-- Executed code (collapsible) -->
    <div v-if="execution.code">
      <button
        class="flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
        @click="showCode = !showCode"
      >
        <UIcon
          :name="showCode ? 'i-lucide-chevron-down' : 'i-lucide-chevron-right'"
          class="size-3.5"
        />
        <UIcon name="i-lucide-code-2" class="size-3.5" />
        <span>{{ execution.language }} code executed</span>
      </button>
      <div v-if="showCode" class="mt-2">
        <pre
          class="rounded-md bg-zinc-900 border border-zinc-800 p-3 text-xs overflow-x-auto"
        ><code>{{ execution.code }}</code></pre>
      </div>
    </div>

    <!-- stdout -->
    <div
      v-if="execution.stdout && execution.state === 'done'"
      class="rounded-md bg-zinc-900 border border-zinc-800 p-3 text-xs font-mono overflow-x-auto"
    >
      <div
        class="flex items-center gap-1.5 text-zinc-500 mb-2 text-[10px] uppercase tracking-wider"
      >
        <UIcon name="i-lucide-terminal" class="size-3" />
        Output
      </div>
      <pre class="text-zinc-200 whitespace-pre-wrap">{{ execution.stdout }}</pre>
    </div>

    <!-- stderr -->
    <div
      v-if="execution.stderr && execution.state === 'done'"
      class="rounded-md bg-red-950/30 border border-red-900/30 p-3 text-xs font-mono overflow-x-auto"
    >
      <div class="flex items-center gap-1.5 text-red-400 mb-2 text-[10px] uppercase tracking-wider">
        <UIcon name="i-lucide-alert-triangle" class="size-3" />
        Stderr
      </div>
      <pre class="text-red-300 whitespace-pre-wrap">{{ execution.stderr }}</pre>
    </div>
  </div>
</template>
