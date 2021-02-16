import { useState } from 'react';
import news from '../api/news';

export const useHighlights = ({ country }) => {
	const fetchHighlights = async () => {
		try {
			let response = await news.get('/highlights', {
				params: {
					country
				}
			});
			setHighlights(response.data.articles);
		} catch (err) {
			console.log(err);
		}
	};

	const [highlights, setHighlights] = useState([]);

	return [highlights, fetchHighlights];
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
