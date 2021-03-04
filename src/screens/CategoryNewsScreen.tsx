import React, { FC, useContext, useEffect, useMemo, useState } from 'react';
import {
	View,
	Text,
	FlatList,
	StyleSheet,
	Dimensions,
	ListRenderItemInfo
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Context as SourceContext } from '../context/SourceContext';
import PagedList from '../components/PagedList';
import { fetchHighlights } from '../hooks/newsApiUtils';
import SourceCard from '../components/SourceCard';
import Source from '../models/Source';
import HighlightsCard from '../components/HighlightsCard';
import News from '../models/News';
import EmptyView from '../components/EmptyView';

const SCREEN_WIDTH = Dimensions.get('window').width;

interface Props {
	category: string;
}

const CategoryNewsScreen: FC<Props> = ({ category }) => {
	const navigation = useNavigation();
	const { state } = useContext(SourceContext);
	const [sources, setSources] = useState([]);

	useEffect(() => {
		setSources(
			state.filter((source: Source) => source.category === category)
		);
	}, []);

	const renderEmptyView = () => {
		return (
			<View style={styles.emptyViewContainerStyle}>
				<EmptyView text='No sources available' />;
			</View>
		);
	};

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

	const renderSource = ({ item }: ListRenderItemInfo<Source>) => {
		return (
			<SourceCard
				source={item}
				style={{ marginHorizontal: 20, marginBottom: 20 }}
				imageContainerStyle={{ flex: 1 }}
				textContainerStyle={{ flex: 4 }}
				onPress={() =>
					navigation.navigate('WebView', { url: item.url })
				}
			/>
		);
	};

	const renderHighlightsList = useMemo(() => {
		return (
			<>
				<PagedList
					keyExtractor={(news: News) => news.url}
					renderItem={renderHighlight}
					horizontal
					loadData={(page: number) => {
						return fetchHighlights({ page, category });
					}}
					firstPage={1}
				/>
				<Text style={styles.titleStyle}>Top sources</Text>
			</>
		);
	}, []);

	return (
		<FlatList
			style={{ paddingTop: 10 }}
			data={sources}
			keyExtractor={source => source.id}
			renderItem={renderSource}
			ListHeaderComponent={renderHighlightsList}
			ListEmptyComponent={renderEmptyView}
		/>
	);
};

const styles = StyleSheet.create({
	titleStyle: {
		color: 'gray',
		marginLeft: 20,
		marginTop: 15,
		fontFamily: 'Roboto_500Medium',
		fontSize: 18,
		marginBottom: 15
	},
	emptyViewContainerStyle: {
		width: SCREEN_WIDTH,
		margin: 20
	}
});

export default CategoryNewsScreen;
