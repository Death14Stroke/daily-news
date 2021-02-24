import React, { useContext, useEffect } from 'react';
import { StatusBar, TouchableOpacity } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import {
	NavigationContainer,
	DefaultTheme,
	DarkTheme
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AppearanceProvider, useColorScheme } from 'react-native-appearance';
import {
	useFonts,
	Roboto_300Light,
	Roboto_400Regular,
	Roboto_500Medium
} from '@expo-google-fonts/roboto';
import AppLoading from 'expo-app-loading';
import Colors from './colors';
import { Provider as SourceProvider } from './src/context/SourceContext';
import { Provider as BookmarkProvider } from './src/context/BookmarkContext';
import HomeScreen from './src/screens/HomeScreen';
import CategoryNewsScreen from './src/screens/CategoryNewsScreen';
import DetailsScreen from './src/screens/DetailsScreen';
import DiscoverScreen from './src/screens/DiscoverScreen';
import BookmarksScreen from './src/screens/BookmarksScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import SearchScreen from './src/screens/SearchScreen';
import SplashScreen from './src/screens/SplashScreen';

const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();
const BottomTab = createBottomTabNavigator();

const createTabs = () => {
	return (
		<Tab.Navigator
			removeClippedSubviews
			lazy
			lazyPreloadDistance={1}
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
			<Tab.Screen
				name='Business'
				children={() => <CategoryNewsScreen category='business' />}
			/>
			<Tab.Screen
				name='Entertainment'
				children={() => <CategoryNewsScreen category='entertainment' />}
			/>
			<Tab.Screen
				name='General'
				children={() => <CategoryNewsScreen category='general' />}
			/>
			<Tab.Screen
				name='Health'
				children={() => <CategoryNewsScreen category='health' />}
			/>
			<Tab.Screen
				name='Science'
				children={() => <CategoryNewsScreen category='science' />}
			/>
			<Tab.Screen
				name='Sports'
				children={() => <CategoryNewsScreen category='sports' />}
			/>
			<Tab.Screen
				name='Technology'
				children={() => <CategoryNewsScreen category='technology' />}
			/>
		</Tab.Navigator>
	);
};

const createStack = () => {
	return (
		<Stack.Navigator>
			<Stack.Screen
				name='HomeTabs'
				options={({ navigation }) => ({
					headerRight: () => (
						<TouchableOpacity
							style={{ marginRight: 10 }}
							onPress={() => navigation.navigate('Search')}>
							<Ionicons name='search' size={24} color='black' />
						</TouchableOpacity>
					),
					headerStyle: { elevation: 0 }
				})}>
				{createTabs}
			</Stack.Screen>
			<Stack.Screen
				name='Details'
				component={DetailsScreen}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name='Search'
				component={SearchScreen}
				// options={{
				// 	headerTitle: () => {
				// 		return (
				// 			<SearchBar
				// 				placeholder='Search...'
				// 				//onChangeText={setQuery}
				// 				//value={query}
				// 				onSubmitEditing={() => {
				// 					// const results = searchArticles({
				// 					// 	query,
				// 					// 	language: 'en',
				// 					// 	page: 0
				// 					// });
				// 					// console.log(results);
				// 					// setArticles(results);
				// 				}}
				// 			/>
				// 		);
				// 	}
				// }}
			/>
		</Stack.Navigator>
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

	if (!fontsLoaded) {
		return <AppLoading />;
	}

	return (
		<AppearanceProvider>
			<SourceProvider>
				<BookmarkProvider>
					<SplashScreen>
						<NavigationContainer theme={theme}>
							<StatusBar
								barStyle={barStyle}
								backgroundColor={backgroundColor}
							/>
							<BottomTab.Navigator>
								<BottomTab.Screen
									name='Home'
									options={{
										tabBarIcon: ({ color, size }) => (
											<Ionicons
												name='home-sharp'
												size={size}
												color={color}
											/>
										)
									}}
									component={createStack}
								/>
								<BottomTab.Screen
									name='Discover'
									component={DiscoverScreen}
									options={{
										tabBarIcon: ({ color, size }) => (
											<Ionicons
												name='globe-outline'
												size={size}
												color={color}
											/>
										)
									}}
								/>
								<BottomTab.Screen
									name='Bookmark'
									component={BookmarksScreen}
									options={{
										tabBarIcon: ({ color, size }) => (
											<Ionicons
												name='bookmark-outline'
												size={size}
												color={color}
											/>
										)
									}}
								/>
								<BottomTab.Screen
									name='Settings'
									component={SettingsScreen}
									options={{
										tabBarIcon: ({ color, size }) => (
											<Ionicons
												name='settings-outline'
												size={size}
												color={color}
											/>
										)
									}}
								/>
							</BottomTab.Navigator>
						</NavigationContainer>
					</SplashScreen>
				</BookmarkProvider>
			</SourceProvider>
		</AppearanceProvider>
	);
};

export default App;
