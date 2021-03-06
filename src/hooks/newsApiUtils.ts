import { useState } from 'react';
import news from '../api/news';
import { DEFAULT_COUNTRY, DEFAULT_LANGUAGE } from '../data/constants';
import News from '../models/News';

const PAGE_SIZE = 10;

export const fetchHighlights = async ({
	country = DEFAULT_COUNTRY,
	page,
	category
}: {
	country?: string;
	page: number;
	category?: string;
}): Promise<News[]> => {
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

export const searchArticles = async ({
	query,
	language = DEFAULT_LANGUAGE,
	page
}: {
	query: string;
	language?: string;
	page: number;
}): Promise<News[]> => {
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

export const useRecents = (
	country: string = DEFAULT_COUNTRY
): [News[], () => Promise<void>] => {
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
