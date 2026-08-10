import { defineCollection, z } from 'astro:content';

// Blog: weekly status updates + health-policy explainers.
// Posts live in src/content/blog/{locale}/ and the `locale` field must match.
// LAUNCH REQUIREMENT: 5+ posts, seeded from the vault health-policy-notes.
// CRITICAL: respect every NEEDS-VERIFICATION flag; publish no unverified benefit claim.
const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    locale: z.enum(['en', 'zh-CN', 'zh-HK']),
    author: z.string().default('Dave Yu'),
    tags: z.array(z.string()).default([]),
    heroImage: z
      .object({
        src: z.string(),
        alt: z.string(),
        width: z.number().optional(),
        height: z.number().optional(),
      })
      .optional(),
    // Chinese posts ship draft:true until native Mandarin AND Cantonese lock.
    draft: z.boolean().default(false),
  }),
});

// Page copy blocks (data collection). The Principal/COS pastes finalised copy
// from the vault brand/ and artifacts/ files into these JSON files.
const pages = defineCollection({
  type: 'data',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    locale: z.enum(['en', 'zh-CN', 'zh-HK']),
    updated: z.coerce.date().optional(),
  }),
});

export const collections = { blog, pages };
