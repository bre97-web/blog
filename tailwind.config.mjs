import { provideAll } from '@glare-labs/tailwindcss-material-tokens'

const all = provideAll()

/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
        extend: {},
    },
    corePlugins: {
        fontSize: false,
        fontFamily: false,
        fontVariantNumeric: false,
        letterSpacing: false,
        lineHeight: false,
    },
    plugins: [
        ...all.allPlugins(),
    ],
}
