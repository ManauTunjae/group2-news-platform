import { getStoryblokApi } from '@/lib/storyblok/blok';
import Link from 'next/link';

export default async function AuthorsPage() {
	const storyblokApi = getStoryblokApi();
	const { data } = await storyblokApi.getStories({
		version: 'draft',
		content_type: 'author',
		starts_with: 'authors/',
	});
    const authors = data.stories;
}
