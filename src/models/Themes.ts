import {
	DarkTheme,
	DefaultTheme,
	Theme,
	useTheme as useNavigationTheme
} from '@react-navigation/native';
import { useColorScheme } from 'react-native';

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

const Colors = {
	cinnabar: '#E93D25',
	bayOfMany: '#1E4079',
	shark: '#26262D',
	zircon: '#EBF1FF'
};

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

export const useTheme = () => {
	return useNavigationTheme() as CustomTheme;
};

export const useSystemTheme = (): AppTheme => {
	const scheme = useColorScheme();

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
