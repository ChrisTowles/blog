<script setup lang="ts">
import { TEST_IDS } from '~~/shared/test-ids';
import type { SpellingList } from '~~/shared/typing-types';

const props = defineProps<{
  list: SpellingList;
  masteredWords?: string[];
}>();

const masteredCount = computed(() => {
  const set = new Set(props.masteredWords ?? []);
  return props.list.words.filter((w) => set.has(w)).length;
});
</script>

<template>
  <article
    :data-testid="TEST_IDS.TYPING.SPELLING_MASTERY_CARD"
    class="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800"
  >
    <header class="mb-3 flex items-baseline justify-between">
      <h3 class="font-semibold text-slate-900 dark:text-slate-100">
        Spelling words · week of {{ props.list.weekOf }}
      </h3>
      <span class="text-sm font-mono text-slate-600 dark:text-slate-300">
        {{ masteredCount }} / {{ props.list.words.length }}
      </span>
    </header>

    <ul class="mb-4 flex flex-wrap gap-2 text-sm">
      <li
        v-for="word in props.list.words"
        :key="word"
        class="rounded-full px-2 py-0.5"
        :class="
          (props.masteredWords ?? []).includes(word)
            ? 'bg-emerald-100 text-emerald-900 dark:bg-emerald-900/40 dark:text-emerald-200'
            : 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-200'
        "
      >
        {{ word }}
      </li>
    </ul>

    <NuxtLink
      :to="`/typing/game/lake-leap?mode=spelling&list=${props.list.id}&words=${props.list.words.join(',')}`"
      class="rounded-lg bg-amber-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-amber-700"
    >
      Play Lake Leap with these words
    </NuxtLink>
  </article>
</template>
