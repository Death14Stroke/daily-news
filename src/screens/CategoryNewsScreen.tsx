import React, { FC, useContext, useEffect, useMemo, useState } from 'react';
import { Text, FlatList, StyleSheet, ListRenderItemInfo } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Context as SourceContext } from '../context/SourceContext';
import PagedList from '../components/PagedList';
import { fetchHighlights } from '../hooks/NewsApi';
import SourceCard from '../components/SourceCard';
import Source from '../models/Source';
import HighlightsCard from '../components/HighlightsCard';
import News from '../models/News';

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
			/>
		);
	};

	const renderHighlightsList = useMemo(() => {
		return (
			<>
				<PagedList
					keyExtractor={(news: News) => news.url + Math.random()}
					renderItem={renderHighlight}
					horizontal
					loadData={(page: number) => {
						return fetchHighlights('in', page, category);
					}}
					firstPage={1}
				/>
				<Text style={styles.titleStyle}>Top sources</Text>
			</>
		);
	}, []);

	return (
		<FlatList
			style={{ marginTop: 10 }}
			data={sources}
			keyExtractor={source => source.id}
			renderItem={renderSource}
			ListHeaderComponent={renderHighlightsList}
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
	}
});

export default CategoryNewsScreen;
