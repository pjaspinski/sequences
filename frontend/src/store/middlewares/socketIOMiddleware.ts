import { Middleware } from "redux";
import {
    ClientToServerEvents,
    ClientToServerPayloads,
    PluginStatusChangedPayload,
    ServerToClientEvents,
} from "sequences-types";
import { io, Socket } from "socket.io-client";
import {
    SocketsActionTypes,
    socketsReceive,
    SocketsSend,
} from "../sockets/sockets.actions";

const socketIOMiddleware: Middleware = (storeApi) => {
    const { dispatch } = storeApi;
    const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io();
    socket.on("connect", () => {
        console.log("Connected to server using SocketIO");
    });

    socket.on("pluginStatusChange", (pluginId, newStatus) => {
        const payload: PluginStatusChangedPayload = { pluginId, newStatus };
        dispatch(socketsReceive("pluginStatusChange", payload));
    });

    return (next) => (action) => {
        if (action.type === SocketsActionTypes.SOCKET_SEND) {
            const { topic, payload } =
                action as SocketsSend<ClientToServerPayloads>;
            socket.emit("ping", payload);
        }
        return next(action);
    };
};

export default socketIOMiddleware;
