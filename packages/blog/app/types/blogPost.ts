// import type { ParsedContent } from '@nuxt/content'
// import type { Badge, Avatar } from '#ui/types'
// import type { NuxtLinkProps } from '#app'

// export interface BlogPost extends ParsedContent {
//     title: string
//     description: string
//     date: string
//     image?: HTMLImageElement
//     badge?: Badge
//     authors?: ({
//         name: string
//         description?: string
//         avatar: Avatar
//     } & NuxtLinkProps)[]
// }

import { z } from 'zod';

export const BlogPostSchema = z.object({
  title: z.string(),
  description: z.string(),
  date: z.string(),
  image: z.string().optional(),
  badge: z.string().optional(),
  authors: z
    .array(
      z.object({
        name: z.string(),
        description: z.string().optional(),
        avatar: z.string(),
        // Spread NuxtLinkProps if needed, otherwise leave as is
      }),
    )
    .optional(),
});
