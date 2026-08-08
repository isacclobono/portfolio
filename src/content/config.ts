import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    draft: z.boolean().optional().default(false),
    tags: z.array(z.string()).default([]),
  }),
});

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    draft: z.boolean().optional().default(false),
    demoUrl: z.string().optional(),
    repoUrl: z.string().optional(),
    tags: z.array(z.string()).default([]),
    metrics: z.array(z.object({
      label: z.string(),
      score: z.number()
    })).optional(),
    features: z.array(z.string()).optional(),
    techStack: z.array(z.object({
      category: z.string(),
      technologies: z.string()
    })).optional(),
  }),
});

const work = defineCollection({
  type: 'content',
  schema: z.object({
    company: z.string(),
    role: z.string(),
    location: z.string().optional(),
    dateStart: z.string(),
    dateEnd: z.string(),
    order: z.number().default(0),
  }),
});

export const collections = { blog, projects, work };
