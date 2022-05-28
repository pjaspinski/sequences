import { call, put, takeLatest } from "redux-saga/effects";
import {
    PluginsActionTypes,
    PluginsFetchInit,
    pluginsFetchSuccess,
    PluginsSaveSettings,
} from "./plugins.actions";
import fetchPluginsFromBe from "../../fetchTasks/fetchPlugins";
import savePluginSettings from "../../fetchTasks/savePluginSettings";
import { Plugin } from "./interfaces";

function* fetchPlugins(action: PluginsFetchInit) {
    try {
        const plugins: Plugin[] = yield call(fetchPluginsFromBe);
        yield put(pluginsFetchSuccess(plugins));
    } catch (e) {
        console.error(`${action.type} failed.`);
    }
}

function* saveSettings(action: PluginsSaveSettings) {
    try {
        yield call(savePluginSettings, action.pluginId, action.payload);
    } catch (e) {
        console.error(`${action.type} failed.`);
    }
}

export function* pluginsSaga() {
    yield takeLatest(PluginsActionTypes.PLUGINS_FETCH_INIT, fetchPlugins);
    yield takeLatest(PluginsActionTypes.PLUGINS_SAVE_SETTINGS, saveSettings);
}
