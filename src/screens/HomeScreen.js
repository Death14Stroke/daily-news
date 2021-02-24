import React, { useEffect } from 'react';
import { Text, StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { format } from 'date-fns';
import { fetchHighlights, useRecents } from '../hooks/NewsApi';
import NewsCard from '../components/NewsCard';
import RecentNewsCard from '../components/RecentNewsCard';
import PagedList from '../components/PagedList';

const HomeScreen = ({ navigation }) => {
	const [recents, fetchRecents] = useRecents({ country: 'in' });

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

	const renderRecent = ({ item }) => {
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

	useEffect(() => {
		console.log('called useEffect');
		fetchRecents();
	}, []);

	return (
		<FlatList
			style={{ marginTop: 10 }}
			data={recents}
			keyExtractor={news => news.url}
			renderItem={renderRecent}
			ListHeaderComponent={() => {
				return (
					<>
						<PagedList
							keyExtractor={news => news.url + Math.random()}
							renderItem={renderHighlight}
							horizontal
							loadData={page => {
								return fetchHighlights({
									country: 'in',
									page
								});
							}}
							firstPage={1}
							threshold={0.5}
						/>
						<Text style={styles.titleStyle}>Recent News</Text>
					</>
				);
			}}
		/>
	);
};

const styles = StyleSheet.create({
	titleStyle: {
		color: 'gray',
		marginLeft: 20,
		marginTop: 15,
		marginBottom: 15,
		fontFamily: 'Roboto_500Medium',
		fontSize: 18
	}
});

export default HomeScreen;
