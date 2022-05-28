import { Plugin } from "./interfaces";
import { Values } from "../../components/organisms/PluginSettingsModal/PluginSettingsModal";

export enum PluginsActionTypes {
    PLUGINS_FETCH_INIT = "PLUGINS_FETCH_INIT",
    PLUGINS_FETCH_SUCCESS = "PLUGINS_FETCH_SUCCESS",
    PLUGINS_SAVE_SETTINGS = "PLUGINS_SAVE_SETTINGS",
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

export interface PluginsSaveSettings extends PluginsAction {
    pluginId: number;
    payload: Values;
}

export const pluginsSaveSettings = (
    pluginId: number,
    settings: Values
): PluginsSaveSettings => ({
    type: PluginsActionTypes.PLUGINS_SAVE_SETTINGS,
    pluginId,
    payload: settings,
});
