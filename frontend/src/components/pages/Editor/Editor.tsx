import React, { useEffect } from "react";
import css from "classnames";
import "./Editor.scss";
import Sidebar from "../../organisms/Sidebar/Sidebar";
import { Segment } from "semantic-ui-react";
import SequenceEditor from "../../organisms/SequenceEditor/SequenceEditor";
import { connect } from "react-redux";
import { RootState } from "../../../store/store";
import { Dispatch } from "redux";
import { actionsFetchInit } from "../../../store/actions/actions.actions";

type Props = {
    getActions: () => void;
};

const Editor = (props: Props) => {
    const { getActions } = props;

    useEffect(() => {
        getActions();
    }, []);

    return (
        <div className={css("wrapper")}>
            <Sidebar />
            <Segment className="segment" raised>
                <SequenceEditor sequence={{ name: "Example", actions: [] }} />
            </Segment>
        </div>
    );
};

const map = {
    state: (state: RootState) => ({
        actions: state.actions.model,
    }),
    dispatch: (dispatch: Dispatch) => ({
        getActions: () => dispatch(actionsFetchInit()),
    }),
};

export default connect(map.state, map.dispatch)(Editor);
