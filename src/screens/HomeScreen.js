import React, { useEffect } from 'react';
import { View, Text, FlatList, ScrollView, StyleSheet } from 'react-native';
import { useHighlights, useRecents } from '../hooks/NewsApi';
import NewsCard from '../components/NewsCard';
import RecentNewsCard from '../components/RecentNewsCard';
import PagedList from '../components/PagedList';
import news from '../api/news';

const HomeScreen = () => {
	//const [highlights, fetchHighlights] = useHighlights({ country: 'in' });
	const [recents, fetchRecents] = useRecents({ country: 'in' });

	const fetchHighlights = async page => {
		try {
			let response = await news.get('/highlights', {
				params: {
					country: 'in',
					page,
					pageSize: 10
				}
			});
			return response.data.articles;
		} catch (err) {
			console.log(err);
			return [];
		}
	};

	const renderHighlight = ({ item }) => {
		return (
			<NewsCard
				title={item.title}
				date={item.publishedAt}
				imageUri={item.urlToImage}
			/>
		);
	};
	const renderRecent = ({ item }) => {
		return (
			<RecentNewsCard
				title={item.title}
				category={item.category}
				imageUri={item.urlToImage}
			/>
		);
	};

	return (
		<ScrollView>
			<View>
				<PagedList
					keyExtractor={news => news.url + Math.random()}
					renderItem={renderHighlight}
					horizontal
					loadData={fetchHighlights}
					firstPage={1}
					threshold={3}
				/>
				{/* <FlatList
					data={highlights}
					keyExtractor={news => news.url}
					renderItem={renderHighlight}
					horizontal
				/> */}
				<Text style={styles.titleStyle}>Recent News</Text>
				{/* <View>
				<FlatList
					style={{ marginTop: 10 }}
					data={recents}
					keyExtractor={news => news.url}
					renderItem={renderRecent}
				/>
			</View> */}
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	titleStyle: {
		color: 'gray',
		marginLeft: 20,
		fontFamily: 'Roboto_500Medium',
		fontSize: 18
	}
});

export default HomeScreen;
