import React, { useEffect } from 'react';
import { Text, View, ScrollView, FlatList, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { format } from 'date-fns';
import PagedList from '../components/PagedList';
import NewsCard from '../components/NewsCard';
import { fetchHighlights, useSources } from '../hooks/NewsApi';
import SourceCard from '../components/SourceCard';

const CategoryNewsScreen = ({ category }) => {
	const navigation = useNavigation();
	const [sources, fetchSources] = useSources({
		country: 'in',
		category,
		language: 'en'
	});

	useEffect(() => {
		fetchSources();
	}, []);

	const renderHighlight = ({ item, index }) => {
		return (
			<NewsCard
				title={item.title}
				date={format(new Date(item.publishedAt), 'MMMM dd, yyyy')}
				imageUri={item.urlToImage}
				cardStyle={index === 0 ? { marginLeft: 20 } : { marginLeft: 0 }}
				onPress={() => {
					navigation.navigate('Details', { news: item });
				}}
			/>
		);
	};

	const renderSource = ({ item }) => {
		return <SourceCard source={item} />;
	};

	return (
		<ScrollView style={{ paddingTop: 20 }}>
			<View>
				<PagedList
					keyExtractor={news => news.url + Math.random()}
					renderItem={renderHighlight}
					horizontal
					loadData={page => {
						return fetchHighlights({
							country: 'in',
							category,
							page
						});
					}}
					firstPage={1}
					threshold={0.5}
				/>
				<Text style={styles.titleStyle}>Top sources</Text>
				<FlatList
					style={{ marginTop: 10 }}
					data={sources}
					keyExtractor={source => source.id}
					renderItem={renderSource}
				/>
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	titleStyle: {
		color: 'gray',
		marginLeft: 20,
		marginTop: 20,
		fontFamily: 'Roboto_500Medium',
		fontSize: 18
	}
});

export default CategoryNewsScreen;
