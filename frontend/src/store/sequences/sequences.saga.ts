import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { Sequence } from "sequences-types";
import createSequenceInBe from "../../fetchTasks/sequences/createSequenceInBe";
import pauseSequenceInBe from "../../fetchTasks/playout/pauseSequenceInBe";
import playSequenceInBe from "../../fetchTasks/playout/playSequenceInBe";
import restartSequenceInBe from "../../fetchTasks/playout/restartSequenceInBe";
import resumeSequenceInBe from "../../fetchTasks/playout/resumeSequenceInBe";
import stopSequenceInBe from "../../fetchTasks/playout/stopSequenceInBe";
import { safe } from "../helpers";
import { loadersSetIsFetchingSequences } from "../loaders/loaders.actions";
import {
    SequenceCreateInit,
    SequenceDeleteInit,
    SequencePlay,
    SequencesActionTypes,
    sequencesFetchSuccess,
    SequenceUpdateInit,
} from "./sequences.actions";
import fetchSequencesFromBe from "../../fetchTasks/sequences/fetchSequencesFromBe";
import deleteSequenceInBe from "../../fetchTasks/sequences/deleteSequenceInBe";
import updateSequenceInBe from "../../fetchTasks/sequences/updateSequenceInBe";

function* fetchSequences() {
    yield put(loadersSetIsFetchingSequences(true));
    const sequences: Sequence[] = yield call(fetchSequencesFromBe);
    yield put(sequencesFetchSuccess(sequences));
    yield put(loadersSetIsFetchingSequences(false));
}

function* createSequence(action: SequenceCreateInit) {
    yield call(createSequenceInBe, action.payload);
}

function* deleteSequence(action: SequenceDeleteInit) {
    yield call(deleteSequenceInBe, action.payload.id);
}

function* updateSequence(action: SequenceUpdateInit) {
    yield call(updateSequenceInBe, action.payload.sequence, action.payload.id);
}

function* playSequence(action: SequencePlay) {
    yield call(playSequenceInBe, action.payload.id);
}

function* pauseSequence(action: SequencePlay) {
    yield call(pauseSequenceInBe, action.payload.id);
}

function* resumeSequence(action: SequencePlay) {
    yield call(resumeSequenceInBe, action.payload.id);
}

function* stopSequence(action: SequencePlay) {
    yield call(stopSequenceInBe, action.payload.id);
}

function* restartSequence(action: SequencePlay) {
    yield call(restartSequenceInBe, action.payload.id);
}

export function* sequencesSaga() {
    yield takeLatest(SequencesActionTypes.SEQUENCES_FETCH_INIT, safe(fetchSequences));
    yield takeEvery(SequencesActionTypes.SEQUENCES_CREATE_INIT, safe(createSequence));
    yield takeEvery(SequencesActionTypes.SEQUENCES_DELETE_INIT, safe(deleteSequence));
    yield takeEvery(SequencesActionTypes.SEQUENCES_UPDATE_INIT, safe(updateSequence));
    yield takeEvery(SequencesActionTypes.SEQUENCES_PLAY, safe(playSequence));
    yield takeEvery(SequencesActionTypes.SEQUENCES_PAUSE, safe(pauseSequence));
    yield takeEvery(SequencesActionTypes.SEQUENCES_RESUME, safe(resumeSequence));
    yield takeEvery(SequencesActionTypes.SEQUENCES_STOP, safe(stopSequence));
    yield takeEvery(SequencesActionTypes.SEQUENCES_RESTART, safe(restartSequence));
}
