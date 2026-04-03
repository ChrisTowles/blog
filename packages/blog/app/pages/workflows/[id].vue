<script setup lang="ts">
import { VueFlow, useVueFlow } from '@vue-flow/core';
import { Background } from '@vue-flow/background';
import { Controls } from '@vue-flow/controls';
import { MiniMap } from '@vue-flow/minimap';
import '@vue-flow/core/dist/style.css';
import '@vue-flow/core/dist/theme-default.css';
import type { Node, Edge, NodeTypesObject, ViewportTransform } from '@vue-flow/core';

definePageMeta({ middleware: 'auth' });

interface WorkflowResponse {
  id: string;
  name: string;
  description: string | null;
  viewport: ViewportTransform | null;
  version: number;
  nodes: Node[];
  edges: Edge[];
}

const route = useRoute();
const workflowId = route.params.id as string;

const { data: workflow } = await useFetch<WorkflowResponse>(`/api/workflows/${workflowId}`);

if (!workflow.value) {
  throw createError({ statusCode: 404, message: 'Workflow not found' });
}

useSeoMeta({ title: workflow.value.name });

const nodes = ref<Node[]>(workflow.value.nodes ?? []);
const edges = ref<Edge[]>(workflow.value.edges ?? []);

const { setViewport } = useVueFlow();

onMounted(() => {
  if (workflow.value?.viewport) {
    setViewport(workflow.value.viewport);
  }
});

const nodeTypes: NodeTypesObject = {
  prompt: resolveComponent('WorkflowPromptNode') as NodeTypesObject[string],
  transform: resolveComponent('WorkflowPromptNode') as NodeTypesObject[string],
  classifier: resolveComponent('WorkflowPromptNode') as NodeTypesObject[string],
  validator: resolveComponent('WorkflowPromptNode') as NodeTypesObject[string],
};
</script>

<template>
  <div class="flex h-screen overflow-hidden">
    <!-- Left sidebar placeholder (WorkflowSidebar added in Task 9) -->
    <div
      class="w-56 border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 flex items-center justify-center"
    >
      <p class="text-xs text-gray-400">Node palette (Task 9)</p>
    </div>

    <!-- Center: VueFlow canvas -->
    <div class="flex-1 relative">
      <VueFlow
        v-model:nodes="nodes"
        v-model:edges="edges"
        :node-types="nodeTypes"
        :default-edge-options="{ type: 'smoothstep', animated: true }"
        fit-view-on-init
        class="h-full"
      >
        <Background />
        <Controls />
        <MiniMap />
      </VueFlow>
    </div>

    <!-- Right panel placeholder (WorkflowNodeEditor added in Task 10) -->
    <div
      class="w-96 border-l border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-y-auto"
    >
      <p class="p-4 text-gray-400 text-sm">Select a node to edit</p>
    </div>
  </div>
</template>

<style>
/* VueFlow CSS must NOT be scoped — library styles need global scope */
.vue-flow {
  background: #f9fafb;
}
.dark .vue-flow {
  background: #111827;
}
</style>
