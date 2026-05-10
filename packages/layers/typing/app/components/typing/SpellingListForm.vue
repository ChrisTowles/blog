<script setup lang="ts">
import { TEST_IDS } from '~~/shared/test-ids';

const props = defineProps<{
  initialWords?: string[];
}>();

const emit = defineEmits<{
  (e: 'save', words: string[], source: 'paste' | 'type'): void;
}>();

const tab = ref<'type' | 'paste'>('type');
const wordsInput = ref(props.initialWords?.join('\n') ?? '');
const pastedText = ref('');

const error = ref<string | null>(null);

function parse(input: string): string[] {
  return input
    .split(/[\n,]+/)
    .map((w) => w.trim().toLowerCase())
    .filter((w) => w.length > 0);
}

function validate(words: string[]): { ok: true } | { ok: false; reason: string } {
  if (words.length === 0) return { ok: false, reason: 'add at least one word' };
  if (words.length > 30) return { ok: false, reason: 'too many words (max 30)' };
  for (const w of words) {
    if (w.length < 2 || w.length > 15) return { ok: false, reason: `bad length: "${w}"` };
    if (!/^[a-z']+$/.test(w)) return { ok: false, reason: `bad chars: "${w}"` };
  }
  return { ok: true };
}

function save() {
  error.value = null;
  const source: 'type' | 'paste' = tab.value;
  const text = source === 'paste' ? pastedText.value : wordsInput.value;
  const words = parse(text);
  const v = validate(words);
  if (!v.ok) {
    error.value = v.reason;
    return;
  }
  emit('save', words, source);
}
</script>

<template>
  <div :data-testid="TEST_IDS.TYPING.SPELLING_LIST_FORM" class="space-y-4">
    <div class="flex gap-2 text-sm">
      <button
        type="button"
        class="rounded-lg border px-3 py-1.5"
        :class="
          tab === 'type'
            ? 'border-amber-500 bg-amber-50 text-amber-900 dark:border-amber-400 dark:bg-amber-950/40'
            : 'border-slate-300 dark:border-slate-600'
        "
        @click="tab = 'type'"
      >
        Type
      </button>
      <button
        type="button"
        class="rounded-lg border px-3 py-1.5"
        :class="
          tab === 'paste'
            ? 'border-amber-500 bg-amber-50 text-amber-900 dark:border-amber-400 dark:bg-amber-950/40'
            : 'border-slate-300 dark:border-slate-600'
        "
        @click="tab = 'paste'"
      >
        Paste
      </button>
    </div>

    <textarea
      v-if="tab === 'type'"
      v-model="wordsInput"
      placeholder="One word per line"
      rows="10"
      class="w-full rounded-lg border border-slate-300 bg-white p-3 font-mono text-sm dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100"
    />
    <textarea
      v-else
      v-model="pastedText"
      placeholder="Paste a comma- or newline-separated list"
      rows="6"
      class="w-full rounded-lg border border-slate-300 bg-white p-3 font-mono text-sm dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100"
    />

    <p v-if="error" class="text-sm text-rose-700 dark:text-rose-300">{{ error }}</p>

    <button
      type="button"
      class="rounded-lg bg-amber-600 px-4 py-2 text-sm font-medium text-white hover:bg-amber-700"
      @click="save"
    >
      Save list
    </button>
  </div>
</template>
