import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { Card } from 'react-native-elements';

const RecentNewsCard = ({ title, category, imageUri }) => {
	return (
		<Card containerStyle={styles.cardContainer}>
			<View style={{ flexDirection: 'row' }}>
				<View style={styles.imageContainer}>
					<Image source={{ uri: imageUri }} style={styles.image} />
				</View>
				<View style={styles.textContainer}>
					<Text style={styles.category}>{category}</Text>
					<Text style={styles.title}>{title}</Text>
				</View>
			</View>
		</Card>
	);
};

const styles = StyleSheet.create({
	cardContainer: {
		padding: 0,
		borderWidth: 0,
		height: 175,
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
		color: '#E93D25',
		fontWeight: 'bold',
		position: 'absolute',
		padding: 15
	},
	title: {
		fontSize: 20,
		fontWeight: 'bold',
		flex: 1,
		textAlignVertical: 'center'
	}
});

export default RecentNewsCard;
