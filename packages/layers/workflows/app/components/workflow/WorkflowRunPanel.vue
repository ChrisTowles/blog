<script setup lang="ts">
import type { Node } from '@vue-flow/core';
import type { NodeRunStatus } from '../../../shared/workflow-types';

const props = defineProps<{
  workflowId: string;
  isRunning: boolean;
  finalOutput: Record<string, Record<string, unknown>> | null;
  runError: string | null;
  runStatus: Map<string, NodeRunStatus>;
  nodes: Node[];
}>();

const emit = defineEmits<{
  (e: 'run', input: Record<string, unknown>): void;
  (e: 'select-node', nodeId: string): void;
}>();

const { data: runs, refresh } = useFetch(`/api/workflows/${props.workflowId}/runs`);

const expandedNodes = ref<Set<string>>(new Set());
const inputValues = ref<Record<string, string>>({});

const INPUT_PLACEHOLDER_RE = /\{\{input\.(\w+)\}\}/g;

const inputFields = computed(() => {
  const fields = new Set<string>();
  for (const node of props.nodes) {
    const prompt = (node.data?.prompt as string) ?? '';
    for (const m of prompt.matchAll(INPUT_PLACEHOLDER_RE)) {
      if (m[1]) fields.add(m[1]);
    }
  }
  return Array.from(fields);
});

function handleRun() {
  const input: Record<string, unknown> = {};
  for (const field of inputFields.value) {
    input[field] = inputValues.value[field] ?? '';
  }
  emit('run', input);
}

function toggleNode(nodeId: string) {
  const next = new Set(expandedNodes.value);
  if (next.has(nodeId)) next.delete(nodeId);
  else next.add(nodeId);
  expandedNodes.value = next;
}

// Auto-expand nodes as they complete
watch(
  () => props.runStatus,
  (status) => {
    const next = new Set(expandedNodes.value);
    let changed = false;
    for (const [nodeId, s] of status) {
      if ((s.status === 'completed' || s.status === 'failed') && !next.has(nodeId)) {
        next.add(nodeId);
        changed = true;
      }
    }
    if (changed) expandedNodes.value = next;
  },
  { deep: true },
);

// Get sorted node statuses (in execution order based on when they appear)
const nodeEntries = computed(() => {
  const entries: Array<{ nodeId: string; label: string; status: NodeRunStatus }> = [];
  for (const [nodeId, status] of props.runStatus) {
    const node = props.nodes.find((n) => n.id === nodeId);
    const data = node?.data as Record<string, unknown> | undefined;
    entries.push({ nodeId, label: (data?.label as string) ?? nodeId, status });
  }
  return entries;
});

watch(
  () => props.isRunning,
  (running) => {
    if (!running) refresh();
  },
);
</script>

<template>
  <div class="flex flex-col h-full">
    <!-- Input fields + Run button -->
    <div class="p-4 border-b border-gray-200 dark:border-gray-700 space-y-3">
      <!-- Dynamic input fields based on {{input.*}} in prompts -->
      <div v-if="inputFields.length" class="space-y-2">
        <h4 class="text-xs font-semibold uppercase tracking-wide text-gray-500">Workflow Input</h4>
        <div v-for="field in inputFields" :key="field">
          <UFormGroup :label="field" size="sm">
            <UInput
              v-model="inputValues[field]"
              :placeholder="`Enter ${field}…`"
              :disabled="isRunning"
            />
          </UFormGroup>
        </div>
      </div>

      <UButton
        :loading="isRunning"
        :disabled="isRunning"
        icon="i-lucide-play"
        block
        @click="handleRun"
      >
        {{ isRunning ? 'Running…' : 'Run Workflow' }}
      </UButton>
    </div>

    <!-- Live node execution log -->
    <div v-if="nodeEntries.length" class="flex-1 overflow-y-auto">
      <div class="p-3 space-y-2">
        <h4 class="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">
          Execution Log
        </h4>

        <div
          v-for="entry in nodeEntries"
          :key="entry.nodeId"
          class="rounded-lg border transition-all"
          :class="{
            'border-blue-400 bg-blue-500/5': entry.status.status === 'running',
            'border-green-400/50 bg-green-500/5': entry.status.status === 'completed',
            'border-red-400/50 bg-red-500/5': entry.status.status === 'failed',
            'border-gray-600': entry.status.status === 'pending',
          }"
        >
          <!-- Node header (always visible) -->
          <button
            class="w-full flex items-center gap-2 px-3 py-2 text-left"
            @click="toggleNode(entry.nodeId)"
          >
            <!-- Status indicator -->
            <span
              v-if="entry.status.status === 'running'"
              class="w-2 h-2 rounded-full bg-blue-400 animate-pulse"
            />
            <span
              v-else-if="entry.status.status === 'completed'"
              class="w-2 h-2 rounded-full bg-green-400"
            />
            <span
              v-else-if="entry.status.status === 'failed'"
              class="w-2 h-2 rounded-full bg-red-400"
            />
            <span v-else class="w-2 h-2 rounded-full bg-gray-500" />

            <span class="flex-1 text-sm font-medium text-gray-200 truncate">
              {{ entry.label }}
            </span>

            <!-- Metrics -->
            <span v-if="entry.status.latencyMs" class="text-xs text-gray-500 tabular-nums">
              {{ (entry.status.latencyMs / 1000).toFixed(1) }}s
            </span>
            <span v-if="entry.status.tokensIn" class="text-xs text-gray-500 tabular-nums">
              {{ entry.status.tokensIn }}+{{ entry.status.tokensOut }} tok
            </span>

            <!-- Expand chevron -->
            <UIcon
              name="i-lucide-chevron-down"
              class="w-4 h-4 text-gray-500 transition-transform"
              :class="{ 'rotate-180': expandedNodes.has(entry.nodeId) }"
            />
          </button>

          <!-- Expanded detail (output) -->
          <div
            v-if="expandedNodes.has(entry.nodeId)"
            class="px-3 pb-3 space-y-2 border-t border-gray-700/50"
          >
            <!-- Running spinner -->
            <div v-if="entry.status.status === 'running'" class="flex items-center gap-2 pt-2">
              <UIcon name="i-lucide-loader-2" class="w-4 h-4 text-blue-400 animate-spin" />
              <span class="text-xs text-blue-400">Calling Claude API…</span>
            </div>

            <!-- Output -->
            <div v-if="entry.status.output" class="pt-2">
              <div class="text-xs font-medium text-gray-500 mb-1">Output</div>
              <pre
                class="text-xs bg-gray-800/50 rounded p-2 overflow-auto max-h-40 text-green-300 whitespace-pre-wrap"
                >{{ JSON.stringify(entry.status.output, null, 2) }}</pre
              >
            </div>

            <!-- Error -->
            <div v-if="entry.status.error" class="pt-2">
              <div class="text-xs font-medium text-red-400 mb-1">Error</div>
              <pre class="text-xs bg-red-900/20 rounded p-2 text-red-300 whitespace-pre-wrap">{{
                entry.status.error
              }}</pre>
            </div>

            <!-- Link to node -->
            <button
              class="text-xs text-blue-400 hover:underline mt-1"
              @click="emit('select-node', entry.nodeId)"
            >
              View node on canvas
            </button>
          </div>
        </div>
      </div>

      <!-- Final output -->
      <div v-if="finalOutput" class="p-3 border-t border-gray-200 dark:border-gray-700">
        <h4 class="text-xs font-semibold uppercase tracking-wide text-green-500 mb-2">
          Final Output
        </h4>
        <pre
          class="text-xs bg-gray-800/50 rounded p-2 overflow-auto max-h-48 text-gray-300 whitespace-pre-wrap"
          >{{ JSON.stringify(finalOutput, null, 2) }}</pre
        >
      </div>

      <!-- Run error -->
      <div v-if="runError" class="p-3 border-t border-gray-200 dark:border-gray-700">
        <div class="text-sm text-red-500">{{ runError }}</div>
      </div>
    </div>

    <!-- Empty state / Run history (when no active run) -->
    <div v-else class="flex-1 overflow-y-auto p-4">
      <h4 class="text-sm font-semibold mb-3 text-gray-700 dark:text-gray-300">Run History</h4>
      <div v-if="!runs?.length" class="text-xs text-gray-400">No runs yet</div>
      <div v-else class="space-y-2">
        <div
          v-for="run in runs"
          :key="run.id"
          class="rounded border border-gray-200 dark:border-gray-700 p-2 text-xs"
        >
          <div class="flex items-center justify-between">
            <span
              class="font-medium"
              :class="{
                'text-green-600': run.status === 'completed',
                'text-red-500': run.status === 'failed',
                'text-blue-500': run.status === 'running',
                'text-gray-500': run.status === 'pending',
              }"
            >
              {{ run.status }}
            </span>
            <span class="text-gray-400">{{
              new Date(run.createdAt ?? '').toLocaleTimeString()
            }}</span>
          </div>
          <div v-if="run.error" class="text-red-400 mt-1 truncate">{{ run.error }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
