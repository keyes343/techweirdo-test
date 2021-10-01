import { createContext, Dispatch } from 'react';
import { t } from './incoming';

type Action = {
    type: act;
    payload?: any;
};
export enum act {
    'menu-option',
}

export type State = {
    active_menu: t.Menu;
};

export const initialState: State = {
    active_menu: 'Home',
};

export const reducer = (state: State, action: Action) => {
    const newState = { ...state };
    const { payload, type } = action;
    switch (type) {
        case act['menu-option']:
            newState.active_menu = payload;
            break;
        default:
            break;
    }
    return newState;
};

export const StateContext = createContext(initialState);
export const DispatchContext = createContext<Dispatch<Action> | null>(null);
