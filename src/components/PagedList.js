import React, { useEffect, useReducer } from 'react';
import { FlatList } from 'react-native';

const getInitialState = firstPage => {
	return {
		data: [],
		page: firstPage,
		hasMore: true,
		onEndReached: false
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
		case 'no_more_data':
			return {
				...state,
				hasMore: false
			};
		case 'update_end_reached':
			return { ...state, onEndReached: action.payload };
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
	const { data, page, hasMore, onEndReached } = state;

	const onLoadData = async () => {
		console.log('loading page: ', page);

		let results = await loadData(page);
		//console.log(results);
		dispatch({ type: 'page_loaded', payload: results });

		if (results.length === 0) {
			dispatch({ type: 'no_more_data' });
		}
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
			showsHorizontalScrollIndicator={false}
			onMomentumScrollBegin={() =>
				dispatch({ type: 'update_end_reached', payload: false })
			}
			onEndReached={() => {
				if (!onEndReached && hasMore) {
					onLoadData();
					dispatch({ type: 'update_end_reached', payload: true });
				}
			}}
		/>
	);
};

export default PagedList;
