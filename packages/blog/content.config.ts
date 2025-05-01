import { defineContentConfig, defineCollection, z } from '@nuxt/content'

const variantEnum = z.enum(['solid', 'outline', 'subtle', 'soft', 'ghost', 'link'])
const colorEnum = z.enum(['primary', 'secondary', 'neutral', 'error', 'warning', 'success', 'info'])
const sizeEnum = z.enum(['xs', 'sm', 'md', 'lg', 'xl'])
// const orientationEnum = z.enum(['vertical', 'horizontal'])

const baseSchema = {
  title: z.string().nonempty(),
  description: z.string().nonempty()
}

const linkSchema = z.object({
  label: z.string().nonempty(),
  to: z.string().nonempty(),
  icon: z.string().optional(),
  size: sizeEnum.optional(),
  trailing: z.boolean().optional(),
  target: z.string().optional(),
  color: colorEnum.optional(),
  variant: variantEnum.optional()
})

// const imageSchema = z.object({
//   src: z.string().nonempty(),
//   alt: z.string().optional(),
//   loading: z.string().optional(),
//   srcset: z.string().optional()
// })

const featureItemSchema = z.object({
  ...baseSchema,
  icon: z.string().nonempty()
})

const sectionSchema = z.object({
  headline: z.string().optional(),
  ...baseSchema,
  features: z.array(featureItemSchema)
})

export default defineContentConfig({
  collections: {
    index: defineCollection({
      source: '0.index.yml',
      type: 'data',
      schema: z.object({
        title: z.string().nonempty(),
        description: z.string().nonempty(),
        hero: sectionSchema.extend({
          headline: z.object({
            label: z.string().nonempty(),
            to: z.string().nonempty(),
            icon: z.string().nonempty()
          }),
          links: z.array(linkSchema)
        }),
        logos: z.object({
          title: z.string().nonempty(),

          links: z.array(
            z.object({
              label: z.string().nonempty(),
              icon: z.string().nonempty(),
              to: z.string().nonempty()
            })
          )
        }),

        features: sectionSchema.extend({
          items: z.array(featureItemSchema)
        })

      })
    }),
    // landing: defineCollection({
    //   type: 'page',
    //   source: 'index.yml'
    // }),

    // apps: defineCollection({
    //   type: 'page',
    //   source: 'apps/**/*.md',
    //   schema: AppEntrySchema,
    // }),

    posts: defineCollection({
      type: 'page',
      source: '2.blog/**/*',
      schema: z.object({
        title: z.string().nonempty(),
        description: z.string().nonempty(),
        image: z.object({ src: z.string().nonempty(), alt: z.string().optional() }),
        authors: z.array(
          z.object({
            name: z.string().nonempty(),
            to: z.string().nonempty(),
            avatar: z.object({ src: z.string().nonempty() })
          })
        ),
        date: z.string().nonempty(),
        badge: z.object({ label: z.string().nonempty() })
      })
    }),
    blog: defineCollection({
      source: '2.blog.yml',
      type: 'data',
      schema: sectionSchema
    }),
    // --- apps
    appEntry: defineCollection({
      type: 'page',
      source: '3.apps/**/index.md',
      schema: z.object({
        title: z.string().nonempty(),
        description: z.string().nonempty(),
        image: z.object({ src: z.string().nonempty(), alt: z.string().optional() }),
        authors: z.array(
          z.object({
            name: z.string().nonempty(),
            to: z.string().nonempty(),
            avatar: z.object({ src: z.string().nonempty() })
          })
        ),
        date: z.string().nonempty(),
        badge: z.object({ label: z.string().nonempty() })
      })
    }),
    apps: defineCollection({
      source: '3.apps.yml',
      type: 'data',
      schema: sectionSchema
    })
    // end apps
  }
})
