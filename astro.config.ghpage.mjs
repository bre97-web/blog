import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import tailwind from "@astrojs/tailwind"

import vue from "@astrojs/vue"

// https://astro.build/config
export default defineConfig({
    base: '/blog',
    trailingSlash: 'never',
    site: 'https://bre97-web.github.io/blog',
    integrations: [
        mdx({

        }),
        sitemap(),
        tailwind({
            nesting: true,
            applyBaseStyles: false,
        }),
        vue({
            template: {
                compilerOptions: {
                    isCustomElement: (tag) => tag.startsWith('md-'),
                },
            }
        }),
    ],
})
