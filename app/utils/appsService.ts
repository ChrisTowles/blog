// import type { ContentCollectionItem } from '@nuxt/content'
import type { AppsCollectionItem } from '@nuxt/content'
import type { RouteLocation } from 'vue-router'

export const getAppsPageAndCheckRouteExistsOrThrow404 = async <T>(route: RouteLocation): Promise<Ref<AppsCollectionItem | null | undefined>> => {
    const { data: page } = await useAsyncData(route.path, () => queryCollection('apps').path(route.path).first())

    if (!page.value) {
        throw createError({ statusCode: 404, statusMessage: `Route '${route.path}' not found`, fatal: true })
    }
    
    return page
}



