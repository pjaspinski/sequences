import { Middleware } from "redux";
import {
    ClientToServerEvents,
    ClientToServerPayloads,
    PluginStatusChangedPayload,
    Sequence,
    SequenceDeletedPayload,
    SequenceStatusChangedPayload,
    ServerToClientEvents,
} from "sequences-types";
import { io, Socket } from "socket.io-client";
import { pluginsUpdateStatus } from "../plugins/plugins.actions";
import {
    sequenceCreateSuccess,
    sequenceDeleteSuccess,
    sequenceUpdateStatus,
    sequenceUpdateSuccess,
} from "../sequences/sequences.actions";
import { SocketsActionTypes, SocketsSend } from "../sockets/sockets.actions";

const socketIOMiddleware: Middleware = (storeApi) => {
    const { dispatch } = storeApi;
    const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io();
    socket.on("connect", () => {
        console.log("Connected to server using SocketIO");
    });

    socket.on("pluginStatusChange", (payload: PluginStatusChangedPayload) => {
        dispatch(pluginsUpdateStatus(payload.pluginId, payload.status, payload.lastSettings));
    });

    socket.on("sequenceStatusChange", (payload: SequenceStatusChangedPayload) => {
        dispatch(sequenceUpdateStatus(payload));
    });

    socket.on("sequenceCreated", (payload: Sequence) => {
        dispatch(sequenceCreateSuccess(payload));
    });

    socket.on("sequenceUpdated", (payload: Sequence) => {
        dispatch(sequenceUpdateSuccess(payload));
    });

    socket.on("sequenceDeleted", (payload: SequenceDeletedPayload) => {
        dispatch(sequenceDeleteSuccess(payload.id));
    });

    return (next) => (action) => {
        if (action.type === SocketsActionTypes.SOCKET_SEND) {
            const { topic, payload } = action as SocketsSend<ClientToServerPayloads>;
            socket.emit("ping", payload);
        }
        return next(action);
    };
};

export default socketIOMiddleware;
