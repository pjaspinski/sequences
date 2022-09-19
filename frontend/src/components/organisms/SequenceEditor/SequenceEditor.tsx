import React, { useMemo, useState } from "react";
import { connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Dispatch } from "redux";
import { Button, Header, Icon, Input, Message } from "semantic-ui-react";
import { ActionsModel, Sequence, ActionSettings as ActionSettingsType } from "sequences-types";
import { sequenceUpdateInit } from "../../../store/sequences/sequences.actions";
import { RootState } from "../../../store/store";
import ActionSettings from "../ActionSettings/ActionSettings";
import ActionPicker from "./components/ActionPicker/ActionPicker";
import { transformActionToActiveAction } from "./helpers";
import styles from "./SequenceEditor.module.scss";
import cx from "classnames/bind";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Virtuoso } from "react-virtuoso";
import HeightPreservingItem from "./components/HeightPreservingItem/HeightPreservingItem";

const css = cx.bind(styles);

interface Props {
    sequence: Sequence;
    pluginsWithActions: ActionsModel[];
    updateSequence: (sequence: Partial<Omit<Sequence, "id">>, id: string) => void;
}

// which is caught by DnD and aborts dragging.
window.addEventListener("error", (e) => {
    if (
        e.message === "ResizeObserver loop completed with undelivered notifications." ||
        e.message === "ResizeObserver loop limit exceeded"
    ) {
        e.stopImmediatePropagation();
    }
});

const SequenceEditor = (props: Props) => {
    const { sequence, pluginsWithActions, updateSequence } = props;
    const navigate = useNavigate();

    const [editingName, setEditingName] = useState(false);
    const [name, setName] = useState(sequence.name);
    const [actions, setActions] = useState(sequence.actions);

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
            const action = transformActionToActiveAction(actionTemplate);
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

    const setDelay = (delay: number, id: string) => {
        const idx = actions.findIndex((a) => a.id === id);
        if (idx === -1) return;
        const action = actions[idx];
        const newActions = [...actions];
        newActions.splice(idx, 1, { ...action, delay });
        setActions(newActions);
    };

    const setSettings = (settings: ActionSettingsType, idx: number) => {
        const action = actions[idx];
        const newActions = [...actions];
        newActions.splice(idx, 1, { ...action, settings });
        setActions(newActions);
    };

    const deleteAction = (idx: number) => {
        setActions([...actions.slice(0, idx), ...actions.slice(idx + 1)]);
    };

    const onDragEnd = (result) => {
        if (!result.destination) {
            return;
        }
        if (result.source.index === result.destination.index) {
            return;
        }

        const newActions = [...actions];
        const [movedAction] = newActions.splice(result.source.index, 1);
        newActions.splice(result.destination.index, 0, movedAction);
        setActions(newActions);
    };

    return (
        <div className={css("wrapper")}>
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

            {actions.length && availableActions.length ? (
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable
                        droppableId="droppable"
                        mode="virtual"
                        renderClone={(provided, snapshot, rubric) => {
                            const index = rubric.source.index;
                            const action = actions[index];
                            const actionTemplate = availableActions.find(
                                (a) => a.id === action.templateId
                            );
                            return (
                                <ActionSettings
                                    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                                    template={actionTemplate!}
                                    provided={provided}
                                    delay={action.delay}
                                    setDelay={(newDelay: number) => setDelay(newDelay, action.id)}
                                    settings={action.settings}
                                    setSettings={(settings: ActionSettingsType) =>
                                        setSettings(settings, index)
                                    }
                                    deleteAction={() => deleteAction(index)}
                                />
                            );
                        }}
                    >
                        {(provided) => (
                            <div ref={provided.innerRef} className={css("scroll-container")}>
                                <Virtuoso
                                    components={{
                                        Item: HeightPreservingItem,
                                    }}
                                    data={actions}
                                    scrollerRef={provided.innerRef}
                                    itemContent={(idx, action) => {
                                        const actionTemplate = availableActions.find(
                                            (a) => a.id === action.templateId
                                        );
                                        return (
                                            <Draggable
                                                draggableId={action.id.toString()}
                                                index={idx}
                                                key={action.id}
                                            >
                                                {(provided) => (
                                                    <ActionSettings
                                                        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                                                        template={actionTemplate!}
                                                        provided={provided}
                                                        delay={action.delay}
                                                        setDelay={(newDelay: number) =>
                                                            setDelay(newDelay, action.id)
                                                        }
                                                        settings={action.settings}
                                                        setSettings={(
                                                            settings: ActionSettingsType
                                                        ) => setSettings(settings, idx)}
                                                        deleteAction={() => deleteAction(idx)}
                                                    />
                                                )}
                                            </Draggable>
                                        );
                                    }}
                                />
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            ) : (
                <Message className={css("msg")}>
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
        updateSequence: (sequence: Partial<Omit<Sequence, "id">>, id: string) =>
            dispatch(sequenceUpdateInit(sequence, id)),
    }),
};

export default connect(map.state, map.dispatch)(SequenceEditor);
