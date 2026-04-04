<script setup lang="ts">
const route = useRoute();

const { data: post } = await useAsyncData(route.path, () =>
  queryCollection('posts').path(route.path).first(),
);
if (!post.value) {
  throw createError({ statusCode: 404, statusMessage: 'Post not found', fatal: true });
}

const isDraft = post.value.status === 'draft';
if (isDraft && !import.meta.dev) {
  throw createError({ statusCode: 404, statusMessage: 'Post not found', fatal: true });
}

const { data: surround } = await useAsyncData(`${route.path}-surround`, async () => {
  const items = await queryCollectionItemSurroundings('posts', route.path, {
    fields: ['description', 'status'],
  });
  if (!items) return items;
  // Replace draft neighbors with undefined (prev/next slot stays empty)
  const [prev, next] = items;
  return [
    prev?.status === 'draft' ? undefined : prev,
    next?.status === 'draft' ? undefined : next,
  ] as typeof items;
});

useSeoMeta({
  title: post.value.title,
  ogTitle: post.value.title,
  description: post.value.description,
  ogDescription: post.value.description,
});

if (post.value.image?.src) {
  useSeoMeta({
    ogImage: post.value.image.src,
    ogImageWidth: 1200,
    ogImageHeight: 600,
    ogImageAlt: post.value.image.alt || post.value.title,
  });
} else {
  defineOgImage('SaaS', {
    headline: 'Blog',
  });
}

onMounted(() => {
  const { gtag } = useGtag();
  gtag('event', 'blog_post_read', {
    post_title: post.value?.title,
    post_slug: route.params.slug,
  });
});
</script>

<template>
  <UContainer v-if="post">
    <div
      v-if="isDraft"
      class="mb-4 rounded-lg bg-warning/10 border border-warning/30 p-4 text-center text-(--ui-text-muted)"
    >
      This post is a draft and is not publicly listed.
    </div>
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

    <UPage>
      <UPageBody>
        <div v-if="post.image && post.image.src" class="flex justify-center items-center">
          <nuxt-img :src="post.image.src" :alt="post.image.alt" class="rounded-lg w-4/5 h-auto" />
        </div>
        <ContentRenderer v-if="post" :value="post" />

        <USeparator v-if="surround?.length" />

        <UContentSurround :surround="surround" />
      </UPageBody>

      <template v-if="post?.body?.toc?.links?.length" #right>
        <UContentToc :links="post.body.toc.links" />
      </template>
    </UPage>
  </UContainer>
</template>
