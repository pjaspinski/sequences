import { Sequence } from "sequences-types";

export enum SequencesActionTypes {
    SEQUENCES_FETCH_INIT = "SEQUENCES_FETCH_INIT",
    SEQUENCES_FETCH_SUCCESS = "SEQUENCES_FETCH_SUCCESS",
    SEQUENCES_CREATE_INIT = "SEQUENCES_CREATE_INIT",
    SEQUENCES_CREATE_SUCCESS = "SEQUENCES_CREATE_SUCCESS",
    SEQUENCES_DELETE_INIT = "SEQUENCES_DELETE_INIT",
    SEQUENCES_DELETE_SUCCESS = "SEQUENCES_DELETE_SUCCESS",
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
