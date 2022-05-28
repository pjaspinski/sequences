import { Plugin } from "./interfaces";
import { PluginsActionTypes, PluginsFetchSuccess } from "./plugins.actions";

export interface PluginsState {
    model: Plugin[];
}

export const pluginsInitialState = {
    model: [],
};

type PluginsAction = PluginsFetchSuccess;

export const pluginsReducer = (
    state: PluginsState = pluginsInitialState,
    action: PluginsAction
) => {
    switch (action.type) {
        case PluginsActionTypes.PLUGINS_FETCH_SUCCESS:
            return {
                ...state,
                model: action.payload,
            };
        default:
            return state;
    }
};
