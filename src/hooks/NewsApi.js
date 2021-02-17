import { useState } from 'react';
import news from '../api/news';

export const fetchHighlights = async ({ country, page }) => {
	try {
		let response = await news.get('/highlights', {
			params: {
				country,
				page,
				pageSize: 10
			}
		});
		return response.data.articles;
	} catch (err) {
		console.log(err);
		return [];
	}
};

export const useRecents = ({ country }) => {
	const fetchRecents = async () => {
		try {
			let response = await news.get('/recents', {
				params: {
					country
				}
			});
			setRecents(response.data.recents);
		} catch (err) {
			console.log(err);
		}
	};

	const [recents, setRecents] = useState([]);

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
