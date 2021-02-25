import React, { useContext } from 'react';
import { Text, FlatList, View, StyleSheet, Dimensions } from 'react-native';
import { Context as SourceContext } from '../context/SourceContext';
import SourceCard from '../components/SourceCard';

const SCREEN_WIDTH = Dimensions.get('window').width;

const DiscoverScreen = () => {
	const { state } = useContext(SourceContext);
	const categories = [
		'business',
		'entertainment',
		'general',
		'health',
		'science',
		'sports',
		'technology'
	];
	const sections = categories.map(category => {
		return {
			title: category,
			data: state.filter(news => news.category === category)
		};
	});

	const renderSource = ({ item, index }) => {
		return (
			<SourceCard
				source={item}
				style={[
					styles.soureStyle,
					{ marginStart: index == 0 ? 20 : 0 }
				]}
				imageContainerStyle={{ flex: 1 }}
				textContainerStyle={{ flex: 4 }}
			/>
		);
	};

	const renderCategorySources = ({ item }) => {
		return (
			<View>
				<Text style={styles.titleStyle}>Top sources in {item}</Text>
				<FlatList
					data={state.filter(source => source.category === item)}
					renderItem={renderSource}
					keyExtractor={source => source.id}
					horizontal
					showsHorizontalScrollIndicator={false}
				/>
			</View>
		);
	};

	return (
		<FlatList
			data={categories}
			renderItem={renderCategorySources}
			keyExtractor={category => category}
		/>
	);
};

const styles = StyleSheet.create({
	titleStyle: {
		color: 'gray',
		fontFamily: 'Roboto_500Medium',
		fontSize: 18,
		marginStart: 20
	},
	soureStyle: {
		width: SCREEN_WIDTH * 0.75,
		marginTop: 15,
		marginBottom: 15,
		marginEnd: 20
	}
});

export default DiscoverScreen;
