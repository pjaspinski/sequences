import React, { useEffect, useState } from "react";
import css from "classnames";
import "./Editor.scss";
import { Button, Header, Icon, Segment } from "semantic-ui-react";
import SequenceEditor from "../../organisms/SequenceEditor/SequenceEditor";
import { connect } from "react-redux";
import { RootState } from "../../../store/store";
import { Dispatch } from "redux";
import { sequencesFetchInit } from "../../../store/sequences/sequences.actions";
import { Sequence } from "sequences-types";
import { pluginsFetchInit } from "../../../store/plugins/plugins.actions";
import SequenceCreationModal from "../../organisms/SequenceCreationModal/SequenceCreationModal";

type Props = {
    getSequences: () => void;
    getPlugins: () => void;
    sequences: Sequence[];
};

const Editor = (props: Props) => {
    const { getSequences, getPlugins, sequences } = props;

    const [showCreateModal, setShowCreateModal] = useState(false);

    useEffect(() => {
        getSequences();
        getPlugins();
    }, []);

    return (
        <div className={css("wrapper")}>
            <Segment className="segment" raised>
                <Header as="h3">
                    <Icon name="tasks" />
                    <Header.Content className="header-content">
                        <div className="title">Sequences</div>
                        <Button
                            onClick={() => setShowCreateModal(true)}
                            color="red"
                            floated="right"
                        >
                            <Icon name="add" />
                            Create sequence
                        </Button>
                    </Header.Content>
                </Header>
            </Segment>
            {showCreateModal && (
                <SequenceCreationModal onHide={() => setShowCreateModal(false)} onSave={() => {}} />
            )}
            {/* <Segment className="segment" raised>
                <SequenceEditor sequence={{ name: "Example", actions: [] }} />
            </Segment> */}
        </div>
    );
};

const map = {
    state: (state: RootState) => ({
        sequences: state.sequences.model,
    }),
    dispatch: (dispatch: Dispatch) => ({
        getSequences: () => dispatch(sequencesFetchInit()),
        getPlugins: () => dispatch(pluginsFetchInit()),
    }),
};

export default connect(map.state, map.dispatch)(Editor);
