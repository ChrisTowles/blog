<script setup lang="ts">
import { ShikiCachedRenderer } from 'shiki-stream/vue';
import mermaid from 'mermaid';

const colorMode = useColorMode();
// eslint-disable-next-line @typescript-eslint/no-explicit-any -- shiki version mismatch between shiki and shiki-stream
const highlighter = (await useHighlighter()) as any;
const props = defineProps<{
  code: string;
  language: string;
  class?: string;
  meta?: string;
}>();

const isMermaid = computed(() => props.language === 'mermaid');
const mermaidSvg = ref('');
const mermaidId = `mermaid-${Math.random().toString(36).slice(2)}`;

// Blog theme colors (sky primary, zinc neutral)
const mermaidTheme = computed(() => {
  const isDark = colorMode.value === 'dark';
  return {
    theme: 'base' as const,
    themeVariables: {
      // Background colors
      background: isDark ? '#020618' : '#ffffff',
      primaryColor: isDark ? '#0c4a6e' : '#e0f2fe', // sky-900 / sky-100
      secondaryColor: isDark ? '#27272a' : '#f4f4f5', // zinc-800 / zinc-100
      tertiaryColor: isDark ? '#3f3f46' : '#e4e4e7', // zinc-700 / zinc-200

      // Text colors
      primaryTextColor: isDark ? '#f4f4f5' : '#18181b', // zinc-100 / zinc-900
      secondaryTextColor: isDark ? '#a1a1aa' : '#52525b', // zinc-400 / zinc-600
      lineColor: isDark ? '#0ea5e9' : '#0284c7', // sky-500 / sky-600

      // Border colors
      primaryBorderColor: isDark ? '#0ea5e9' : '#0284c7', // sky-500 / sky-600

      // Node colors (flowcharts)
      nodeBorder: isDark ? '#38bdf8' : '#0284c7', // sky-400 / sky-600
      mainBkg: isDark ? '#0c4a6e' : '#e0f2fe', // sky-900 / sky-100
      nodeTextColor: isDark ? '#f4f4f5' : '#18181b',

      // Cluster colors
      clusterBkg: isDark ? '#18181b' : '#f4f4f5', // zinc-900 / zinc-100
      clusterBorder: isDark ? '#0ea5e9' : '#0284c7',

      // Label colors
      labelBackground: isDark ? '#27272a' : '#f4f4f5',
      labelTextColor: isDark ? '#f4f4f5' : '#18181b',

      // Sequence diagram
      actorBkg: isDark ? '#0c4a6e' : '#e0f2fe',
      actorBorder: isDark ? '#38bdf8' : '#0284c7',
      actorTextColor: isDark ? '#f4f4f5' : '#18181b',
      actorLineColor: isDark ? '#38bdf8' : '#0284c7',
      signalColor: isDark ? '#f4f4f5' : '#18181b',
      signalTextColor: isDark ? '#f4f4f5' : '#18181b',
      noteBkgColor: isDark ? '#27272a' : '#fef3c7', // zinc-800 / amber-100
      noteTextColor: isDark ? '#f4f4f5' : '#18181b',
      noteBorderColor: isDark ? '#0ea5e9' : '#0284c7',

      // State diagram
      labelColor: isDark ? '#f4f4f5' : '#18181b',

      // Edge labels
      edgeLabelBackground: isDark ? '#27272a' : '#f4f4f5',

      // Fonts
      fontFamily: 'ui-sans-serif, system-ui, sans-serif',
    },
  };
});

async function renderMermaid() {
  if (!isMermaid.value) return;

  mermaid.initialize({
    startOnLoad: false,
    ...mermaidTheme.value,
  });

  try {
    const { svg } = await mermaid.render(mermaidId, props.code.trim());
    mermaidSvg.value = svg;
  } catch (e) {
    console.error('Mermaid render error:', e);
    mermaidSvg.value = '';
  }
}

onMounted(renderMermaid);
watch(() => colorMode.value, renderMermaid);

const trimmedCode = computed(() => {
  return props.code.trim().replace(/`+$/, '');
});
const lang = computed(() => {
  switch (props.language) {
    case 'vue':
      return 'vue';
    case 'javascript':
      return 'js';
    case 'typescript':
      return 'ts';
    case 'css':
      return 'css';
    default:
      return props.language;
  }
});
const key = computed(() => {
  return `${lang.value}-${colorMode.value}`;
});
</script>

<template>
  <div
    v-if="isMermaid && mermaidSvg"
    class="mermaid-diagram my-4 flex justify-center"
    v-html="mermaidSvg"
  />
  <pre
    v-else-if="isMermaid"
    class="my-4 p-4 bg-gray-100 dark:bg-gray-800 rounded overflow-x-auto"
  ><code>{{ props.code }}</code></pre>
  <pre v-else :class="props.class" class="shiki-wrapper overflow-x-auto rounded-md text-sm">
    <ShikiCachedRenderer
      :key="key"
      :highlighter="highlighter"
      :code="trimmedCode"
      :lang="lang"
      :theme="colorMode.value === 'dark' ? 'material-theme-palenight' : 'material-theme-lighter'"
    />
  </pre>
</template>
