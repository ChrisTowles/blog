<script setup lang="ts">
import type { Node } from '@vue-flow/core';
import type { WorkflowNodeType } from '../../../shared/workflow-types';
import { NODE_TYPE_DEFAULTS } from '../../../shared/workflow-types';

const props = defineProps<{
  node: Node | null;
}>();

const emit = defineEmits<{
  (e: 'update:node', node: Node): void;
}>();

const MODELS = [
  { label: 'Claude Sonnet 4', value: 'claude-sonnet-4-20250514' },
  { label: 'Claude Haiku 4.5', value: 'claude-haiku-4-5-20251001' },
  { label: 'Claude Opus 4', value: 'claude-opus-4-20250514' },
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
      <h3 class="font-semibold text-gray-800 dark:text-gray-200 capitalize">
        {{ node.type }} Node
      </h3>
    </div>

    <UFormGroup label="Label">
      <UInput
        :value="node.data.label"
        @input="updateData('label', ($event.target as HTMLInputElement).value)"
      />
    </UFormGroup>

    <UFormGroup label="Model">
      <USelect :value="node.data.model" :options="MODELS" @change="updateData('model', $event)" />
    </UFormGroup>

    <div class="grid grid-cols-2 gap-3">
      <UFormGroup label="Temperature">
        <UInput
          type="number"
          :value="node.data.temperature"
          :min="0"
          :max="2"
          :step="0.1"
          @input="updateData('temperature', parseFloat(($event.target as HTMLInputElement).value))"
        />
      </UFormGroup>
      <UFormGroup label="Max Tokens">
        <UInput
          type="number"
          :value="node.data.maxTokens"
          :min="1"
          :max="8192"
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
        @update:schema="updateData('outputSchema', $event)"
      />
    </UFormGroup>
  </div>

  <div v-else class="p-6 text-center text-gray-400 text-sm">Select a node to edit</div>
</template>
