import type { ActionType } from "./action-type"

export interface AddAppAction {
    type: ActionType.ADD_APP;
    payload: any;
};

export interface DelAppAction {
    type: ActionType.DEL_APP;
    payload: any;
};

export interface FocusAppAction {
    type: ActionType.FOCUS_APP;
    payload: any;
};

export interface MinimizeAppAction {
    type: ActionType.MINIMIZE_APP;
    payload: any;
};

export interface ToggleMaximizeAppAction {
    type: ActionType.TOGGLE_MAXIMIZE_APP;
    payload: any;
};

export interface FocuIconAction {
    type: ActionType.FOCUS_ICON;
    payload: any;
};

export interface SelectIconsAction {
    type: ActionType.SELECT_ICONS;
    payload: any;
};

export interface FocusDesktopAction {
    type: ActionType.FOCUS_DESKTOP;
};

export interface StartSelectAction {
    type: ActionType.START_SELECT;
    payload: any;
};

export interface EndSelectAction {
    type: ActionType.END_SELECT;
};

export interface PowerOffAction {
    type: ActionType.POWER_OFF;
    payload: any;
};

export interface CancelPowerOffaction {
    type: ActionType.CANCEL_POWER_OFF;
};

export type IActions =
    AddAppAction |
    DelAppAction |
    FocusAppAction |
    MinimizeAppAction |
    ToggleMaximizeAppAction |
    FocuIconAction |
    SelectIconsAction |
    FocusDesktopAction |
    StartSelectAction |
    EndSelectAction |
    PowerOffAction |
    CancelPowerOffaction;
