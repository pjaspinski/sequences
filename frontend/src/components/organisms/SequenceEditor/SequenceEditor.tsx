import React, { useMemo, useState } from "react";
import { connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Dispatch } from "redux";
import { Button, Header, Icon, Input, Message } from "semantic-ui-react";
import { ActionsModel, Sequence, ActionSettings as ActionSettingsType } from "sequences-types";
import { sequenceUpdateInit } from "../../../store/sequences/sequences.actions";
import { RootState } from "../../../store/store";
import ActionSettings from "../ActionSettings/ActionSettings";
import ActionPicker from "./components/ActionPicker";
import { transformActionToActiveAction } from "./helpers";
import styles from "./SequenceEditor.module.scss";
import cx from "classnames/bind";

const css = cx.bind(styles);

type Props = {
    sequence: Sequence;
    pluginsWithActions: ActionsModel[];
    updateSequence: (sequence: Partial<Omit<Sequence, "id">>, id: number) => void;
};

const SequenceEditor = (props: Props) => {
    const { sequence, pluginsWithActions, updateSequence } = props;
    const navigate = useNavigate();

    const [editingName, setEditingName] = useState(false);
    const [name, setName] = useState(sequence.name);
    const [actions, setActions] = useState(sequence.actions);
    const [nextId, setNextId] = useState(sequence.actions.length);

    const handleEditName = () => {
        setEditingName(false);
        // send it to backend
    };

    const availableActions = useMemo(() => {
        return pluginsWithActions[sequence.pluginId]?.actions || [];
    }, [pluginsWithActions, sequence.pluginId]);

    const addAction = (id: number) => {
        const actionTemplate = availableActions.find((a) => a.id === id);
        if (actionTemplate) {
            const action = transformActionToActiveAction(actionTemplate, nextId);
            setNextId(nextId + 1);
            setActions([...actions, action]);
        }
    };

    const handleSave = () => {
        const updatedSequence = {
            name,
            actions,
        };
        updateSequence(updatedSequence, sequence.id);
        navigate("/editor");
    };

    const setDelay = (delay: number, id: number) => {
        const action = actions.find((a) => a.id === id);
        action && setActions([...actions.filter((a) => a.id !== id), { ...action, delay }]);
    };

    const setSettings = (settings: ActionSettingsType, id: number) => {
        const action = actions.find((a) => a.id === id);
        action && setActions([...actions.filter((a) => a.id !== id), { ...action, settings }]);
    };

    return (
        <div>
            <Header as="h3" className={css("header")}>
                <Icon name="tasks" />
                <Header.Content className={css("content")}>
                    <span className={css("title")}>Edit sequence:</span>
                    {editingName ? (
                        <>
                            <Input
                                className={css("input")}
                                placeholder="Name"
                                value={name}
                                onChange={(e, { value }) => setName(value)}
                            />
                            <Button
                                className={css("icon-btn")}
                                color="red"
                                icon="checkmark"
                                onClick={handleEditName}
                            />
                        </>
                    ) : (
                        <>
                            {name}
                            <Button
                                className={css("icon-btn")}
                                icon="pencil"
                                onClick={() => setEditingName(true)}
                            />
                        </>
                    )}
                    <Link to="/editor">
                        <Button floated="right">Cancel</Button>
                    </Link>
                    <Button
                        className={css("save-btn")}
                        floated="right"
                        onClick={handleSave}
                        color="red"
                    >
                        <Icon name="checkmark" />
                        Save
                    </Button>
                </Header.Content>
            </Header>

            {actions.length ? (
                actions
                    .sort((a, b) => a.id - b.id)
                    .map((action) => {
                        const actionTemplate = availableActions.find(
                            (a) => a.id === action.templateId
                        );
                        return actionTemplate ? (
                            <ActionSettings
                                template={actionTemplate}
                                delay={action.delay}
                                setDelay={(newDelay: number) => setDelay(newDelay, action.id)}
                                settings={action.settings}
                                setSettings={(settings: ActionSettingsType) =>
                                    setSettings(settings, action.id)
                                }
                            />
                        ) : null;
                    })
            ) : (
                <Message>
                    <Message.Header>No actions added</Message.Header>
                    <p>Pick actions from the list below to add them to this sequence.</p>
                </Message>
            )}
            <ActionPicker actions={availableActions} onSave={addAction} />
        </div>
    );
};

const map = {
    state: (state: RootState) => ({
        pluginsWithActions: state.actions.model,
    }),
    dispatch: (dispatch: Dispatch) => ({
        updateSequence: (sequence: Partial<Omit<Sequence, "id">>, id: number) =>
            dispatch(sequenceUpdateInit(sequence, id)),
    }),
};

export default connect(map.state, map.dispatch)(SequenceEditor);
