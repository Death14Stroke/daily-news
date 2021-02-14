import React from 'react';
import { View, Text } from 'react-native';
import NewsCard from '../components/NewsCard';
import RecentNewsCard from '../components/RecentNewsCard';

const HomeScreen = () => {
	return (
		<View>
			<Text>HomeScreen</Text>
			<NewsCard
				title='Coronavirus: Belgian zoo comes back to life from lockdown'
				date='December 30, 2020'
				imageUri='https://storage.googleapis.com/afs-prod/media/e45a0a1e14754c72b1c7ffd14e006a93/3000.jpeg'
			/>
			<RecentNewsCard
				title='Will coronavirus make flying more expensive?'
				category='Travel'
				imageUri='https://storage.googleapis.com/afs-prod/media/e45a0a1e14754c72b1c7ffd14e006a93/3000.jpeg'
			/>
		</View>
	);
};

export default HomeScreen;
