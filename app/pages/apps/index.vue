<script setup lang="ts">

const route = useRoute()
const { data: page } = await useAsyncData('app', () => queryCollection('apps').first())
const { data: appEntries } = await useAsyncData(route.path, () => queryCollection('appEntry').all())

useSeoMeta({
    title: page.value!.title,
    ogTitle: page.value!.title,
    description: page.value!.description,
    ogDescription: page.value!.description,
})
</script>

<template>
    <UContainer>
        <UPageHeader
            v-bind="page"
            class="py-[50px]"
        />
        <UPageBody>
            <UBlogPosts>
                <UBlogPost
                v-for="(post, index) in appEntries"
                :key="index"
                :to="post.path"
                :title="post.title"
                :description="post.description"
                :image="post.image"
                :date="new Date(post.date).toLocaleDateString('en', { year: 'numeric', month: 'short', day: 'numeric' })"
                :authors="post.authors"
                :badge="post.badge"
                :orientation="index === 0 ? 'horizontal' : 'vertical'"
                :class="[index === 0 && 'col-span-full']"
                variant="naked"
                :ui="{
                    description: 'line-clamp-2'
                }"
                />
            </UBlogPosts>
        </UPageBody>
    </UContainer>
</template>
