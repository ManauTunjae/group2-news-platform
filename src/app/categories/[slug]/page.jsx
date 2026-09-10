import { getStoryblokApi } from '@/lib/storyblok';
import { StoryblokServerComponent } from '@storyblok/react/rsc';
import { notFound } from 'next/navigation';

export default async function CategoryPage({ params, searchParams }) {
	const { slug } = await params;
	const { sub } = await searchParams;
	const storyblokApi = getStoryblokApi();

	let story;
	try {
		const { data } = await storyblokApi.get(`cdn/stories/categories/${slug}`, {
			version: 'published',
		});
		story = data.story;
	} catch {
		notFound();
	}

	return (
		<StoryblokServerComponent
			blok={story.content}
			mainCategory={slug}
			subCategory={sub}
		/>
	);
}
