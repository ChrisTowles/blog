<script setup lang="ts">
const { loggedIn } = useUserSession();
</script>

<template>
  <div class="min-h-screen bg-slate-50 dark:bg-slate-900">
    <UHeader>
      <template #left>
        <div class="flex items-center gap-2">
          <LogoAndHeader />
          <span class="text-xl text-(--ui-text-muted)">/</span>
          <NuxtLink
            to="/mini-cog"
            class="text-xl font-bold text-(--ui-text-highlighted) hover:text-(--ui-primary)"
          >
            Mini-Cog
          </NuxtLink>
        </div>
      </template>

      <template #right="slotProps">
        <UColorModeButton v-if="!loggedIn" />
        <UserMenu
          v-if="loggedIn"
          :collapsed="(slotProps as Record<string, unknown>)?.collapsed as boolean | undefined"
        />
        <UButton
          v-if="!loggedIn"
          :label="(slotProps as Record<string, unknown>)?.collapsed ? '' : 'Sign in'"
          icon="i-lucide-log-in"
          color="neutral"
          variant="ghost"
          to="/login?redirect=/mini-cog"
        />
      </template>
    </UHeader>

    <main class="mx-auto max-w-3xl px-4 py-8 md:px-6 md:py-12">
      <slot />
    </main>
  </div>
</template>
