import React, { FC, useLayoutEffect, useState } from 'react';
import { View, TouchableOpacity, ListRenderItemInfo } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import { ParamListBase } from '@react-navigation/native';
import { searchArticles } from '../hooks/NewsApi';
import NewsCard from '../components/NewsCard';
import PagedList from '../components/PagedList';
import News from '../models/News';

type Props = {
	navigation: StackNavigationProp<ParamListBase, 'Search'>;
};

const SearchScreen: FC<Props> = ({ navigation }) => {
	const [query, setQuery] = useState('');

	const fetchSearchResults = async (page: number) => {
		if (query === '') {
			console.log('empty query');
			return [];
		}

		const results = await searchArticles(query, 'en', page);

		return results;
	};

	const header = () => {
		return (
			<View
				style={{
					flexDirection: 'row',
					backgroundColor: 'white'
				}}>
				<TouchableOpacity
					style={{ alignSelf: 'center', marginStart: 10 }}
					onPress={() => navigation.pop()}>
					<Ionicons name='chevron-back' size={24} color='black' />
				</TouchableOpacity>
				<SearchBar
					placeholder='Search'
					onChangeText={setQuery}
					value={query}
					onSubmitEditing={() => {
						fetchSearchResults(1);
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
	};

	const renderNewsCard = ({ item }: ListRenderItemInfo<News>) => {
		return (
			<NewsCard
				news={item}
				onPress={() => {
					navigation.navigate('Details', { news: item });
				}}
			/>
		);
	};

	useLayoutEffect(() => {
		navigation.setOptions({
			header
		});
	}, [navigation, query]);

	return (
		<PagedList
			keyExtractor={(news: News) => news.url}
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
