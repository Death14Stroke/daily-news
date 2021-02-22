import React from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	StyleSheet,
	Linking
} from 'react-native';
import { Avatar, Card } from 'react-native-elements';

const SourceCard = ({ source }) => {
	const { name, description, url } = source;

	return (
		<Card containerStyle={styles.cardContainer}>
			<TouchableOpacity onPress={() => Linking.openURL(url)}>
				<View style={{ flexDirection: 'row', height: '100%' }}>
					<View style={styles.imageContainer}>
						<Avatar
							size='large'
							rounded
							title={name.charAt(0)}
							source={{ uri: 'dsfds' }}
							containerStyle={{ alignSelf: 'center' }}
						/>
					</View>
					<View style={styles.textContainer}>
						<Text style={styles.name}>{name}</Text>
						<Text
							style={styles.description}
							numberOfLines={4}
							ellipsizeMode='tail'>
							{description}
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
		height: 150,
		margin: 0,
		marginHorizontal: 20,
		marginBottom: 20,
		borderRadius: 5,
		elevation: 2
	},
	imageContainer: {
		flex: 1,
		justifyContent: 'center'
	},
	textContainer: {
		flex: 3,
		paddingVertical: 15,
		paddingEnd: 15,
		paddingStart: 5
	},
	name: {
		color: Colors.cinnabar,
		fontFamily: 'Roboto_500Medium',
		fontSize: 18
	},
	description: {
		fontSize: 14,
		fontFamily: 'Roboto_400Regular',
		flex: 1,
		textAlignVertical: 'center'
	}
});

export default SourceCard;
