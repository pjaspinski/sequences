import { call, put, takeLatest } from "redux-saga/effects";
import { ActionsModel } from "sequences-types";
import fetchActionsFromBe from "../../fetchTasks/fetchActionsFromBe";
import { ActionsActionTypes, ActionsFetchInit, actionsFetchSuccess } from "./actions.actions";
import { safe } from "../helpers";

function* fetchPlugins(action: ActionsFetchInit) {
    const actions: ActionsModel[] = yield call(fetchActionsFromBe);
    yield put(actionsFetchSuccess(actions));
}

export function* actionsSaga() {
    yield takeLatest(ActionsActionTypes.ACTIONS_FETCH_INIT, safe(fetchPlugins));
}
