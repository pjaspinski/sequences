export interface SocketComms {
    emit: (topic: string, payload: any) => void;
}
