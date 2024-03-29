import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Header, Icon, Label, List, Segment } from "semantic-ui-react";
import { PluginModel, Sequence } from "sequences-types";
import PlayoutControls from "../PlayoutControls/PlayoutControls";
import { getDurationString } from "./helpers";
import styles from "./SequenceListItem.module.scss";
import cx from "classnames/bind";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { sequenceDeleteInit } from "../../../store/sequences/sequences.actions";
import ConfirmModal from "../ConfirmModal/ConfirmModal";
import Tooltip from "../../atoms/Tooltip/Tooltip";

const css = cx.bind(styles);

type Props = {
    sequence: Sequence;
    plugin: PluginModel;
    deleteSequence: (id: string) => void;
};

const SequenceListItem = (props: Props) => {
    const { sequence, plugin, deleteSequence } = props;

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const pluginActive = plugin.status === "RUNNING";
    return (
        <>
            <Segment cy-elem="list-item" color="red" className={css("wrapper")}>
                <Header as="h3">
                    {sequence.name}
                    <Tooltip
                        trigger={
                            <Label color={pluginActive ? undefined : "red"}>
                                <Icon name="plug" />
                                {plugin.name}
                            </Label>
                        }
                        disabled={pluginActive}
                        content={"Required plugin is not active"}
                    />
                    <Button
                        cy-role="delete"
                        icon
                        onClick={() => setShowDeleteModal(true)}
                        className={css("delete-btn")}
                        floated="right"
                    >
                        <Icon name="trash" />
                    </Button>
                    <Link to={`/editor/${sequence.id}`}>
                        <Button floated="right" disabled={plugin.status !== "RUNNING"}>
                            <Icon name="edit" />
                            Edit
                        </Button>
                    </Link>
                </Header>
                <div className={css("row")}>
                    <List>
                        <List.Item>
                            <List.Icon name="list ol" className={css("list-icon")} />
                            <List.Content>Actions: {sequence.actions.length}</List.Content>
                        </List.Item>
                        <List.Item>
                            <List.Icon name="time" />
                            <List.Content>
                                Duration: {getDurationString(sequence.actions)}
                            </List.Content>
                        </List.Item>
                    </List>
                    <PlayoutControls
                        sequence={sequence}
                        pluginActive={plugin.status === "RUNNING"}
                    />
                </div>
            </Segment>
            {showDeleteModal && (
                <ConfirmModal
                    title="Delete sequence?"
                    desc={`Are you sure you want to delete sequence ${sequence.name}?`}
                    confirmText={"Delete"}
                    onClose={() => setShowDeleteModal(false)}
                    onConfirm={() => deleteSequence(sequence.id)}
                    variant={"delete"}
                />
            )}
        </>
    );
};

const map = {
    dispatch: (dispatch: Dispatch) => ({
        deleteSequence: (id: string) => dispatch(sequenceDeleteInit(id)),
    }),
};

export default connect(undefined, map.dispatch)(SequenceListItem);
