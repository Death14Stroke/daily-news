import { Dispatch } from 'react';

export type DispatchAction<T> = (dispatch: Dispatch<T>) => any;
