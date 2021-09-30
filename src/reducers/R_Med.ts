import { createContext, Dispatch } from 'react';
import { t } from './incoming';

export type Payload = Partial<t.med.Med>;
type Action = {
    type: act;
    payload?: Payload;
};
export enum act {
    'set-state',
}

type Med_State<T> = {
    [key in keyof T]: T[key] | null;
};

export interface State extends Med_State<t.med.Med> {
    // start: Date | null,
    // end: Date | null,
}

export const initialState: State = {
    name: null,
    start: null,
    end: null,
    quantity: null,
    med_type: null,
    time_of_day: null,
    meal: null,
    gap: 0,
};

export const reducer = (state: State, action: Action) => {
    let newState = { ...state };
    const { payload, type } = action;

    switch (type) {
        case act['set-state']:
            newState = {
                ...newState,
                ...payload,
            };
            console.log({ newState });
            break;
        default:
            break;
    }
    return newState;
};

export const StateContext = createContext(initialState);
export const DispatchContext = createContext<Dispatch<Action> | null>(null);
