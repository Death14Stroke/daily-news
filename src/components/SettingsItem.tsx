import React, { FC, ReactNode, useContext, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Switch } from 'react-native-switch';
import { useTheme } from '../models/Themes';
import { Context as PreferenceContext } from '../context/PreferenceContext';

type Props = {
	label: string;
	icon: () => ReactNode;
};

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
				<View
					style={[
						styles.iconContainerStyle,
						{ borderWidth: scheme === 'dark' ? 1 : 0 }
					]}>
					{icon()}
				</View>
				<Text style={styles.titleStyle}>{label}</Text>
			</View>
			<View style={{ flexDirection: 'row' }}>
				<Switch
					value={scheme === 'dark'}
					onValueChange={toggleDark}
					disabled={false}
					circleSize={27}
					barHeight={30}
					circleBorderWidth={0}
					backgroundActive={colors.primary}
					backgroundInactive={'gray'}
					circleActiveColor='white'
					circleInActiveColor='white'
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
		borderRadius: 2,
		borderColor: '#3d3d3d',
		alignContent: 'center',
		padding: 6
	},
	titleStyle: {
		alignSelf: 'center',
		marginStart: 20,
		fontFamily: 'Roboto_400Regular',
		fontWeight: 'bold',
		color: 'gray'
	},
	modalSelectionStyle: {
		color: 'gray',
		marginEnd: 10,
		fontSize: 12
	}
});

export default SettingsItem;
