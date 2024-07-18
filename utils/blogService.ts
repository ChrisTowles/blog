import { withoutTrailingSlash } from 'ufo'
import type { RouteLocation } from 'vue-router'
import type { BlogPost } from '~/types/blogPost'

export const getBlogPosts = async ({ limit }: { limit?: number } = {}): Promise<Ref<BlogPost[] | null >> => {
  // Reminder: modify the cache key to match any query the query name!
  const { data: posts } = await useAsyncData(`blog-posts-${limit}`, () => queryContent<BlogPost>('/blog')
    .where({
      _extension: 'md',
      date: { $exists: true },
    })
    .sort({ date: -1 })
    .limit(limit ? limit : 10_000)
    .find())

  return posts
}

export const getSurroundBlogPosts = async (route: RouteLocation): Promise<Ref<Omit<BlogPost, 'body' | 'excerpt'>[]>> => {
  const { data: surround } = await useAsyncData(`${route.path}-surround`, () => queryContent<BlogPost>('/blog')
    .where({
      _extension: 'md',
      date: { $exists: true },
    })
    .without(['body', 'excerpt'])
    .sort({ date: -1 })
    .findSurround(withoutTrailingSlash(route.path)), { default: () => [] })

  return surround
}
