<script setup lang="ts">
import { joinURL } from 'ufo'

const route = useRoute()




const { data } = await useAsyncData(route.path, () => Promise.all([
  queryCollection('blog').path(route.path).first(),
  queryCollectionItemSurroundings('blog', route.path, {
    fields: ['title', 'description'],
  }),
]), {
  transform: ([page, surround]) => ({ page, surround }),
})

const post = computed(() => data.value?.page)
const surround = computed(() => data.value?.surround)


useSeoMeta({
  title: post.value.seo.title,
  ogTitle: post.value.seo.title,
  description: post.value.seo.description,
  ogDescription: post.value.seo.description
})

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

                    color="white"
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
