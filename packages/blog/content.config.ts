import { defineContentConfig, defineCollection, z } from '@nuxt/content';

const baseSchema = {
  title: z.string().nonempty(),
  description: z.string().nonempty(),
};

const featureItemSchema = z.object({
  ...baseSchema,
  icon: z.string().nonempty(),
});

const sectionSchema = z.object({
  headline: z.string().optional(),
  ...baseSchema,
  features: z.array(featureItemSchema),
});

export default defineContentConfig({
  collections: {
    index: defineCollection({
      source: '0.index.yml',
      type: 'data',
      // SEO strings and intro copy; the rest of the home page is app/components/home.
      schema: z.object({
        title: z.string().nonempty(),
        description: z.string().nonempty(),
        intro: z.object({
          headline: z.string().nonempty(),
          body: z.string().nonempty(),
          start: z.array(z.object({ label: z.string().nonempty(), to: z.string().nonempty() })),
        }),
      }),
    }),
    posts: defineCollection({
      type: 'page',
      source: '2.blog/**/*',
      schema: z.object({
        rawbody: z.string(),
        title: z.string().nonempty(),
        description: z.string().nonempty(),
        status: z.enum(['draft', 'published']).default('published'),
        image: z.object({ src: z.string().nonempty(), alt: z.string().optional() }),
        authors: z.array(
          z.object({
            name: z.string().nonempty(),
            to: z.string().nonempty(),
            avatar: z.object({ src: z.string().nonempty() }),
          }),
        ),
        date: z.string().nonempty(),
        badge: z.object({ label: z.string().nonempty() }),
      }),
    }),
    blog: defineCollection({
      source: '2.blog.yml',
      type: 'data',
      schema: sectionSchema,
    }),
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
            avatar: z.object({ src: z.string().nonempty() }),
          }),
        ),
        date: z.string().nonempty(),
        badge: z.object({ label: z.string().nonempty() }),
      }),
    }),
    apps: defineCollection({
      source: '3.apps.yml',
      type: 'data',
      schema: sectionSchema,
    }),
  },
});
