import React, { FC, useContext } from 'react';
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
import EmptyView from '../components/EmptyView';
import categories from '../resources/categories';

const SCREEN_WIDTH = Dimensions.get('window').width;

interface Props {
	navigation: BottomTabNavigationProp<ParamListBase, 'Discover'>;
}

const DiscoverScreen: FC<Props> = ({ navigation }) => {
	const { state } = useContext(SourceContext);

	const onSourceClick = (url: string) => {
		navigation.navigate('WebView', { url });
	};

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

	const renderEmptyView = () => {
		return (
			<View style={styles.emptyViewContainerStyle}>
				<EmptyView
					text='No sources available'
					containerStyle={styles.emptyViewContainerStyle}
				/>
			</View>
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
					ListEmptyComponent={renderEmptyView}
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
			contentContainerStyle={{ flexGrow: 1 }}
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
	},
	emptyViewContainerStyle: {
		width: SCREEN_WIDTH,
		margin: 20
	}
});

export default DiscoverScreen;
