<script setup lang="ts">
/**
 * DemoEmbed — one live exhibit from a demo page under public/demos, in an iframe sized to its content.
 *
 * Usage in MDC markdown:
 *
 *   ::demo-embed{src="/demos/how-i-cant-clap-gets-made/index.html" part="chain" title="Five stages: ..."}
 *   ::
 *
 * The demo page shows only its `[data-embed="<part>"]` element when loaded with `?embed=<part>`, and posts
 * `{ embedHeight }` to the parent whenever that element resizes, or when asked with `{ embedPing }`.
 */

const props = defineProps<{
  /** The demo page, under public/ */
  src: string;
  /** The data-embed name of the exhibit to show */
  part: string;
  /** Accessible description of the exhibit */
  title: string;
}>();

const frame = ref<HTMLIFrameElement | null>(null);
const height = ref(320);

function onMessage(e: MessageEvent) {
  if (e.source !== frame.value?.contentWindow || typeof e.data?.embedHeight !== 'number') return;
  height.value = Math.ceil(e.data.embedHeight);
  clearInterval(asking);
}

// the iframe can load before hydration and miss its first report, so keep asking until one arrives
const ask = () => frame.value?.contentWindow?.postMessage({ embedPing: true }, '*');
let asking: ReturnType<typeof setInterval> | undefined;

onMounted(() => {
  window.addEventListener('message', onMessage);
  asking = setInterval(ask, 250);
});
onBeforeUnmount(() => {
  window.removeEventListener('message', onMessage);
  clearInterval(asking);
});
</script>

<template>
  <iframe
    ref="frame"
    :src="`${props.src}?embed=${props.part}`"
    :title="props.title"
    loading="lazy"
    scrolling="no"
    class="my-6 block w-full rounded-lg border-0"
    :style="{ height: `${height}px` }"
  />
</template>
