<script setup lang="ts">
definePageMeta({ middleware: 'auth' });
useSeoMeta({ title: 'Workflows' });

const { data: workflows, refresh } = await useFetch('/api/workflows');

const newName = ref('');
const creating = ref(false);
const seeding = ref(false);
const cloning = ref<string | null>(null);

async function seedExamples() {
  if (seeding.value) return;
  seeding.value = true;
  try {
    await $fetch('/api/workflows/seed', { method: 'POST' });
    await refresh();
  } finally {
    seeding.value = false;
  }
}

async function createWorkflow() {
  const name = newName.value.trim();
  if (!name || creating.value) return;

  creating.value = true;
  try {
    const { id } = await $fetch<{ id: string }>('/api/workflows', {
      method: 'POST',
      body: { name },
    });
    newName.value = '';
    await navigateTo(`/workflows/${id}`);
  } finally {
    creating.value = false;
  }
}

async function cloneWorkflow(id: string) {
  if (cloning.value) return;
  cloning.value = id;
  try {
    const { id: cloneId } = await $fetch<{ id: string }>(`/api/workflows/${id}/clone`, {
      method: 'POST',
    });
    await navigateTo(`/workflows/${cloneId}`);
  } finally {
    cloning.value = null;
  }
}

async function deleteWorkflow(id: string) {
  if (!confirm('Delete this workflow?')) return;
  await $fetch(`/api/workflows/${id}`, { method: 'DELETE' });
  await refresh();
}

const templates = computed(() => workflows.value?.filter((w) => w.isTemplate) ?? []);
const userWorkflows = computed(() => workflows.value?.filter((w) => !w.isTemplate) ?? []);
</script>

<template>
  <UContainer class="py-8">
    <div class="flex items-center justify-between mb-6">
      <UPageHeader title="Workflows" description="Visual AI prompt chains" />
    </div>

    <form class="flex gap-2 mb-8" @submit.prevent="createWorkflow">
      <UInput
        v-model="newName"
        placeholder="New workflow name…"
        size="lg"
        class="flex-1"
        :disabled="creating"
        autofocus
      />
      <UButton
        type="submit"
        icon="i-lucide-plus"
        size="lg"
        :loading="creating"
        :disabled="!newName.trim()"
      >
        Create
      </UButton>
      <UButton
        variant="outline"
        icon="i-lucide-download"
        size="lg"
        :loading="seeding"
        @click="seedExamples"
      >
        Load Examples
      </UButton>
    </form>

    <!-- Templates section -->
    <div v-if="templates.length" class="mb-10">
      <h3 class="text-sm font-semibold uppercase tracking-wide text-gray-500 mb-3">Templates</h3>
      <UPageGrid>
        <UPageCard
          v-for="w in templates"
          :key="w.id"
          :title="w.name"
          :description="w.description ?? 'No description'"
        >
          <template #footer>
            <div class="flex items-center justify-between">
              <UBadge variant="subtle" color="info" size="xs">Template</UBadge>
              <UButton
                size="xs"
                variant="outline"
                icon="i-lucide-copy"
                :loading="cloning === w.id"
                @click="cloneWorkflow(w.id)"
              >
                Use Template
              </UButton>
            </div>
          </template>
        </UPageCard>
      </UPageGrid>
    </div>

    <!-- User workflows section -->
    <div v-if="userWorkflows.length">
      <h3
        v-if="templates.length"
        class="text-sm font-semibold uppercase tracking-wide text-gray-500 mb-3"
      >
        My Workflows
      </h3>
      <UPageGrid>
        <UPageCard
          v-for="w in userWorkflows"
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
    </div>

    <div v-if="!templates.length && !userWorkflows.length" class="text-center py-16 text-gray-500">
      No workflows yet. Type a name above or load examples to get started.
    </div>
  </UContainer>
</template>
