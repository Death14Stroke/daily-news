import React, { createContext, useReducer, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import _ from 'lodash';

const INITIAL_STATE = [];

const bookmarkReducer = (state, action) => {
	switch (action.type) {
		case 'init_bookmarks':
			return action.payload;
		case 'add_bookmark':
			return _.uniqBy([...state, action.payload], news => news.url);
		case 'delete_bookmark':
			return state.filter(news => news !== action.payload);
		default:
			return state;
	}
};

const addBookmark = dispatch => news => {
	dispatch({ type: 'add_bookmark', payload: news });
};

const deleteBookmark = dispatch => news => {
	dispatch({ type: 'delete_bookmark', payload: news });
};

const isBookmarked = dispatch => news => {
	return state.find(n => n.url === news.url) !== undefined ? true : false;
};

const createBookmarkContext = () => {
	const Context = createContext();

	const Provider = ({ children }) => {
		const [state, dispatch] = useReducer(bookmarkReducer, INITIAL_STATE);
		const actions = { addBookmark, deleteBookmark, isBookmarked };

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

		const boundActions = [];
		for (let key in actions) {
			boundActions[key] = actions[key](dispatch);
		}

		return (
			<Context.Provider value={{ state, ...boundActions }}>
				{children}
			</Context.Provider>
		);
	};

	return { Context, Provider };
};

export const { Context, Provider } = createBookmarkContext();
