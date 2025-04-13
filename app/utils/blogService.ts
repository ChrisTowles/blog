import type { BlogCollectionItem } from '@nuxt/content'
// import { withoutTrailingSlash } from 'ufo'
import type { RouteLocation } from 'vue-router'

export const getBlogPosts = async ({ limit }: { limit?: number } = {}): Promise<Ref<BlogCollectionItem[] | undefined>> => {
    // Reminder: modify the cache key to match any query the query name!

    const { data: posts } = await useAsyncData(`blog-posts-${limit}`, () => 
        queryCollection('blog')
        // .where({
        //     _extension: 'md',
        //     date: { $exists: true },
        // })
        // .sort({ date: -1 })
        .limit(limit ? limit : 10_000)
        .all()
        // .find()
        )

    return posts
}


export const getBlogPost = async ( route: RouteLocation): Promise<Ref<BlogCollectionItem | null | undefined>> => {
    // Reminder: modify the cache key to match any query the query name!

    const { data: posts } = await useAsyncData(route.path, () => 
        queryCollection('blog')
        .path(route.path)
        // .where({
        //     _extension: 'md',
        //     date: { $exists: true },
        // })
        // .sort({ date: -1 })
        // .limit(limit ? limit : 10_000)
        .first()
        // .find()
        )
    

    return posts
}



export const getSurroundBlogPosts = async (route: RouteLocation): Promise<Ref<BlogCollectionItem[] | undefined>> => {
    const { data: surround } = await useAsyncData(`${route.path}-surround`, () => 
        queryCollection('blog')
        // .where({
        //     _extension: 'md',
        //     date: { $exists: true },
        // })
        // .without(['body', 'excerpt'])
//         .sort({ date: -1 })
        //.findSurround(withoutTrailingSlash(route.path)), { default: () => [] })
        .all())

    return surround
}
