import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, Dispatch, FC, useEffect, useReducer } from 'react';

interface Preferences {
	darkMode: boolean;
}
type Action = {
	type: 'init_preferences' | 'update_dark_mode';
	payload: any;
};
type DispatchAction = (dispatch: Dispatch<Action>) => any;

const INITIAL_STATE: Preferences = {
	darkMode: false
};

const preferenceReducer = (state: Preferences, action: Action): Preferences => {
	switch (action.type) {
		case 'init_preferences':
			return action.payload;
		case 'update_dark_mode':
			return { ...state, darkMode: action.payload };
		default:
			return state;
	}
};

const updateDarkMode = (dispatch: Dispatch<Action>) => (darkMode: boolean) => {
	dispatch({ type: 'update_dark_mode', payload: darkMode });
};

const createPreferenceContext = () => {
	const Context = createContext<any>(null);

	const Provider: FC = ({ children }) => {
		const [state, dispatch] = useReducer(preferenceReducer, INITIAL_STATE);

		const actions: { [key: string]: DispatchAction } = {
			updateDarkMode
		};

		useEffect(() => {
			const fetchSettings = async () => {
				try {
					let preferences = await AsyncStorage.getItem('preferences');
					let payload = INITIAL_STATE;
					if (preferences) {
						payload = JSON.parse(preferences);
					}
					dispatch({
						type: 'init_preferences',
						payload
					});
				} catch (err) {
					console.log(err);
				}
			};

			fetchSettings();
		}, []);

		useEffect(() => {
			const savePreferences = async () => {
				await AsyncStorage.setItem(
					'preferences',
					JSON.stringify(state)
				);
			};

			savePreferences();
		}, [state]);

		const boundActions: { [key: string]: Action } = {};
		for (let key in actions) {
			boundActions[key] = actions[key](dispatch);
		}

		return (
			<Context.Provider value={{ state, ...boundActions }}>
				{children}
			</Context.Provider>
		);
	};

	return { Context, Provider };
};

export const { Context, Provider } = createPreferenceContext();
