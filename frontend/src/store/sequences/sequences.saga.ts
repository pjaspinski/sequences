import { call, put, takeLatest } from "redux-saga/effects";
import { Sequence } from "sequences-types";
import createSequenceInBe from "../../fetchTasks/createSequenceInBe";
import deleteSequenceInBe from "../../fetchTasks/deleteSequenceInBe";
import fetchSequencesFromBe from "../../fetchTasks/fetchSequencesFromBe";
import updateSequenceInBe from "../../fetchTasks/updateSequenceInBe";
import {
    SequenceCreateInit,
    sequenceCreateSuccess,
    SequenceDeleteInit,
    sequenceDeleteSuccess,
    SequencesActionTypes,
    SequencesFetchInit,
    sequencesFetchSuccess,
    SequenceUpdateInit,
    sequenceUpdateSuccess,
} from "./sequences.actions";

function* fetchSequences(action: SequencesFetchInit) {
    try {
        const sequences: Sequence[] = yield call(fetchSequencesFromBe);
        yield put(sequencesFetchSuccess(sequences));
    } catch (e) {
        console.error(`${action.type} failed.`);
    }
}

function* createSequence(action: SequenceCreateInit) {
    try {
        const sequence: Sequence = yield call(createSequenceInBe, action.payload);
        yield put(sequenceCreateSuccess(sequence));
    } catch (e) {
        console.error(`${action.type} failed.`);
    }
}

function* deleteSequence(action: SequenceDeleteInit) {
    try {
        yield call(deleteSequenceInBe, action.payload.id);
        yield put(sequenceDeleteSuccess(action.payload.id));
    } catch (e) {
        console.error(`${action.type} failed.`);
    }
}

function* updateSequence(action: SequenceUpdateInit) {
    try {
        const sequence: Sequence = yield call(
            updateSequenceInBe,
            action.payload.sequence,
            action.payload.id
        );
        yield put(sequenceUpdateSuccess(sequence));
    } catch (e) {
        console.error(`${action.type} failed.`);
    }
}

export function* sequencesSaga() {
    yield takeLatest(SequencesActionTypes.SEQUENCES_FETCH_INIT, fetchSequences);
    yield takeLatest(SequencesActionTypes.SEQUENCES_CREATE_INIT, createSequence);
    yield takeLatest(SequencesActionTypes.SEQUENCES_DELETE_INIT, deleteSequence);
    yield takeLatest(SequencesActionTypes.SEQUENCES_UPDATE_INIT, updateSequence);
}
