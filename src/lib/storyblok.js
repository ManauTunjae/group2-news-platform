import Page from '@/components/Page';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import NavLink from '@/components/NavLink';
import Config from '@/components/config';
import Author from '@/components/Author';
import ArticlePost from '@/components/ArticlePost';
import ArticleList from '@/components/ArticleList';
import { apiPlugin, storyblokInit } from '@storyblok/react/rsc';

export const getStoryblokApi = storyblokInit({
	accessToken: process.env.STORYBLOK_DELIVERY_API_TOKEN,
	use: [apiPlugin],
	components: {
		page: Page,
		footer: Footer,
		header: Header,
		'nav-link': NavLink,
		config: Config,
		author: Author,
		'article-post': ArticlePost,
		'article-list': ArticleList,
	},
	apiOptions: {
		region: process.env.STORYBLOK_REGION || 'eu',
		endpoint: process.env.STORYBLOK_API_BASE_URL
			? `${new URL(process.env.STORYBLOK_API_BASE_URL).origin}/v2`
			: undefined,
	},
});