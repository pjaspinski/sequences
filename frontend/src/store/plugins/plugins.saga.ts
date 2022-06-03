import { call, put, takeLatest } from "redux-saga/effects";
import {
    PluginsActionTypes,
    PluginsFetchInit,
    pluginsFetchSuccess,
    PluginsSaveSettingsInit,
    pluginsUpdateStatus,
} from "./plugins.actions";
import fetchPluginsFromBe from "../../fetchTasks/fetchPlugins";
import { Plugin } from "./interfaces";
import { PluginStatus } from "sequences-types";
import savePluginSettings from "../../fetchTasks/savePluginSettings";

function* fetchPlugins(action: PluginsFetchInit) {
    try {
        const plugins: Plugin[] = yield call(fetchPluginsFromBe);
        yield put(pluginsFetchSuccess(plugins));
    } catch (e) {
        console.error(`${action.type} failed.`);
    }
}

function* saveSettings(action: PluginsSaveSettingsInit) {
    try {
        yield call(savePluginSettings, action.pluginId, action.payload);
        yield put(pluginsUpdateStatus(action.pluginId, PluginStatus.LOADING));
    } catch (e) {
        console.error(`${action.type} failed.`);
    }
}

export function* pluginsSaga() {
    yield takeLatest(PluginsActionTypes.PLUGINS_FETCH_INIT, fetchPlugins);
    yield takeLatest(PluginsActionTypes.PLUGINS_SAVE_SETTINGS_INIT, saveSettings);
}
