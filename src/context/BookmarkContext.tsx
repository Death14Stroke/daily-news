import React, {
	createContext,
	useReducer,
	useEffect,
	FC,
	Dispatch
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import _ from 'lodash';
import News from '../models/News';

type Action = {
	type: 'init_bookmarks' | 'add_bookmark' | 'delete_bookmark';
	payload: any;
};
type DispatchAction = (dispatch: Dispatch<Action>) => any;

const INITIAL_STATE: News[] = [];

const bookmarkReducer = (state: News[], action: Action) => {
	switch (action.type) {
		case 'init_bookmarks':
			return action.payload;
		case 'add_bookmark':
			return _.uniqBy(
				[...state, action.payload],
				(news: News) => news.url
			);
		case 'delete_bookmark':
			return state.filter(news => news !== action.payload);
		default:
			return state;
	}
};

const addBookmark = (dispatch: Dispatch<Action>) => (news: News) => {
	dispatch({ type: 'add_bookmark', payload: news });
};

const deleteBookmark = (dispatch: Dispatch<Action>) => (news: News) => {
	dispatch({ type: 'delete_bookmark', payload: news });
};

const createBookmarkContext = () => {
	const Context = createContext<any>(null);

	const Provider: FC = ({ children }) => {
		const [state, dispatch] = useReducer(bookmarkReducer, INITIAL_STATE);

		const isBookmarked = (news: News) => {
			return state.find((n: News) => n.url === news.url) !== undefined
				? true
				: false;
		};

		const actions: { [key: string]: DispatchAction } = {
			addBookmark,
			deleteBookmark
		};

		useEffect(() => {
			const fetchBookmarks = async () => {
				try {
					let bookmarks = await AsyncStorage.getItem('bookmarks');
					if (bookmarks) {
						dispatch({
							type: 'init_bookmarks',
							payload: JSON.parse(bookmarks)
						});
					}
				} catch (err) {
					console.log(err);
				}
			};

			fetchBookmarks();
		}, []);

		useEffect(() => {
			const saveBookmarks = async () => {
				await AsyncStorage.setItem('bookmarks', JSON.stringify(state));
			};

			saveBookmarks();
		}, [state]);

		const boundActions: { [key: string]: Action } = {};
		for (let key in actions) {
			boundActions[key] = actions[key](dispatch);
		}

		return (
			<Context.Provider value={{ state, ...boundActions, isBookmarked }}>
				{children}
			</Context.Provider>
		);
	};

	return { Context, Provider };
};

export const { Context, Provider } = createBookmarkContext();
