import { getStoryblokApi } from '@/lib/storyblok';
import { renderRichText } from '@storyblok/react';
import { storyblokEditable } from '@storyblok/react/rsc';
import Image from 'next/image';
import Link from 'next/link';

export default async function ArticlePost({ blok }) {
	const renderedContent = renderRichText(blok.content);

	const CATEGORY_LABELS = {
		sverige: 'Sverige',
		varlden: 'Världen',
		sport: 'Sport',
		ekonomi: 'Ekonomi',
		teknik: 'Teknik',
	};

	return (
		<article {...storyblokEditable(blok)} className="pb-16">
			<div className="mx-auto max-w-3xl px-4 pt-8">
				<Link
					href="/articles"
					className="text-sm text-gray-500 hover:underline"
				>
					← Tillbaka till alla nyheter
				</Link>

				<div className="mt-6 flex items-center gap-2">
					{blok.main_category && (
						<span className="text-xs font-semibold uppercase tracking-wide text-blue-700">
							{CATEGORY_LABELS[blok.main_category] || blok.main_category}
						</span>
					)}
					{blok.sub_category && (
						<span className="text-xs font-semibold uppercase tracking-wide text-gray-400">
							· {CATEGORY_LABELS[blok.sub_category] || blok.sub_category}
						</span>
					)}
				</div>

				<h1 className="mt-2 text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
					{blok.title}
				</h1>

				<p className="mt-4 text-xl text-gray-600">{blok.summary}</p>

				<div className="mt-6 flex items-center gap-1 border-t border-gray-200 pt-4 text-sm text-gray-500">
					<span>Av</span>
					<Link
						href={`/${blok.author[0]?.full_slug}`}
						className="font-medium text-gray-900 hover:underline"
					>
						{blok.author[0]?.name}
					</Link>
				</div>
			</div>

			<div className="relative mx-auto mt-8 h-80 w-full max-w-5xl sm:h-112">
				<Image
					src={blok.image.filename}
					alt={blok.title}
					fill
					className="object-cover"
					sizes="(min-width: 1024px) 1024px, 100vw"
					priority
				/>
			</div>

			<div
				className="prose prose-lg mx-auto mt-10 max-w-3xl px-4"
				dangerouslySetInnerHTML={{ __html: renderedContent }}
			/>
		</article>
	);
}
