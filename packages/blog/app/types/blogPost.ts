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
      }),
    )
    .optional(),
});
