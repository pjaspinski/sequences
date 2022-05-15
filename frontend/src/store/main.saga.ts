import { all } from "redux-saga/effects";
import { pluginsSaga } from "./plugins/plugins.saga";

function* mainSaga() {
    yield all([pluginsSaga()]);
}

export default mainSaga;
