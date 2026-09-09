import { getStoryblokApi } from '@/lib/storyblok';
import { StoryblokServerComponent } from '@storyblok/react/rsc';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }) {
	const { slug } = await params;
	const storyblokApi = getStoryblokApi();

	const { data } = await storyblokApi.get(`cdn/stories/articles/${slug}`, {
		version: 'published',
	});

	const story = data.story;

	return {
		title: story.content.title,
		description: story.content.summary,
	};
}

export async function generateStaticParams() {
	const storyblokApi = getStoryblokApi();

	const { data } = await storyblokApi.getStories({
		version: 'published',
		starts_with: 'articles/',
		content_type: 'article-post',
	});

	return data.stories.map((story) => ({
		slug: story.slug,
	}));
}

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
