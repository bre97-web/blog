import rss from '@astrojs/rss'
import { Posts } from '../content/Posts'
import { WebsiteConfigurations } from '../consts'

export async function GET(context) {
    const posts = await Posts.getAllPosts()
    return rss({
        title: WebsiteConfigurations.title,
        description: WebsiteConfigurations.description,
        site: context.site,
        items: posts.map((series) => series.posts).map(post => ({
            ...post.data,
            link: `/${series.baseUrl}/${post.slug}/`,
        })),
    })
}
