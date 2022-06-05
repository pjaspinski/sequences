import React, { useState } from "react";
import { Button, Header, Icon, Input } from "semantic-ui-react";
import "./SequenceEditor.scss";

type Props = {
    sequence: any;
};

const SequenceEditor = (props: Props) => {
    const { sequence } = props;

    const [editingName, setEditingName] = useState(false);
    const [name, setName] = useState(sequence.name);

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

            <Button icon labelPosition="left">
                <Icon name="add" />
                Add action
            </Button>
        </div>
    );
};

export default SequenceEditor;
