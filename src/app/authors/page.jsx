import { getStoryblokApi } from '@/lib/storyblok';
import Link from 'next/link';

export default async function AuthorsPage() {
	const storyblokApi = getStoryblokApi();
	const { data } = await storyblokApi.getStories({
		version: 'published',
		content_type: 'author',
		starts_with: 'authors/',
	});

	const authors = data.stories;

	return (
		<div className="mx-auto max-w-6xl px-4 py-12">
			<div className="mb-10">
				<h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
					Våra författare
				</h1>
				<p className="mt-2 text-zinc-500">
					Möt journalisterna bakom våra texter
				</p>
			</div>

			{authors.length === 0 ? (
				<p className="text-zinc-500">Inga författare hittades</p>
			) : (
				<ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{authors.map((author) => (
						<li key={author.uuid}>
							<Link
								href={`/authors/${author.slug}`}
								className="group flex h-full flex-col items-center rounded-xl border border-zinc-200 bg-white p-6 text-center shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
							>
								{author.content.photo?.filename ? (
									<img
										src={author.content.photo.filename}
										alt={author.content.name}
										className="h-full w-full rounded-lg object-cover ring-2 ring-zinc-100 transition-all group-hover:ring-blue-200"
									/>
								) : (
									<div className="flex h-24 w-24 items-center justify-center rounded-full bg-zinc-100 text-2xl font-semibold text-zinc-400">
										{author.content.name?.charAt(0)}
									</div>
								)}

								<span className="mt-4 text-lg font-semibold text-zinc-900 transition-colors group-hover:text-blue-600">
									{author.content.name}
								</span>

								<p className="mt-2 line-clamp-3 text-sm leading-relaxed text-zinc-500">
									{author.content.bio}
								</p>

								<span className="mt-4 text-sm font-medium text-blue-600 opacity-0 transition-opacity group-hover:opacity-100">
									Läs mer →
								</span>
							</Link>
						</li>
					))}
				</ul>
			)}
		</div>
	);
}
