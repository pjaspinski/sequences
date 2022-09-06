import { call, put, takeLatest } from "redux-saga/effects";
import { ActionsModel } from "sequences-types";
import fetchActionsFromBe from "../../fetchTasks/fetchActionsFromBe";
import { ActionsActionTypes, ActionsFetchInit, actionsFetchSuccess } from "./actions.actions";
import { safe } from "../helpers";
import { loadersSetIsFetchingActions } from "../loaders/loaders.actions";

function* fetchActions(action: ActionsFetchInit) {
    yield put(loadersSetIsFetchingActions(true));
    const actions: ActionsModel[] = yield call(fetchActionsFromBe);
    yield put(actionsFetchSuccess(actions));
    yield put(loadersSetIsFetchingActions(false));
}

export function* actionsSaga() {
    yield takeLatest(ActionsActionTypes.ACTIONS_FETCH_INIT, safe(fetchActions));
}
