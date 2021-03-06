import React, { FC, memo } from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	StyleSheet,
	ViewStyle
} from 'react-native';
import { Avatar, Card } from 'react-native-elements';
import { useTheme } from '../hooks/themes';
import Source from '../models/Source';

interface Props {
	source: Source;
	style: ViewStyle | ViewStyle[];
	imageContainerStyle: ViewStyle;
	textContainerStyle: ViewStyle;
	onPress: () => void;
}

const SourceCard: FC<Props> = ({
	source: { name, description },
	style,
	imageContainerStyle,
	textContainerStyle,
	onPress
}) => {
	const { colors } = useTheme();

	return (
		<Card
			containerStyle={[
				styles.cardContainer,
				style,
				{ backgroundColor: colors.cardBackground }
			]}>
			<TouchableOpacity onPress={onPress}>
				<View style={{ flexDirection: 'row', height: '100%' }}>
					<View style={[styles.imageContainer, imageContainerStyle]}>
						<Avatar
							size='medium'
							rounded
							title={name.charAt(0)}
							source={{ uri: 'dsfds' }}
							containerStyle={{ alignSelf: 'center' }}
						/>
					</View>
					<View style={[styles.textContainer, textContainerStyle]}>
						<Text
							style={[
								styles.name,
								{ color: colors.subtitleColor }
							]}>
							{name}
						</Text>
						<Text
							style={[styles.description, { color: colors.text }]}
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
		borderRadius: 5,
		elevation: 2
	},
	imageContainer: {
		justifyContent: 'center'
	},
	textContainer: {
		paddingVertical: 15,
		paddingEnd: 15,
		paddingStart: 5
	},
	name: {
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

const arePropsEqual = (prevProps: Props, nextProps: Props) => {
	return prevProps.source.id === nextProps.source.id;
};

export default memo(SourceCard, arePropsEqual);
