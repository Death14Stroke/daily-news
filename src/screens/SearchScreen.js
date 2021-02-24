import React, { useLayoutEffect, useState } from 'react';
import { View, FlatList, TouchableOpacity } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import { searchArticles } from '../hooks/NewsApi';
import RecentNewsCard from '../components/RecentNewsCard';

const SearchScreen = ({ navigation }) => {
	const [query, setQuery] = useState('');
	const [articles, setArticles] = useState([]);

	useLayoutEffect(() => {
		navigation.setOptions({
			header: () => {
				return (
					<View
						style={{
							flexDirection: 'row',
							backgroundColor: 'white'
						}}>
						<TouchableOpacity
							style={{ alignSelf: 'center', marginStart: 10 }}
							onPress={() => navigation.pop()}>
							<Ionicons
								name='chevron-back'
								size={24}
								color='black'
							/>
						</TouchableOpacity>
						<SearchBar
							placeholder='Search'
							onChangeText={setQuery}
							value={query}
							onSubmitEditing={() => {
								fetchSearchResults();
							}}
							containerStyle={{
								backgroundColor: 'white',
								padding: 0,
								borderTopColor: 'transparent',
								borderBottomColor: 'transparent',
								flex: 1
							}}
							inputContainerStyle={{ backgroundColor: 'white' }}
						/>
					</View>
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
