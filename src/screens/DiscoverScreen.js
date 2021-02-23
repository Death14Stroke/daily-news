import React, { useContext } from 'react';
import {
	Text,
	FlatList,
	ScrollView,
	View,
	StyleSheet,
	Dimensions
} from 'react-native';
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

	const renderSource = ({ item }) => {
		return (
			<SourceCard
				source={item}
				style={{ width: SCREEN_WIDTH * 0.75, marginRight: 20 }}
				imageContainerStyle={{ flex: 1 }}
				textContainerStyle={{ flex: 4 }}
			/>
		);
	};

	return (
		<ScrollView>
			{categories.map(category => {
				return (
					<>
						<Text style={styles.titleStyle}>
							Top sources in {category}
						</Text>
						<FlatList
							style={{ marginLeft: 20 }}
							data={state.filter(
								source => source.category === category
							)}
							keyExtractor={source => source.id}
							renderItem={renderSource}
							horizontal
							showsHorizontalScrollIndicator={false}
						/>
					</>
				);
			})}
		</ScrollView>
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

export default DiscoverScreen;
