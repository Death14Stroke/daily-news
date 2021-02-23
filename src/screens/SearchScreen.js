import React, { useLayoutEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { searchArticles } from '../hooks/NewsApi';
import RecentNewsCard from '../components/RecentNewsCard';

const SearchScreen = ({ navigation }) => {
	const [query, setQuery] = useState('');
	const [articles, setArticles] = useState([]);

	useLayoutEffect(() => {
		navigation.setOptions({
			header: () => {
				return (
					<SearchBar
						placeholder='Search...'
						onChangeText={setQuery}
						value={query}
						onSubmitEditing={() => {
							fetchSearchResults();
						}}
					/>
				);
			}
		});
	}, [navigation, query]);

	const renderNewsCard = ({ item }) => {
		console.log('item:', item);
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

	const fetchSearchResults = async () => {
		const results = await searchArticles({
			query,
			language: 'en',
			page: 1
		});
		console.log('results:', results);
		setArticles(results);
	};

	return (
		<FlatList
			data={articles}
			keyExtractor={news => news.title}
			renderItem={renderNewsCard}
		/>
	);
};

export default SearchScreen;
