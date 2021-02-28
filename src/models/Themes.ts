import {
	DarkTheme,
	DefaultTheme,
	Theme,
	useTheme as useSystemTheme
} from '@react-navigation/native';

export interface AppTheme {
	theme: CustomTheme;
	barStyle: 'light-content' | 'dark-content';
	backgroundColor: string;
}

export interface CustomTheme extends Theme {
	colors: Theme['colors'] & {
		cardBackground: string;
		subtitleColor: string;
	};
}

export const CustomDefaultTheme: CustomTheme = {
	...DefaultTheme,
	colors: {
		...DefaultTheme.colors,
		cardBackground: '#EBF1FF',
		subtitleColor: '#E93D25'
	}
};

export const CustomDarkTheme: CustomTheme = {
	...DarkTheme,
	colors: {
		...DarkTheme.colors,
		cardBackground: '#26262D',
		subtitleColor: 'gray'
	}
};

export const useTheme = () => {
	return useSystemTheme() as CustomTheme;
};
