<script setup lang="ts">
const route = useRoute()



const { data: page } = await useAsyncData('blog', () => queryCollection('blog').first())
const { data: posts } = await useAsyncData(route.path, () => queryCollection('posts').all())

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
            <BlogPostList />
        </UPageBody>
    </UContainer>
</template>
