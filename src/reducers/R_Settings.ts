import { createContext, Dispatch } from 'react';
import { t } from './incoming';

type Action = {
    type: act;
    payload?: any;
};
export enum act {
    'active-div',
    'active-div-toggle',
    'active-div2',
    'active-div-toggle2',
    'assign-redirect',
    'clear-redirect',
    'show-this-btn',
    // 'override',
    'geo-location',
    'menu-option',
    'filter',
    'scroll',
    'nudge',
    'loaded',
    'set-typed',
}

export type State = {
    active_div: null | string; // eg - Clicking on empty area should close dropdowns, modals, etc. When null, it says nothing should be open.
    active_div2: null | string; // eg - Clicking on empty area should close dropdowns, modals, etc. When null, it says nothing should be open.
    redirect_to: string | null;
    scroll: string | null;
    show_this_btn: 'google' | 'phone' | null;
    login_msg: string | null;
    // override: any;
    // user location
    lat: number | null;
    lon: number | null;
    isMobile: boolean;
    active_menu: t.Menu;
    filter: boolean;
    nudge: string | null;
    loaded: null | number; // for progressbar
    typed: string; // stores any typed value by user
};

export const initialState: State = {
    active_div: null,
    active_div2: null,
    scroll: null, // should become null as soon as its work is over
    redirect_to: null,
    show_this_btn: null,
    login_msg: null,
    // override: null,
    lat: null,
    lon: null,
    isMobile: window.innerWidth < 400,
    active_menu: 'Home',
    filter: false,
    nudge: null,
    loaded: null,
    typed: '',
};

export const reducer = (state: State, action: Action) => {
    const newState = { ...state };
    const { payload, type } = action;
    const payload_checker = () => {
        // when a payload is must
        if (!payload) {
            alert('Payload is empty. This should not happen');
            return newState;
        }
    };
    switch (type) {
        case act['active-div']: // payload preferred
            // console.log({
            //     payload,
            // });
            newState.active_div = payload ?? null;
            break;
        case act['active-div-toggle']: // payload needed
            payload_checker();
            newState.active_div = state.active_div === payload ? null : payload;
            break;
        case act['active-div2']: // payload preferred
            // console.log({
            //     payload,
            // });
            newState.active_div2 = payload ?? null;
            break;
        case act['active-div-toggle2']: // payload needed
            // payload_checker();
            console.log({ payload });
            newState.active_div2 = state.active_div2 === payload ? null : payload;
            break;
        case act['show-this-btn']:
            newState.show_this_btn = payload ?? null;
            break;
        // case act.override:
        //     newState.override = payload;
        //     break;
        case act['geo-location']:
            newState.lat = payload.lat;
            newState.lon = payload.lon;
            break;
        case act['menu-option']:
            newState.active_menu = payload;
            break;
        case act.filter:
            newState.filter = payload ?? false;
            break;
        case act.scroll:
            console.log('-----------------------------');
            console.log({ payload });
            newState.scroll = payload ?? null;
            break;
        case act.nudge:
            newState.nudge = payload ?? null;
            break;
        case act.loaded:
            newState.loaded = payload ?? null;
            break;
        case act['set-typed']:
            newState.typed = payload ?? '';
            break;
        default:
            break;
    }
    return newState;
};

export const StateContext = createContext(initialState);
export const DispatchContext = createContext<Dispatch<Action> | null>(null);
