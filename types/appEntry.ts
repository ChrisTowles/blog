import type { ParsedContent } from '@nuxt/content/dist/runtime/types'
// import type { Badge, Avatar } from '#ui/types'
// import type { NuxtLinkProps } from '#app'

export enum AppType {
  MobileAndroid,
}
export interface AppEntry extends ParsedContent {
  title: string
  description: string
  type: AppType
  // date: string
  // image?: HTMLImageElement
  // badge?: Badge
  // authors?: ({
  //   name: string
  //   description?: string
  //   avatar: Avatar
  // } & NuxtLinkProps)[]
}
