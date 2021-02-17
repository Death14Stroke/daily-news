import React, { useEffect, useReducer } from 'react';
import { FlatList } from 'react-native';

const getInitialState = firstPage => {
	return {
		data: [],
		page: firstPage
	};
};

const reducer = (state, action) => {
	switch (action.type) {
		case 'page_loaded':
			return {
				...state,
				page: state.page + 1,
				data: [...state.data, ...action.payload]
			};
		default:
			return state;
	}
};

const PagedList = ({
	keyExtractor,
	renderItem,
	horizontal = false,
	loadData,
	firstPage = 0,
	threshold = 1
}) => {
	const [state, dispatch] = useReducer(reducer, getInitialState(firstPage));
	const { data, page } = state;

	const onLoadData = async () => {
		console.log('loading page: ', page);

		let results = await loadData(page);
		dispatch({ type: 'page_loaded', payload: results });
	};

	useEffect(() => {
		console.log('useEffect');

		onLoadData();
	}, []);

	return (
		<FlatList
			data={data}
			keyExtractor={keyExtractor}
			renderItem={renderItem}
			horizontal={horizontal}
			onEndReachedThreshold={threshold}
			onEndReached={() => {
				console.log('onEndReached');

				onLoadData();
			}}
		/>
	);
};

export default PagedList;
