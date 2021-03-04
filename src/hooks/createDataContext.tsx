import React, { createContext, FC, useReducer } from 'react';
import { DispatchAction } from '../models/Reducer';

type Action = () => any;
type ReducerAction = { type: any; payload: any };

export default <S extends any>(
	reducer: (state: S, action: ReducerAction) => S,
	actions: { [key: string]: DispatchAction<ReducerAction> },
	initialState: S
) => {
	const Context = createContext<any>(null);

	const Provider: FC = ({ children }) => {
		const [state, dispatch] = useReducer(reducer, initialState);

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

export { ReducerAction };
