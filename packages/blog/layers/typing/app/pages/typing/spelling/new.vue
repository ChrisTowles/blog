<script setup lang="ts">
import { TEST_IDS } from '~~/shared/test-ids';

definePageMeta({
  layout: 'typing',
});

useHead({
  title: 'Typing — New spelling list',
  meta: [
    {
      name: 'description',
      content: 'Add this weeks spelling words by paste, type, or worksheet photo.',
    },
  ],
});

const { active } = useActiveLearner();
const router = useRouter();

const tab = ref<'manual' | 'image'>('manual');
const extracted = ref<string[]>([]);
const error = ref<string | null>(null);
const saving = ref(false);

const today = new Date().toISOString().slice(0, 10);
const weekOf = ref(today);

function onExtracted(words: string[]) {
  extracted.value = words;
  tab.value = 'manual';
}

async function save(words: string[], source: 'paste' | 'type' | 'image' = 'type') {
  error.value = null;
  if (!active.value) {
    error.value = 'Pick a learner first';
    return;
  }
  saving.value = true;
  try {
    await $fetch('/api/typing/spelling', {
      method: 'POST',
      body: {
        learnerId: active.value.id,
        weekOf: weekOf.value,
        words,
        source,
      },
    });
    await router.push('/typing/spelling');
  } catch (e: unknown) {
    const err = e as { statusMessage?: string };
    error.value = err.statusMessage ?? 'Save failed';
  } finally {
    saving.value = false;
  }
}
</script>

<template>
  <div :data-testid="TEST_IDS.TYPING.SPELLING_NEW_PAGE" class="space-y-6">
    <header>
      <NuxtLink
        to="/typing/spelling"
        class="text-sm text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
      >
        &larr; Spelling lists
      </NuxtLink>
      <h1 class="mt-2 text-3xl font-bold text-slate-900 dark:text-slate-100">New spelling list</h1>
    </header>

    <section
      v-if="!active"
      class="rounded-xl border border-amber-300 bg-amber-50 p-5 text-amber-900 dark:border-amber-700 dark:bg-amber-950/40 dark:text-amber-200"
    >
      Switch to a learner profile (top right) before adding a list.
    </section>

    <template v-else>
      <label class="block">
        <span class="block text-sm text-slate-700 dark:text-slate-200">Week of</span>
        <input
          v-model="weekOf"
          type="date"
          class="mt-1 rounded-lg border border-slate-300 bg-white px-3 py-2 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
        />
      </label>

      <div class="flex gap-2 text-sm">
        <button
          type="button"
          class="rounded-lg border px-3 py-1.5"
          :class="
            tab === 'manual'
              ? 'border-amber-500 bg-amber-50 text-amber-900 dark:border-amber-400 dark:bg-amber-950/40'
              : 'border-slate-300 dark:border-slate-600'
          "
          @click="tab = 'manual'"
        >
          Type or paste
        </button>
        <button
          type="button"
          class="rounded-lg border px-3 py-1.5"
          :class="
            tab === 'image'
              ? 'border-amber-500 bg-amber-50 text-amber-900 dark:border-amber-400 dark:bg-amber-950/40'
              : 'border-slate-300 dark:border-slate-600'
          "
          @click="tab = 'image'"
        >
          Photograph the worksheet
        </button>
      </div>

      <TypingSpellingListForm
        v-if="tab === 'manual'"
        :initial-words="extracted"
        @save="(words, source) => save(words, source)"
      />
      <TypingSpellingImageDropzone v-else :learner-id="active.id" @extracted="onExtracted" />

      <p
        v-if="error"
        class="rounded-lg border border-rose-300 bg-rose-50 p-3 text-sm text-rose-900 dark:border-rose-700 dark:bg-rose-950/40 dark:text-rose-200"
      >
        {{ error }}
      </p>
      <p v-if="saving" class="text-sm text-slate-500">Saving…</p>
    </template>
  </div>
</template>
