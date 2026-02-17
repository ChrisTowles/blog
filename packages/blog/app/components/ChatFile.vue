<script setup lang="ts">
import type { FilePart } from '~~/shared/chat-types';

const props = defineProps<{
  file: FilePart;
}>();

const FILE_TYPE_ICONS: Record<string, string> = {
  'application/pdf': 'i-lucide-file-text',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation':
    'i-lucide-presentation',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'i-lucide-sheet',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'i-lucide-file-text',
};

const isImage = computed(() => props.file.mediaType.startsWith('image/'));
const icon = computed(() => FILE_TYPE_ICONS[props.file.mediaType] || 'i-lucide-file');
</script>

<template>
  <div class="my-2">
    <div v-if="isImage" class="rounded-md overflow-hidden border border-zinc-700">
      <img :src="file.url" :alt="file.fileName" class="w-full" loading="lazy" />
      <div class="flex items-center justify-between px-3 py-1.5 bg-zinc-900 text-xs text-zinc-500">
        <span>{{ file.fileName }}</span>
        <a :href="file.url" download class="hover:text-zinc-300 transition-colors">
          <UIcon name="i-lucide-download" class="size-3.5" />
        </a>
      </div>
    </div>

    <div v-else class="flex items-center gap-3 rounded-md border border-zinc-700 bg-zinc-900 p-3">
      <UIcon :name="icon" class="size-5 text-sky-400 shrink-0" />
      <div class="flex-1 min-w-0">
        <div class="text-sm text-zinc-200 truncate">{{ file.fileName }}</div>
        <div class="text-xs text-zinc-500">{{ file.mediaType }}</div>
      </div>
      <a :href="file.url" download class="text-sky-400 hover:text-sky-300 transition-colors">
        <UIcon name="i-lucide-download" class="size-4" />
      </a>
    </div>
  </div>
</template>
