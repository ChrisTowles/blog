import { withoutTrailingSlash } from 'ufo'
import type { RouteLocation } from 'vue-router'
import type { BlogPost } from '~/types/blogPost'

export const getBlogPosts = async (): Promise<Ref<BlogPost[] | null >> => {
  const { data: posts } = await useAsyncData('posts', () => queryContent<BlogPost>('/blog')
    .where({
      _extension: 'md',
      date: { $exists: true },
    })
    .sort({ date: -1 })
    // WARNING!!! For some reason when this was set, i cached it on the blog list page too!
    // .limit(limit ? limit : 10_000) // should be more than enough :)
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
