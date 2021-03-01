import React, { FC, PropsWithChildren, useEffect, useReducer } from 'react';
import { ListRenderItem } from 'react-native';
import { View, FlatList, ActivityIndicator, FlatListProps } from 'react-native';

type State = {
	loading: boolean;
	data: any[];
	page: number;
	isListEnd: boolean;
};
type Action = {
	type: 'data_loading' | 'page_loaded' | 'list_end_reached';
	payload?: any;
};

interface Props<T> {
	keyExtractor: (item: T, index: number) => string;
	renderItem: ListRenderItem<T> | null | undefined;
	horizontal?: boolean | null;
	firstPage: number;
	loadData: (page: number) => Promise<T[]>;
}

const getInitialState = (firstPage: number): State => {
	return {
		loading: false,
		data: [],
		page: firstPage,
		isListEnd: false
	};
};

const pagingReducer = (state: State, action: Action) => {
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

const PagedList = <T extends any>({
	keyExtractor,
	renderItem,
	horizontal = false,
	loadData,
	firstPage = 0
}: PropsWithChildren<Props<T>>) => {
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
