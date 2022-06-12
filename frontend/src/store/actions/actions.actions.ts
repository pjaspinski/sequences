import { ActionsModel } from "sequences-types";

export enum ActionsActionTypes {
    ACTIONS_FETCH_INIT = "ACTIONS_FETCH_INIT",
    ACTIONS_FETCH_SUCCESS = "ACTIONS_FETCH_SUCCESS",
}

export interface PluginsAction {
    type: ActionsActionTypes;
}

export interface ActionsFetchInit extends PluginsAction {
    type: ActionsActionTypes.ACTIONS_FETCH_INIT;
}

export const actionsFetchInit = (): ActionsFetchInit => ({
    type: ActionsActionTypes.ACTIONS_FETCH_INIT,
});

export interface ActionsFetchSuccess extends PluginsAction {
    type: ActionsActionTypes.ACTIONS_FETCH_SUCCESS;
    payload: ActionsModel[];
}

export const actionsFetchSuccess = (actions: ActionsModel[]): ActionsFetchSuccess => ({
    type: ActionsActionTypes.ACTIONS_FETCH_SUCCESS,
    payload: actions,
});
