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
import { SocketsActionTypes, socketsReceive, SocketsSend } from "../sockets/sockets.actions";

const socketIOMiddleware: Middleware = (storeApi) => {
    const { dispatch } = storeApi;
    const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io();
    socket.on("connect", () => {
        console.log("Connected to server using SocketIO");
    });

    socket.on("pluginStatusChange", (payload: PluginStatusChangedPayload) => {
        dispatch(socketsReceive("pluginStatusChange", payload));
    });

    socket.on("sequenceStatusChange", (payload: SequenceStatusChangedPayload) => {
        dispatch(socketsReceive("sequenceStatusChange", payload));
    });

    socket.on("sequenceCreated", (payload: Sequence) => {
        dispatch(socketsReceive("sequenceCreated", payload));
    });

    socket.on("sequenceUpdated", (payload: Sequence) => {
        dispatch(socketsReceive("sequenceUpdated", payload));
    });

    socket.on("sequenceDeleted", (payload: SequenceDeletedPayload) => {
        dispatch(socketsReceive("sequenceDeleted", payload));
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
