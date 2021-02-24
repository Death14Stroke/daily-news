import React, { useContext } from 'react';
import { Text, FlatList } from 'react-native';
import { Context as BookmarkContext } from '../context/BookmarkContext';
import RecentNewsCard from '../components/RecentNewsCard';

const BookmarksScreen = ({ navigation }) => {
	const { state } = useContext(BookmarkContext);

	const renderBookmark = ({ item }) => {
		return (
			<RecentNewsCard
				title={item.title}
				category={item.category}
				imageUri={item.urlToImage}
				onPress={() => {
					navigation.navigate('Details', { news: item });
				}}
			/>
		);
	};

	return (
		<FlatList
			data={state}
			keyExtractor={news => news.url}
			renderItem={renderBookmark}
		/>
	);
};

export default BookmarksScreen;
