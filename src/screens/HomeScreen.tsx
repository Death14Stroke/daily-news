import React, { FC, useEffect } from 'react';
import { Text, StyleSheet, ListRenderItemInfo } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { ParamListBase } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { fetchHighlights, useRecents } from '../hooks/NewsApi';
import NewsCard from '../components/NewsCard';
import HighlightsCard from '../components/HighlightsCard';
import PagedList from '../components/PagedList';
import News from '../models/News';
import { useTheme } from '../models/Themes';
import { color } from 'react-native-reanimated';

type Props = {
	navigation: BottomTabNavigationProp<ParamListBase, 'Home'>;
};

const HomeScreen: FC<Props> = ({ navigation }) => {
	const { colors } = useTheme();
	const [recents, fetchRecents] = useRecents('in');

	const renderHighlight = ({ item, index }: ListRenderItemInfo<News>) => {
		return (
			<HighlightsCard
				news={item}
				cardStyle={index === 0 ? { marginLeft: 20 } : { marginLeft: 0 }}
				onPress={() => {
					navigation.navigate('Details', { news: item });
				}}
			/>
		);
	};

	const renderRecent = ({ item }: ListRenderItemInfo<News>) => {
		return (
			<NewsCard
				news={item}
				onPress={() => {
					navigation.navigate('Details', { news: item });
				}}
			/>
		);
	};

	const renderHighlightsList = () => {
		return (
			<>
				<PagedList
					keyExtractor={news => news.url + Math.random()}
					renderItem={renderHighlight}
					horizontal
					loadData={page => {
						return fetchHighlights('in', page);
					}}
					firstPage={1}
				/>
				<Text
					style={[
						styles.titleStyle,
						{ color: colors.secondaryText }
					]}>
					Recent News
				</Text>
			</>
		);
	};

	useEffect(() => {
		fetchRecents();
	}, []);

	return (
		<FlatList
			style={{ marginTop: 10 }}
			data={recents}
			keyExtractor={news => news.url}
			renderItem={renderRecent}
			ListHeaderComponent={renderHighlightsList}
		/>
	);
};

const styles = StyleSheet.create({
	titleStyle: {
		marginLeft: 20,
		marginTop: 15,
		marginBottom: 15,
		fontFamily: 'Roboto_500Medium',
		fontSize: 18
	}
});

export default HomeScreen;
