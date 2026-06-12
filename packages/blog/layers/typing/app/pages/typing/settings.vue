<script setup lang="ts">
definePageMeta({
  layout: 'typing',
});

useHead({
  title: 'Typing — Settings',
  meta: [
    { name: 'description', content: 'Typing app settings — voice, audio toggle, accessibility.' },
  ],
});

const { audioOn } = useTypingAudio();
const { progress, setCurrentStage } = useTypingProgress();
</script>

<template>
  <div class="space-y-8">
    <header>
      <h1 class="text-3xl font-bold text-slate-900 dark:text-slate-100">Settings</h1>
    </header>

    <section
      class="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800"
    >
      <h2 class="text-lg font-semibold text-slate-900 dark:text-slate-100">Audio</h2>
      <p class="mb-3 text-sm text-slate-600 dark:text-slate-300">
        Per-key audio plays the letter name as you reach each new key. Default ON for stages 1-5.
      </p>
      <label class="inline-flex items-center gap-3">
        <input v-model="audioOn" type="checkbox" class="h-4 w-4" />
        <span class="text-slate-900 dark:text-slate-100">Audio on</span>
      </label>
    </section>

    <section
      class="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800"
    >
      <h2 class="text-lg font-semibold text-slate-900 dark:text-slate-100">Stage</h2>
      <p class="mb-3 text-sm text-slate-600 dark:text-slate-300">
        Set the current stage for anonymous progress. Logged-in learners use the per-learner stage
        on their record.
      </p>
      <select
        :value="progress.currentStage"
        class="rounded-lg border border-slate-300 bg-white px-3 py-2 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100"
        @change="(e: Event) => setCurrentStage(Number((e.target as HTMLSelectElement).value))"
      >
        <option v-for="s in 20" :key="s" :value="s">Stage {{ s }}</option>
      </select>
    </section>
  </div>
</template>
