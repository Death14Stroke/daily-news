import createDataContext, { ReducerAction } from '../hooks/createDataContext';
import news from '../api/news';
import Source from '../models/Source';
import { Dispatch } from 'react';

type Callback = () => any;
interface Action extends ReducerAction {
	type: 'fetch_sources';
}

const INITIAL_STATE: Source[] = [];

const sourceReducer = (state: Source[], action: Action): Source[] => {
	switch (action.type) {
		case 'fetch_sources':
			return action.payload;
		default:
			return state;
	}
};

const fetchSources = (dispatch: Dispatch<ReducerAction>) => async (
	country: string,
	language: string,
	callback: Callback
) => {
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

export const { Context, Provider } = createDataContext<Source[]>(
	sourceReducer,
	{ fetchSources },
	INITIAL_STATE
);
