import React from 'react';
import {
	View,
	Text,
	ImageBackground,
	TouchableOpacity,
	StyleSheet
} from 'react-native';

const NewsCard = ({ title, date, imageUri, cardStyle, onPress }) => {
	return (
		<TouchableOpacity onPress={onPress}>
			<ImageBackground
				source={{ uri: imageUri }}
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
		fontSize: 16
	},
	date: {
		color: 'lightgray',
		padding: 10,
		fontSize: 14,
		marginBottom: 10
	}
});

export default NewsCard;
