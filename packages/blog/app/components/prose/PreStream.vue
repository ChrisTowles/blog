<script setup lang="ts">
import { ShikiCachedRenderer } from 'shiki-stream/vue'

const colorMode = useColorMode()
// eslint-disable-next-line @typescript-eslint/no-explicit-any -- shiki version mismatch between shiki and shiki-stream
const highlighter = await useHighlighter() as any
const props = defineProps<{
  code: string
  language: string
  class?: string
  meta?: string
}>()
const trimmedCode = computed(() => {
  return props.code.trim().replace(/`+$/, '')
})
const lang = computed(() => {
  switch (props.language) {
    case 'vue':
      return 'vue'
    case 'javascript':
      return 'js'
    case 'typescript':
      return 'ts'
    case 'css':
      return 'css'
    default:
      return props.language
  }
})
const key = computed(() => {
  return `${lang.value}-${colorMode.value}`
})
</script>

<template>
  <ProsePre v-bind="props">
    <ShikiCachedRenderer
      :key="key"
      :highlighter="highlighter"
      :code="trimmedCode"
      :lang="lang"
      :theme="colorMode.value === 'dark' ? 'material-theme-palenight' : 'material-theme-lighter'"
    />
  </ProsePre>
</template>
