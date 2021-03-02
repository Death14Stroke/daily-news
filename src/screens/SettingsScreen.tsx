import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import SettingsItem from '../components/SettingsItem';

const SettingsScreen = () => {
	return (
		<View style={{ margin: 15 }}>
			<Text style={styles.preferenceTitle}>Preferences</Text>
			<SettingsItem
				label='Dark mode'
				icon={() => (
					<Ionicons name='moon-outline' size={24} color='gray' />
				)}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	preferenceTitle: {
		color: 'gray',
		fontFamily: 'Roboto_500Medium',
		marginBottom: 20,
		fontSize: 18
	}
});

export default SettingsScreen;
