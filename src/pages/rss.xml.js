import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { WebsiteConfigurations } from '../consts';

export async function GET(context) {
	const posts = await getCollection('blog');
	return rss({
		title: WebsiteConfigurations.title,
		description: WebsiteConfigurations.description,
		site: context.site,
		items: posts.map((post) => ({
			...post.data,
			link: `/blog/${post.slug}/`,
		})),
	});
}
