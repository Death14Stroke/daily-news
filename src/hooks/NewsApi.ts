import { useState } from 'react';
import news from '../api/news';
import News from '../models/News';

const PAGE_SIZE = 10;

export const fetchHighlights = async (
	country: string,
	page: number,
	category?: string
): Promise<News[]> => {
	try {
		let { data } = await news.get('/highlights', {
			params: {
				country,
				category,
				page,
				pageSize: PAGE_SIZE
			}
		});
		return data.articles;
	} catch (err) {
		console.log(err);
		return [];
	}
};

export const searchArticles = async (
	query: string,
	language: string,
	page: number
): Promise<News[]> => {
	try {
		let { data } = await news.get('/search', {
			params: {
				query,
				language,
				page,
				pageSize: PAGE_SIZE
			}
		});
		return data.articles;
	} catch (err) {
		console.log(err);
		return [];
	}
};

export const useSources = (
	country: string,
	category: string,
	language: string
) => {
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

export const useRecents = (country: string): [News[], () => Promise<void>] => {
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
