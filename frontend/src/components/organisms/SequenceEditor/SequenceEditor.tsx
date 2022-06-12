import React, { useState } from "react";
import { Button, Header, Icon, Input, Message } from "semantic-ui-react";
import { Sequence } from "sequences-types";
import ActionPicker from "./components/ActionPicker";
import "./SequenceEditor.scss";

type Props = {
    sequence: Sequence;
};

const SequenceEditor = (props: Props) => {
    const { sequence } = props;

    const [editingName, setEditingName] = useState(false);
    const [name, setName] = useState(sequence.name);
    const [selectedAction, setSelectedAction] = useState<string | undefined>();

    const handleEditName = () => {
        setEditingName(false);
        // send it to backend
    };

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
            <ActionPicker selectedAction={selectedAction} setSelectedAction={setSelectedAction} />
        </div>
    );
};

export default SequenceEditor;
