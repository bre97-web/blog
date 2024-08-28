import { defineCollection, z } from 'astro:content'

/**
 * MDX head info.
 */
const post = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        description: z.string(),

        creationTime: z.coerce.date(),
        pubDate: z.coerce.date(),

        heroImage: z.string().nullable().optional(),

        tags: z.array(z.string()).optional(),

        /**
         * We do not organize blogs into folders.
         * We recommend using collection as the classification identifier in mdx.
         * 
         * ```plainText
         * /src
         *     /content
         *         /blogs
         *             /...
         *             /all-your-mdx-files.mdx
         *         /config.ts
         *     /...
         * ```
         *
         * ```mdx
         * ---
         * title: "Setup angular project"
         * description: "Create a angular project in one minutes."
         * creationTime: 1/1/2000
         * pubDate: 1/1/2000
         * heroImage: null
         * tags: ['test file', 'Tag 1', 'Tag 2', 'Tag3']
         * collection: 'Angular'
         * ---
         * ```
         */
        collection: z.string(),
    }),
})

export const collections = {
    'blogs': post,
}

export type TBlog = {
    body: string
    collection: string
    data: {
        collection: string
        creationTime: Date
        description: string
        heroImage: string
        pubDate: Date
        title: string
    }
    id: string
    slug: string
}
