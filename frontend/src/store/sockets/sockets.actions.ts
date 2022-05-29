import {
    ClientToServerPayloads,
    ServerToClientPayloads,
} from "sequences-types";

export enum SocketsActionTypes {
    SOCKET_SEND = "SOCKET_SEND",
    SOCKET_RECEIVE = "SOCKET_RECEIVE",
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

export type SocketsReceive = SocketsSend<ServerToClientPayloads>;

export const socketsReceive = (
    topic: string,
    payload: ServerToClientPayloads
): SocketsReceive => ({
    type: SocketsActionTypes.SOCKET_RECEIVE,
    topic,
    payload,
});
