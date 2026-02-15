<script setup lang="ts">
/**
 * BlogArtifact — Interactive code execution component for blog posts.
 *
 * Usage in MDC markdown:
 *
 *   ::blog-artifact{language="python" title="Fibonacci Generator"}
 *   def fib(n):
 *       a, b = 0, 1
 *       for _ in range(n):
 *           yield a
 *           a, b = b, a + b
 *
 *   print(list(fib(10)))
 *   ::
 *
 * Or with a prompt for Claude to generate code:
 *
 *   ::blog-artifact{language="python" prompt="Create a bar chart of world population by continent"}
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

// Slot content is the code body from the MDC block
const slots = useSlots();

// Extract code from default slot (MDC block body) or props
const initialCode = computed(() => {
  if (props.code) return props.code;
  // Extract text from slot content
  const slotContent = slots.default?.();
  if (!slotContent?.length) return '';
  return extractSlotText(slotContent).trim();
});

function extractSlotText(vnodes: any[]): string {
  return vnodes
    .map((vnode) => {
      if (typeof vnode.children === 'string') return vnode.children;
      if (Array.isArray(vnode.children)) return extractSlotText(vnode.children);
      return '';
    })
    .join('');
}

const artifact = useArtifact({
  initialCode: initialCode.value,
  language: props.language || 'python',
});

// Sync initial code when it changes (e.g., slot content resolves)
watch(initialCode, (val) => {
  if (val && !artifact.code.value) {
    artifact.code.value = val;
  }
});

const isRunning = computed(() =>
  artifact.status.value === 'executing' || artifact.status.value === 'streaming',
);

function handleRun() {
  artifact.execute(props.prompt);
}

const editorRows = computed(() => {
  const lines = (artifact.code.value || '').split('\n').length;
  return Math.max(4, Math.min(lines + 1, 20));
});
</script>

<template>
  <div class="my-6 rounded-lg border border-zinc-700 bg-zinc-900/50 overflow-hidden">
    <!-- Header -->
    <div class="flex items-center justify-between px-4 py-2.5 border-b border-zinc-800 bg-zinc-900">
      <div class="flex items-center gap-2">
        <UIcon name="i-lucide-play-circle" class="size-4 text-sky-400" />
        <span class="text-sm font-medium text-zinc-200">
          {{ props.title || 'Interactive Code' }}
        </span>
        <span class="text-xs text-zinc-500 bg-zinc-800 px-1.5 py-0.5 rounded">
          {{ artifact.language.value }}
        </span>
      </div>
      <div class="flex items-center gap-2">
        <button
          v-if="artifact.status.value === 'complete' || artifact.status.value === 'error'"
          class="text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
          @click="artifact.reset()"
        >
          Reset
        </button>
        <UButton
          v-if="!isRunning"
          size="xs"
          color="primary"
          variant="solid"
          icon="i-lucide-play"
          :label="artifact.status.value === 'complete' ? 'Run Again' : 'Run'"
          @click="handleRun"
        />
        <UButton
          v-else
          size="xs"
          color="neutral"
          variant="outline"
          icon="i-lucide-square"
          label="Stop"
          @click="artifact.stop()"
        />
      </div>
    </div>

    <!-- Code editor -->
    <div v-if="!props.prompt || initialCode" class="relative">
      <textarea
        v-model="artifact.code.value"
        :readonly="props.readonly || isRunning"
        :rows="editorRows"
        spellcheck="false"
        class="w-full bg-zinc-950 text-zinc-200 font-mono text-sm p-4 resize-none focus:outline-none border-none placeholder:text-zinc-600"
        :class="{ 'opacity-60': isRunning }"
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
        {{ artifact.status.value === 'executing' ? 'Sending to container...' : 'Executing code...' }}
      </span>
    </div>

    <!-- Results -->
    <div
      v-if="artifact.status.value === 'complete' || artifact.status.value === 'error' || artifact.files.value.length > 0"
      class="border-t border-zinc-800 p-4"
    >
      <ArtifactOutput
        :explanation="artifact.explanation.value"
        :executed-code="artifact.executedCode.value"
        :execution="artifact.execution.value"
        :files="artifact.files.value"
        :error="artifact.error.value"
      />
    </div>

    <!-- Container reuse indicator -->
    <div
      v-if="artifact.containerId.value"
      class="flex items-center gap-1.5 px-4 py-1.5 border-t border-zinc-800 bg-zinc-950/50"
    >
      <UIcon name="i-lucide-container" class="size-3 text-zinc-600" />
      <span class="text-[10px] text-zinc-600">
        Container active — state persists between runs
      </span>
    </div>
  </div>
</template>
