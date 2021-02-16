import React, { useEffect } from 'react';
import { View, FlatList, ScrollView, StyleSheet } from 'react-native';
import { Header, Text } from 'react-native-elements';
import { SafeAreaView } from 'react-navigation';
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
		fetchHighlights();
		fetchRecents();
	}, []);

	return (
		<SafeAreaView forceInset={{ top: 'always' }}>
			<Header
				placement='left'
				statusBarProps={{
					backgroundColor: 'white',
					barStyle: 'dark-content'
				}}
				containerStyle={{ backgroundColor: '#fff' }}
				centerComponent={{
					text: 'Daily News',
					style: { fontSize: 22, fontWeight: 'bold' }
				}}
			/>
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
