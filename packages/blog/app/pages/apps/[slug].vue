<script setup lang="ts">
const route = useRoute()

const { data: appEntry } = await useAsyncData(route.path, () => queryCollection('appEntry').path(route.path).first())
if (!appEntry.value) {
  throw createError({ statusCode: 404, statusMessage: 'Post not found', fatal: true })
}

const { data: surround } = await useAsyncData(`${route.path}-surround`, () => {
  return queryCollectionItemSurroundings('appEntry', route.path, {
    fields: ['description']
  })
})

useSeoMeta({
  title: appEntry.value.title,
  ogTitle: appEntry.value.title,
  description: appEntry.value.description,
  ogDescription: appEntry.value.description
})

if (appEntry.value.image?.src) {
  defineOgImage({
    url: appEntry.value.image.src
  })
} else {
  defineOgImageComponent('App', {
    headline: 'App'
  })
}
</script>

<template>
  <UContainer v-if="appEntry">
    <UPageHeader
      :title="appEntry.title"
      :description="appEntry.description"
    >
      <template #headline>
        <UBadge
          v-bind="appEntry.badge"
          variant="subtle"
        />
        <span class="text-gray-500 dark:text-gray-400">&middot;</span>
        <time class="text-gray-500 dark:text-gray-400">{{ new Date(appEntry.date).toLocaleDateString('en', { year: 'numeric', month: 'short', day: 'numeric' }) }}</time>
      </template>

      <div class="flex flex-wrap items-center gap-3 mt-4">
        <UButton
          v-for="(author, index) in appEntry.authors"
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
          v-if="appEntry.image && appEntry.image.src"
          class="flex justify-center items-center"
        >
          <NuxtImg
            :src="appEntry.image.src"
            :alt="appEntry.image.alt"

            class="rounded-lg w-4/5 h-auto"
          />
        </div>
        <ContentRenderer
          v-if="appEntry && appEntry.body"
          :value="appEntry"
        />

        <hr v-if="surround?.length">

        <UContentSurround :surround="surround" />
      </UPageBody>

      <template #right>
        <UContentToc
          v-if="appEntry.body && appEntry.body.toc"
          :links="appEntry.body.toc.links"
        />
      </template>
    </UPage>
  </UContainer>
</template>
