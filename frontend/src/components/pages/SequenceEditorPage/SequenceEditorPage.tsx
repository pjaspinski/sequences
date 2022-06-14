import React, { useEffect } from "react";
import css from "classnames";
import { connect } from "react-redux";
import { RootState } from "../../../store/store";
import { Dispatch } from "redux";
import { sequencesFetchInit } from "../../../store/sequences/sequences.actions";
import { Sequence } from "sequences-types";
import { pluginsFetchInit } from "../../../store/plugins/plugins.actions";
import SequenceEditor from "../../organisms/SequenceEditor/SequenceEditor";
import { useParams } from "react-router-dom";
import { Segment } from "semantic-ui-react";
import { actionsFetchInit } from "../../../store/actions/actions.actions";

type Props = {
    getSequences: () => void;
    getPlugins: () => void;
    getActions: () => void;
    sequences: Sequence[];
};

const SequenceEditorPage = (props: Props) => {
    const { getSequences, getPlugins, getActions, sequences } = props;

    const { id } = useParams();

    useEffect(() => {
        getSequences();
        getPlugins();
        getActions();
    }, []);

    const sequence =
        id !== undefined ? sequences.find((sequence) => sequence.id === parseInt(id)) : undefined;

    return (
        <div className={css("wrapper")}>
            <Segment className="segment" raised>
                {sequence && <SequenceEditor sequence={sequence} />}
            </Segment>
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
        getActions: () => dispatch(actionsFetchInit()),
    }),
};

export default connect(map.state, map.dispatch)(SequenceEditorPage);
