import { defineCollection, z } from 'astro:content'

const post = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        description: z.string(),
        creationTime: z.coerce.date(),
        pubDate: z.coerce.date(),
        heroImage: z.string().optional(),
        tags: z.array(z.string()).optional(),
    }),
})

export const collections = { 
    'blog': post,
    'angular-framework': post
}
