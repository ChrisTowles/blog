<script setup lang="ts">
const props = defineProps<{ class?: string }>();

const isTwitter = computed(() => props.class?.includes('twitter-tweet'));
const tweetContainer = ref<HTMLElement | null>(null);

// Extract tweet URL from slot content on mount, then render via widget API
onMounted(() => {
  if (!isTwitter.value || !tweetContainer.value) return;

  const links = tweetContainer.value.querySelectorAll('a[href*="twitter.com/"], a[href*="x.com/"]');
  const tweetLink = Array.from(links).find((a) =>
    (a as HTMLAnchorElement).href.match(/\/(twitter|x)\.com\/\w+\/status\/\d+/),
  );
  if (!tweetLink) return;

  const url = (tweetLink as HTMLAnchorElement).href;
  // Clear the MDC-mangled content and let the widget render cleanly
  const container = tweetContainer.value;
  container.innerHTML = '';

  const waitForWidget = () => {
    if (window.twttr?.widgets) {
      window.twttr.widgets.createTweet(
        url.match(/status\/(\d+)/)?.[1] ?? '',
        container as unknown as HTMLElement,
        {
          theme: document.documentElement.classList.contains('dark') ? 'dark' : 'light',
        },
      );
    } else {
      setTimeout(waitForWidget, 200);
    }
  };
  waitForWidget();
});
</script>

<template>
  <div v-if="isTwitter" ref="tweetContainer" class="my-5 flex justify-center">
    <slot />
  </div>
  <blockquote v-else>
    <slot />
  </blockquote>
</template>
