export enum LoadersActionTypes {
    SET_IS_FETCHING_SEQUENCES = "SET_IS_FETCHING_SEQUENCES",
    SET_IS_FETCHING_ACTIONS = "SET_IS_FETCHING_ACTIONS",
    SET_IS_FETCHING_PLUGINS = "SET_IS_FETCHING_PLUGINS",
}

export interface LoadersAction {
    type: LoadersActionTypes;
    payload: boolean;
}

export const loadersSetIsFetchingSequences = (loader: boolean): LoadersAction => ({
    type: LoadersActionTypes.SET_IS_FETCHING_SEQUENCES,
    payload: loader,
});

export const loadersSetIsFetchingActions = (loader: boolean): LoadersAction => ({
    type: LoadersActionTypes.SET_IS_FETCHING_ACTIONS,
    payload: loader,
});

export const loadersSetIsFetchingPlugins = (loader: boolean): LoadersAction => ({
    type: LoadersActionTypes.SET_IS_FETCHING_PLUGINS,
    payload: loader,
});
