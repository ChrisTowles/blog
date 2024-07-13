import type { ParsedContent } from '@nuxt/content'
import type { Badge, Avatar } from '#ui/types'
import type { NuxtLinkProps } from '#app'

export interface BlogPost extends ParsedContent {
  title: string
  description: string
  date: string
  image?: HTMLImageElement
  badge?: Badge
  authors?: ({
    name: string
    description?: string
    avatar: Avatar
  } & NuxtLinkProps)[]
}
