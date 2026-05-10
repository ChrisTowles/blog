<script setup lang="ts">
const route = useRoute();
const isLessonRunner = computed(() => route.path.startsWith('/typing/lesson/'));
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
            to="/typing/progress"
            class="text-slate-700 hover:text-slate-900 dark:text-slate-200 dark:hover:text-white"
          >
            Progress
          </NuxtLink>
        </nav>
      </div>
    </header>
    <main class="mx-auto max-w-5xl px-4 py-8 md:px-6 md:py-12">
      <slot />
    </main>
  </div>
</template>
