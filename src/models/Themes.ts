import { Theme } from '@react-navigation/native';

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
