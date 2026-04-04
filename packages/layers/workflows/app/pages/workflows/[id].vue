<script setup lang="ts">
import { VueFlow, useVueFlow } from '@vue-flow/core';
import { Background } from '@vue-flow/background';
import { Controls } from '@vue-flow/controls';
import { MiniMap } from '@vue-flow/minimap';
import '@vue-flow/core/dist/style.css';
import '@vue-flow/core/dist/theme-default.css';
import type { Node, Edge, NodeTypesObject, ViewportTransform } from '@vue-flow/core';
import { log } from 'evlog';
import type { WorkflowNodeType } from '../../../shared/workflow-types';
import { NODE_TYPE_DEFAULTS } from '../../../shared/workflow-types';
import {
  workflowDetailResponseSchema,
  workflowEditorQuerySchema,
} from '../../../shared/workflow-schemas';

definePageMeta({ middleware: 'auth' });

const route = useRoute();
const router = useRouter();
const workflowId = route.params.id as string;

// Validate URL query params at page load
const queryResult = workflowEditorQuerySchema.safeParse(route.query);
if (!queryResult.success) {
  log.warn('workflow-editor', `Invalid URL query params, resetting: ${String(queryResult.error)}`);
  await router.replace({ query: {} });
}

const { data: workflow } = await useFetch(`/api/workflows/${workflowId}`, {
  transform: (raw) => {
    const result = workflowDetailResponseSchema.safeParse(raw);
    if (!result.success) {
      log.warn('workflow-editor', `Invalid workflow API response: ${String(result.error)}`);
      return null;
    }
    return result.data;
  },
});

if (!workflow.value) {
  throw createError({ statusCode: 404, message: 'Workflow not found' });
}

useSeoMeta({ title: workflow.value.name });

const nodes = ref<Node[]>(workflow.value.nodes ?? []);
const edges = ref<Edge[]>(workflow.value.edges ?? []);

const config = useRuntimeConfig();
const { setViewport, project, addNodes, onNodeClick } = useVueFlow();

const selectedNode = computed((): Node | null => {
  const nodeId = route.query.node as string | undefined;
  return nodeId ? (nodes.value.find((n: Node) => n.id === nodeId) ?? null) : null;
});
const viewport = ref<{ x: number; y: number; zoom: number }>(
  workflow.value?.viewport ?? { x: 0, y: 0, zoom: 1 },
);

// URL-driven active tab (edit | run)
const activeTab = computed({
  get: () => (route.query.tab === 'run' ? 'run' : 'edit'),
  set: (val: string | number) => {
    router.replace({ query: { ...route.query, tab: val === 'run' ? 'run' : undefined } });
  },
});

const tabItems = [
  { label: 'Edit', slot: 'edit', value: 'edit' },
  { label: 'Run', slot: 'run', value: 'run' },
];

const { startRun, runStatus, isRunning, finalOutput, runError } = useWorkflowRun(workflowId);
// @ts-expect-error Vue ref<Node[]> triggers TS2589 due to deep VueFlow generic types
const { save, saveStatus } = useWorkflowAutoSave(workflowId, nodes, edges, viewport);

watch(
  [nodes, edges],
  () => {
    if (!isRunning.value) save();
  },
  { deep: true },
);

function selectNode(nodeId: string | null) {
  router.replace({ query: { ...route.query, node: nodeId || undefined } });
}

onNodeClick(({ node }) => {
  selectNode(node.id);
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
}

// Update __runStatus on existing node objects in-place to avoid VueFlow re-render
watch(
  runStatus,
  (status) => {
    for (const node of nodes.value) {
      const nodeStatus = status.get(node.id);
      if (nodeStatus) {
        node.data = { ...node.data, __runStatus: nodeStatus };
      } else if (node.data.__runStatus) {
        // Clear stale status
        const { __runStatus: _, ...rest } = node.data;
        node.data = rest;
      }
    }
  },
  { deep: true },
);

// Auto-switch to Run tab when a run starts
watch(isRunning, (running) => {
  if (running) activeTab.value = 'run';
});

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
        model: config.public.model as string,
        temperature: defaults.temperature,
        maxTokens: defaults.maxTokens,
        outputSchema: { type: 'object', properties: {}, required: [] },
        inputMapping: {},
      },
    },
  ]);
}

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

    <!-- Right panel: tabbed editor + run panel -->
    <div
      class="w-96 border-l border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 flex flex-col"
    >
      <UTabs v-model="activeTab" :items="tabItems" class="flex-1 min-h-0">
        <template #edit>
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
        </template>
        <template #run>
          <WorkflowRunPanel
            :workflow-id="workflowId"
            :is-running="isRunning"
            :final-output="finalOutput"
            :run-error="runError"
            :run-status="runStatus"
            :nodes="nodes"
            @run="startRun()"
            @select-node="
              (id: string) => {
                selectNode(id);
                activeTab = 'edit';
              }
            "
          />
        </template>
      </UTabs>
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
