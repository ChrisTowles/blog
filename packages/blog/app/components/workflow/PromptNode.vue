<script setup lang="ts">
import { Handle, Position } from '@vue-flow/core';
import type { NodeProps } from '@vue-flow/core';
import type { NodeRunStatus, WorkflowNodeType } from '~~/shared/workflow-types';
import { NODE_TYPE_DEFAULTS } from '~~/shared/workflow-types';

interface WorkflowNodeData {
  label: string;
  prompt: string;
  model: string;
  temperature: number;
  maxTokens: number;
  outputSchema: Record<string, unknown>;
  inputMapping: Record<string, string>;
  __runStatus?: NodeRunStatus;
}

const props = defineProps<NodeProps<WorkflowNodeData>>();

const nodeType = computed(() => (props.type as WorkflowNodeType) ?? 'prompt');
const defaults = computed(() => NODE_TYPE_DEFAULTS[nodeType.value]);
const runStatus = computed(() => props.data?.__runStatus);

const schemaFields = computed(() => {
  const schema = props.data?.outputSchema;
  if (!schema?.properties) return [];
  return Object.keys(schema.properties as Record<string, unknown>);
});

const promptPreview = computed(() => {
  const p = props.data?.prompt ?? '';
  return p.length > 80 ? p.slice(0, 77) + '…' : p;
});

const statusClasses = computed(() => {
  const s = runStatus.value?.status;
  if (s === 'running') return 'ring-2 ring-blue-400 ring-offset-1';
  if (s === 'completed') return 'ring-2 ring-green-400 ring-offset-1';
  if (s === 'failed') return 'ring-2 ring-red-400 ring-offset-1';
  return '';
});

const accentColorClass = computed(() => {
  const map: Record<string, string> = {
    blue: 'bg-blue-500',
    violet: 'bg-violet-500',
    amber: 'bg-amber-500',
    green: 'bg-green-500',
  };
  return map[defaults.value.accentColor] ?? 'bg-blue-500';
});
</script>

<template>
  <div
    class="w-52 rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800 transition-all"
    :class="statusClasses"
  >
    <Handle type="target" :position="Position.Top" class="!bg-gray-400" />

    <div class="flex items-center gap-2 px-3 py-2 rounded-t-lg" :class="accentColorClass">
      <span class="text-base">{{ defaults.icon }}</span>
      <span class="flex-1 truncate text-sm font-semibold text-white">{{
        data?.label || type
      }}</span>
      <span class="text-xs text-white/70 font-mono">{{ data?.model?.split('-')[1] ?? '' }}</span>
    </div>

    <div class="px-3 py-2 space-y-1.5">
      <p v-if="promptPreview" class="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
        {{ promptPreview }}
      </p>
      <p v-else class="text-xs text-gray-400 italic">No prompt set</p>

      <div v-if="schemaFields.length" class="flex flex-wrap gap-1 pt-1">
        <span
          v-for="field in schemaFields"
          :key="field"
          class="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded px-1.5 py-0.5"
        >
          {{ field }}
        </span>
      </div>
    </div>

    <div
      v-if="runStatus?.status === 'completed'"
      class="px-3 pb-2 text-xs text-gray-400 flex gap-2"
    >
      <span>{{ runStatus.tokensIn }}+{{ runStatus.tokensOut }} tok</span>
      <span>{{ runStatus.latencyMs }}ms</span>
    </div>
    <div v-if="runStatus?.status === 'failed'" class="px-3 pb-2 text-xs text-red-400 truncate">
      {{ runStatus.error }}
    </div>

    <Handle type="source" :position="Position.Bottom" class="!bg-gray-400" />
  </div>
</template>
