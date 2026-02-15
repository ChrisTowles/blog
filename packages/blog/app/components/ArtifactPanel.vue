<script setup lang="ts">
import type { ArtifactPart } from '~~/shared/chat-types';
import type { DefineComponent } from 'vue';
import { useClipboard } from '@vueuse/core';
import ProsePre from './prose/ProsePre.vue';

const props = defineProps<{
  artifact: ArtifactPart;
}>();

const components = {
  pre: ProsePre as unknown as DefineComponent,
};

const showPreview = ref(true);
const copied = ref(false);

const { copy } = useClipboard();

function copyContent() {
  copy(props.artifact.content);
  copied.value = true;
  setTimeout(() => (copied.value = false), 2000);
}

const wrappedContent = computed(() => {
  const a = props.artifact;
  if (a.artifactType === 'code') {
    const lang = a.language || '';
    return `\`\`\`${lang}\n${a.content}\n\`\`\``;
  }
  if (a.artifactType === 'markdown') {
    return a.content;
  }
  if (a.artifactType === 'mermaid') {
    return `\`\`\`mermaid\n${a.content}\n\`\`\``;
  }
  // html/svg - show as code when not previewing
  return `\`\`\`html\n${a.content}\n\`\`\``;
});

const canPreview = computed(() => {
  return ['html', 'svg'].includes(props.artifact.artifactType);
});

const iframeSrcDoc = computed(() => {
  if (props.artifact.artifactType === 'svg') {
    return `<!DOCTYPE html><html><head><style>body{margin:0;display:flex;justify-content:center;align-items:center;min-height:100vh;background:transparent;}</style></head><body>${props.artifact.content}</body></html>`;
  }
  return props.artifact.content;
});
</script>

<template>
  <div class="border border-[var(--ui-border)] rounded-lg overflow-hidden my-3">
    <!-- Header -->
    <div
      class="flex items-center justify-between px-3 py-2 bg-[var(--ui-bg-elevated)] border-b border-[var(--ui-border)]"
    >
      <div class="flex items-center gap-2 min-w-0">
        <UIcon
          :name="
            artifact.artifactType === 'code'
              ? 'i-lucide-code'
              : artifact.artifactType === 'html'
                ? 'i-lucide-globe'
                : artifact.artifactType === 'svg'
                  ? 'i-lucide-image'
                  : artifact.artifactType === 'mermaid'
                    ? 'i-lucide-git-branch'
                    : 'i-lucide-file-text'
          "
          class="text-[var(--ui-text-muted)] shrink-0"
        />
        <span class="text-sm font-medium truncate">{{ artifact.title }}</span>
        <UBadge v-if="artifact.state === 'streaming'" color="primary" variant="subtle" size="xs">
          streaming...
        </UBadge>
        <UBadge v-if="artifact.language" color="neutral" variant="subtle" size="xs">
          {{ artifact.language }}
        </UBadge>
      </div>
      <div class="flex items-center gap-1">
        <UButton
          v-if="canPreview"
          :icon="showPreview ? 'i-lucide-code' : 'i-lucide-eye'"
          size="xs"
          color="neutral"
          variant="ghost"
          :title="showPreview ? 'Show code' : 'Show preview'"
          @click="showPreview = !showPreview"
        />
        <UButton
          :icon="copied ? 'i-lucide-copy-check' : 'i-lucide-copy'"
          size="xs"
          color="neutral"
          variant="ghost"
          title="Copy content"
          @click="copyContent"
        />
      </div>
    </div>

    <!-- Content -->
    <div class="max-h-[500px] overflow-auto">
      <!-- Live preview for HTML/SVG -->
      <iframe
        v-if="canPreview && showPreview"
        :srcdoc="iframeSrcDoc"
        class="w-full min-h-[300px] border-0 bg-white"
        sandbox="allow-scripts"
      />

      <!-- Code / Markdown rendering -->
      <div
        v-else
        class="*:first:mt-0 *:last:mb-0 [&_pre]:!rounded-none [&_pre]:!border-0 [&_pre]:!my-0"
      >
        <MDCCached
          :value="wrappedContent"
          :cache-key="`artifact-${artifact.artifactId}-${artifact.content.length}`"
          :components="components"
          :parser-options="{ highlight: false }"
        />
      </div>
    </div>
  </div>
</template>
