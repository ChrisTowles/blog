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

const { loggedIn } = useUserSession();

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

const isTemplate = Boolean(workflow.value.isTemplate);
const canEdit = loggedIn.value && !isTemplate;

const nodes = shallowRef<Node[]>((workflow.value.nodes ?? []) as Node[]);
const edges = shallowRef<Edge[]>((workflow.value.edges ?? []) as Edge[]);

const config = useRuntimeConfig();
const { setViewport, project, addNodes, onNodeClick, onConnect, addEdges } = useVueFlow();

onConnect((params) => {
  addEdges([params]);
});

// --- UI state: local refs, initialized from URL, synced back as side effect ---
const selectedNodeId = ref<string | null>((route.query.node as string) ?? null);
const activeTab = ref(route.query.tab === 'run' ? 'run' : 'edit');

const selectedNode = computed((): Node | null => {
  return selectedNodeId.value
    ? (nodes.value.find((n: Node) => n.id === selectedNodeId.value) ?? null)
    : null;
});

const viewport = ref<{ x: number; y: number; zoom: number }>(
  workflow.value?.viewport ?? { x: 0, y: 0, zoom: 1 },
);

// Single watcher syncs all UI state to URL
watch([selectedNodeId, activeTab], ([nodeId, tab]) => {
  const query: Record<string, string> = {};
  if (nodeId) query.node = nodeId;
  if (tab === 'run') query.tab = 'run';
  router.replace({ query });
});

const workflowName = ref(workflow.value!.name);

const { startRun, runStatus, isRunning, finalOutput, runError } = useWorkflowRun(workflowId);
const { save, saveStatus } = useWorkflowAutoSave(workflowId, nodes, edges, viewport, workflowName);

const saveStatusClass = computed(() => {
  const map: Record<string, string> = {
    saving: 'text-yellow-500',
    saved: 'text-green-500',
    error: 'text-red-500',
  };
  return map[saveStatus.value] ?? 'text-gray-400';
});

const saveStatusText = computed(() => {
  const map: Record<string, string> = {
    saving: 'Saving…',
    saved: 'Saved',
    error: 'Save failed',
  };
  return map[saveStatus.value] ?? '';
});

watch(
  [nodes, edges, workflowName],
  () => {
    if (!isRunning.value && canEdit) save();
  },
  { deep: true },
);

const cloning = ref(false);

async function cloneWorkflow() {
  if (cloning.value) return;
  cloning.value = true;
  try {
    const { id } = await $fetch<{ id: string }>(`/api/workflows/${workflowId}/clone`, {
      method: 'POST',
    });
    await navigateTo(`/workflows/${id}`);
  } finally {
    cloning.value = false;
  }
}

function selectNode(nodeId: string | null) {
  selectedNodeId.value = nodeId;
}

onNodeClick(({ node }) => {
  selectNode(node.id);
  activeTab.value = 'edit';
});

function onViewportChange({ flowTransform }: { event: unknown; flowTransform: ViewportTransform }) {
  viewport.value = flowTransform;
  if (canEdit) save();
}

function onNodeUpdated(updatedNode: Node) {
  nodes.value = nodes.value.map((n) => (n.id === updatedNode.id ? updatedNode : n));
}

function onNodeDeleted(nodeId: string) {
  nodes.value = nodes.value.filter((n) => n.id !== nodeId);
  edges.value = edges.value.filter((e) => e.source !== nodeId && e.target !== nodeId);
  selectNode(null);
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
        model: config.public.model_fast as string,
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
  <div class="flex flex-col h-screen overflow-hidden">
    <!-- Top bar: workflow name + back nav -->
    <div
      class="flex items-center gap-3 px-4 py-2 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shrink-0"
    >
      <UButton
        variant="ghost"
        icon="i-lucide-arrow-left"
        size="sm"
        to="/workflows"
        aria-label="Back to workflows"
      />
      <input
        v-if="canEdit"
        v-model="workflowName"
        class="text-sm font-semibold text-gray-800 dark:text-gray-200 bg-transparent border-none outline-none truncate min-w-0 flex-1 focus:ring-1 focus:ring-primary-500 rounded px-1 -mx-1"
      />
      <h1 v-else class="text-sm font-semibold text-gray-800 dark:text-gray-200 truncate">
        {{ workflow?.name }}
      </h1>
      <UBadge v-if="isTemplate && !loggedIn" variant="subtle" color="warning" size="xs">
        Read-only — <NuxtLink to="/login" class="underline">sign in</NuxtLink> to clone &amp; edit
      </UBadge>
      <UBadge v-else-if="isTemplate" variant="subtle" color="info" size="xs">Template</UBadge>
      <span v-if="canEdit" class="text-xs ml-auto" :class="saveStatusClass">
        {{ saveStatusText }}
      </span>
    </div>

    <div class="flex flex-1 min-h-0">
      <!-- Left sidebar: node palette (editing only) -->
      <WorkflowSidebar v-if="canEdit" />

      <!-- Center: VueFlow canvas -->
      <div class="flex-1 relative" @dragover.prevent @drop="canEdit && onDrop($event)">
        <VueFlow
          v-model:nodes="nodes"
          v-model:edges="edges"
          :node-types="nodeTypes"
          :default-edge-options="{ type: 'smoothstep', animated: true }"
          :nodes-draggable="canEdit"
          :nodes-connectable="canEdit"
          :elements-selectable="canEdit"
          fit-view-on-init
          class="h-full"
          @move-end="onViewportChange"
        >
          <Background />
          <Controls />
          <MiniMap />
        </VueFlow>
      </div>

      <!-- Right panel: tab bar + content -->
      <div
        class="w-96 border-l border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 flex flex-col"
      >
        <!-- Tab bar -->
        <div class="flex border-b border-gray-200 dark:border-gray-700 shrink-0">
          <button
            class="flex-1 px-4 py-2 text-sm font-medium transition-colors"
            :class="
              activeTab === 'edit'
                ? 'text-primary-500 border-b-2 border-primary-500'
                : 'text-gray-400 hover:text-gray-300'
            "
            @click="activeTab = 'edit'"
          >
            Edit
          </button>
          <button
            class="flex-1 px-4 py-2 text-sm font-medium transition-colors"
            :class="
              activeTab === 'run'
                ? 'text-primary-500 border-b-2 border-primary-500'
                : 'text-gray-400 hover:text-gray-300'
            "
            @click="activeTab = 'run'"
          >
            Run
          </button>
        </div>

        <!-- Tab content -->
        <div class="flex-1 min-h-0 overflow-y-auto">
          <div v-if="activeTab === 'edit'">
            <template v-if="canEdit">
              <WorkflowNodeEditor
                :node="selectedNode"
                @update:node="onNodeUpdated"
                @delete-node="onNodeDeleted"
              />
            </template>
            <div v-else>
              <div
                class="px-4 py-3 bg-yellow-500/10 border-b border-yellow-500/20 text-sm text-yellow-600 dark:text-yellow-400 flex items-center gap-2"
              >
                <UIcon name="i-lucide-lock" class="w-4 h-4 shrink-0" />
                <span>Read-only template.</span>
                <UButton v-if="!loggedIn" to="/login" size="xs" variant="link" class="ml-auto"
                  >Sign in to edit</UButton
                >
              </div>
              <WorkflowNodeEditor :node="selectedNode" :readonly="true" />
            </div>
          </div>
          <div v-else-if="activeTab === 'run'">
            <WorkflowRunPanel
              :workflow-id="workflowId"
              :is-running="isRunning"
              :final-output="finalOutput"
              :run-error="runError"
              :run-status="runStatus"
              :nodes="nodes"
              @run="(input: Record<string, unknown>) => startRun(input)"
              @select-node="
                (id: string) => {
                  selectNode(id);
                  activeTab = 'edit';
                }
              "
            />
          </div>
        </div>
      </div>
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
