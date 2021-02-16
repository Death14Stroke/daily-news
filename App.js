import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useCategories } from './src/hooks/NewsApi';
import HomeScreen from './src/screens/HomeScreen';

const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

const createTabs = async () => {
	try {
		//const categories = await useCategories();
		//console.log('categories: ', categories);

		return () => (
			<Tab.Navigator
				removeClippedSubviews
				tabBarOptions={{ scrollEnabled: true }}>
				<Tab.Screen
					name='All'
					component={HomeScreen}
					options={{ title: 'All News' }}
				/>
				<Tab.Screen name='Business' component={HomeScreen} />
				<Tab.Screen name='Entertainment' component={HomeScreen} />
				<Tab.Screen name='General' component={HomeScreen} />
				<Tab.Screen name='Health' component={HomeScreen} />
				<Tab.Screen name='Science' component={HomeScreen} />
				<Tab.Screen name='Sports' component={HomeScreen} />
				<Tab.Screen name='Technology' component={HomeScreen} />
			</Tab.Navigator>
		);
	} catch (err) {
		console.log(err);
		return () => null;
	}
};

const App = () => {
	return (
		<SafeAreaProvider>
			<NavigationContainer>
				<Stack.Navigator>
					<Stack.Screen name='Home'>{createTabs}</Stack.Screen>
				</Stack.Navigator>
			</NavigationContainer>
		</SafeAreaProvider>
	);
};

export default App;
