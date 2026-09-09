import { getStoryblokApi } from '@/lib/storyblok';
import { StoryblokServerComponent } from '@storyblok/react/rsc';
import { notFound } from 'next/navigation';

export default async function ArticlePage({ params }) {
	const { slug } = await params;
	const storyblokApi = getStoryblokApi();

	let story;
	try {
		const { data } = await storyblokApi.get(`cdn/stories/articles/${slug}`, {
			version: 'published',
			resolve_relations: 'article-post.author',
		});
		story = data.story;
	} catch {
		notFound();
	}

	return <StoryblokServerComponent blok={story.content} />;
}
