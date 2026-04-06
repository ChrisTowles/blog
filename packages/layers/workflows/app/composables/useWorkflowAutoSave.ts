import { useDebounceFn, useTimeoutFn } from '@vueuse/core';
import type { Node, Edge } from '@vue-flow/core';
import type { Ref } from 'vue';

export function useWorkflowAutoSave(
  workflowId: string,
  nodes: Ref<Node[]>,
  edges: Ref<Edge[]>,
  viewport: Ref<{ x: number; y: number; zoom: number }>,
  name?: Ref<string>,
) {
  const saveStatus = ref<'idle' | 'saving' | 'saved' | 'error'>('idle');

  const { start: resetToIdle } = useTimeoutFn(
    () => {
      saveStatus.value = 'idle';
    },
    2000,
    { immediate: false },
  );

  const save = useDebounceFn(async () => {
    saveStatus.value = 'saving';
    try {
      await $fetch(`/api/workflows/${workflowId}`, {
        method: 'PUT',
        body: {
          ...(name ? { name: name.value } : {}),
          nodes: nodes.value,
          edges: edges.value,
          viewport: viewport.value,
        },
      });
      saveStatus.value = 'saved';
      resetToIdle();
    } catch {
      saveStatus.value = 'error';
    }
  }, 1000);

  return { save, saveStatus };
}
