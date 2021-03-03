import { DarkTheme, DefaultTheme, Theme } from '@react-navigation/native';
import Colors from '../../colors';

export interface AppTheme {
	theme: CustomTheme;
	barStyle: 'light-content' | 'dark-content';
	backgroundColor: string;
}

export interface CustomTheme extends Theme {
	colors: Theme['colors'] & {
		secondaryText: string;
		cardBackground: string;
		subtitleColor: string;
	};
}

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
