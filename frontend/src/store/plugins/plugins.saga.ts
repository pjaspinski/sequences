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
import { safe } from "../helpers";

function* fetchPlugins(action: PluginsFetchInit) {
    const plugins: PluginModel[] = yield call(fetchPluginsFromBe);
    yield put(pluginsFetchSuccess(plugins));
}

function* saveSettings(action: PluginsSaveSettingsInit) {
    yield call(savePluginSettings, action.pluginId, action.payload);
}

export function* pluginsSaga() {
    yield takeLatest(PluginsActionTypes.PLUGINS_FETCH_INIT, safe(fetchPlugins));
    yield takeLatest(PluginsActionTypes.PLUGINS_SAVE_SETTINGS_INIT, safe(saveSettings));
}
