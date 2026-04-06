<script setup lang="ts">
import { Handle, Position } from '@vue-flow/core';
import type { NodeProps } from '@vue-flow/core';
import type { NodeRunStatus, WorkflowNodeType } from '../../../shared/workflow-types';
import { NODE_TYPE_DEFAULTS } from '../../../shared/workflow-types';

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

const outputPreview = computed(() => {
  if (!runStatus.value?.output) return '';
  const str = JSON.stringify(runStatus.value.output);
  return str.length > 120 ? str.slice(0, 120) + '…' : str;
});

const modelShortName = computed(() => {
  const model = props.data?.model ?? '';
  if (model.includes('haiku')) return 'haiku';
  if (model.includes('sonnet')) return 'sonnet';
  if (model.includes('opus')) return 'opus';
  return model.split('-').slice(0, 2).join(' ');
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
      <span class="text-xs text-white/70 font-mono">{{ modelShortName }}</span>
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

    <!-- Running indicator -->
    <div v-if="runStatus?.status === 'running'" class="px-3 pb-2 flex items-center gap-1.5">
      <span class="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
      <span class="text-xs text-blue-400">Running…</span>
    </div>

    <!-- Completed: metrics + output preview -->
    <div v-if="runStatus?.status === 'completed'" class="px-3 pb-2 space-y-1">
      <div class="text-xs text-gray-400 flex gap-2">
        <span>{{ runStatus.tokensIn }}+{{ runStatus.tokensOut }} tok</span>
        <span>{{ ((runStatus.latencyMs ?? 0) / 1000).toFixed(1) }}s</span>
      </div>
      <div
        v-if="outputPreview"
        class="text-xs bg-green-900/20 text-green-300 rounded px-1.5 py-1 line-clamp-3 break-all"
      >
        {{ outputPreview }}
      </div>
    </div>

    <!-- Failed -->
    <div v-if="runStatus?.status === 'failed'" class="px-3 pb-2 text-xs text-red-400 truncate">
      {{ runStatus.error }}
    </div>

    <Handle type="source" :position="Position.Bottom" class="!bg-gray-400" />
  </div>
</template>
