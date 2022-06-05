import { put, takeEvery } from "redux-saga/effects";
import { SocketsActionTypes, SocketsReceive } from "./sockets.actions";
import { pluginsUpdateStatus } from "../plugins/plugins.actions";

function* handleReceivedMessage(action: SocketsReceive) {
    switch (action.topic) {
        case "pluginStatusChange":
            yield put(pluginsUpdateStatus(action.payload.pluginId, action.payload.status));
    }
}

export function* socketsSaga() {
    yield takeEvery(SocketsActionTypes.SOCKET_RECEIVE, handleReceivedMessage);
}
