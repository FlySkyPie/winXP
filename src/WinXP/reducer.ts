import {
    ADD_APP,
    DEL_APP,
    FOCUS_APP,
    MINIMIZE_APP,
    TOGGLE_MAXIMIZE_APP,
    FOCUS_ICON,
    SELECT_ICONS,
    FOCUS_DESKTOP,
    START_SELECT,
    END_SELECT,
    POWER_OFF,
    CANCEL_POWER_OFF,
} from './constants/actions';
import { FOCUSING, POWER_STATE } from './constants';
import { defaultAppState } from './apps/default-app-state';
import { defaultIconState } from './apps/default-icon-state';

export const initState = {
    apps: defaultAppState,
    nextAppID: defaultAppState.length,
    nextZIndex: defaultAppState.length,
    focusing: FOCUSING.WINDOW,
    icons: defaultIconState,
    selecting: false,
    powerState: POWER_STATE.START,
};

export const reducer = (state: any, action: any = { type: '' }) => {
    switch (action.type) {
        case ADD_APP:
            const app = state.apps.find(
                (_app: any) => _app.component === action.payload.component,
            );
            if (action.payload.multiInstance || !app) {
                return {
                    ...state,
                    apps: [
                        ...state.apps,
                        {
                            ...action.payload,
                            id: state.nextAppID,
                            zIndex: state.nextZIndex,
                        },
                    ],
                    nextAppID: state.nextAppID + 1,
                    nextZIndex: state.nextZIndex + 1,
                    focusing: FOCUSING.WINDOW,
                };
            }
            const apps = state.apps.map((app: any) =>
                app.component === action.payload.component
                    ? { ...app, zIndex: state.nextZIndex, minimized: false }
                    : app,
            );
            return {
                ...state,
                apps,
                nextZIndex: state.nextZIndex + 1,
                focusing: FOCUSING.WINDOW,
            };
        case DEL_APP:
            if (state.focusing !== FOCUSING.WINDOW) return state;
            return {
                ...state,
                apps: state.apps.filter((app: any) => app.id !== action.payload),
                focusing:
                    state.apps.length > 1
                        ? FOCUSING.WINDOW
                        : state.icons.find((icon: any) => icon.isFocus)
                            ? FOCUSING.ICON
                            : FOCUSING.DESKTOP,
            };
        case FOCUS_APP: {
            const apps = state.apps.map((app: any) =>
                app.id === action.payload
                    ? { ...app, zIndex: state.nextZIndex, minimized: false }
                    : app,
            );
            return {
                ...state,
                apps,
                nextZIndex: state.nextZIndex + 1,
                focusing: FOCUSING.WINDOW,
            };
        }
        case MINIMIZE_APP: {
            if (state.focusing !== FOCUSING.WINDOW) return state;
            const apps = state.apps.map((app: any) =>
                app.id === action.payload ? { ...app, minimized: true } : app,
            );
            return {
                ...state,
                apps,
                focusing: FOCUSING.WINDOW,
            };
        }
        case TOGGLE_MAXIMIZE_APP: {
            if (state.focusing !== FOCUSING.WINDOW) return state;
            const apps = state.apps.map((app: any) =>
                app.id === action.payload ? { ...app, maximized: !app.maximized } : app,
            );
            return {
                ...state,
                apps,
                focusing: FOCUSING.WINDOW,
            };
        }
        case FOCUS_ICON: {
            const icons = state.icons.map((icon: any) => ({
                ...icon,
                isFocus: icon.id === action.payload,
            }));
            return {
                ...state,
                focusing: FOCUSING.ICON,
                icons,
            };
        }
        case SELECT_ICONS: {
            const icons = state.icons.map((icon: any) => ({
                ...icon,
                isFocus: action.payload.includes(icon.id),
            }));
            return {
                ...state,
                icons,
                focusing: FOCUSING.ICON,
            };
        }
        case FOCUS_DESKTOP:
            return {
                ...state,
                focusing: FOCUSING.DESKTOP,
                icons: state.icons.map((icon: any) => ({
                    ...icon,
                    isFocus: false,
                })),
            };
        case START_SELECT:
            return {
                ...state,
                focusing: FOCUSING.DESKTOP,
                icons: state.icons.map((icon: any) => ({
                    ...icon,
                    isFocus: false,
                })),
                selecting: action.payload,
            };
        case END_SELECT:
            return {
                ...state,
                selecting: null,
            };
        case POWER_OFF:
            return {
                ...state,
                powerState: action.payload,
            };
        case CANCEL_POWER_OFF:
            return {
                ...state,
                powerState: POWER_STATE.START,
            };
        default:
            return state;
    }
};