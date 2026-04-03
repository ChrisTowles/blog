<script setup lang="ts">
const props = defineProps<{
  workflowId: string;
  isRunning: boolean;
  finalOutput: Record<string, Record<string, unknown>> | null;
  runError: string | null;
  runStatus: Map<
    string,
    { status: string; tokensIn?: number; tokensOut?: number; latencyMs?: number }
  >;
}>();

const emit = defineEmits<{
  (e: 'run'): void;
}>();

const { data: runs, refresh } = useFetch(`/api/workflows/${props.workflowId}/runs`);

watch(
  () => props.isRunning,
  (running) => {
    if (!running) refresh();
  },
);
</script>

<template>
  <div class="flex flex-col h-full">
    <!-- Run controls -->
    <div class="p-4 border-b border-gray-200 dark:border-gray-700">
      <UButton
        :loading="isRunning"
        :disabled="isRunning"
        icon="i-lucide-play"
        block
        @click="emit('run')"
      >
        {{ isRunning ? 'Running…' : 'Run Workflow' }}
      </UButton>
    </div>

    <!-- Live output -->
    <div v-if="finalOutput || runError" class="p-4 border-b border-gray-200 dark:border-gray-700">
      <h4 class="text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">Output</h4>
      <div v-if="runError" class="text-sm text-red-500">{{ runError }}</div>
      <pre v-else class="text-xs bg-gray-50 dark:bg-gray-800 rounded p-2 overflow-auto max-h-48">{{
        JSON.stringify(finalOutput, null, 2)
      }}</pre>
    </div>

    <!-- Run history -->
    <div class="flex-1 overflow-y-auto p-4">
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
