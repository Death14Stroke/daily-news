import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import HomeScreen from './src/screens/HomeScreen';

const navigator = createSwitchNavigator({
	Home: HomeScreen
});

export default createAppContainer(navigator);
