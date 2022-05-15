import React, { useMemo } from "react";
import { Button, Dropdown, Header, Icon, Table } from "semantic-ui-react";
import "./PluginsManager.scss";
import { Plugin } from "sequences-types";

type Props = {
    plugins: Plugin[];
};

const PluginsManager = (props: Props) => {
    const { plugins } = props;
    console.log(plugins);

    const options = useMemo(
        () =>
            plugins.map((plugin) => ({
                text: plugin.name,
                value: plugin.name,
            })),
        [plugins]
    );

    return (
        <>
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
                />
                <Button icon labelPosition="left">
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
