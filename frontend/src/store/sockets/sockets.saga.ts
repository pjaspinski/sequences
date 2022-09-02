import { put, takeEvery } from "redux-saga/effects";
import { SocketsActionTypes, SocketsReceive } from "./sockets.actions";
import { pluginsUpdateStatus } from "../plugins/plugins.actions";
import { PluginStatusChangedPayload, SequenceStatusChangedPayload } from "sequences-types";
import { sequenceUpdateStatus } from "../sequences/sequences.actions";

function* handleReceivedMessage(action: SocketsReceive) {
    switch (action.topic) {
        case "pluginStatusChange": {
            const payload = action.payload as PluginStatusChangedPayload;
            yield put(pluginsUpdateStatus(payload.pluginId, payload.status));
            break;
        }
        case "sequenceStatusChange": {
            const payload = action.payload as SequenceStatusChangedPayload;
            yield put(sequenceUpdateStatus(payload));
            break;
        }
    }
}

export function* socketsSaga() {
    yield takeEvery(SocketsActionTypes.SOCKET_RECEIVE, handleReceivedMessage);
}
