import React from "react";
import { Icon, Label } from "semantic-ui-react";
import { PluginStatus, PluginModel } from "sequences-types";

type Props = { status: PluginStatus };

const mapStatusToColor = (status: PluginStatus) => {
    switch (status) {
        case "DISABLED":
            return undefined;
        case "ERROR":
            return "red";
        case "RUNNING":
            return "green";
        case "LOADING":
            return "blue";
    }
};

const mapStatusToIcon = (status: PluginStatus) => {
    switch (status) {
        case "DISABLED":
            return "minus";
        case "ERROR":
            return "times";
        case "RUNNING":
            return "check";
        case "LOADING":
            return "spinner";
    }
};

const StatusBadge = (props: Props) => {
    const { status } = props;

    return (
        <Label color={mapStatusToColor(status)}>
            <Icon loading={status === "LOADING"} name={mapStatusToIcon(status)} />
            {status}
        </Label>
    );
};

export default StatusBadge;
