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
import { PluginStatus } from "sequences-types";
import { PluginModel } from "sequences-types";
import StatusBadge from "../../atoms/StatusBadge/StatusBadge";
import styles from "./PluginsManager.module.scss";
import cx from "classnames/bind";

const css = cx.bind(styles);

type Props = {
    plugins: PluginModel[];
};

const PluginsManager = (props: Props) => {
    const { plugins } = props;
    const [settingsModal, setSettingsModal] = useState<ReactElement | null>();
    const [selectedPlugin, setSelectedPlugin] = useState<number | undefined>();

    const options = useMemo(
        () =>
            plugins.reduce<DropdownItemProps[]>(
                (acc, plugin) =>
                    plugin.status === PluginStatus.DISABLED
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
        () => plugins.filter((plugin) => plugin.status !== PluginStatus.DISABLED),
        [JSON.stringify(plugins)]
    );

    const showSettingsModal = () => {
        if (selectedPlugin !== undefined) {
            const plugin = plugins.find((plugin) => plugin.id === selectedPlugin);
            plugin &&
                setSettingsModal(
                    <PluginSettingsModal
                        name={plugin.name}
                        inputs={plugin.settingsInputs}
                        onHide={() => setSettingsModal(null)}
                        mode={Mode.EDIT}
                        pluginId={plugin.id}
                    ></PluginSettingsModal>
                );
        }
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
                    onClick={showSettingsModal}
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
                                <Table.Cell textAlign="right">Nothing here for now :)</Table.Cell>
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

export default PluginsManager;
