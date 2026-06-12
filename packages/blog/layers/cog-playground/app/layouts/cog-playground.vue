<script setup lang="ts">
const { loggedIn } = useUserSession();
const route = useRoute();

// /cog-playground/mini-cog -> "Mini-Cog"; root just shows the umbrella label.
const screenLabel = computed(() => {
  const segments = route.path.split('/').filter(Boolean);
  const slug = segments[1]; // "cog-playground" / <slug>
  if (!slug) return null;
  return slug
    .split('-')
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join('-');
});

const loginRedirect = computed(() => `/login?redirect=${encodeURIComponent(route.fullPath)}`);
</script>

<template>
  <div class="min-h-screen bg-slate-50 dark:bg-slate-900">
    <UHeader>
      <template #left>
        <div class="flex items-center gap-2">
          <LogoAndHeader />
          <span class="text-xl text-(--ui-text-muted)">/</span>
          <NuxtLink
            to="/cog-playground"
            class="text-xl font-bold text-(--ui-text-highlighted) hover:text-(--ui-primary)"
          >
            Cog Playground
          </NuxtLink>
          <template v-if="screenLabel">
            <span class="text-xl text-(--ui-text-muted)">/</span>
            <span class="text-xl text-(--ui-text-toned)">{{ screenLabel }}</span>
          </template>
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
          :to="loginRedirect"
        />
      </template>
    </UHeader>

    <main class="mx-auto max-w-3xl px-4 py-8 md:px-6 md:py-12">
      <slot />
    </main>
  </div>
</template>
