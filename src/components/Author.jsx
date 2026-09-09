import { storyblokEditable } from '@storyblok/react/rsc';
import { getStoryblokApi } from '@/lib/storyblok';
import Link from 'next/link';

export default async function Author({ blok, uuid }) {
	const storyblokApi = getStoryblokApi();
	const { data: postsData } = await storyblokApi.getStories({
		version: 'draft',
		starts_with: 'articles/',
		content_type: 'article',
		filter_query: {
			author: { in: uuid },
		},
	});

	const posts = postsData.stories;

	return (
		<article
			{...storyblokEditable(blok)}
			className="mx-auto max-w-3xl px-6 py-16 text-zinc-900 dark:text-zinc-100"
		>
			<nav className="mb-12">
				<Link
					href="/authors"
					className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition-colors hover:text-gray-950 dark:text-gray-400 dark:hover:text-gray-900"
				>
					<span aria-hidden="true">←</span> Back to authors page.
				</Link>
			</nav>

			<section className="flex flex-col-reverse items-start justify-between gap-8 border-b border-zinc-200/80 pb-14 sm:flex-row sm:items-center dark:border-zinc-800">
				<div className="space-y-4">
					<h1 className="text-3xl text-gray-800 font-semibold tracking-tight sm:text-4xl">
						{blok.name}
					</h1>
					{blok.bio && (
						<p className="max-w-xl text-base leading-relaxed text-gray-500">
							{blok.bio}
						</p>
					)}
				</div>

				{blok.photo?.filename && (
					<img
						src={blok.photo.filename}
						alt={blok.name}
						width={200}
						height={200}
						className="size-50 shrink-0 rounded-full object-cover ring-1 ring-zinc-100/20 sm:size-40 dark:ring-zinc-800"
					/>
				)}
			</section>

			<section className="pt-12">
				<div className="flex items-baseline justify-between pb-6">
					<h2 className="text-xs font-semibold tracking-widest text-zinc-400 uppercase dark:text-zinc-500">
						Published articles ({posts.length})
					</h2>
				</div>

				{posts.length === 0 ? (
					<p className="py-8 text-sm text-zinc-500 dark:text-zinc-400">
						No published articles.
					</p>
				) : (
					<ul className="divide-y divide-zinc-100 dark:divide-zinc-800/60">
						{posts.map((post) => (
							<li key={post.uuid}>
								<Link
									href={`/${post.full_slug}`}
									className="group flex items-center justify-between py-5 transition-colors"
								>
									<span className="text-base font-medium text-zinc-800 transition-colors group-hover:text-zinc-950 dark:text-zinc-200 dark:group-hover:text-white">
										{post.content.title}
									</span>
									<span
										aria-hidden="true"
										className="text-sm text-zinc-400 transition-transform duration-150 group-hover:translate-x-1 group-hover:text-zinc-700 dark:text-zinc-600 dark:group-hover:text-zinc-300"
									>
										→
									</span>
								</Link>
							</li>
						))}
					</ul>
				)}
			</section>
		</article>
	);
}
