import React from 'react';
import { View, Text } from 'react-native';

const DetailsScreen = ({ route }) => {
	const { news } = route.params;

	return (
		<View>
			<Text>{news.title}</Text>
		</View>
	);
};

export default DetailsScreen;
