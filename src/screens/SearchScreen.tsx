import React, { FC, useLayoutEffect, useState } from 'react';
import {
	View,
	TouchableOpacity,
	ListRenderItemInfo,
	StyleSheet
} from 'react-native';
import { SearchBar } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import { ParamListBase } from '@react-navigation/native';
import { searchArticles } from '../hooks/newsApiUtils';
import NewsCard from '../components/NewsCard';
import PagedList from '../components/PagedList';
import News from '../models/News';
import { useTheme } from '../hooks/themes';

type Props = {
	navigation: StackNavigationProp<ParamListBase, 'Search'>;
};

const SearchScreen: FC<Props> = ({ navigation }) => {
	const { colors } = useTheme();
	const [query, setQuery] = useState('');
	const [finalQuery, setFinalQuery] = useState('');

	const fetchSearchResults = async (page: number) => {
		if (query === '') {
			console.log('empty query');
			return [];
		}

		const results = await searchArticles({ query, page });

		return results;
	};

	const header = () => {
		return (
			<View style={styles.headerContainerStyle}>
				<TouchableOpacity
					style={[
						styles.upArrowStyle,
						{ backgroundColor: colors.card }
					]}
					onPress={() => navigation.pop()}>
					<Ionicons
						name='chevron-back'
						size={24}
						color={colors.text}
					/>
				</TouchableOpacity>
				<SearchBar
					placeholder='Search'
					onChangeText={setQuery}
					value={query}
					onSubmitEditing={() => {
						setFinalQuery(query);
					}}
					containerStyle={[
						styles.searchContainerStyle,
						{ backgroundColor: colors.card }
					]}
					inputContainerStyle={{ backgroundColor: colors.card }}
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
			key={finalQuery}
			keyExtractor={(news: News) => news.url}
			renderItem={renderNewsCard}
			loadData={page => {
				return fetchSearchResults(page);
			}}
			firstPage={1}
			horizontal={false}
			style={{ marginTop: 15 }}
		/>
	);
};

const styles = StyleSheet.create({
	headerContainerStyle: {
		flexDirection: 'row',
		marginTop: 30
	},
	upArrowStyle: {
		alignSelf: 'center',
		marginStart: 10
	},
	searchContainerStyle: {
		padding: 0,
		borderTopColor: 'transparent',
		borderBottomColor: 'transparent',
		flex: 1
	}
});

export default SearchScreen;
