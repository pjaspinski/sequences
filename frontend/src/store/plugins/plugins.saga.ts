import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import {
    PluginsActionTypes,
    pluginsFetchSuccess,
    PluginsSaveSettingsInit,
    RemovePlugin,
    RestartPlugin,
    StopPlugin,
} from "./plugins.actions";
import fetchPluginsFromBe from "../../fetchTasks/plugins/fetchPlugins";
import { PluginModel } from "sequences-types";
import savePluginSettings from "../../fetchTasks/plugins/savePluginSettings";
import { safe } from "../helpers";
import { loadersSetIsFetchingPlugins } from "../loaders/loaders.actions";
import removePluginFromBe from "../../fetchTasks/plugins/removePluginFromBe";
import restartPluginFromBe from "../../fetchTasks/plugins/restartPluginFromBe";
import stopPluginFromBe from "../../fetchTasks/plugins/stopPluginFromBe";

function* fetchPlugins() {
    yield put(loadersSetIsFetchingPlugins(true));
    const plugins: PluginModel[] = yield call(fetchPluginsFromBe);
    yield put(pluginsFetchSuccess(plugins));
    yield put(loadersSetIsFetchingPlugins(false));
}

function* saveSettings(action: PluginsSaveSettingsInit) {
    yield call(savePluginSettings, action.pluginId, action.payload);
}

function* removePlugin(action: RemovePlugin) {
    yield call(removePluginFromBe, action.payload.pluginId);
}

function* restartPlugin(action: RestartPlugin) {
    yield call(restartPluginFromBe, action.pluginId, action.payload);
}

function* stopPlugin(action: StopPlugin) {
    yield call(stopPluginFromBe, action.payload.pluginId);
}

export function* pluginsSaga() {
    yield takeLatest(PluginsActionTypes.PLUGINS_FETCH_INIT, safe(fetchPlugins));
    yield takeEvery(PluginsActionTypes.PLUGINS_SAVE_SETTINGS_INIT, safe(saveSettings));
    yield takeEvery(PluginsActionTypes.PLUGIN_RESTART, safe(restartPlugin));
    yield takeEvery(PluginsActionTypes.PLUGIN_REMOVE, safe(removePlugin));
    yield takeEvery(PluginsActionTypes.PLUGIN_STOP, safe(stopPlugin));
}
