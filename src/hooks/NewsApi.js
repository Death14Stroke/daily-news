import { useState } from 'react';
import news from '../api/news';

export const fetchHighlights = async ({ country, page, category = null }) => {
	try {
		let { data } = await news.get('/highlights', {
			params: {
				country,
				category,
				page,
				pageSize: 10
			}
		});
		return data.articles;
	} catch (err) {
		console.log(err);
		return [];
	}
};

export const searchArticles = async ({ query, language, page }) => {
	try {
		let { data } = await news.get('/search', {
			params: {
				query,
				language,
				page,
				pageSize: 10
			}
		});
		//console.log('articles:', data.articles);
		return data.articles;
	} catch (err) {
		console.log(err);
		return [];
	}
};

export const useSources = ({ country, category, language }) => {
	const [sources, setSources] = useState([]);

	const fetchSources = async () => {
		try {
			let { data } = await news.get('/sources', {
				params: {
					country,
					category,
					language
				}
			});
			setSources(data.sources);
		} catch (err) {
			console.log(err);
		}
	};

	return [sources, fetchSources];
};

export const useRecents = ({ country }) => {
	const [recents, setRecents] = useState([]);

	const fetchRecents = async () => {
		try {
			let { data } = await news.get('/recents', {
				params: {
					country
				}
			});
			setRecents(data.recents);
		} catch (err) {
			console.log(err);
		}
	};

	return [recents, fetchRecents];
};

export const useCategories = async () => {
	try {
		let response = await news.get('/categoeries');
		return response.categories;
	} catch (err) {
		console.log(err);
		return [];
	}
};
