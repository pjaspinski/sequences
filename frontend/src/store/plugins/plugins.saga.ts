import { call, put, takeLatest } from "redux-saga/effects";
import {
    PluginsActionTypes,
    PluginsFetchInit,
    pluginsFetchSuccess,
} from "./plugins.actions";
import fetchPluginsFromBe from "../../fetchTasks/fetchPlugins";
import { Plugin } from "sequences-types";

function* fetchPlugins(action: PluginsFetchInit) {
    try {
        const plugins: Plugin[] = yield call(fetchPluginsFromBe);
        yield put(pluginsFetchSuccess(plugins));
    } catch (e) {
        console.error(`${action.type} failed.`);
    }
}

export function* pluginsSaga() {
    yield takeLatest(PluginsActionTypes.PLUGINS_FETCH_INIT, fetchPlugins);
}
