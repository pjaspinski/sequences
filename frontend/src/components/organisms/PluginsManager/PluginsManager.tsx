import React, { ReactElement, useMemo, useState } from "react";
import {
    Button,
    Dropdown,
    DropdownItemProps,
    Header,
    Icon,
    Message,
    Table,
} from "semantic-ui-react";
import PluginSettingsModal, { Mode } from "../PluginSettingsModal/PluginSettingsModal";
import { PluginModel } from "sequences-types";
import StatusBadge from "../../atoms/StatusBadge/StatusBadge";
import styles from "./PluginsManager.module.scss";
import cx from "classnames/bind";
import { Dispatch } from "redux";
import {
    removePlugin as removePluginAction,
    stopPlugin as stopPluginAction,
} from "../../../store/plugins/plugins.actions";
import { connect } from "react-redux";

const css = cx.bind(styles);

interface Props {
    plugins: PluginModel[];
    stopPlugin: (pluginId: number) => void;
    removePlugin: (pluginId: number) => void;
}

const PluginsManager = (props: Props) => {
    const { plugins, stopPlugin, removePlugin } = props;
    const [settingsModal, setSettingsModal] = useState<ReactElement | null>();
    const [selectedPlugin, setSelectedPlugin] = useState<number | undefined>();

    const options = useMemo(
        () =>
            plugins.reduce<DropdownItemProps[]>(
                (acc, plugin) =>
                    plugin.status === "REMOVED"
                        ? [
                              ...acc,
                              {
                                  text: plugin.name,
                                  value: plugin.id,
                              },
                          ]
                        : acc,
                []
            ),
        [JSON.stringify(plugins)]
    );

    const enabledPlugins = useMemo(
        () => plugins.filter((plugin) => plugin.status !== "REMOVED"),
        [JSON.stringify(plugins)]
    );

    const showSettingsModal = (mode?: Mode, pluginId?: number) => {
        const realPluginId = pluginId !== undefined ? pluginId : selectedPlugin;
        const plugin = plugins.find((plugin) => plugin.id === realPluginId);
        plugin &&
            setSettingsModal(
                <PluginSettingsModal
                    name={plugin.name}
                    inputs={plugin.settingsInputs}
                    onHide={() => setSettingsModal(null)}
                    mode={mode || Mode.SETUP}
                    pluginId={plugin.id}
                ></PluginSettingsModal>
            );
    };

    return (
        <>
            {settingsModal}
            <Header as="h3">
                <Icon name="plug" />
                <Header.Content>Plugins Manager</Header.Content>
            </Header>
            <div className={css("inline")}>
                <Dropdown
                    placeholder="Select plugin"
                    fluid
                    search
                    selection
                    options={options}
                    onChange={(e, { value }) => setSelectedPlugin(value as number)}
                    value={selectedPlugin}
                />
                <Button
                    icon
                    disabled={selectedPlugin === undefined}
                    labelPosition="left"
                    onClick={() => showSettingsModal()}
                >
                    <Icon name="add" />
                    Add
                </Button>
            </div>
            {enabledPlugins.length ? (
                <Table>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell textAlign="center" width={3}>
                                Status
                            </Table.HeaderCell>
                            <Table.HeaderCell textAlign="right" width={5}>
                                Actions
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {enabledPlugins.map((plugin, idx) => (
                            <Table.Row key={`plugin-row-${idx}`}>
                                <Table.Cell>{plugin.name}</Table.Cell>
                                <Table.Cell textAlign="center">
                                    <StatusBadge status={plugin.status} />
                                </Table.Cell>
                                <Table.Cell className={css("actions")}>
                                    {["RUNNING", "LOADING"].includes(plugin.status) && (
                                        <Button
                                            basic
                                            labelPosition="left"
                                            onClick={() => stopPlugin(plugin.id)}
                                        >
                                            Stop
                                        </Button>
                                    )}
                                    <Button
                                        basic
                                        labelPosition="left"
                                        onClick={() =>
                                            showSettingsModal(
                                                plugin.status === "DISABLED"
                                                    ? Mode.SETUP
                                                    : Mode.EDIT,
                                                plugin.id
                                            )
                                        }
                                    >
                                        {plugin.status === "DISABLED" ? "Start" : "Restart"}
                                    </Button>
                                    {["DISABLED", "ERROR"].includes(plugin.status) && (
                                        <Button
                                            basic
                                            labelPosition="left"
                                            onClick={() => removePlugin(plugin.id)}
                                        >
                                            Remove
                                        </Button>
                                    )}
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            ) : (
                <Message>
                    <Message.Header>No plugins enabled</Message.Header>
                    <p>
                        Pick plugins from the list above and set them up to use in your sequences.
                    </p>
                </Message>
            )}
        </>
    );
};

const map = {
    dispatch: (dispatch: Dispatch) => ({
        stopPlugin: (pluginId: number) => dispatch(stopPluginAction(pluginId)),
        removePlugin: (pluginId: number) => dispatch(removePluginAction(pluginId)),
    }),
};

export default connect(undefined, map.dispatch)(PluginsManager);
