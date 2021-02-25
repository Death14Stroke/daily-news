import React, { useEffect, useReducer } from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native';

const getInitialState = firstPage => {
	return {
		loading: false,
		data: [],
		page: firstPage,
		isListEnd: false
	};
};

const pagingReducer = (state, action) => {
	switch (action.type) {
		case 'data_loading':
			return { ...state, loading: true };
		case 'page_loaded':
			return {
				...state,
				page: state.page + 1,
				data: [...state.data, ...action.payload],
				loading: false
			};
		case 'list_end_reached':
			return { ...state, isListEnd: true, loading: false };
		default:
			return state;
	}
};

const PagedList = ({
	keyExtractor,
	renderItem,
	horizontal = false,
	loadData,
	firstPage = 0
}) => {
	const [state, dispatch] = useReducer(
		pagingReducer,
		getInitialState(firstPage)
	);
	const { loading, data, page, isListEnd } = state;

	const getData = async () => {
		console.log('loading page: ', page);

		if (!loading && !isListEnd) {
			dispatch({ type: 'data_loading' });

			try {
				let results = await loadData(page);
				console.log('getData: ', results.length);
				if (results.length > 0) {
					dispatch({ type: 'page_loaded', payload: results });
				} else {
					dispatch({ type: 'list_end_reached' });
				}
			} catch (err) {
				console.log(err);
			}
		}
	};

	const renderFooter = () => {
		return loading ? (
			<View
				style={{
					flex: 1,
					justifyContent: 'center',
					flexDirection: 'column'
				}}>
				<ActivityIndicator color='black' style={{ margin: 15 }} />
			</View>
		) : null;
	};

	useEffect(() => {
		getData();
	}, []);

	console.log('data:', data.length);

	return (
		<FlatList
			data={data}
			extraData={state}
			keyExtractor={keyExtractor}
			renderItem={renderItem}
			horizontal={horizontal}
			onEndReachedThreshold={0.5}
			showsHorizontalScrollIndicator={false}
			onEndReached={() => {
				getData();
			}}
			ListFooterComponent={renderFooter}
		/>
	);
};

export default PagedList;
