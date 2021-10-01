import { createContext, Dispatch } from 'react';
import { t, init } from './incoming';
import { User } from 'firebase/auth';

type Action = {
    type: act;
    payload?: any;
};
export enum act {
    'loginWith-google',
    'acknowledged',
    'clear-acknowledged',
    'logout',
}

type KEY = keyof t.user.User;
type User_keys = Record<KEY, t.user.User[KEY]>;

export interface State extends User_keys {
    loggedIn: boolean;
    acknowledged: boolean; // true if user now exists in mongoose database
    mongoose_id: string | null;
    email: string | null;
}

export const initialState: State = {
    mongoose_id: null,
    email: null,
    uid: null,
    loggedIn: false,
    acknowledged: false,
};

export const reducer = (state: State, action: Action) => {
    const newState = { ...state };
    const { payload, type } = action;
    const firebase_result = payload as User;
    switch (type) {
        case act['loginWith-google']: // when user selects a subcategory ( new, same, both )
            if (!newState.loggedIn) {
                console.log({ payload });
                newState.email = firebase_result.email ?? null;
                newState.uid = firebase_result.uid ?? null;
                newState.loggedIn = firebase_result.uid ? true : false;
            }
            break;
        case act.logout:
            newState.loggedIn = false;
            newState.email = null;
            // newState.googleId = null;
            newState.uid = null;
            newState.acknowledged = false;
            newState.mongoose_id = null;
            break;
        case act.acknowledged:
            const load = payload as t.user.UserDocument;
            if (!newState.acknowledged) {
                console.log({ load });
                newState.acknowledged = true;
                newState.mongoose_id = load._id;
                newState['email'] = load['email'];
            }
            break;
        case act['clear-acknowledged']:
            newState.acknowledged = false;
            break;
        default:
            break;
    }
    return newState;
};

export const StateContext = createContext(initialState);
export const DispatchContext = createContext<Dispatch<Action> | null>(null);
