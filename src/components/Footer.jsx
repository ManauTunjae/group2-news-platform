import { storyblokEditable } from '@storyblok/react/rsc';

export default function Footer({ blok }) {
	return (
		<section
			{...storyblokEditable(blok)}
			className="mt-auto flex flex-col md:flex-row items-center justify-between gap-6 bg-gray-100 px-8 py-5"
		>
			<div className="flex items-center gap-4 w-full md:w-auto">
				{blok.icon?.filename && (
					<div className="flex-shrink-0">
						<img
							src={blok.icon.filename}
							alt="Footer icon"
							className="w-8 h-8 object-contain"
						/>
					</div>
				)}
				<div>
					<h5 className="text-base font-bold text-gray-900 leading-tight">
						{blok.title}
					</h5>
					<p className="text-xs text-gray-600 mt-0.5">{blok.description}</p>
				</div>
			</div>

			<div className="flex gap-2 w-full md:w-auto md:min-w-[360px]">
				<form className="flex items-center bg-white rounded-lg p-1.5 shadow-sm border border-transparent focus-within:border-gray-300">
					<input
						type="email"
						name="email"
						placeholder={blok.email || 'Din e-post'}
						className="flex-1 bg-transparent px-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none"
					/>
				</form>
				<button
					type="submit"
					className="bg-black text-white text-xs font-semibold px-4 py-2.5 rounded-lg hover:bg-gray-800 transition-colors shrink-0"
				>
					{blok.subscribe || 'Prenumerera'}
				</button>
			</div>
		</section>
	);
}