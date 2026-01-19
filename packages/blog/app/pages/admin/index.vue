<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
});

const { data: configData, status } = await useFetch('/api/admin/config');

const adminPages = [
  {
    title: 'RAG Admin',
    description: 'Contextual Hybrid Search System - manage documents, test search, run ingestion',
    to: '/admin/rag',
    icon: 'i-heroicons-cpu-chip',
  },
];
</script>

<template>
  <UContainer class="py-8">
    <div class="max-w-4xl mx-auto space-y-6">
      <div class="flex items-center gap-3">
        <UIcon name="i-heroicons-cog-6-tooth" class="w-8 h-8 text-primary" />
        <div>
          <h1 class="text-2xl font-bold">Admin</h1>
          <p class="text-sm text-muted">Site administration tools</p>
        </div>
      </div>

      <!-- Server Config -->
      <UCard>
        <template #header>
          <div class="flex items-center gap-2">
            <UIcon name="i-heroicons-server" class="w-5 h-5" />
            <span class="font-semibold">Server Configuration</span>
            <UBadge v-if="configData" :color="configData.valid ? 'success' : 'error'" size="xs">
              {{ configData.valid ? 'Valid' : 'Invalid' }}
            </UBadge>
          </div>
        </template>

        <div v-if="status === 'pending'" class="text-center py-4">
          <UIcon name="i-heroicons-arrow-path" class="w-5 h-5 animate-spin" />
        </div>

        <div v-else-if="configData?.errors?.length" class="space-y-2 mb-4">
          <div v-for="err in configData.errors" :key="err.path" class="text-error text-sm">
            {{ err.path }}: {{ err.message }}
          </div>
        </div>

        <div v-if="configData?.config" class="font-mono text-sm space-y-1">
          <div v-for="(value, key) in configData.config" :key="key" class="flex gap-2">
            <span class="text-muted min-w-64">{{ key }}</span>
            <span class="text-primary">{{ value }}</span>
          </div>
        </div>
      </UCard>

      <!-- Admin Pages -->
      <div class="grid gap-4">
        <UCard
          v-for="page in adminPages"
          :key="page.to"
          class="hover:ring-2 hover:ring-primary transition-all cursor-pointer"
          @click="navigateTo(page.to)"
        >
          <div class="flex items-center gap-4">
            <div class="p-3 bg-primary/10 rounded-lg">
              <UIcon :name="page.icon" class="w-6 h-6 text-primary" />
            </div>
            <div class="flex-1">
              <h2 class="font-semibold">
                {{ page.title }}
              </h2>
              <p class="text-sm text-muted">
                {{ page.description }}
              </p>
            </div>
            <UIcon name="i-heroicons-chevron-right" class="w-5 h-5 text-muted" />
          </div>
        </UCard>
      </div>
    </div>
  </UContainer>
</template>
