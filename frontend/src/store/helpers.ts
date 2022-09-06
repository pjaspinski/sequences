import { call, put } from "redux-saga/effects";
import { notificationsAdd } from "./notifications/notifications.actions";

export const analyzeResponse = function* (response: Response) {
    if (response.status !== 200) {
        const error: string = yield response.text();
        throw error;
    }
    return response.json();
};

export const safe = (saga: any, ...args: any) =>
    function* (action: any) {
        try {
            yield call(saga, ...args, action);
        } catch (err) {
            yield put(notificationsAdd(err as string));
        }
    };
