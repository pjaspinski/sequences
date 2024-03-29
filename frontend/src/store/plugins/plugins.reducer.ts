import { PluginModel } from "sequences-types";
import { PluginsActionTypes, PluginsFetchSuccess, PluginsUpdateStatus } from "./plugins.actions";

export interface PluginsState {
    model: PluginModel[];
}

export const pluginsInitialState = {
    model: [],
};

type PluginsAction = PluginsFetchSuccess | PluginsUpdateStatus;

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
        case PluginsActionTypes.PLUGINS_UPDATE_STATUS: {
            const plugin = state.model.find((plugin) => plugin.id === action.payload.pluginId);
            return {
                ...state,
                model: [
                    ...state.model.filter((plugin) => plugin.id !== action.payload.pluginId),
                    {
                        ...plugin,
                        status: action.payload.status,
                        lastSettings: action.payload.lastSettings,
                    },
                ],
            };
        }
        default:
            return state;
    }
};
