<script setup lang="ts">
import type { ToolUsePart, ToolResultPart } from '~~/shared/chat-types';

const props = defineProps<{
  toolUse: ToolUsePart;
  toolResult?: ToolResultPart;
}>();

const open = ref(false);

const isComplete = computed(() => !!props.toolResult);

const toolIcon = computed(() => {
  const icons: Record<string, string> = {
    searchBlogContent: 'i-lucide-search',
    getCurrentDateTime: 'i-lucide-clock',
    getAuthorInfo: 'i-lucide-user',
    getBlogTopics: 'i-lucide-tags',
  };
  return icons[props.toolUse.toolName] || 'i-lucide-wrench';
});

const toolLabel = computed(() => {
  const labels: Record<string, string> = {
    searchBlogContent: 'Search Blog',
    getCurrentDateTime: 'Get Time',
    getAuthorInfo: 'Author Info',
    getBlogTopics: 'Blog Topics',
  };
  return labels[props.toolUse.toolName] || props.toolUse.toolName;
});

function formatArgs(args: Record<string, unknown>): string {
  if (Object.keys(args).length === 0) return '';
  const entries = Object.entries(args);
  if (entries.length === 1) {
    const [, value] = entries[0]!;
    return typeof value === 'string' ? `"${value}"` : JSON.stringify(value);
  }
  return JSON.stringify(args, null, 2);
}

function formatResult(result: unknown): string {
  if (typeof result === 'string') return result;
  return JSON.stringify(result, null, 2);
}
</script>

<template>
  <UCollapsible v-model:open="open" class="flex flex-col gap-1 my-3">
    <UButton
      class="p-0 group"
      color="neutral"
      variant="link"
      :leading-icon="isComplete ? toolIcon : 'i-lucide-loader-circle'"
      trailing-icon="i-lucide-chevron-down"
      :ui="{
        leadingIcon: isComplete ? '' : 'animate-spin',
        trailingIcon: 'group-data-[state=open]:rotate-180 transition-transform duration-200',
      }"
    >
      <span class="text-sm">
        {{ toolLabel }}
        <span v-if="toolUse.args && Object.keys(toolUse.args).length > 0" class="text-muted">
          {{ formatArgs(toolUse.args) }}
        </span>
        <span v-if="!isComplete" class="text-muted ml-1">running...</span>
      </span>
    </UButton>

    <template #content>
      <div class="pl-6 border-l-2 border-muted/30 ml-2">
        <div v-if="toolUse.args && Object.keys(toolUse.args).length > 1" class="mb-2">
          <span class="text-xs text-muted font-semibold">Input:</span>
          <pre class="text-xs text-muted bg-muted/10 rounded p-2 mt-1 overflow-x-auto">{{
            formatArgs(toolUse.args)
          }}</pre>
        </div>
        <div v-if="toolResult">
          <span class="text-xs text-muted font-semibold">Result:</span>
          <pre class="text-xs text-muted bg-muted/10 rounded p-2 mt-1 overflow-x-auto max-h-48">{{
            formatResult(toolResult.result)
          }}</pre>
        </div>
        <div v-else class="text-xs text-muted italic">Waiting for result...</div>
      </div>
    </template>
  </UCollapsible>
</template>
