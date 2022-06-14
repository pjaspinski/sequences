import { all } from "redux-saga/effects";
import { actionsSaga } from "./actions/actions.saga";
import { pluginsSaga } from "./plugins/plugins.saga";
import { sequencesSaga } from "./sequences/sequences.saga";
import { socketsSaga } from "./sockets/sockets.saga";

function* mainSaga() {
    yield all([pluginsSaga(), socketsSaga(), actionsSaga(), sequencesSaga()]);
}

export default mainSaga;
