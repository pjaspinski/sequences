import React, { ReactElement, useMemo, useState } from "react";
import { Button, Dropdown, Header, Icon, Table } from "semantic-ui-react";
import "./PluginsManager.scss";
import { Plugin } from "sequences-types";
import PluginSettingsModal, {
    Mode,
} from "../PluginSettingsModal/PluginSettingsModal";

type Props = {
    plugins: Plugin[];
};

const PluginsManager = (props: Props) => {
    const { plugins } = props;
    const [settingsModal, setSettingsModal] = useState<ReactElement | null>();
    const [selectedPlugin, setSelectedPlugin] = useState<number | undefined>();

    const options = useMemo(
        () =>
            plugins.map((plugin) => ({
                text: plugin.name,
                value: plugin.id,
            })),
        [plugins]
    );

    const showSettingsModal = () => {
        if (selectedPlugin !== undefined) {
            const plugin = plugins.find(
                (plugin) => plugin.id === selectedPlugin
            );
            plugin &&
                setSettingsModal(
                    <PluginSettingsModal
                        name={plugin.name}
                        inputs={plugin.settingsFields}
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
                    onChange={(e, { value }) =>
                        setSelectedPlugin(value as number)
                    }
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
                    <Table.Row>
                        <Table.Cell>Cell</Table.Cell>
                        <Table.Cell>Cell</Table.Cell>
                        <Table.Cell>Cell</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>Cell</Table.Cell>
                        <Table.Cell>Cell</Table.Cell>
                        <Table.Cell>Cell</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>Cell</Table.Cell>
                        <Table.Cell>Cell</Table.Cell>
                        <Table.Cell>Cell</Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table>
        </>
    );
};

export default PluginsManager;
