<script setup lang="ts">
import { TEST_IDS } from '~~/shared/test-ids';
import type { SpellingList, SpellingProgress } from '~~/shared/typing-types';

definePageMeta({
  layout: 'typing',
});

useHead({ title: 'Typing — Spelling' });

const { active } = useActiveLearner();
const lists = ref<SpellingList[]>([]);
const progressByList = ref<Record<number, SpellingProgress[]>>({});
const error = ref<string | null>(null);

async function load() {
  if (!active.value) {
    lists.value = [];
    progressByList.value = {};
    return;
  }
  try {
    const result = await $fetch<{
      lists: SpellingList[];
      progressByList: Record<number, SpellingProgress[]>;
    }>('/api/typing/spelling', {
      params: { learnerId: active.value.id },
    });
    lists.value = result.lists;
    progressByList.value = result.progressByList ?? {};
    error.value = null;
  } catch (e: unknown) {
    const err = e as { statusMessage?: string };
    error.value = err.statusMessage ?? 'Failed to load lists';
  }
}

function masteredFor(listId: number): string[] {
  return (progressByList.value[listId] ?? []).filter((p) => p.mastered).map((p) => p.word);
}

watchEffect(load);
</script>

<template>
  <div :data-testid="TEST_IDS.TYPING.SPELLING_PAGE" class="space-y-6">
    <header class="flex items-baseline justify-between gap-4">
      <div>
        <h1 class="text-3xl font-bold text-slate-900 dark:text-slate-100">Spelling words</h1>
        <p class="mt-1 text-sm text-slate-600 dark:text-slate-300">
          Type the week's words, paste a list, or photograph the worksheet.
        </p>
      </div>
      <NuxtLink
        to="/typing/spelling/new"
        class="rounded-lg bg-amber-600 px-4 py-2 text-sm font-medium text-white hover:bg-amber-700"
      >
        New list
      </NuxtLink>
    </header>

    <section
      v-if="!active"
      class="rounded-xl border border-amber-300 bg-amber-50 p-5 text-amber-900 dark:border-amber-700 dark:bg-amber-950/40 dark:text-amber-200"
    >
      Switch to a learner profile (top right) to see and add their spelling lists.
    </section>

    <section
      v-else-if="error"
      class="rounded-xl border border-rose-300 bg-rose-50 p-5 text-rose-900 dark:border-rose-700 dark:bg-rose-950/40 dark:text-rose-200"
    >
      {{ error }}
    </section>

    <section
      v-else-if="lists.length === 0"
      class="rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center dark:border-slate-600 dark:bg-slate-800"
    >
      <p class="text-slate-600 dark:text-slate-300">
        No spelling lists yet — add this week's first.
      </p>
    </section>

    <section v-else class="grid gap-4">
      <TypingSpellingMasteryCard
        v-for="list in lists"
        :key="list.id"
        :list="list"
        :mastered-words="masteredFor(list.id)"
      />
    </section>
  </div>
</template>
