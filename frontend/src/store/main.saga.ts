import { all } from "redux-saga/effects";
import { pluginsSaga } from "./plugins/plugins.saga";
import { socketsSaga } from "./sockets/sockets.saga";

function* mainSaga() {
    yield all([pluginsSaga(), socketsSaga()]);
}

export default mainSaga;
