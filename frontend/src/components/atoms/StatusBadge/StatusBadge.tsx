import React from "react";
import { Icon, Label } from "semantic-ui-react";
import { PluginStatus } from "sequences-types";

type Props = { status: PluginStatus };

const mapStatusToColor = (status: PluginStatus) => {
    switch (status) {
        case PluginStatus.DISABLED:
            return undefined;
        case PluginStatus.ERROR:
            return "red";
        case PluginStatus.RUNNING:
            return "green";
        case PluginStatus.LOADING:
            return "blue";
    }
};

const mapStatusToIcon = (status: PluginStatus) => {
    switch (status) {
        case PluginStatus.DISABLED:
            return "minus";
        case PluginStatus.ERROR:
            return "close";
        case PluginStatus.RUNNING:
            return "check";
        case PluginStatus.LOADING:
            return "spinner";
    }
};

const StatusBadge = (props: Props) => {
    const { status } = props;

    return (
        <Label color={mapStatusToColor(status)}>
            <Icon loading={status === PluginStatus.LOADING} name={mapStatusToIcon(status)} />
            {status}
        </Label>
    );
};

export default StatusBadge;
