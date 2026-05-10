<script setup lang="ts">
const route = useRoute();
const isLessonRunner = computed(() => route.path.startsWith('/typing/lesson/'));

// Hydrate available learners on first render (signed-in only). Errors are
// silent — the layout renders fine for anonymous users.
const { setLearners } = useActiveLearner();
const { data: groupsData } = await useFetch('/api/typing/groups', {
  default: () => ({ groups: [] as Array<{ learners: Array<unknown> }> }),
  // Auth-required endpoint; ignore 401 silently.
  ignoreResponseError: true,
});
watchEffect(() => {
  const all = groupsData.value?.groups ?? [];
  // Flatten all learners across groups (single-group-per-learner UI for MVP,
  // but the schema supports many).
  const merged = all.flatMap((g) => g.learners as never[]);
  setLearners(merged as never);
});
</script>

<template>
  <div class="min-h-screen bg-slate-50 dark:bg-slate-900">
    <header
      v-if="!isLessonRunner"
      class="border-b border-slate-200 bg-white px-6 py-4 dark:border-slate-700 dark:bg-slate-800"
    >
      <div class="mx-auto flex max-w-5xl items-center justify-between">
        <NuxtLink to="/typing" class="text-xl font-semibold text-slate-900 dark:text-slate-100">
          Typing
        </NuxtLink>
        <nav class="flex items-center gap-4 text-sm">
          <NuxtLink
            to="/typing"
            class="text-slate-700 hover:text-slate-900 dark:text-slate-200 dark:hover:text-white"
          >
            Lessons
          </NuxtLink>
          <NuxtLink
            to="/typing/topics"
            class="text-slate-700 hover:text-slate-900 dark:text-slate-200 dark:hover:text-white"
          >
            Topics
          </NuxtLink>
          <NuxtLink
            to="/typing/spelling"
            class="text-slate-700 hover:text-slate-900 dark:text-slate-200 dark:hover:text-white"
          >
            Spelling
          </NuxtLink>
          <NuxtLink
            to="/typing/progress"
            class="text-slate-700 hover:text-slate-900 dark:text-slate-200 dark:hover:text-white"
          >
            Progress
          </NuxtLink>
          <TypingLearnerSwitcher />
        </nav>
      </div>
    </header>
    <main class="mx-auto max-w-5xl px-4 py-8 md:px-6 md:py-12">
      <slot />
    </main>
  </div>
</template>
