<script setup lang="ts">
const route = useRoute()
const page = await getPageAndCheckRouteExistsOrThrow404(route)

// TODO: for now just the latest posts will do
const posts = await getBlogPosts({ limit: 10 })

useSeoMeta({
    title: page.value?.title,
    ogTitle: page.value?.title,
    description: page.value?.description,
    ogDescription: page.value?.description,
})
</script>

<template>
    <div>
        <ULandingHero
            :title="page?.hero.title"
            :description="page?.hero.description"
            :links="page?.hero.links"
        >
            <template #headline>
                <UBadge
                    v-if="page?.hero.headline"
                    variant="subtle"
                    size="lg"
                    class="relative rounded-full font-semibold"
                >
                    <NuxtLink
                        :to="page?.hero.headline.to"
                        target="_blank"
                        class="focus:outline-none"
                        tabindex="-1"
                    >
                        <span
                            class="absolute inset-0"
                            aria-hidden="true"
                        />
                    </NuxtLink>

                    {{ page?.hero.headline.label }}

                    <UIcon
                        v-if="page?.hero.headline.icon"
                        :name="page?.hero.headline.icon"
                        class="ml-1 w-4 h-4 pointer-events-none"
                    />
                </UBadge>
            </template>

            <ULandingLogos
                :title="page?.logos.title"
                align="center"
            >
                <UIcon
                    v-for="icon in page?.logos.icons"
                    :key="icon"
                    :name="icon"
                    class="w-12 h-12 lg:w-16 lg:h-16 flex-shrink-0 text-gray-900 dark:text-white"
                />
            </ULandingLogos>
        </ULandingHero>
        <UContainer>
            <UHeader title="Recent Posts" />

            <UBlogList>
                <UBlogPost
                    v-for="(post, index) in posts"
                    :key="index"
                    :to="post._path"
                    :title="post.title"
                    :description="post.description"
                    :image="post.image"
                    :date="new Date(post.date).toLocaleDateString('en', { year: 'numeric', month: 'short', day: 'numeric' })"
                    :authors="post.authors"
                    :badge="post.badge"
                    :orientation="index === 0 ? 'horizontal' : 'vertical'"
                    :class="[index === 0 && 'col-span-full']"
                    :ui="{
                        description: 'line-clamp-2',
                    }"
                />
            </UBlogList>
        </UContainer>
        <ULandingSection
            :title="page?.features.title"
            :description="page?.features.description"
            :headline="page?.features.headline"
        >
            <UPageGrid
                id="features"
                class="scroll-mt-[calc(var(--header-height)+140px+128px+96px)]"
            >
                <ULandingCard
                    v-for="(item, index) in page?.features.items"
                    :key="index"
                    v-bind="item"
                />
            </UPageGrid>
        </ULandingSection>
    </div>
</template>
