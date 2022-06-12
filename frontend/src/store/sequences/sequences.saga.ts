import { call, put, takeLatest } from "redux-saga/effects";
import { Sequence } from "sequences-types";
import fetchSequencesFromBe from "../../fetchTasks/fetchSequencesFromBe";
import {
    SequencesActionTypes,
    SequencesFetchInit,
    sequencesFetchSuccess,
} from "./sequences.actions";

function* fetchSequences(action: SequencesFetchInit) {
    try {
        const sequences: Sequence[] = yield call(fetchSequencesFromBe);
        yield put(sequencesFetchSuccess(sequences));
    } catch (e) {
        console.error(`${action.type} failed.`);
    }
}

export function* sequencesSaga() {
    yield takeLatest(SequencesActionTypes.SEQUENCES_FETCH_INIT, fetchSequences);
}
