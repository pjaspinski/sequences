import { call, put, takeLatest } from "redux-saga/effects";
import { ActionsModel } from "sequences-types";
import fetchActionsFromBe from "../../fetchTasks/fetchActionsFromBe";
import { ActionsActionTypes, ActionsFetchInit, actionsFetchSuccess } from "./actions.actions";

function* fetchPlugins(action: ActionsFetchInit) {
    try {
        const actions: ActionsModel[] = yield call(fetchActionsFromBe);
        yield put(actionsFetchSuccess(actions));
    } catch (e) {
        console.error(`${action.type} failed.`);
    }
}

export function* actionsSaga() {
    yield takeLatest(ActionsActionTypes.ACTIONS_FETCH_INIT, fetchPlugins);
}
