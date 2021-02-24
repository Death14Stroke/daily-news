import React, { memo } from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-elements';
import Colors from '../../colors';

const RecentNewsCard = ({ title, category, imageUri, onPress }) => {
	return (
		<Card containerStyle={styles.cardContainer}>
			<TouchableOpacity onPress={onPress}>
				<View style={{ flexDirection: 'row' }}>
					<View style={styles.imageContainer}>
						<Image
							source={{ uri: imageUri }}
							style={styles.image}
						/>
					</View>
					<View style={styles.textContainer}>
						<Text style={styles.category}>{category}</Text>
						<Text
							style={styles.title}
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
		color: Colors.cinnabar,
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

const arePropsEqual = (prevProps, nextProps) => {
	return (
		prevProps.title === nextProps.title &&
		prevProps.category === nextProps.category
	);
};

export default memo(RecentNewsCard, arePropsEqual);
