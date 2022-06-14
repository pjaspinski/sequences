import React, { useEffect, useState } from "react";
import css from "classnames";
import "./Editor.scss";
import { Button, Header, Icon, Segment } from "semantic-ui-react";
import { connect } from "react-redux";
import { RootState } from "../../../store/store";
import { Dispatch } from "redux";
import { sequencesFetchInit } from "../../../store/sequences/sequences.actions";
import { PluginModel, Sequence } from "sequences-types";
import { pluginsFetchInit } from "../../../store/plugins/plugins.actions";
import SequenceCreationModal from "../../organisms/SequenceCreationModal/SequenceCreationModal";
import SequenceListItem from "../../organisms/SequenceListItem/SequenceListItem";

type Props = {
    getSequences: () => void;
    getPlugins: () => void;
    sequences: Sequence[];
    plugins: PluginModel[];
};

const Editor = (props: Props) => {
    const { getSequences, getPlugins, sequences, plugins } = props;

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
                {sequences.map((sequence) => {
                    const plugin = plugins.find((plugin) => plugin.id === sequence.pluginId);
                    return plugin ? (
                        <SequenceListItem
                            key={`sequence-${sequence.id}`}
                            sequence={sequence}
                            plugin={plugin}
                        />
                    ) : null;
                })}
                {showCreateModal && (
                    <SequenceCreationModal onHide={() => setShowCreateModal(false)} />
                )}
            </Segment>
        </div>
    );
};

const map = {
    state: (state: RootState) => ({
        sequences: state.sequences.model,
        plugins: state.plugins.model,
    }),
    dispatch: (dispatch: Dispatch) => ({
        getSequences: () => dispatch(sequencesFetchInit()),
        getPlugins: () => dispatch(pluginsFetchInit()),
    }),
};

export default connect(map.state, map.dispatch)(Editor);
