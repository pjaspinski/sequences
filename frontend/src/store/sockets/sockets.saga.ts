import { put, takeEvery } from "redux-saga/effects";
import { SocketsActionTypes, SocketsReceive } from "./sockets.actions";
import { pluginsUpdateStatus } from "../plugins/plugins.actions";
import {
    PluginStatusChangedPayload,
    Sequence,
    SequenceDeletedPayload,
    SequenceStatusChangedPayload,
} from "sequences-types";
import {
    sequenceCreateSuccess,
    sequenceDeleteSuccess,
    sequenceUpdateStatus,
    sequenceUpdateSuccess,
} from "../sequences/sequences.actions";

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
        case "sequenceCreated": {
            const payload = action.payload as Sequence;
            yield put(sequenceCreateSuccess(payload));
            break;
        }
        case "sequenceUpdated": {
            const payload = action.payload as Sequence;
            yield put(sequenceUpdateSuccess(payload));
            break;
        }
        case "sequenceDeleted": {
            const payload = action.payload as SequenceDeletedPayload;
            yield put(sequenceDeleteSuccess(payload.id));
            break;
        }
    }
}

export function* socketsSaga() {
    yield takeEvery(SocketsActionTypes.SOCKET_RECEIVE, handleReceivedMessage);
}
