import { getStoryblokApi } from '@/lib/storyblok';
import { StoryblokServerComponent } from '@storyblok/react/rsc';

export default async function ArticlesPage({ searchParams }) {
	// const params = await searchParams;

	const storyblokApi = getStoryblokApi();
	const { data } = await storyblokApi.get('cdn/stories/articles', {
		version: 'draft',
	});
	return <StoryblokServerComponent blok={data.story.content} />;
}
