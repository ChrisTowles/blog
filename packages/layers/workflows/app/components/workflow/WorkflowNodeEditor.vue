<script setup lang="ts">
import type { Node } from '@vue-flow/core';
import type { WorkflowNodeType } from '../../../shared/workflow-types';
import { NODE_TYPE_DEFAULTS } from '../../../shared/workflow-types';
import { MODEL_HAIKU, MODEL_SONNET, MODEL_OPUS } from '~~/shared/models';

const props = defineProps<{
  node: Node | null;
  readonly?: boolean;
}>();

const emit = defineEmits<{
  (e: 'update:node', node: Node): void;
  (e: 'delete-node', nodeId: string): void;
}>();

const MODELS = [
  { label: 'Haiku', value: MODEL_HAIKU },
  { label: 'Sonnet', value: MODEL_SONNET },
  { label: 'Opus', value: MODEL_OPUS },
];

function updateData(key: string, value: unknown) {
  if (!props.node) return;
  emit('update:node', {
    ...props.node,
    data: { ...props.node.data, [key]: value },
  });
}
</script>

<template>
  <div v-if="node" class="p-4 space-y-4">
    <div class="flex items-center gap-2 pb-2 border-b border-gray-200 dark:border-gray-700">
      <span class="text-lg">{{
        NODE_TYPE_DEFAULTS[node.type as WorkflowNodeType]?.icon ?? '⚡'
      }}</span>
      <h3 class="flex-1 font-semibold text-gray-800 dark:text-gray-200 capitalize">
        {{ node.type }} Node
      </h3>
      <UButton
        v-if="!readonly"
        color="error"
        variant="ghost"
        icon="i-lucide-trash-2"
        size="xs"
        @click="emit('delete-node', node.id)"
      />
    </div>

    <UFormGroup label="Label">
      <UInput
        :value="node.data.label"
        :disabled="readonly"
        @input="updateData('label', ($event.target as HTMLInputElement).value)"
      />
    </UFormGroup>

    <UFormGroup label="Model">
      <USelect
        :value="node.data.model"
        :options="MODELS"
        :disabled="readonly"
        @change="updateData('model', $event)"
      />
    </UFormGroup>

    <div class="grid grid-cols-2 gap-3">
      <UFormGroup label="Temperature">
        <UInput
          type="number"
          :value="node.data.temperature"
          :min="0"
          :max="2"
          :step="0.1"
          :disabled="readonly"
          @input="updateData('temperature', parseFloat(($event.target as HTMLInputElement).value))"
        />
      </UFormGroup>
      <UFormGroup label="Max Tokens">
        <UInput
          type="number"
          :value="node.data.maxTokens"
          :min="1"
          :max="8192"
          :disabled="readonly"
          @input="updateData('maxTokens', parseInt(($event.target as HTMLInputElement).value))"
        />
      </UFormGroup>
    </div>

    <UFormGroup label="Prompt">
      <UTextarea
        :value="node.data.prompt"
        :rows="6"
        placeholder="What is {{input.query}}?"
        class="font-mono text-sm"
        :disabled="readonly"
        @input="updateData('prompt', ($event.target as HTMLTextAreaElement).value)"
      />
      <template #hint>
        <span class="text-xs text-gray-400"
          >Use &#123;&#123;nodeId.field&#125;&#125; for upstream outputs</span
        >
      </template>
    </UFormGroup>

    <UFormGroup label="Output Schema">
      <WorkflowSchemaEditor
        :schema="node.data.outputSchema"
        :readonly="readonly"
        @update:schema="updateData('outputSchema', $event)"
      />
    </UFormGroup>
  </div>

  <div v-else class="p-6 flex flex-col items-center justify-center gap-3 text-center">
    <UIcon name="i-lucide-mouse-pointer-click" class="w-8 h-8 text-gray-500" />
    <p class="text-sm text-gray-400">Click a node on the canvas to edit its properties</p>
    <p class="text-xs text-gray-500">Or drag a node type from the left sidebar to add one</p>
  </div>
</template>
