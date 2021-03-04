import { useTheme as useNavigationTheme } from '@react-navigation/native';
import { ColorSchemeName } from 'react-native';
import { AppTheme, CustomTheme } from '../models/Themes';
import { CustomDarkTheme, CustomDefaultTheme } from '../resources/themes';

export const useTheme = () => {
	return useNavigationTheme() as CustomTheme;
};

export const useSystemTheme = (scheme: ColorSchemeName): AppTheme => {
	if (scheme === 'dark') {
		return {
			theme: CustomDarkTheme,
			barStyle: 'light-content',
			backgroundColor: CustomDarkTheme.colors.card
		};
	} else {
		return {
			theme: CustomDefaultTheme,
			barStyle: 'dark-content',
			backgroundColor: CustomDefaultTheme.colors.card
		};
	}
};
