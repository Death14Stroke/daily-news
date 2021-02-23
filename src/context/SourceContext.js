import createDataContext from '../hooks/createDataContext';
import news from '../api/news';

const INITIAL_STATE = [];

const sourceReducer = (state, action) => {
	switch (action.type) {
		case 'fetch_sources':
			return action.payload;
		default:
			return state;
	}
};

const fetchSources = dispatch => async ({ country, language }, callback) => {
	try {
		let { data } = await news.get('/sources', {
			params: {
				country,
				language
			}
		});
		dispatch({ type: 'fetch_sources', payload: data.sources });
		callback();
	} catch (err) {
		console.log(err);
	}
};

export const { Context, Provider } = createDataContext(
	sourceReducer,
	{ fetchSources },
	INITIAL_STATE
);
