<script setup lang="ts">
import { VueFlow, useVueFlow } from '@vue-flow/core';
import { Background } from '@vue-flow/background';
import { Controls } from '@vue-flow/controls';
import { MiniMap } from '@vue-flow/minimap';
import '@vue-flow/core/dist/style.css';
import '@vue-flow/core/dist/theme-default.css';
import type { Node, Edge, NodeTypesObject, ViewportTransform } from '@vue-flow/core';
import type { WorkflowNodeType } from '~~/shared/workflow-types';
import { NODE_TYPE_DEFAULTS } from '~~/shared/workflow-types';

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

const { setViewport, project, addNodes } = useVueFlow();

onMounted(() => {
  if (workflow.value?.viewport) {
    setViewport(workflow.value.viewport);
  }
});

function onDrop(event: DragEvent) {
  event.preventDefault();
  const type = event.dataTransfer?.getData('application/workflow-node') as WorkflowNodeType;
  if (!type) return;

  const canvasEl = (event.target as HTMLElement).closest('.vue-flow');
  const rect = canvasEl?.getBoundingClientRect();
  if (!rect) return;

  const position = project({
    x: event.clientX - rect.left,
    y: event.clientY - rect.top,
  });

  const defaults = NODE_TYPE_DEFAULTS[type];
  const nodeId = `node_${Date.now()}`;

  addNodes([
    {
      id: nodeId,
      type,
      position,
      data: {
        label: `${type.charAt(0).toUpperCase() + type.slice(1)} Node`,
        prompt: '',
        model: 'claude-sonnet-4-20250514',
        temperature: defaults.temperature,
        maxTokens: defaults.maxTokens,
        outputSchema: { type: 'object', properties: {}, required: [] },
        inputMapping: {},
      },
    },
  ]);
}

const nodeTypes: NodeTypesObject = {
  prompt: resolveComponent('WorkflowPromptNode') as NodeTypesObject[string],
  transform: resolveComponent('WorkflowPromptNode') as NodeTypesObject[string],
  classifier: resolveComponent('WorkflowPromptNode') as NodeTypesObject[string],
  validator: resolveComponent('WorkflowPromptNode') as NodeTypesObject[string],
};
</script>

<template>
  <div class="flex h-screen overflow-hidden">
    <!-- Left sidebar: node palette -->
    <WorkflowSidebar />

    <!-- Center: VueFlow canvas -->
    <div class="flex-1 relative" @dragover.prevent @drop="onDrop">
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
