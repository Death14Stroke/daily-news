import React, { FC, useContext } from 'react';
import { FlatList, ListRenderItemInfo } from 'react-native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { ParamListBase } from '@react-navigation/native';
import { Context as BookmarkContext } from '../context/BookmarkContext';
import NewsCard from '../components/NewsCard';
import News from '../models/News';
import EmptyView from '../components/EmptyView';

type Props = {
	navigation: BottomTabNavigationProp<ParamListBase, 'Bookmarks'>;
};

const BookmarksScreen: FC<Props> = ({ navigation }) => {
	const { state } = useContext(BookmarkContext);

	const renderBookmark = ({ item }: ListRenderItemInfo<News>) => {
		return (
			<NewsCard
				news={item}
				onPress={() => {
					navigation.navigate('Details', { news: item });
				}}
			/>
		);
	};

	const renderEmptyView = () => {
		return <EmptyView text='No bookmarks' />;
	};

	return (
		<FlatList
			style={{ paddingTop: 10 }}
			data={state}
			keyExtractor={(news: News) => news.url}
			renderItem={renderBookmark}
			ListEmptyComponent={renderEmptyView}
			contentContainerStyle={{ flexGrow: 1 }}
		/>
	);
};

export default BookmarksScreen;
