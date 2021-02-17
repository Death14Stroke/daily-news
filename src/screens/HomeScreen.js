import React, { useEffect } from 'react';
import { View, Text, FlatList, ScrollView, StyleSheet } from 'react-native';
import { format } from 'date-fns';
import { fetchHighlights, useRecents } from '../hooks/NewsApi';
import NewsCard from '../components/NewsCard';
import RecentNewsCard from '../components/RecentNewsCard';
import PagedList from '../components/PagedList';
import news from '../api/news';

const HomeScreen = () => {
	const [recents, fetchRecents] = useRecents({ country: 'in' });

	const renderHighlight = ({ item, index }) => {
		return (
			<NewsCard
				title={item.title}
				date={format(new Date(item.publishedAt), 'MMMM dd, yyyy')}
				imageUri={item.urlToImage}
				cardStyle={index === 0 ? { marginLeft: 20 } : { marginLeft: 0 }}
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
		<ScrollView style={{ paddingTop: 20 }}>
			<View>
				<PagedList
					keyExtractor={news => news.url + Math.random()}
					renderItem={renderHighlight}
					horizontal
					loadData={page => {
						console.log('page =', page);
						return fetchHighlights({ country: 'in', page });
					}}
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
		marginTop: 20,
		fontFamily: 'Roboto_500Medium',
		fontSize: 18
	}
});

export default HomeScreen;
