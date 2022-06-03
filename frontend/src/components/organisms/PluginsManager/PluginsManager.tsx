import React, { ReactElement, useMemo, useState } from "react";
import { Button, Dropdown, DropdownItemProps, Header, Icon, Table } from "semantic-ui-react";
import "./PluginsManager.scss";
import PluginSettingsModal, { Mode } from "../PluginSettingsModal/PluginSettingsModal";
import { Plugin } from "../../../store/plugins/interfaces";
import { PluginStatus } from "sequences-types";

type Props = {
    plugins: Plugin[];
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
        [plugins]
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
            <div className="inline">
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
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Status</Table.HeaderCell>
                        <Table.HeaderCell>Actions</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {plugins.map(
                        (plugin, idx) =>
                            plugin.status !== PluginStatus.DISABLED && (
                                <Table.Row key={`plugin-row-${idx}`}>
                                    <Table.Cell>{plugin.name}</Table.Cell>
                                    <Table.Cell>{plugin.status}</Table.Cell>
                                    <Table.Cell>Nothing here for now :)</Table.Cell>
                                </Table.Row>
                            )
                    )}
                </Table.Body>
            </Table>
        </>
    );
};

export default PluginsManager;
