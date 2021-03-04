import { DarkTheme, DefaultTheme } from '@react-navigation/native';
import { CustomTheme } from '../models/Themes';
import Colors from './colors';

export const CustomDefaultTheme: CustomTheme = {
	...DefaultTheme,
	colors: {
		...DefaultTheme.colors,
		primary: Colors.bayOfMany,
		secondaryText: 'gray',
		cardBackground: Colors.zircon,
		subtitleColor: Colors.cinnabar
	}
};

export const CustomDarkTheme: CustomTheme = {
	...DarkTheme,
	colors: {
		...DarkTheme.colors,
		primary: Colors.cinnabar,
		secondaryText: 'white',
		cardBackground: Colors.shark,
		subtitleColor: 'gray'
	}
};
