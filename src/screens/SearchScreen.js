import React, { useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { searchArticles } from '../hooks/NewsApi';

const SearchScreen = () => {
	const [query, setQuery] = useState('');
	const [articles, setArticles] = useState([]);

	const renderNewsCard = ({ item }) => {
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
		<View>
			<SearchBar
				placeholder='Search...'
				onChangeText={setQuery}
				value={query}
				onSubmitEditing={() => {
					const results = searchArticles({
						query,
						language: 'en',
						page: 0
					});
					setArticles(results);
				}}
			/>
			<FlatList
				data={articles}
				keyExtractor={news => news.title}
				renderItem={renderNewsCard}
			/>
		</View>
	);
};

export default SearchScreen;
