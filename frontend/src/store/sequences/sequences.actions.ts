import { PlayoutStatus, Sequence } from "sequences-types";

export enum SequencesActionTypes {
    SEQUENCES_FETCH_INIT = "SEQUENCES_FETCH_INIT",
    SEQUENCES_FETCH_SUCCESS = "SEQUENCES_FETCH_SUCCESS",
    SEQUENCES_CREATE_INIT = "SEQUENCES_CREATE_INIT",
    SEQUENCES_CREATE_SUCCESS = "SEQUENCES_CREATE_SUCCESS",
    SEQUENCES_DELETE_INIT = "SEQUENCES_DELETE_INIT",
    SEQUENCES_DELETE_SUCCESS = "SEQUENCES_DELETE_SUCCESS",
    SEQUENCES_UPDATE_INIT = "SEQUENCES_UPDATE_INIT",
    SEQUENCES_UPDATE_SUCCESS = "SEQUENCES_UPDATE_SUCCESS",
    SEQUENCES_PLAY = "SEQUENCES_PLAY",
    SEQUENCES_PAUSE = "SEQUENCES_PAUSE",
    SEQUENCES_RESUME = "SEQUENCES_RESUME",
    SEQUENCES_STOP = "SEQUENCES_STOP",
    SEQUENCES_RESTART = "SEQUENCES_RESTART",
    SEQUENCES_UPDATE_STATUS = "SEQUENCES_UPDATE_STATUS",
}

export interface SequencesAction {
    type: SequencesActionTypes;
}

export interface SequencesFetchInit extends SequencesAction {
    type: SequencesActionTypes.SEQUENCES_FETCH_INIT;
}

export const sequencesFetchInit = (): SequencesFetchInit => ({
    type: SequencesActionTypes.SEQUENCES_FETCH_INIT,
});

export interface SequencesFetchSuccess extends SequencesAction {
    type: SequencesActionTypes.SEQUENCES_FETCH_SUCCESS;
    payload: Sequence[];
}

export const sequencesFetchSuccess = (sequences: Sequence[]): SequencesFetchSuccess => ({
    type: SequencesActionTypes.SEQUENCES_FETCH_SUCCESS,
    payload: sequences,
});

export interface SequenceCreateInit extends SequencesAction {
    type: SequencesActionTypes.SEQUENCES_CREATE_INIT;
    payload: { pluginId: number; name: string };
}

export const sequenceCreateInit = (pluginId: number, name: string): SequenceCreateInit => ({
    type: SequencesActionTypes.SEQUENCES_CREATE_INIT,
    payload: { pluginId, name },
});

export interface SequenceCreateSuccess extends SequencesAction {
    type: SequencesActionTypes.SEQUENCES_CREATE_SUCCESS;
    payload: Sequence;
}

export const sequenceCreateSuccess = (sequence: Sequence): SequenceCreateSuccess => ({
    type: SequencesActionTypes.SEQUENCES_CREATE_SUCCESS,
    payload: sequence,
});

export interface SequenceDeleteInit extends SequencesAction {
    type: SequencesActionTypes.SEQUENCES_DELETE_INIT;
    payload: { id: string };
}

export const sequenceDeleteInit = (id: string): SequenceDeleteInit => ({
    type: SequencesActionTypes.SEQUENCES_DELETE_INIT,
    payload: { id },
});

export interface SequenceDeleteSuccess extends SequencesAction {
    type: SequencesActionTypes.SEQUENCES_DELETE_SUCCESS;
    payload: { id: string };
}

export const sequenceDeleteSuccess = (id: string): SequenceDeleteSuccess => ({
    type: SequencesActionTypes.SEQUENCES_DELETE_SUCCESS,
    payload: { id },
});

export interface SequenceUpdateInit extends SequencesAction {
    type: SequencesActionTypes.SEQUENCES_UPDATE_INIT;
    payload: { sequence: Partial<Omit<Sequence, "id">>; id: string };
}

export const sequenceUpdateInit = (
    sequence: Partial<Omit<Sequence, "id">>,
    id: string
): SequenceUpdateInit => ({
    type: SequencesActionTypes.SEQUENCES_UPDATE_INIT,
    payload: { sequence, id },
});

export interface SequenceUpdateSuccess extends SequencesAction {
    type: SequencesActionTypes.SEQUENCES_UPDATE_SUCCESS;
    payload: Sequence;
}

export const sequenceUpdateSuccess = (sequence: Sequence): SequenceUpdateSuccess => ({
    type: SequencesActionTypes.SEQUENCES_UPDATE_SUCCESS,
    payload: sequence,
});

export interface SequencePlayoutPayload {
    id: string;
}

export interface SequencePlay extends SequencesAction {
    type: SequencesActionTypes.SEQUENCES_PLAY;
    payload: SequencePlayoutPayload;
}

export const sequencePlay = (id: string): SequencePlay => ({
    type: SequencesActionTypes.SEQUENCES_PLAY,
    payload: { id },
});

export interface SequencePause extends SequencesAction {
    type: SequencesActionTypes.SEQUENCES_PAUSE;
    payload: SequencePlayoutPayload;
}

export const sequencePause = (id: string): SequencePause => ({
    type: SequencesActionTypes.SEQUENCES_PAUSE,
    payload: { id },
});

export interface SequenceResume extends SequencesAction {
    type: SequencesActionTypes.SEQUENCES_RESUME;
    payload: SequencePlayoutPayload;
}

export const sequenceResume = (id: string): SequenceResume => ({
    type: SequencesActionTypes.SEQUENCES_RESUME,
    payload: { id },
});

export interface SequenceStop extends SequencesAction {
    type: SequencesActionTypes.SEQUENCES_STOP;
    payload: SequencePlayoutPayload;
}

export const sequenceStop = (id: string): SequenceStop => ({
    type: SequencesActionTypes.SEQUENCES_STOP,
    payload: { id },
});

export interface SequenceRestart extends SequencesAction {
    type: SequencesActionTypes.SEQUENCES_RESTART;
    payload: SequencePlayoutPayload;
}

export const sequenceRestart = (id: string): SequenceRestart => ({
    type: SequencesActionTypes.SEQUENCES_RESTART,
    payload: { id },
});

export interface SequenceUpdateStatusPayload {
    id: string;
    status: PlayoutStatus;
}
export interface SequenceUpdateStatus extends SequencesAction {
    type: SequencesActionTypes.SEQUENCES_UPDATE_STATUS;
    payload: SequenceUpdateStatusPayload;
}

export const sequenceUpdateStatus = (
    payload: SequenceUpdateStatusPayload
): SequenceUpdateStatus => ({
    type: SequencesActionTypes.SEQUENCES_UPDATE_STATUS,
    payload,
});
