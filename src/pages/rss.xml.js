import rss, { pagesGlobToRssItems } from '@astrojs/rss';

export async function GET(context) {
    return rss({
        title: `Bre97's Blog`,
        description: `Here is bre97.`,
        site: context.site,
        items: await pagesGlobToRssItems(
            import.meta.glob('./blogs/*.{md,mdx}'),
          ),
    })
}
