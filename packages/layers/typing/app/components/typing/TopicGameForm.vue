<script setup lang="ts">
import { TEST_IDS } from '~~/shared/test-ids';
import { MAX_STAGE, MIN_TOPIC_STAGE, type LessonRow } from '~~/shared/typing-types';

const emit = defineEmits<{
  (e: 'generated', lesson: LessonRow): void;
}>();

const STAGE_OPTIONS = Array.from(
  { length: MAX_STAGE - MIN_TOPIC_STAGE + 1 },
  (_, i) => MIN_TOPIC_STAGE + i,
);

const topic = ref('');
const stage = ref(MIN_TOPIC_STAGE);
const kind = ref<'sentence' | 'paragraph'>('sentence');
const length = ref<'short' | 'medium'>('short');

const generating = ref(false);
const error = ref<string | null>(null);

async function submit() {
  if (!topic.value.trim() || generating.value) return;
  generating.value = true;
  error.value = null;
  try {
    const result = await $fetch<{ lesson: LessonRow }>('/api/typing/lessons/generate', {
      method: 'POST',
      body: {
        stage: stage.value,
        topic: topic.value.trim(),
        kind: kind.value,
        length: length.value,
      },
    });
    emit('generated', result.lesson);
  } catch (e: unknown) {
    const err = e as { statusMessage?: string; data?: { statusMessage?: string } };
    error.value = err.statusMessage ?? err.data?.statusMessage ?? 'Generation failed';
  } finally {
    generating.value = false;
  }
}
</script>

<template>
  <form
    :data-testid="TEST_IDS.TYPING.TOPIC_GAME_FORM"
    class="space-y-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800"
    @submit.prevent="submit"
  >
    <h2 class="text-xl font-semibold text-slate-900 dark:text-slate-100">
      Generate a topic exercise
    </h2>
    <p class="text-sm text-slate-600 dark:text-slate-300">
      Pick a topic — Pokemon, soccer, marble run — and Claude writes a kid-safe typing exercise
      using only the keys you've unlocked. Topic games unlock at Stage {{ MIN_TOPIC_STAGE }} once
      you have enough letters to spell real words.
    </p>

    <label class="block">
      <span class="block text-sm text-slate-700 dark:text-slate-200">Topic</span>
      <input
        v-model="topic"
        required
        maxlength="80"
        placeholder="Poppy Playtime"
        class="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100"
      />
    </label>

    <div class="flex flex-wrap gap-3">
      <label class="block">
        <span class="block text-sm text-slate-700 dark:text-slate-200">Stage</span>
        <select
          v-model.number="stage"
          class="mt-1 rounded-lg border border-slate-300 bg-white px-3 py-2 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100"
        >
          <option v-for="s in STAGE_OPTIONS" :key="s" :value="s">Stage {{ s }}</option>
        </select>
      </label>
      <label class="block">
        <span class="block text-sm text-slate-700 dark:text-slate-200">Kind</span>
        <select
          v-model="kind"
          class="mt-1 rounded-lg border border-slate-300 bg-white px-3 py-2 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100"
        >
          <option value="sentence">Sentence</option>
          <option value="paragraph">Paragraph</option>
        </select>
      </label>
      <label class="block">
        <span class="block text-sm text-slate-700 dark:text-slate-200">Length</span>
        <select
          v-model="length"
          class="mt-1 rounded-lg border border-slate-300 bg-white px-3 py-2 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100"
        >
          <option value="short">Short</option>
          <option value="medium">Medium</option>
        </select>
      </label>
    </div>

    <button
      type="submit"
      :disabled="generating || !topic.trim()"
      :data-testid="TEST_IDS.TYPING.TOPIC_GAME_SUBMIT"
      class="rounded-lg bg-amber-700 px-4 py-2 text-sm font-medium text-white hover:bg-amber-800 disabled:opacity-50"
    >
      {{ generating ? 'Generating…' : 'Generate' }}
    </button>

    <p
      v-if="error"
      class="rounded-lg border border-rose-300 bg-rose-50 p-3 text-sm text-rose-900 dark:border-rose-700 dark:bg-rose-950/40 dark:text-rose-200"
    >
      {{ error }}
    </p>
  </form>
</template>
