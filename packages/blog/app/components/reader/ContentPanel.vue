<script setup lang="ts">
const props = defineProps<{
  slug: string;
}>();

const contentPath = computed(() => `/blog/${props.slug}`);

const { data: post } = await useAsyncData(`reader-${props.slug}`, () =>
  queryCollection('posts').path(contentPath.value).first(),
);

const { data: surround } = await useAsyncData(`reader-${props.slug}-surround`, () =>
  queryCollectionItemSurroundings('posts', contentPath.value, {
    fields: ['description'],
  }),
);

const { setActivePost } = useReaderSync();

watchEffect(() => {
  if (post.value) {
    setActivePost(props.slug, post.value.title);
  }
});

const tocLinks = computed(() => post.value?.body?.toc?.links);
</script>

<template>
  <div class="h-full overflow-y-auto">
    <div v-if="!post" class="flex items-center justify-center h-full">
      <UEmpty icon="i-lucide-file-question" title="Post not found" />
    </div>

    <div v-else class="p-4 sm:p-6 lg:p-8">
      <UPageHeader :title="post.title" :description="post.description">
        <template #headline>
          <UBadge v-bind="post.badge" variant="subtle" />
          <span class="text-(--ui-text-muted)">&middot;</span>
          <time class="text-(--ui-text-muted)">{{
            new Date(post.date).toLocaleDateString('en', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })
          }}</time>
        </template>

        <div class="flex flex-wrap items-center gap-3 mt-4">
          <UButton
            v-for="(author, index) in post.authors"
            :key="index"
            :to="author.to"
            color="neutral"
            variant="subtle"
            target="_blank"
            size="sm"
          >
            <UAvatar v-bind="author.avatar" :alt="author.name" size="2xs" />
            {{ author.name }}
          </UButton>
        </div>
      </UPageHeader>

      <!-- Table of contents (inline, since no right sidebar in split view) -->
      <UCollapsible v-if="tocLinks?.length" class="my-4">
        <UButton
          icon="i-lucide-list"
          label="Table of contents"
          variant="ghost"
          color="neutral"
          size="sm"
        />
        <template #content>
          <UContentToc :links="tocLinks" class="mt-2" />
        </template>
      </UCollapsible>

      <UPageBody>
        <div v-if="post.image && post.image.src" class="flex justify-center items-center">
          <nuxt-img :src="post.image.src" :alt="post.image.alt" class="rounded-lg w-4/5 h-auto" />
        </div>
        <ContentRenderer v-if="post" :value="post" />

        <USeparator v-if="surround?.length" />
        <UContentSurround :surround="surround" />
      </UPageBody>
    </div>
  </div>
</template>
