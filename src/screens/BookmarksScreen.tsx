import React, { FC, useContext } from 'react';
import { FlatList, ListRenderItemInfo } from 'react-native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { ParamListBase } from '@react-navigation/native';
import { Context as BookmarkContext } from '../context/BookmarkContext';
import NewsCard from '../components/NewsCard';
import News from '../models/News';

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

	return (
		<FlatList
			style={{ marginTop: 10 }}
			data={state}
			keyExtractor={(news: News) => news.url}
			renderItem={renderBookmark}
		/>
	);
};

export default BookmarksScreen;
