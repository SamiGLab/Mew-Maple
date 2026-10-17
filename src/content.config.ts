import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string().min(50),
    category: z.string(),
    hero: z.string(),
    heroAlt: z.string(),
    heroCaption: z.string().min(20),
    status: z.enum(['review', 'published']),
    readingMinutes: z.number().int().positive(),
    language: z.literal('en-US'),
    publishedAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    affiliate: z.boolean().default(false),
  }),
});
export const collections = { blog };
