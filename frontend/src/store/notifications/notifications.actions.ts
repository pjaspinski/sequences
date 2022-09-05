export enum NotificationsActionTypes {
    NOTIFICATION_ADD = "NOTIFICATION_ADD",
    NOTIFICATION_REMOVE = "NOTIFICATION_REMOVE",
}

export interface NotificationsAction {
    type: NotificationsActionTypes;
}

export interface NotificationsAdd extends NotificationsAction {
    payload: string;
}

export const notificationsAdd = (message: string): NotificationsAdd => ({
    type: NotificationsActionTypes.NOTIFICATION_ADD,
    payload: message,
});

export type NotificationsRemove = NotificationsAction;

export const notificationsRemove = (): NotificationsRemove => ({
    type: NotificationsActionTypes.NOTIFICATION_REMOVE,
});
