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
const router = useRouter();
const workflowId = route.params.id as string;

const { data: workflow } = await useFetch<WorkflowResponse>(`/api/workflows/${workflowId}`);

if (!workflow.value) {
  throw createError({ statusCode: 404, message: 'Workflow not found' });
}

useSeoMeta({ title: workflow.value.name });

const nodes = ref<Node[]>(workflow.value.nodes ?? []);
const edges = ref<Edge[]>(workflow.value.edges ?? []);

const config = useRuntimeConfig();
const { setViewport, project, addNodes, onNodeClick, getViewport } = useVueFlow();

const selectedNode = ref<Node | null>(null);
const viewport = ref<{ x: number; y: number; zoom: number }>({ x: 0, y: 0, zoom: 1 });

const { save, saveStatus } = useWorkflowAutoSave(workflowId, nodes, edges, viewport);

watch([nodes, edges], () => save(), { deep: true });

onNodeClick(({ node }) => {
  selectedNode.value = node;
  router.replace({ query: { ...route.query, node: node.id } });
});

function onViewportChange({ flowTransform }: { event: unknown; flowTransform: ViewportTransform }) {
  viewport.value = flowTransform;
  save();
}

function onNodeUpdated(updatedNode: Node) {
  const idx = nodes.value.findIndex((n) => n.id === updatedNode.id);
  if (idx !== -1) {
    nodes.value[idx] = updatedNode;
  }
  if (selectedNode.value?.id === updatedNode.id) {
    selectedNode.value = updatedNode;
  }
}

onMounted(() => {
  if (workflow.value?.viewport) {
    setViewport(workflow.value.viewport);
  }
  const nodeId = route.query.node as string | undefined;
  if (nodeId) {
    selectedNode.value = nodes.value.find((n) => n.id === nodeId) ?? null;
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
        model: config.public.model as string,
        temperature: defaults.temperature,
        maxTokens: defaults.maxTokens,
        outputSchema: { type: 'object', properties: {}, required: [] },
        inputMapping: {},
      },
    },
  ]);
}

// All types use WorkflowPromptNode for now; distinct components added in later tasks.
const promptNodeComponent = resolveComponent('WorkflowPromptNode') as NodeTypesObject[string];
const nodeTypes: NodeTypesObject = {
  prompt: promptNodeComponent,
  transform: promptNodeComponent,
  classifier: promptNodeComponent,
  validator: promptNodeComponent,
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
        @move-end="onViewportChange"
      >
        <Background />
        <Controls />
        <MiniMap />
      </VueFlow>
    </div>

    <!-- Right panel: node editor -->
    <div
      class="w-96 border-l border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-y-auto"
    >
      <!-- Save status -->
      <div
        class="px-4 py-2 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between"
      >
        <span class="text-sm font-medium text-gray-600 dark:text-gray-400">Node Editor</span>
        <span
          class="text-xs"
          :class="
            saveStatus === 'saving'
              ? 'text-yellow-500'
              : saveStatus === 'saved'
                ? 'text-green-500'
                : saveStatus === 'error'
                  ? 'text-red-500'
                  : 'text-gray-400'
          "
        >
          {{
            saveStatus === 'saving'
              ? 'Saving…'
              : saveStatus === 'saved'
                ? 'Saved ✓'
                : saveStatus === 'error'
                  ? 'Save failed'
                  : ''
          }}
        </span>
      </div>
      <WorkflowNodeEditor :node="selectedNode" @update:node="onNodeUpdated" />
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
