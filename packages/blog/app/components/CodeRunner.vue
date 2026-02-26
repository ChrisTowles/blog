<script setup lang="ts">
/**
 * CodeRunner — Interactive code execution component for blog posts.
 *
 * Usage in MDC markdown (code via prop — use \n for newlines):
 *
 *   ::code-runner{language="python" title="Fibonacci" code="def fib(n):\n    a, b = 0, 1\n    print(a)"}
 *   ::
 *
 * Or with a prompt for Claude to generate code:
 *
 *   ::code-runner{language="python" prompt="Create a bar chart of world population by continent"}
 *   ::
 */

const props = defineProps<{
  /** Code to pre-fill the editor with */
  code?: string;
  /** Language for syntax highlighting and execution (default: python) */
  language?: string;
  /** Title shown in the artifact header */
  title?: string;
  /** Prompt for Claude to generate/execute code (instead of user-provided code) */
  prompt?: string;
  /** Whether the code editor is read-only */
  readonly?: boolean;
}>();

// Hidden element ref for extracting MDC slot text from the DOM
const slotRef = ref<HTMLElement | null>(null);

const {
  status,
  code,
  language,
  explanation,
  executedCode,
  execution,
  files,
  error,
  containerId,
  execute,
  stop,
  reset,
} = useArtifact({
  initialCode: props.code?.replace(/\\n/g, '\n') || '',
  language: props.language || 'python',
});

// Extract slot text from the hidden rendered element after mount
onMounted(() => {
  if (code.value) return;
  const text = slotRef.value?.textContent?.trim();
  if (text) {
    code.value = text;
  }
});

const isRunning = computed(() => status.value === 'executing' || status.value === 'streaming');

function handleRun() {
  const { gtag } = useGtag();
  gtag('event', 'code_runner_execute', {
    language: language.value,
  });
  execute(props.prompt);
}

const editorRows = computed(() => {
  const lines = (code.value || '').split('\n').length;
  return Math.max(4, Math.min(lines + 1, 20));
});

// Syntax highlighting
const highlightedHtml = ref('');

async function highlight(text: string) {
  if (!text) {
    highlightedHtml.value = '';
    return;
  }
  const highlighter = await useHighlighter();
  const lang = language.value || 'python';
  highlightedHtml.value = highlighter.codeToHtml(text, {
    lang,
    theme: 'material-theme-palenight',
  });
}

// Highlight on mount and when code changes
watch(code, (val) => highlight(val || ''), { immediate: true });
</script>

<template>
  <!-- Hidden slot renderer to extract MDC body text -->
  <div ref="slotRef" class="hidden">
    <slot />
  </div>
  <div class="my-6 rounded-lg border border-zinc-700 bg-zinc-900/50 overflow-hidden">
    <!-- Header -->
    <div class="flex items-center justify-between px-4 py-2.5 border-b border-zinc-800 bg-zinc-900">
      <div class="flex items-center gap-2">
        <UIcon name="i-lucide-play-circle" class="size-4 text-sky-400" />
        <span class="text-sm font-medium text-zinc-200">
          {{ props.title || 'Interactive Code' }}
        </span>
        <span class="text-xs text-zinc-500 bg-zinc-800 px-1.5 py-0.5 rounded">
          {{ language }}
        </span>
      </div>
      <div class="flex items-center gap-2">
        <button
          v-if="status === 'complete' || status === 'error'"
          class="text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
          @click="reset()"
        >
          Reset
        </button>
        <UButton
          v-if="!isRunning"
          size="xs"
          color="primary"
          variant="solid"
          icon="i-lucide-play"
          :label="status === 'complete' ? 'Run Again' : 'Run'"
          @click="handleRun"
        />
        <UButton
          v-else
          size="xs"
          color="neutral"
          variant="outline"
          icon="i-lucide-square"
          label="Stop"
          @click="stop()"
        />
      </div>
    </div>

    <!-- Code editor with syntax highlighting -->
    <div v-if="!props.prompt || code" class="relative" :class="{ 'opacity-60': isRunning }">
      <!-- Highlighted code backdrop -->
      <div
        v-if="highlightedHtml"
        class="artifact-highlight absolute inset-0 pointer-events-none overflow-hidden p-4 font-mono text-sm whitespace-pre leading-[1.5]"
        aria-hidden="true"
        v-html="highlightedHtml"
      />
      <!-- Editable textarea overlay -->
      <textarea
        v-model="code"
        :readonly="props.readonly || isRunning"
        :rows="editorRows"
        spellcheck="false"
        class="w-full bg-transparent font-mono text-sm p-4 resize-none focus:outline-none border-none leading-[1.5] relative z-10"
        :class="highlightedHtml ? 'text-transparent caret-zinc-200' : 'text-zinc-200 bg-zinc-950'"
        placeholder="Enter code to execute..."
      />
    </div>

    <!-- Prompt display (when no code, just a prompt) -->
    <div v-else-if="props.prompt" class="px-4 py-3 text-sm text-zinc-400 italic">
      {{ props.prompt }}
    </div>

    <!-- Loading indicator -->
    <div
      v-if="isRunning"
      class="flex items-center gap-2 px-4 py-2.5 border-t border-zinc-800 bg-zinc-900/80"
    >
      <div class="size-3 rounded-full bg-sky-400 animate-pulse" />
      <span class="text-xs text-zinc-400">
        {{ status === 'executing' ? 'Sending to container...' : 'Executing code...' }}
      </span>
    </div>

    <!-- Results -->
    <div
      v-if="status === 'complete' || status === 'error' || files.length > 0"
      class="border-t border-zinc-800 p-4"
    >
      <ArtifactOutput
        :explanation="explanation"
        :executed-code="executedCode"
        :execution="execution"
        :files="files"
        :error="error"
      />
    </div>

    <!-- Container reuse indicator -->
    <div
      v-if="containerId"
      class="flex items-center gap-1.5 px-4 py-1.5 border-t border-zinc-800 bg-zinc-950/50"
    >
      <UIcon name="i-lucide-container" class="size-3 text-zinc-600" />
      <span class="text-[10px] text-zinc-600">
        Container active — state persists between runs
      </span>
    </div>
  </div>
</template>

<style scoped>
/* Reset Shiki's pre/code styles to match the textarea overlay */
.artifact-highlight :deep(pre) {
  margin: 0;
  padding: 0;
  background: transparent !important;
  font-size: inherit;
  line-height: inherit;
  font-family: inherit;
}

.artifact-highlight :deep(code) {
  font-size: inherit;
  line-height: inherit;
  font-family: inherit;
}
</style>
