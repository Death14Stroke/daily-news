import React, { useEffect } from 'react';
import { View, FlatList, ScrollView, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useHighlights, useRecents } from '../hooks/NewsApi';
import NewsCard from '../components/NewsCard';
import RecentNewsCard from '../components/RecentNewsCard';

const HomeScreen = () => {
	const [highlights, fetchHighlights] = useHighlights({ country: 'in' });
	const [recents, fetchRecents] = useRecents({ country: 'in' });

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

	useEffect(() => {
		//fetchHighlights();
		//fetchRecents();
	}, []);

	return (
		<SafeAreaView
			style={{
				flex: 1,
				justifyContent: 'space-between',
				alignItems: 'center'
			}}>
			<ScrollView>
				<View>
					<FlatList
						data={highlights}
						keyExtractor={news => news.url}
						renderItem={renderHighlight}
						horizontal
					/>
				</View>
				<Text h4 style={styles.titleStyle}>
					Recent News
				</Text>
				<View>
					<FlatList
						style={{ marginTop: 10 }}
						data={recents}
						keyExtractor={news => news.url}
						renderItem={renderRecent}
					/>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	titleStyle: { color: 'gray', marginLeft: 20 }
});

export default HomeScreen;
