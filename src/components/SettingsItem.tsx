import React, { FC, ReactNode, useContext, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Switch } from 'react-native-switch';
import { useTheme } from '../models/Themes';
import { Context as PreferenceContext } from '../context/PreferenceContext';

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
	const { colors } = useTheme();
	const {
		state: { scheme },
		updateDarkMode
	} = useContext(PreferenceContext);

	const toggleDark = () => {
		if (scheme === 'light') {
			updateDarkMode('dark');
		} else {
			updateDarkMode('light');
		}
	};

	return (
		<View style={styles.rowStyle}>
			<View style={{ flexDirection: 'row' }}>
				<View style={styles.iconContainerStyle}>{icon()}</View>
				<Text
					style={[
						styles.titleStyle,
						{ color: colors.secondaryText }
					]}>
					{label}
				</Text>
			</View>
			<View style={{ flexDirection: 'row' }}>
				<Switch
					value={scheme === 'dark'}
					onValueChange={toggleDark}
					disabled={false}
					circleSize={25}
					barHeight={30}
					circleBorderWidth={0}
					backgroundActive={colors.primary}
					backgroundInactive={'gray'}
					circleActiveColor='white'
					circleInActiveColor='white'
					changeValueImmediately={true}
					innerCircleStyle={{
						alignItems: 'center',
						justifyContent: 'center'
					}}
					outerCircleStyle={{}}
					renderActiveText={false}
					renderInActiveText={false}
					switchLeftPx={3}
					switchRightPx={3}
					switchWidthMultiplier={2}
					switchBorderRadius={30}
				/>
			</View>
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
		marginStart: 20,
		fontFamily: 'Roboto_400Regular'
	},
	modalSelectionStyle: {
		color: 'gray',
		marginEnd: 10,
		fontSize: 12
	}
});

export default SettingsItem;
