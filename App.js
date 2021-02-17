import React from 'react';
import { StatusBar } from 'react-native';
import {
	NavigationContainer,
	DefaultTheme,
	DarkTheme
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { AppearanceProvider, useColorScheme } from 'react-native-appearance';
import {
	useFonts,
	Roboto_300Light,
	Roboto_400Regular,
	Roboto_500Medium
} from '@expo-google-fonts/roboto';
import AppLoading from 'expo-app-loading';
import HomeScreen from './src/screens/HomeScreen';
import Colors from './colors';
import CategoryNewsScreen from './src/screens/CategoryNewsScreen';

const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

const createTabs = () => {
	return (
		<Tab.Navigator
			removeClippedSubviews
			tabBarOptions={{
				scrollEnabled: true,
				labelStyle: {
					textTransform: 'none',
					fontFamily: 'Roboto_500Medium',
					fontSize: 16
				},
				indicatorStyle: { backgroundColor: Colors.cinnabar },
				tabStyle: { width: 'auto' },
				style: { elevation: 0 }
			}}>
			<Tab.Screen
				name='All'
				component={HomeScreen}
				options={{ title: 'All news' }}
			/>
			<Tab.Screen name='Business' component={CategoryNewsScreen} />
			<Tab.Screen name='Entertainment' component={CategoryNewsScreen} />
			<Tab.Screen name='General' component={CategoryNewsScreen} />
			<Tab.Screen name='Health' component={CategoryNewsScreen} />
			<Tab.Screen name='Science' component={CategoryNewsScreen} />
			<Tab.Screen name='Sports' component={CategoryNewsScreen} />
			<Tab.Screen name='Technology' component={CategoryNewsScreen} />
		</Tab.Navigator>
	);
};

const getStylesFromTheme = scheme => {
	// TODO: return dark theme
	// if (scheme === 'dark') {
	// 	return {

	// 		theme: DarkTheme,
	// 		barStyle: 'light-content',
	// 		backgroundColor: Colors.shark
	// 	};
	// } else {
	return {
		theme: DefaultTheme,
		barStyle: 'dark-content',
		backgroundColor: 'white'
	};
	// }
};

const App = () => {
	const scheme = useColorScheme();
	const { theme, barStyle, backgroundColor } = getStylesFromTheme(scheme);
	let [fontsLoaded] = useFonts({
		Roboto_300Light,
		Roboto_400Regular,
		Roboto_500Medium
	});

	if (!fontsLoaded) return <AppLoading />;

	return (
		<AppearanceProvider>
			<NavigationContainer theme={theme}>
				<StatusBar
					barStyle={barStyle}
					backgroundColor={backgroundColor}
				/>
				<Stack.Navigator>
					<Stack.Screen
						name='Home'
						options={{ headerStyle: { elevation: 0 } }}>
						{createTabs}
					</Stack.Screen>
				</Stack.Navigator>
			</NavigationContainer>
		</AppearanceProvider>
	);
};

export default App;
