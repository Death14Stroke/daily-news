import React, { FC, useCallback, useContext } from 'react';
import {
	Text,
	FlatList,
	View,
	StyleSheet,
	Dimensions,
	ListRenderItemInfo
} from 'react-native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { ParamListBase } from '@react-navigation/native';
import { Context as SourceContext } from '../context/SourceContext';
import SourceCard from '../components/SourceCard';
import Source from '../models/Source';

const SCREEN_WIDTH = Dimensions.get('window').width;
const categories = [
	'business',
	'entertainment',
	'general',
	'health',
	'science',
	'sports',
	'technology'
];

interface Props {
	navigation: BottomTabNavigationProp<ParamListBase, 'Discover'>;
}

const DiscoverScreen: FC<Props> = ({ navigation }) => {
	const { state } = useContext(SourceContext);

	const onSourceClick = useCallback(
		(url: string) => {
			console.log('webview navigate');
			navigation.navigate('WebView', { url });
		},
		[navigation]
	);

	const renderSource = ({ item, index }: ListRenderItemInfo<Source>) => {
		return (
			<SourceCard
				source={item}
				style={[
					styles.soureStyle,
					{ marginStart: index == 0 ? 20 : 0 }
				]}
				imageContainerStyle={{ flex: 1 }}
				textContainerStyle={{ flex: 4 }}
				onPress={() => onSourceClick(item.url)}
			/>
		);
	};

	const renderCategorySources = ({ item }: ListRenderItemInfo<string>) => {
		return (
			<View>
				<Text style={styles.titleStyle}>Top sources in {item}</Text>
				<FlatList
					data={state.filter(
						(source: Source) => source.category === item
					)}
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
