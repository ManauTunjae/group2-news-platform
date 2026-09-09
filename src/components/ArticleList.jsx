import { getStoryblokApi } from '@/lib/storyblok';
import { storyblokEditable } from '@storyblok/react';
import Image from 'next/image';
import Link from 'next/link';

export default async function ArticleList({ blok }) {
	const storyblokApi = getStoryblokApi();

	const { data } = await storyblokApi.getStories({
		version: 'published',
		starts_with: 'articles/',
		content_type: 'article-post',
	});

	const [featured, ...rest] = data.stories;

	return (
		<section
			{...storyblokEditable(blok)}
			className="mx-auto max-w-5xl px-4 py-12"
		>
			<div className="space-y-10">
				{featured && (
					<article className="group overflow-hidden rounded-lg border border-gray-200">
						<Link href={`/${featured.full_slug}`}>
							{featured.content.image?.filename && (
								<div className="relative h-72 w-full sm:h-96">
									<Image
										src={featured.content.image.filename}
										alt={featured.content.title}
										fill
										className="object-cover"
										sizes="(min-width: 640px) 800px, 100vw"
										priority
									/>
								</div>
							)}
						</Link>
						<div className="p-6">
							<h2 className="text-2xl font-bold leading-tight sm:text-3xl">
								<Link
									href={`/${featured.full_slug}`}
									className="hover:underline"
								>
									{featured.content.title}
								</Link>
							</h2>
							<p className="mt-3 text-gray-600">{featured.content.summary}</p>
						</div>
					</article>
				)}

				<div className="flex flex-col gap-4">
					{rest.map((story) => (
						<article
							key={story.uuid}
							className="group flex items-center gap-4 overflow-hidden rounded-lg border border-gray-200 p-3"
						>
							<div className="min-w-0 flex-1">
								<h2 className="text-lg font-semibold leading-snug">
									<Link
										href={`/${story.full_slug}`}
										className="hover:underline"
									>
										{story.content.title}
									</Link>
								</h2>
								<p className="mt-2 line-clamp-2 text-sm text-gray-600">
									{story.content.summary}
								</p>
							</div>
							{story.content.image?.filename && (
								<Link href={`/${story.full_slug}`} className="shrink-0">
									<div className="relative h-24 w-32 overflow-hidden rounded-lg sm:h-28 sm:w-40">
										<Image
											src={story.content.image.filename}
											alt={story.content.title}
											fill
											className="object-cover"
											sizes="160px"
										/>
									</div>
								</Link>
							)}
						</article>
					))}
				</div>
			</div>
		</section>
	);
}
