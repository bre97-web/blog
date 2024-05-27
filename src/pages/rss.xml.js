import rss from '@astrojs/rss'
import { PostService } from '../core/post/services/post.service'

export async function GET(context) {
    const posts = PostService.getInstance().getAllPosts()
    return rss({
        title: `Bre97's Blog`,
        description: `Here is bre97.`,
        site: context.site,
        items: posts.map(post => ({
            ...post.data,
            link: `/post/${post.slug}/`,
        })),
    })
}
