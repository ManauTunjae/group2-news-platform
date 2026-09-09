import { getStoryblokApi } from '@/lib/storyblok';
import { StoryblokServerComponent } from '@storyblok/react/rsc';

export default async function HomePage() {
	const storyblokApi = getStoryblokApi();
	const { data } = await storyblokApi.get('cdn/stories/articles', {
		version: 'published',
	});

	return <StoryblokServerComponent blok={data.story.content} />;
}
