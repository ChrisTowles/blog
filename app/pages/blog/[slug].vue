<script setup lang="ts">
const route = useRoute()

const { data: post } = await useAsyncData(route.path, () => queryCollection('posts').path(route.path).first())
if (!post.value) {
  throw createError({ statusCode: 404, statusMessage: 'Post not found', fatal: true })
}

const { data: surround } = await useAsyncData(`${route.path}-surround`, () => {
  return queryCollectionItemSurroundings('posts', route.path, {
    fields: ['description']
  })
})


useSeoMeta({
  title: post.value.title,
  ogTitle: post.value.title,
  description: post.value.description,
  ogDescription: post.value.description
})

if (post.value.image?.src) {
  defineOgImage({
    url: post.value.image.src
  })
} else {
  defineOgImageComponent('Saas', {
    headline: 'Blog'
  })
}

</script>

<template>
    <UContainer v-if="post">
        <UPageHeader
            :title="post.title"
            :description="post.description"
        >
            <template #headline>
                <UBadge
                    v-bind="post.badge"
                    variant="subtle"
                />
                <span class="text-gray-500 dark:text-gray-400">&middot;</span>
                <time class="text-gray-500 dark:text-gray-400">{{ new Date(post.date).toLocaleDateString('en', { year: 'numeric', month: 'short', day: 'numeric' }) }}</time>
            </template>

            <div class="flex flex-wrap items-center gap-3 mt-4">
                <UButton
                    v-for="(author, index) in post.authors"
                    :key="index"
                    :to="author.to"
                    color="primary"
                    target="_blank"
                    size="sm"
                >
                    <UAvatar
                        v-bind="author.avatar"
                        :alt="author.name"
                        size="2xs"
                    />

                    {{ author.name }}
                </UButton>
            </div>
        </UPageHeader>

        <UPage>
            <UPageBody prose>
                <div
                    v-if="post.image && post.image.src"
                    class="flex justify-center items-center"
                >
                    <nuxt-img

                        :src="post.image.src"
                        :alt="post.image.alt"
                        class="rounded-lg w-4/5 h-auto"
                    />
                </div>
                <ContentRenderer
                    v-if="post && post.body"
                    :value="post"
                />

                <hr v-if="surround?.length">

                <UContentSurround :surround="surround" />
            </UPageBody>

            <template #right>
                <UContentToc
                    v-if="post.body && post.body.toc"
                    :links="post.body.toc.links"
                />
            </template>
        </UPage>
    </UContainer>
</template>
