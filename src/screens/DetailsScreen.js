import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { format } from 'date-fns';
import CollapsingHeader from '../components/CollapsingHeader';
import Colors from '../../colors';

const STATUS_BAR_HEIGHT = 20;
const HEADER_HEIGHT = 80;
const NAV_BAR_HEIGHT = HEADER_HEIGHT - STATUS_BAR_HEIGHT;

const DetailsScreen = ({ navigation, route }) => {
	const {
		news: {
			urlToImage,
			category,
			title,
			description,
			content,
			author,
			publishedAt
		}
	} = route.params;

	const renderNavBar = () => (
		<View style={{ marginLeft: 10 }}>
			<View style={styles.navBar}>
				<TouchableOpacity
					style={styles.iconLeft}
					onPress={() => {
						navigation.pop();
					}}>
					<Ionicons name='chevron-back' size={24} color='white' />
				</TouchableOpacity>
			</View>
		</View>
	);

	const renderContent = () => {
		return (
			<>
				{category ? (
					<Text style={styles.category}>{category}</Text>
				) : null}
				<Text style={styles.title}>{title}</Text>
				<View style={styles.authorContainer}>
					<Text style={styles.author}>
						By {author || 'Anonymous'} |{' '}
					</Text>
					<Text style={styles.author}>
						{format(new Date(publishedAt), 'MMMM dd, yyyy - HH:mm')}
					</Text>
				</View>
				<Text style={styles.description}>{description}</Text>
				<Text style={styles.content}>
					{content || 'No content available'}
				</Text>
			</>
		);
	};

	return (
		<CollapsingHeader
			headerMinHeight={HEADER_HEIGHT}
			headerMaxHeight={250}
			extraScrollHeight={20}
			navbarColor='#3498db'
			backgroundImage={{ uri: urlToImage }}
			backgroundImageScale={1.2}
			renderNavBar={renderNavBar}
			renderContent={renderContent}
			containerStyle={styles.container}
			contentContainerStyle={styles.contentContainer}
			innerContainerStyle={styles.container}
		/>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	contentContainer: {
		flexGrow: 1,
		paddingHorizontal: 15
	},
	statusBar: {
		height: STATUS_BAR_HEIGHT,
		backgroundColor: 'transparent'
	},
	navBar: {
		height: NAV_BAR_HEIGHT,
		justifyContent: 'space-between',
		alignItems: 'center',
		flexDirection: 'row',
		marginTop: 20,
		backgroundColor: 'transparent'
	},
	category: {
		color: Colors.cinnabar,
		fontFamily: 'Roboto_500Medium',
		marginVertical: 15
	},
	title: {
		fontSize: 20,
		marginBottom: 15,
		fontWeight: 'bold',
		fontFamily: 'Roboto_500Medium'
	},
	authorContainer: {
		flexDirection: 'row',
		marginBottom: 20
	},
	author: {
		color: 'gray',
		fontFamily: 'Roboto_400Regular',
		fontSize: 12
	},
	description: {
		marginBottom: 25,
		fontFamily: 'Roboto_500Medium',
		fontSize: 18,
		lineHeight: 25
	},
	content: {
		marginBottom: 15,
		fontFamily: 'Roboto_400Regular',
		color: 'gray',
		lineHeight: 20
	}
});

export default DetailsScreen;
