<script setup lang="ts">
import type { Highlighter } from 'shiki';

const props = defineProps<{
  highlighter: Highlighter;
  code: string;
  lang: string;
}>();

const colorMode = useColorMode();

const html = computed(() => {
  const theme = colorMode.value === 'dark' ? 'material-theme-palenight' : 'material-theme-lighter';
  try {
    return props.highlighter.codeToHtml(props.code, { lang: props.lang, theme });
  } catch {
    // Language not loaded in the shared highlighter — fall back to plain text.
    return null;
  }
});
</script>

<template>
  <div v-if="html" class="shiki-code" v-html="html" />
  <pre
    v-else
    class="shiki-code-fallback overflow-x-auto rounded-md p-3"
  ><code>{{ code }}</code></pre>
</template>

<style>
.shiki-code pre {
  overflow-x: auto;
  border-radius: 0.375rem;
  padding: 0.75rem 1rem;
}
</style>
