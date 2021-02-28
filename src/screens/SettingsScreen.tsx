import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import SettingsItem from '../components/SettingsItem';

const SettingsScreen = () => {
	return (
		<View style={{ margin: 20 }}>
			<Text style={styles.preferenceTitle}>Summary</Text>
			<SettingsItem
				label='Language'
				icon={() => (
					<MaterialIcons name='language' size={24} color='gray' />
				)}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	preferenceTitle: {
		color: 'gray',
		fontFamily: 'Roboto_500Medium'
	}
});

export default SettingsScreen;
