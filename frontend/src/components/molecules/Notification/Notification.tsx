import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { notificationsRemove } from "../../../store/notifications/notifications.actions";
import { RootState } from "../../../store/store";
import cx from "classnames/bind";
import styles from "./Notification.module.scss";
import { Button } from "semantic-ui-react";

const css = cx.bind(styles);

interface Props {
    message: string;
    removeNotification: () => void;
}

const Notification = (props: Props) => {
    const { message, removeNotification } = props;
    const [timeoutId, setTimeoutId] = useState<null | NodeJS.Timeout>(null);
    const [prevMessage, setPrevMessage] = useState<string>("");

    const handleClick = () => {
        timeoutId && clearTimeout(timeoutId);
        removeNotification();
    };

    useEffect(() => {
        if (message && !timeoutId) {
            setTimeoutId(
                setTimeout(() => {
                    removeNotification();
                    setTimeoutId(null);
                }, 10000)
            );
        }
        return () => {
            timeoutId && clearTimeout(timeoutId);
        };
    });

    useEffect(() => {
        message && setPrevMessage(message);
    }, [message]);

    return (
        <div className={css("notification", !message && "hide")}>
            <div className={css("text")}>{message || prevMessage}</div>
            <Button icon="close" color="red" onClick={handleClick} />
        </div>
    );
};

const map = {
    state: (state: RootState) => ({
        message: state.notifications.message,
    }),
    dispatch: (dispatch: Dispatch) => ({
        removeNotification: () => {
            dispatch(notificationsRemove());
        },
    }),
};

export default connect(map.state, map.dispatch)(Notification);
