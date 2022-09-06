import { all } from "redux-saga/effects";
import { actionsSaga } from "./actions/actions.saga";
import { pluginsSaga } from "./plugins/plugins.saga";
import { sequencesSaga } from "./sequences/sequences.saga";

function* mainSaga() {
    yield all([pluginsSaga(), actionsSaga(), sequencesSaga()]);
}

export default mainSaga;
