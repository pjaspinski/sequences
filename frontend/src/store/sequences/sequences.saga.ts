import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { Sequence } from "sequences-types";
import createSequenceInBe from "../../fetchTasks/createSequenceInBe";
import deleteSequenceInBe from "../../fetchTasks/deleteSequenceInBe";
import fetchSequencesFromBe from "../../fetchTasks/fetchSequencesFromBe";
import playSequenceInBe from "../../fetchTasks/playout/playSequenceInBe";
import updateSequenceInBe from "../../fetchTasks/updateSequenceInBe";
import {
    SequenceCreateInit,
    sequenceCreateSuccess,
    SequenceDeleteInit,
    sequenceDeleteSuccess,
    SequencePlay,
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

function* playSequence(action: SequencePlay) {
    try {
        yield call(playSequenceInBe, action.payload.id);
    } catch (e) {
        console.error(`${action.type} failed.`);
    }
}

function* pauseSequence(action: SequencePlay) {
    try {
        yield call(playSequenceInBe, action.payload.id);
    } catch (e) {
        console.error(`${action.type} failed.`);
    }
}

function* resumeSequence(action: SequencePlay) {
    try {
        yield call(playSequenceInBe, action.payload.id);
    } catch (e) {
        console.error(`${action.type} failed.`);
    }
}

function* stopSequence(action: SequencePlay) {
    try {
        yield call(playSequenceInBe, action.payload.id);
    } catch (e) {
        console.error(`${action.type} failed.`);
    }
}

function* restartSequence(action: SequencePlay) {
    try {
        yield call(playSequenceInBe, action.payload.id);
    } catch (e) {
        console.error(`${action.type} failed.`);
    }
}

export function* sequencesSaga() {
    yield takeLatest(SequencesActionTypes.SEQUENCES_FETCH_INIT, fetchSequences);
    yield takeEvery(SequencesActionTypes.SEQUENCES_CREATE_INIT, createSequence);
    yield takeEvery(SequencesActionTypes.SEQUENCES_DELETE_INIT, deleteSequence);
    yield takeEvery(SequencesActionTypes.SEQUENCES_UPDATE_INIT, updateSequence);
    yield takeEvery(SequencesActionTypes.SEQUENCES_PLAY, playSequence);
    yield takeEvery(SequencesActionTypes.SEQUENCES_PAUSE, pauseSequence);
    yield takeEvery(SequencesActionTypes.SEQUENCES_RESUME, resumeSequence);
    yield takeEvery(SequencesActionTypes.SEQUENCES_STOP, stopSequence);
    yield takeEvery(SequencesActionTypes.SEQUENCES_RESTART, restartSequence);
}
