import { Plugin } from "./interfaces";
import { Values } from "../../components/organisms/PluginSettingsModal/PluginSettingsModal";
import { PluginStatus } from "sequences-types";

export enum PluginsActionTypes {
    PLUGINS_FETCH_INIT = "PLUGINS_FETCH_INIT",
    PLUGINS_FETCH_SUCCESS = "PLUGINS_FETCH_SUCCESS",
    PLUGINS_SAVE_SETTINGS_INIT = "PLUGINS_SAVE_SETTINGS_INIT",
    PLUGINS_UPDATE_STATUS = "PLUGINS_UPDATE_STATUS",
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
    payload: Plugin[];
}

export const pluginsFetchSuccess = (plugins: Plugin[]): PluginsFetchSuccess => ({
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
