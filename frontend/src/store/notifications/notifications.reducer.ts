import {
    NotificationsActionTypes,
    NotificationsAdd,
    NotificationsRemove,
} from "./notifications.actions";

export interface NotificationsState {
    message: string;
}

export const notificationsInitialState = {
    message: "",
};

type NotificationsAction = NotificationsAdd | NotificationsRemove;

export const notificationsReducer = (
    state: NotificationsState = notificationsInitialState,
    action: NotificationsAction
) => {
    switch (action.type) {
        case NotificationsActionTypes.NOTIFICATION_ADD:
            return {
                message: (action as NotificationsAdd).payload,
            };
        case NotificationsActionTypes.NOTIFICATION_REMOVE:
            return {
                message: "",
            };
        default:
            return state;
    }
};
