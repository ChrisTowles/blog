<script setup lang="ts">
import type { AppEntry } from '~/types/appEntry'

const route = useRoute()
const page = await getPageAndCheckRouteExistsOrThrow404(route)

const { data: apps } = await useAsyncData('apps-list', () => queryContent<AppEntry>('/apps')
    .where({
        _extension: 'md',
        type: { $exists: true },
    })
// .sort({ date: -1 })
    .find())

useSeoMeta({
    title: page.value.title,
    ogTitle: page.value.title,
    description: page.value.description,
    ogDescription: page.value.description,
})
</script>

<template>
    <UContainer>
        <UPageHeader
            v-bind="page"
            class="py-[50px]"
        />
        <UPageBody>
            <UBlogList>
                <UBlogPost
                    v-for="(post, index) in apps"
                    :key="index"
                    :to="post._path"
                    :title="post.title"
                    :description="post.description"
                    :image="post.image"

                    :orientation="index === 0 ? 'horizontal' : 'vertical'"
                    :class="[index === 0 && 'col-span-full']"
                    :ui="{
                        description: 'line-clamp-2',
                    }"
                />
                <!--
           :date="new Date(post.date).toLocaleDateString('en', { year: 'numeric', month: 'short', day: 'numeric' })"
          :authors="post.authors"
          :badge="post.badge"

        -->
            </UBlogList>
        </UPageBody>
    </UContainer>
</template>
