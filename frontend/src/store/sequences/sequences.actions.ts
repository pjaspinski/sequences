import { Sequence } from "sequences-types";

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
    payload: { id: number };
}

export const sequenceDeleteInit = (id: number): SequenceDeleteInit => ({
    type: SequencesActionTypes.SEQUENCES_DELETE_INIT,
    payload: { id },
});

export interface SequenceDeleteSuccess extends SequencesAction {
    type: SequencesActionTypes.SEQUENCES_DELETE_SUCCESS;
    payload: { id: number };
}

export const sequenceDeleteSuccess = (id: number): SequenceDeleteSuccess => ({
    type: SequencesActionTypes.SEQUENCES_DELETE_SUCCESS,
    payload: { id },
});

export interface SequenceUpdateInit extends SequencesAction {
    type: SequencesActionTypes.SEQUENCES_UPDATE_INIT;
    payload: { sequence: Partial<Omit<Sequence, "id">>; id: number };
}

export const sequenceUpdateInit = (
    sequence: Partial<Omit<Sequence, "id">>,
    id: number
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

export interface SequencePlay extends SequencesAction {
    type: SequencesActionTypes.SEQUENCES_PLAY;
    payload: { id: number };
}

export const sequencePlay = (id: number): SequencePlay => ({
    type: SequencesActionTypes.SEQUENCES_PLAY,
    payload: { id },
});
