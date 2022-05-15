import { Plugin } from "sequences-types";

export enum PluginsActionTypes {
    PLUGINS_FETCH_INIT = "PLUGINS_FETCH_INIT",
    PLUGINS_FETCH_SUCCESS = "PLUGINS_FETCH_SUCCESS",
}

export interface PluginsAction {
    type: PluginsActionTypes;
}

export type PluginsFetchInit = PluginsAction;

export const pluginsFetchInit = (): PluginsFetchInit => ({
    type: PluginsActionTypes.PLUGINS_FETCH_INIT,
});

export interface PluginsFetchSuccess extends PluginsAction {
    payload: Plugin[];
}

export const pluginsFetchSuccess = (
    plugins: Plugin[]
): PluginsFetchSuccess => ({
    type: PluginsActionTypes.PLUGINS_FETCH_SUCCESS,
    payload: plugins,
});
