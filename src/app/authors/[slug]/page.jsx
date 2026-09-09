import { getStoryblokApi } from '@/lib/storyblok';
import { StoryblokServerComponent } from '@storyblok/react/rsc';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
	const storyblokApi = getStoryblokApi();
	const { data } = await storyblokApi.getStories({
		version: 'draft',
		content_type: 'author',
		starts_with: 'authors/',
	});

	return data.stories.map((story) => ({
		slug: story.slug,
	}));
}

export default async function AuthorPage({ params }) {
	const { slug } = await params;
	const storyblokApi = getStoryblokApi();

	let authorStory;
	try {
		const { data } = await storyblokApi.get(`cdn/stories/authors/${slug}`, {
			version: 'draft',
		});
		authorStory = data.story;
	} catch {
		notFound();
	}

	return (
		<StoryblokServerComponent
			blok={authorStory.content}
			uuid={authorStory.uuid}
		/>
	);
}
