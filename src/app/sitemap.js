import { getStoryblokApi } from '@/lib/storyblok';

const siteUrl = process.env.SITE_URL ?? 'https://example.com';

export default async function sitemap() {
	const storyblokApi = getStoryblokApi();

	const { data } = await storyblokApi.getStories({
		version: 'published',
		per_page: 100,
	});

	const pages = data.stories
		.filter(
			(story) =>
				!story.full_slug.startsWith('config') &&
				!story.full_slug.startsWith('footer'),
		)
		.map((story) => {
			const isHome = story.full_slug === 'home' || story.is_startpage;

			return {
				url: isHome ? siteUrl : `${siteUrl}/${story.full_slug}`,
				lastModified: story.published_at ?? new Date(),
			};
		});

	return pages;
}
