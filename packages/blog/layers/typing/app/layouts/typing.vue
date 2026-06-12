<script setup lang="ts">
const route = useRoute();
const isLessonRunner = computed(() => route.path.startsWith('/typing/lesson/'));

const { loggedIn } = useUserSession();

// Hydrate available learners on first render (signed-in only). Errors are
// silent — the layout renders fine for anonymous users.
const { setLearners } = useActiveLearner();
const { data: groupsData } = await useFetch('/api/typing/groups', {
  key: 'typing:groups',
  default: () => ({ groups: [] as Array<{ learners: Array<unknown> }> }),
  // Auth-required endpoint; ignore 401 silently. Skip SSR — the session
  // cookie isn't attached to the internal fetch during SSR, so the
  // request would 401 and the page would hydrate with empty groups.
  ignoreResponseError: true,
  server: false,
});
watchEffect(() => {
  const all = groupsData.value?.groups ?? [];
  // Flatten all learners across groups (single-group-per-learner UI for MVP,
  // but the schema supports many).
  const merged = all.flatMap((g) => g.learners as never[]);
  setLearners(merged as never);
});

const items = computed(() => [
  {
    label: 'Lessons',
    to: '/typing',
    icon: 'i-lucide-keyboard',
    active: route.path === '/typing',
  },
  {
    label: 'Topics',
    to: '/typing/topics',
    icon: 'i-lucide-sparkles',
    active: route.path.startsWith('/typing/topics'),
  },
  {
    label: 'Spelling',
    to: '/typing/spelling',
    icon: 'i-lucide-book-open',
    active: route.path.startsWith('/typing/spelling'),
  },
  {
    label: 'Progress',
    to: '/typing/progress',
    icon: 'i-lucide-trending-up',
    active: route.path.startsWith('/typing/progress'),
  },
]);
</script>

<template>
  <div class="min-h-screen bg-slate-50 dark:bg-slate-900">
    <UHeader v-if="!isLessonRunner">
      <template #left>
        <div class="flex items-center gap-2">
          <LogoAndHeader />
          <span class="text-xl text-(--ui-text-muted)">/</span>
          <NuxtLink
            to="/typing"
            class="text-xl font-bold text-(--ui-text-highlighted) hover:text-(--ui-primary)"
          >
            Typing
          </NuxtLink>
        </div>
      </template>

      <UNavigationMenu :items="items" variant="link" />

      <template #right="slotProps">
        <TypingLearnerSwitcher />
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
          to="/login?redirect=/typing"
        />
      </template>

      <template #body>
        <UNavigationMenu :items="items" orientation="vertical" class="-mx-2.5" />
      </template>
    </UHeader>

    <main class="mx-auto max-w-5xl px-4 py-8 md:px-6 md:py-12">
      <slot />
    </main>
  </div>
</template>
