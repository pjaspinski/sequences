import { ActionsModel } from "sequences-types";
import { ActionsActionTypes, ActionsFetchSuccess } from "./actions.actions";

export interface ActionsState {
    model: ActionsModel[];
}

export const actionsInitialState = {
    model: [],
};

type ActionsAction = ActionsFetchSuccess;

export const actionsReducer = (
    state: ActionsState = actionsInitialState,
    action: ActionsAction
) => {
    switch (action.type) {
        case ActionsActionTypes.ACTIONS_FETCH_SUCCESS:
            return {
                ...state,
                model: action.payload,
            };
        default:
            return state;
    }
};
