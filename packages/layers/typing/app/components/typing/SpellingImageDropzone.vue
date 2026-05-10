<script setup lang="ts">
import { TEST_IDS } from '~~/shared/test-ids';

const props = defineProps<{
  learnerId: number;
}>();

const emit = defineEmits<{
  (e: 'extracted', words: string[]): void;
}>();

const fileInput = ref<HTMLInputElement | null>(null);
const error = ref<string | null>(null);
const uploading = ref(false);

function pick() {
  fileInput.value?.click();
}

async function onChange(ev: Event) {
  const target = ev.target as HTMLInputElement;
  const file = target.files?.[0];
  if (!file) return;
  error.value = null;
  uploading.value = true;
  try {
    const form = new FormData();
    form.append('learnerId', String(props.learnerId));
    form.append('image', file);
    const result = await $fetch<{ ok: true; words: string[] }>('/api/typing/spelling/extract', {
      method: 'POST',
      body: form,
    });
    emit('extracted', result.words);
  } catch (caught: unknown) {
    const err = caught as { statusMessage?: string; data?: { statusMessage?: string } };
    error.value = err.statusMessage ?? err.data?.statusMessage ?? 'Extraction failed';
  } finally {
    uploading.value = false;
    if (target) target.value = '';
  }
}
</script>

<template>
  <div :data-testid="TEST_IDS.TYPING.SPELLING_IMAGE_DROPZONE" class="space-y-3">
    <button
      type="button"
      class="flex w-full items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-white p-8 hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800 dark:hover:bg-slate-700"
      @click="pick"
    >
      <span v-if="uploading" class="text-sm text-slate-600">Reading worksheet…</span>
      <span v-else class="text-sm text-slate-600 dark:text-slate-300">
        Click to upload a worksheet photo (PNG / JPG / WEBP, up to 4 MB)
      </span>
    </button>
    <input
      ref="fileInput"
      type="file"
      class="sr-only"
      accept="image/png,image/jpeg,image/webp"
      @change="onChange"
    />
    <p v-if="error" class="text-sm text-rose-700 dark:text-rose-300">{{ error }}</p>
  </div>
</template>
