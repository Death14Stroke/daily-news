import React, { useContext, useEffect, useState } from 'react';
import { Text, FlatList, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { format } from 'date-fns';
import { Context as SourceContext } from '../context/SourceContext';
import PagedList from '../components/PagedList';
import NewsCard from '../components/NewsCard';
import { fetchHighlights } from '../hooks/NewsApi';
import SourceCard from '../components/SourceCard';

const CategoryNewsScreen = ({ category }) => {
	const navigation = useNavigation();
	const { state } = useContext(SourceContext);
	const [sources, setSources] = useState([]);

	useEffect(() => {
		setSources(state.filter(source => source.category === category));
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
		return (
			<SourceCard
				source={item}
				style={{ marginHorizontal: 20, marginBottom: 20 }}
				imageContainerStyle={{ flex: 1 }}
				textContainerStyle={{ flex: 4 }}
			/>
		);
	};

	return (
		<FlatList
			style={{ marginTop: 10 }}
			data={sources}
			keyExtractor={source => source.id}
			renderItem={renderSource}
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
									category,
									page
								});
							}}
							firstPage={1}
						/>
						<Text style={styles.titleStyle}>Top sources</Text>
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
		fontFamily: 'Roboto_500Medium',
		fontSize: 18,
		marginBottom: 15
	}
});

export default CategoryNewsScreen;
