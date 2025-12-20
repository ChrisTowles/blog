<script setup lang="ts">
useHead({
  title: 'Chatbot Flavors'
})

const { data: chatbots } = await useFetch('/api/chatbots')
</script>

<template>
  <div class="min-h-screen bg-default">
    <!-- Header -->
    <header class="border-b border-default">
      <UContainer class="flex items-center justify-between h-16">
        <h1 class="text-lg font-semibold">
          Chatbot Flavors
        </h1>
        <UButton
          to="/chat"
          variant="ghost"
          icon="i-lucide-message-square"
          label="Chat"
        />
      </UContainer>
    </header>

    <!-- Chatbot Grid -->
    <UContainer class="py-12">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <UCard
          v-for="bot in chatbots"
          :key="bot.slug"
          :to="`/bot/${bot.slug}`"
          class="hover:ring-2 transition-all cursor-pointer"
          :class="`hover:ring-${bot.theme?.primaryColor || 'blue'}-500/50`"
        >
          <div class="flex items-start gap-4">
            <div
              class="w-12 h-12 rounded-lg flex items-center justify-center shrink-0"
              :class="`bg-${bot.theme?.primaryColor || 'blue'}-100 dark:bg-${bot.theme?.primaryColor || 'blue'}-900/30`"
            >
              <UIcon
                :name="bot.icon"
                class="w-6 h-6"
                :class="`text-${bot.theme?.primaryColor || 'blue'}-500`"
              />
            </div>
            <div class="min-w-0">
              <div class="flex items-center gap-2">
                <h3 class="font-semibold truncate">
                  {{ bot.name }}
                </h3>
                <UBadge
                  v-if="bot.isDefault"
                  color="neutral"
                  variant="subtle"
                  size="xs"
                >
                  Default
                </UBadge>
              </div>
              <p class="text-sm text-muted line-clamp-2">
                {{ bot.description }}
              </p>
            </div>
          </div>
        </UCard>
      </div>
    </UContainer>
  </div>
</template>
