import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import tailwindIntegration from '@astrojs/tailwind'
import vue from "@astrojs/vue"
import { defineConfig } from 'astro/config'

// https://astro.build/config
export default defineConfig({
    site: 'https://bre97-web.github.io',
    base: '/blog',
    trailingSlash: 'always',
    integrations: [
        mdx(),
        sitemap(),
        tailwindIntegration({
            configFile: './tailwind.config.mjs',
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
