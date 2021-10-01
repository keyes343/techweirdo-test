import { createContext, Dispatch } from 'react';
import { t } from './incoming';

export type Payload = Partial<t.med.Med>;
type Action = {
    type: act;
    payload?: Payload;
};
export enum act {
    'set-state',
    'reset',
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
    owner: null,
    start: null,
    end: null,
    quantity: null,
    med_type: null,
    time_of_day: null,
    meal: null,
    taken: null,
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
            break;
        case act.reset:
            const keys: (keyof State)[] = ['end', 'meal', 'med_type', 'name', 'owner', 'quantity', 'start', 'time_of_day'];
            keys.forEach((key) => {
                newState[key] = null;
            });
            break;
        default:
            break;
    }
    return newState;
};

export const StateContext = createContext(initialState);
export const DispatchContext = createContext<Dispatch<Action> | null>(null);
