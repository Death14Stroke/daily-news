import React, { useLayoutEffect, useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import { searchArticles } from '../hooks/NewsApi';
import RecentNewsCard from '../components/RecentNewsCard';
import PagedList from '../components/PagedList';

const SearchScreen = ({ navigation }) => {
	const [query, setQuery] = useState('');

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

	const fetchSearchResults = async page => {
		if (query === '') {
			console.log('empty query');
			return [];
		}

		const results = await searchArticles({
			query,
			language: 'en',
			page
		});
		console.log('results:', results.length);
		return results;
	};

	return (
		<PagedList
			keyExtractor={news => news}
			renderItem={renderNewsCard}
			loadData={page => {
				return fetchSearchResults(page);
			}}
			firstPage={1}
			horizontal
		/>
	);
};

export default SearchScreen;
