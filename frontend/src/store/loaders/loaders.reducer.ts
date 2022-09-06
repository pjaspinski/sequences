import { LoadersAction, LoadersActionTypes } from "./loaders.actions";

export interface LoadersState {
    isFetchingSequences: boolean;
    isFetchingActions: boolean;
    isFetchingPlugins: boolean;
}

export const loadersInitialState = {
    isFetchingSequences: false,
    isFetchingActions: false,
    isFetchingPlugins: false,
};

export const loadersReducer = (
    state: LoadersState = loadersInitialState,
    action: LoadersAction
): LoadersState => {
    switch (action.type) {
        case LoadersActionTypes.SET_IS_FETCHING_SEQUENCES:
            return {
                ...state,
                isFetchingSequences: action.payload,
            };
        case LoadersActionTypes.SET_IS_FETCHING_ACTIONS:
            return {
                ...state,
                isFetchingActions: action.payload,
            };
        case LoadersActionTypes.SET_IS_FETCHING_PLUGINS:
            return {
                ...state,
                isFetchingPlugins: action.payload,
            };
        default:
            return state;
    }
};
