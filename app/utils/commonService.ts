import type { ParsedContent } from '@nuxt/content'
import type { RouteLocation } from 'vue-router'

export const getPageAndCheckRouteExistsOrThrow404 = async <T extends ParsedContent >(route: RouteLocation): Promise<Ref<T>> => {
    const { data: page } = await useAsyncData(route.path, () => queryContent<T>(route.path).findOne())
    if (!page.value) {
        throw createError({ statusCode: 404, statusMessage: `Route '${route.path}' not found`, fatal: true })
    }
    return page as Ref<T>
}
