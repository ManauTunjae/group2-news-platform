const siteUrl = process.env.SITE_URL ?? 'https://example.com';

export default function robots() {
	return {
		rules: {
			userAgent: '*',
			allow: '/',
			disallow: '/api/',
		},
		sitemap: `${siteUrl}/sitemap.xml`,
	};
}
