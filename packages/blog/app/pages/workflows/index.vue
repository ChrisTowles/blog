<script setup lang="ts">
definePageMeta({ middleware: 'auth' });
useSeoMeta({ title: 'Workflows' });

const { data: workflows, refresh } = await useFetch('/api/workflows');

async function createWorkflow() {
  const name = prompt('Workflow name:');
  if (!name?.trim()) return;

  const { id } = await $fetch<{ id: string }>('/api/workflows', {
    method: 'POST',
    body: { name: name.trim() },
  });

  await navigateTo(`/workflows/${id}`);
}

async function deleteWorkflow(id: string) {
  if (!confirm('Delete this workflow?')) return;
  await $fetch(`/api/workflows/${id}`, { method: 'DELETE' });
  await refresh();
}
</script>

<template>
  <UContainer class="py-8">
    <div class="flex items-center justify-between mb-6">
      <UPageHeader title="Workflows" description="Visual AI prompt chains" />
      <UButton icon="i-lucide-plus" @click="createWorkflow">New Workflow</UButton>
    </div>

    <div v-if="!workflows?.length" class="text-center py-16 text-gray-500">
      No workflows yet. Create one to get started.
    </div>

    <UPageGrid v-else>
      <UPageCard
        v-for="w in workflows"
        :key="w.id"
        :title="w.name"
        :description="w.description ?? 'No description'"
        :to="`/workflows/${w.id}`"
      >
        <template #footer>
          <div class="flex items-center justify-between text-sm text-gray-400">
            <span>v{{ w.version }}</span>
            <UButton
              size="xs"
              color="error"
              variant="ghost"
              icon="i-lucide-trash-2"
              @click.prevent="deleteWorkflow(w.id)"
            />
          </div>
        </template>
      </UPageCard>
    </UPageGrid>
  </UContainer>
</template>
