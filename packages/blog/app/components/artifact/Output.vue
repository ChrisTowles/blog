<script setup lang="ts">
import type { ArtifactFile, CodeExecutionResult } from '~~/shared/artifact-types';

const props = defineProps<{
  explanation?: string;
  executedCode?: string;
  execution?: CodeExecutionResult | null;
  files?: ArtifactFile[];
  error?: string | null;
}>();

const showCode = ref(false);

/** Check if a file is an image based on mediaType */
function isImage(file: ArtifactFile): boolean {
  return file.mediaType.startsWith('image/');
}

/** Check if a file is HTML */
function isHtml(file: ArtifactFile): boolean {
  return file.mediaType === 'text/html';
}
</script>

<template>
  <div class="space-y-3">
    <!-- Error -->
    <div
      v-if="props.error"
      class="rounded-md border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400"
    >
      <div class="flex items-center gap-2">
        <UIcon name="i-lucide-alert-circle" class="size-4 shrink-0" />
        <span>{{ props.error }}</span>
      </div>
    </div>

    <!-- Explanation text from Claude -->
    <div v-if="props.explanation" class="text-sm text-zinc-300">
      {{ props.explanation }}
    </div>

    <!-- Executed code (collapsible) -->
    <div v-if="props.executedCode">
      <button
        class="flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
        @click="showCode = !showCode"
      >
        <UIcon :name="showCode ? 'i-lucide-chevron-down' : 'i-lucide-chevron-right'" class="size-3.5" />
        <UIcon name="i-lucide-code-2" class="size-3.5" />
        <span>Code executed</span>
      </button>
      <div v-if="showCode" class="mt-2">
        <pre class="rounded-md bg-zinc-900 border border-zinc-800 p-3 text-xs overflow-x-auto"><code>{{ props.executedCode }}</code></pre>
      </div>
    </div>

    <!-- Execution output (stdout/stderr) -->
    <div v-if="props.execution">
      <div
        v-if="props.execution.stdout"
        class="rounded-md bg-zinc-900 border border-zinc-800 p-3 text-xs font-mono overflow-x-auto"
      >
        <div class="flex items-center gap-1.5 text-zinc-500 mb-2 text-[10px] uppercase tracking-wider">
          <UIcon name="i-lucide-terminal" class="size-3" />
          Output
        </div>
        <pre class="text-zinc-200 whitespace-pre-wrap">{{ props.execution.stdout }}</pre>
      </div>
      <div
        v-if="props.execution.stderr"
        class="mt-2 rounded-md bg-red-950/30 border border-red-900/30 p-3 text-xs font-mono overflow-x-auto"
      >
        <div class="flex items-center gap-1.5 text-red-400 mb-2 text-[10px] uppercase tracking-wider">
          <UIcon name="i-lucide-alert-triangle" class="size-3" />
          Stderr
        </div>
        <pre class="text-red-300 whitespace-pre-wrap">{{ props.execution.stderr }}</pre>
      </div>
    </div>

    <!-- Generated files -->
    <div v-if="props.files?.length" class="space-y-3">
      <template v-for="file in props.files" :key="file.fileId">
        <!-- Images rendered inline -->
        <div v-if="isImage(file)" class="rounded-md overflow-hidden border border-zinc-700">
          <img
            :src="file.url"
            :alt="file.fileName"
            class="w-full"
            loading="lazy"
          />
          <div class="flex items-center justify-between px-3 py-1.5 bg-zinc-900 text-xs text-zinc-500">
            <span>{{ file.fileName }}</span>
            <a :href="file.url" download class="hover:text-zinc-300 transition-colors">
              <UIcon name="i-lucide-download" class="size-3.5" />
            </a>
          </div>
        </div>

        <!-- HTML rendered in sandboxed iframe -->
        <div v-else-if="isHtml(file)" class="rounded-md overflow-hidden border border-zinc-700">
          <iframe
            :src="file.url"
            sandbox="allow-scripts"
            class="w-full h-96 bg-white"
            :title="file.fileName"
          />
          <div class="flex items-center justify-between px-3 py-1.5 bg-zinc-900 text-xs text-zinc-500">
            <span>{{ file.fileName }}</span>
            <a :href="file.url" target="_blank" class="hover:text-zinc-300 transition-colors">
              <UIcon name="i-lucide-external-link" class="size-3.5" />
            </a>
          </div>
        </div>

        <!-- Other files as download links -->
        <div v-else class="flex items-center gap-3 rounded-md border border-zinc-700 bg-zinc-900 p-3">
          <UIcon name="i-lucide-file" class="size-5 text-sky-400 shrink-0" />
          <div class="flex-1 min-w-0">
            <div class="text-sm text-zinc-200 truncate">{{ file.fileName }}</div>
            <div class="text-xs text-zinc-500">{{ file.mediaType }}</div>
          </div>
          <a
            :href="file.url"
            download
            class="text-sky-400 hover:text-sky-300 transition-colors"
          >
            <UIcon name="i-lucide-download" class="size-4" />
          </a>
        </div>
      </template>
    </div>
  </div>
</template>
