import React, { FC } from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '../models/Themes';

interface Props {
	text: string;
	containerStyle?: ViewStyle;
}

const EmptyView: FC<Props> = ({ text, containerStyle }) => {
	const { colors } = useTheme();

	return (
		<View style={[styles.emptyViewContainerStyle, containerStyle]}>
			<Text style={[styles.emptyViewStyle, { color: colors.text }]}>
				{text}
			</Text>
		</View>
	);
};

const styles = StyleSheet.create({
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

export default EmptyView;
