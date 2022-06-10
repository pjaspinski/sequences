import React, { useMemo, useState } from "react";
import {
    Button,
    Dropdown,
    DropdownItemProps,
    Header,
    Icon,
    Input,
    Message,
} from "semantic-ui-react";
import { PluginModel, PluginStatus, Sequence } from "sequences-types";
import "./SequenceEditor.scss";

type Props = {
    sequence: Sequence;
    plugins: PluginModel[];
};

const SequenceEditor = (props: Props) => {
    const { sequence, plugins } = props;

    const [editingName, setEditingName] = useState(false);
    const [name, setName] = useState(sequence.name);
    const [selectedAction, setSelectedAction] = useState<string | undefined>();

    const handleEditName = () => {
        setEditingName(false);
        // send it to backend
    };

    const actionOptions = useMemo(
        () =>
            plugins.reduce<DropdownItemProps[]>(
                (acc, plugin) =>
                    plugin.status === PluginStatus.RUNNING
                        ? [
                              ...acc,
                              plugin.actions.map((action) => ({
                                  text: action.name,
                                  value: `${plugin.name}-${action.name}`,
                              })),
                          ]
                        : acc,
                []
            ),
        [JSON.stringify(plugins)]
    );

    return (
        <div className="wrapper-sequence-editor">
            <Header as="h3" className="header">
                <Icon name="tasks" />
                <Header.Content>
                    <span className="title">Edit sequence:</span>
                    {editingName ? (
                        <>
                            <Input
                                className="input"
                                placeholder="Name"
                                value={name}
                                onChange={(e, { value }) => setName(value)}
                            />
                            <Button
                                className="icon-btn"
                                color="red"
                                icon="checkmark"
                                onClick={handleEditName}
                            />
                        </>
                    ) : (
                        <>
                            {name}
                            <Button
                                className="icon-btn"
                                icon="pencil"
                                onClick={() => setEditingName(true)}
                            />
                        </>
                    )}
                </Header.Content>
            </Header>

            {sequence.actions.length ? (
                <div>akcyjki</div>
            ) : (
                <Message>
                    <Message.Header>No actions added</Message.Header>
                    <p>Pick actions from the list below to add them to this sequence.</p>
                </Message>
            )}

            <div className="inline">
                <Dropdown
                    placeholder="Select action"
                    fluid
                    search
                    selection
                    options={actionOptions}
                    onChange={(e, { value }) => setSelectedAction(value as string)}
                    value={selectedAction}
                />
                <Button
                    className="add-action-btn"
                    icon
                    disabled={selectedAction === undefined}
                    labelPosition="left"
                    onClick={() => {}}
                >
                    <Icon name="add" />
                    Add action
                </Button>
            </div>
        </div>
    );
};

export default SequenceEditor;
