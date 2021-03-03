import React, { FC, useContext } from 'react';
import {
	Text,
	FlatList,
	StyleSheet,
	ListRenderItemInfo,
	View
} from 'react-native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { ParamListBase } from '@react-navigation/native';
import { Context as BookmarkContext } from '../context/BookmarkContext';
import NewsCard from '../components/NewsCard';
import News from '../models/News';
import { useTheme } from '../models/Themes';

type Props = {
	navigation: BottomTabNavigationProp<ParamListBase, 'Bookmarks'>;
};

const BookmarksScreen: FC<Props> = ({ navigation }) => {
	const { colors } = useTheme();
	const { state } = useContext(BookmarkContext);

	const renderBookmark = ({ item }: ListRenderItemInfo<News>) => {
		return (
			<NewsCard
				news={item}
				onPress={() => {
					navigation.navigate('Details', { news: item });
				}}
			/>
		);
	};

	const renderEmptyView = () => {
		return (
			<View style={styles.emptyViewContainerStyle}>
				<Text style={[styles.emptyViewStyle, { color: colors.text }]}>
					No bookmarks
				</Text>
			</View>
		);
	};

	return (
		<FlatList
			style={{ paddingTop: 10 }}
			data={state}
			keyExtractor={(news: News) => news.url}
			renderItem={renderBookmark}
			ListEmptyComponent={renderEmptyView}
			contentContainerStyle={styles.contentContainerStyle}
		/>
	);
};

const styles = StyleSheet.create({
	contentContainerStyle: {
		flexGrow: 1
	},
	emptyViewContainerStyle: {
		flex: 1,
		justifyContent: 'center'
	},
	emptyViewStyle: {
		textAlign: 'center',
		fontFamily: 'Roboto_500Medium',
		fontSize: 22
	}
});

export default BookmarksScreen;
