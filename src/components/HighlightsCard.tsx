import React, { FC, memo } from 'react';
import {
	View,
	Text,
	ImageBackground,
	TouchableOpacity,
	StyleSheet,
	ViewStyle
} from 'react-native';
import { format } from 'date-fns';
import News from '../models/News';

interface Props {
	news: News;
	onPress: () => void;
	cardStyle: ViewStyle;
}

const HighlightsCard: FC<Props> = ({
	news: { title, publishedAt, urlToImage },
	cardStyle,
	onPress
}) => {
	const date = format(new Date(publishedAt), 'MMMM dd, yyyy');

	return (
		<TouchableOpacity onPress={onPress}>
			<ImageBackground
				source={{ uri: urlToImage }}
				style={[styles.image, cardStyle]}>
				<View style={styles.textContainer}>
					<Text
						style={styles.title}
						numberOfLines={3}
						ellipsizeMode='tail'>
						{title}
					</Text>
					<Text style={styles.date}>{date}</Text>
				</View>
			</ImageBackground>
		</TouchableOpacity>
	);
};
const styles = StyleSheet.create({
	image: {
		width: 275,
		height: 200,
		resizeMode: 'cover',
		borderRadius: 5,
		overflow: 'hidden',
		elevation: 2,
		marginRight: 20
	},
	textContainer: {
		flex: 1,
		justifyContent: 'flex-end'
	},
	title: {
		color: 'white',
		padding: 10,
		paddingBottom: 0,
		fontFamily: 'Roboto_400Regular',
		fontSize: 16
	},
	date: {
		color: 'lightgray',
		padding: 10,
		fontSize: 14,
		marginBottom: 10,
		fontFamily: 'Roboto_300Light'
	}
});

const arePropsEqual = (prevProps: Props, nextProps: Props) => {
	return prevProps.news.url === nextProps.news.url;
};

export default memo(HighlightsCard, arePropsEqual);
