import React, { PropsWithChildren, useEffect, useReducer } from 'react';
import {
	View,
	Text,
	FlatList,
	ActivityIndicator,
	ListRenderItem,
	ViewStyle,
	StyleSheet
} from 'react-native';
import { useTheme } from '../models/Themes';

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
	style?: ViewStyle;
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
	firstPage = 0,
	style
}: PropsWithChildren<Props<T>>) => {
	const { colors } = useTheme();
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
				<ActivityIndicator
					color={colors.primary}
					style={{ margin: 15 }}
					size='large'
				/>
			</View>
		) : null;
	};

	const renderEmptyView = () => {
		return (
			<Text style={[styles.emptyViewStyle, { color: colors.text }]}>
				No news found
			</Text>
		);
	};

	useEffect(() => {
		getData();
	}, []);

	return (
		<FlatList
			style={style}
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
			contentContainerStyle={styles.contentContainerStyle}
			ListFooterComponent={renderFooter}
			ListEmptyComponent={() => {
				if (data.length === 0 && !loading) {
					return renderEmptyView();
				}
				return null;
			}}
		/>
	);
};

const styles = StyleSheet.create({
	contentContainerStyle: {
		flexGrow: 1,
		justifyContent: 'center'
	},
	emptyViewStyle: {
		textAlign: 'center',
		fontFamily: 'Roboto_500Medium',
		fontSize: 22
	}
});

export default PagedList;
