import React from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	Image,
	StyleSheet,
	Linking
} from 'react-native';
import { Card } from 'react-native-elements';

const SourceCard = ({ source }) => {
	const { name, description, url } = source;

	return (
		<Card containerStyle={styles.cardContainer}>
			<TouchableOpacity
				onPress={() => {
					Linking.openURL(url);
				}}>
				<View style={{ flexDirection: 'row' }}>
					<View style={styles.imageContainer}>
						<Image
							source={{
								uri:
									'https://cdn.vox-cdn.com/thumbor/eiMyaiOm1ohRG8Wvgo0uz_kq_jI=/0x0:5568x2915/fit-in/1200x630/cdn.vox-cdn.com/uploads/chorus_asset/file/22318335/1303251729.jpg'
							}}
							style={styles.image}
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
	name: {
		color: Colors.cinnabar,
		position: 'absolute',
		padding: 15,
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
