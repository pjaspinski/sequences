import { ClientToServerPayloads } from "sequences-types";

export enum SocketsActionTypes {
    SOCKET_SEND = "SOCKET_SEND",
}

export interface SocketsAction {
    type: SocketsActionTypes;
}

export interface SocketsSend<T> extends SocketsAction {
    topic: string;
    payload: T;
}

export const socketsSend = (
    topic: string,
    payload: ClientToServerPayloads
): SocketsSend<ClientToServerPayloads> => ({
    type: SocketsActionTypes.SOCKET_SEND,
    topic,
    payload,
});
