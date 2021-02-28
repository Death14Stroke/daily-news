import React, { FC, ReactNode, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Overlay } from 'react-native-elements';
import { Feather } from '@expo/vector-icons';
import ModalSelector from 'react-native-modal-selector';

type Props = {
	label: string;
	icon: () => ReactNode;
};

const prepareLanguageSelectionList = () => {
	let i = 0;
	return [
		{ key: i++, label: 'en' },
		{ key: i++, label: 'fr' },
		{ key: i++, label: 'au' }
	];
};

const data = prepareLanguageSelectionList();

const SettingsItem: FC<Props> = ({ label, icon }) => {
	return (
		<View style={styles.rowStyle}>
			<View style={{ flexDirection: 'row' }}>
				<View style={styles.iconContainerStyle}>{icon()}</View>
				<Text style={styles.titleStyle}>{label}</Text>
			</View>
			<View style={{ flexDirection: 'row' }}>
				<ModalSelector
					data={data}
					initValue='Select something yummy!'
					scrollViewAccessibilityLabel={'Scrollable options'}
					animationType='fade'
					cancelButtonAccessibilityLabel={'Cancel Button'}
					onChange={option => {
						alert(`${option.label} (${option.key}) nom nom nom`);
					}}>
					<Text>English</Text>
				</ModalSelector>
				<Feather
					style={{ alignSelf: 'center' }}
					name='chevron-right'
					size={24}
					color='gray'
				/>
			</View>

			{/* <Overlay isVisible={showModal} onBackdropPress={toggleModal}>
				<Text>Hello</Text>
			</Overlay> */}
		</View>
	);
};

const styles = StyleSheet.create({
	rowStyle: {
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	iconContainerStyle: {
		borderWidth: 2,
		borderColor: 'gray',
		alignContent: 'center',
		padding: 5
	},
	titleStyle: {
		alignSelf: 'center',
		marginStart: 20
	},
	modalSelectionStyle: {
		color: 'gray',

		marginEnd: 10,
		fontSize: 12
	}
});

export default SettingsItem;
