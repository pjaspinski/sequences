import { call, put, takeLatest } from "redux-saga/effects";
import {
    PluginsActionTypes,
    PluginsFetchInit,
    pluginsFetchSuccess,
    PluginsSaveSettingsInit,
} from "./plugins.actions";
import fetchPluginsFromBe from "../../fetchTasks/fetchPlugins";
import { PluginModel } from "sequences-types";
import savePluginSettings from "../../fetchTasks/savePluginSettings";

function* fetchPlugins(action: PluginsFetchInit) {
    try {
        const plugins: PluginModel[] = yield call(fetchPluginsFromBe);
        yield put(pluginsFetchSuccess(plugins));
    } catch (e) {
        console.error(`${action.type} failed.`);
    }
}

function* saveSettings(action: PluginsSaveSettingsInit) {
    try {
        yield call(savePluginSettings, action.pluginId, action.payload);
    } catch (e) {
        console.error(`${action.type} failed.`);
    }
}

export function* pluginsSaga() {
    yield takeLatest(PluginsActionTypes.PLUGINS_FETCH_INIT, fetchPlugins);
    yield takeLatest(PluginsActionTypes.PLUGINS_SAVE_SETTINGS_INIT, saveSettings);
}
