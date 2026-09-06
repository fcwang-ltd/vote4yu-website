import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Must stay in sync with the `labelEn` values of HEALTH_PLANKS in
 * src/utils/content.ts. Kept as a literal list rather than importing that
 * module, so the content-collection config carries no dependency on
 * application code.
 */
const HEALTH_CATEGORIES = [
  'Housing',
  'Education',
  'Advocacy',
  'Living Standards',
  'Technology',
  'Hospitality',
] as const;

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    locale: z.enum(['en', 'zh-CN', 'zh-HK']).default('en'),
    draft: z.boolean().default(false),
    /* Shown as tag pills on the post. A typo here fails the build rather
       than silently rendering no tag. */
    categories: z.array(z.enum(HEALTH_CATEGORIES)).default([]),
    heroImage: z
      .object({
        src: z.string(),
        alt: z.string(),
      })
      .optional(),
  }),
});

export const collections = { blog };
