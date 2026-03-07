<script setup lang="ts">
defineProps<{
  slug: string;
}>();

const showChat = ref(true);
</script>

<template>
  <div class="h-[calc(100dvh-var(--ui-header-height))]">
    <!-- Desktop: side-by-side resizable panels -->
    <div class="hidden md:block h-full">
      <UDashboardGroup storage-key="reader-panels" persistent>
        <UDashboardPanel
          id="reader-content"
          :default-size="65"
          :min-size="30"
          resizable
          :ui="{ body: 'p-0 sm:p-0' }"
        >
          <template #body>
            <ReaderContentPanel :slug="slug" />
          </template>
        </UDashboardPanel>

        <UDashboardPanel
          id="reader-chat"
          :default-size="35"
          :min-size="20"
          resizable
          :ui="{ body: 'p-0 sm:p-0' }"
          class="border-l border-(--ui-border)"
        >
          <template #body>
            <ReaderChatPanel />
          </template>
        </UDashboardPanel>
      </UDashboardGroup>
    </div>

    <!-- Mobile: stacked with toggle -->
    <div class="md:hidden h-full flex flex-col">
      <div class="flex items-center justify-end gap-2 p-2 border-b border-(--ui-border)">
        <UButton
          :icon="showChat ? 'i-lucide-book-open' : 'i-lucide-message-circle'"
          :label="showChat ? 'Read' : 'Chat'"
          size="sm"
          variant="ghost"
          color="neutral"
          @click="showChat = !showChat"
        />
      </div>

      <div class="flex-1 min-h-0">
        <ReaderContentPanel v-if="!showChat" :slug="slug" />
        <ReaderChatPanel v-else />
      </div>
    </div>
  </div>
</template>
