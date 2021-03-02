import React, { FC, memo } from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-elements';
import { useTheme } from '../models/Themes';
import News from '../models/News';

interface Props {
	news: News;
	onPress: () => void;
}

const NewsCard: FC<Props> = ({
	news: { title, category, urlToImage },
	onPress
}) => {
	const { colors } = useTheme();

	return (
		<Card
			containerStyle={[
				styles.cardContainer,
				{ backgroundColor: colors.cardBackground }
			]}>
			<TouchableOpacity onPress={onPress}>
				<View style={{ flexDirection: 'row' }}>
					<View style={styles.imageContainer}>
						<Image
							source={{ uri: urlToImage }}
							style={styles.image}
						/>
					</View>
					<View style={styles.textContainer}>
						<Text
							style={[
								styles.category,
								{ color: colors.subtitleColor }
							]}>
							{category || 'All'}
						</Text>
						<Text
							style={[styles.title, { color: colors.text }]}
							numberOfLines={3}
							ellipsizeMode='tail'>
							{title}
						</Text>
					</View>
				</View>
			</TouchableOpacity>
		</Card>
	);
};

const styles = StyleSheet.create({
	cardContainer: {
		padding: 0,
		borderWidth: 0,
		height: 175,
		margin: 0,
		marginHorizontal: 20,
		marginBottom: 20,
		borderRadius: 5,
		elevation: 2
	},
	imageContainer: {
		flex: 2,
		height: '100%'
	},
	image: {
		height: '100%',
		borderTopLeftRadius: 5,
		borderBottomLeftRadius: 5
	},
	textContainer: {
		flex: 3,
		padding: 15
	},
	category: {
		position: 'absolute',
		padding: 15,
		fontFamily: 'Roboto_500Medium'
	},
	title: {
		fontSize: 20,
		fontFamily: 'Roboto_500Medium',
		flex: 1,
		textAlignVertical: 'center'
	}
});

const arePropsEqual = (prevProps: Props, nextProps: Props) => {
	return (
		prevProps.news.url === nextProps.news.url &&
		prevProps.news.category === nextProps.news.category
	);
};

export default memo(NewsCard, arePropsEqual);
