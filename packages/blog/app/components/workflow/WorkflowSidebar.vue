<script setup lang="ts">
import type { WorkflowNodeType } from '~~/shared/workflow-types';
import { NODE_TYPE_DEFAULTS } from '~~/shared/workflow-types';

const nodeTypeList: { type: WorkflowNodeType; label: string; description: string }[] = [
  { type: 'prompt', label: 'Prompt', description: 'Freeform LLM call → structured output' },
  { type: 'transform', label: 'Transform', description: 'Reshape/extract upstream data' },
  { type: 'classifier', label: 'Classifier', description: 'Categorize into predefined classes' },
  { type: 'validator', label: 'Validator', description: 'Check constraints, return pass/fail' },
];

function onDragStart(event: DragEvent, type: WorkflowNodeType) {
  event.dataTransfer?.setData('application/workflow-node', type);
  event.dataTransfer!.effectAllowed = 'move';
}
</script>

<template>
  <div
    class="w-56 border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 flex flex-col"
  >
    <div class="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
      <h2 class="text-sm font-semibold text-gray-700 dark:text-gray-300">Node Types</h2>
    </div>

    <div class="p-3 space-y-2 flex-1 overflow-y-auto">
      <div
        v-for="n in nodeTypeList"
        :key="n.type"
        draggable="true"
        class="rounded-lg border border-gray-200 dark:border-gray-700 p-3 cursor-grab hover:border-blue-300 hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-colors select-none"
        @dragstart="onDragStart($event, n.type)"
      >
        <div class="flex items-center gap-2 mb-1">
          <span>{{ NODE_TYPE_DEFAULTS[n.type].icon }}</span>
          <span class="text-sm font-medium text-gray-700 dark:text-gray-300">{{ n.label }}</span>
        </div>
        <p class="text-xs text-gray-400">{{ n.description }}</p>
      </div>
    </div>
  </div>
</template>
