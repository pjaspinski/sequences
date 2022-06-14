import { ActionsModel } from "sequences-types";

export enum ActionsActionTypes {
    ACTIONS_FETCH_INIT = "ACTIONS_FETCH_INIT",
    ACTIONS_FETCH_SUCCESS = "ACTIONS_FETCH_SUCCESS",
}

export interface ActionsAction {
    type: ActionsActionTypes;
}

export interface ActionsFetchInit extends ActionsAction {
    type: ActionsActionTypes.ACTIONS_FETCH_INIT;
}

export const actionsFetchInit = (): ActionsFetchInit => ({
    type: ActionsActionTypes.ACTIONS_FETCH_INIT,
});

export interface ActionsFetchSuccess extends ActionsAction {
    type: ActionsActionTypes.ACTIONS_FETCH_SUCCESS;
    payload: ActionsModel[];
}

export const actionsFetchSuccess = (actions: ActionsModel[]): ActionsFetchSuccess => ({
    type: ActionsActionTypes.ACTIONS_FETCH_SUCCESS,
    payload: actions,
});
