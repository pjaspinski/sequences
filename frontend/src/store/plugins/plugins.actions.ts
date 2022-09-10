import { Values } from "../../components/organisms/PluginSettingsModal/PluginSettingsModal";
import { PluginStatus, PluginModel } from "sequences-types";

export enum PluginsActionTypes {
    PLUGINS_FETCH_INIT = "PLUGINS_FETCH_INIT",
    PLUGINS_FETCH_SUCCESS = "PLUGINS_FETCH_SUCCESS",
    PLUGINS_SAVE_SETTINGS_INIT = "PLUGINS_SAVE_SETTINGS_INIT",
    PLUGINS_UPDATE_STATUS = "PLUGINS_UPDATE_STATUS",
    PLUGIN_REMOVE = "PLUGIN_REMOVE",
    PLUGIN_RESTART = "PLUGIN_RESTART",
    PLUGIN_START = "PLUGIN_START",
    PLUGIN_STOP = "PLUGIN_STOP",
}

export interface PluginsAction {
    type: PluginsActionTypes;
}

export interface PluginsFetchInit extends PluginsAction {
    type: PluginsActionTypes.PLUGINS_FETCH_INIT;
}

export const pluginsFetchInit = (): PluginsFetchInit => ({
    type: PluginsActionTypes.PLUGINS_FETCH_INIT,
});

export interface PluginsFetchSuccess extends PluginsAction {
    type: PluginsActionTypes.PLUGINS_FETCH_SUCCESS;
    payload: PluginModel[];
}

export const pluginsFetchSuccess = (plugins: PluginModel[]): PluginsFetchSuccess => ({
    type: PluginsActionTypes.PLUGINS_FETCH_SUCCESS,
    payload: plugins,
});

export interface PluginsSaveSettingsInit extends PluginsAction {
    type: PluginsActionTypes.PLUGINS_SAVE_SETTINGS_INIT;
    pluginId: number;
    payload: Values;
}

export const pluginsSaveSettingsInit = (
    pluginId: number,
    settings: Values
): PluginsSaveSettingsInit => ({
    type: PluginsActionTypes.PLUGINS_SAVE_SETTINGS_INIT,
    pluginId,
    payload: settings,
});

export interface PluginsUpdateStatus extends PluginsAction {
    type: PluginsActionTypes.PLUGINS_UPDATE_STATUS;
    payload: { pluginId: number; status: PluginStatus };
}

export const pluginsUpdateStatus = (
    pluginId: number,
    status: PluginStatus
): PluginsUpdateStatus => ({
    type: PluginsActionTypes.PLUGINS_UPDATE_STATUS,
    payload: { pluginId, status },
});

export interface RemovePlugin extends PluginsAction {
    type: PluginsActionTypes.PLUGIN_REMOVE;
    payload: { pluginId: number };
}

export const removePlugin = (pluginId: number): RemovePlugin => ({
    type: PluginsActionTypes.PLUGIN_REMOVE,
    payload: { pluginId },
});

export interface RestartPlugin extends PluginsAction {
    type: PluginsActionTypes.PLUGIN_RESTART;
    pluginId: number;
    payload: Values;
}

export const restartPlugin = (pluginId: number, settings: Values): RestartPlugin => ({
    type: PluginsActionTypes.PLUGIN_RESTART,
    pluginId,
    payload: settings,
});

export interface StopPlugin extends PluginsAction {
    type: PluginsActionTypes.PLUGIN_STOP;
    payload: { pluginId: number };
}

export const stopPlugin = (pluginId: number): StopPlugin => ({
    type: PluginsActionTypes.PLUGIN_STOP,
    payload: { pluginId },
});
