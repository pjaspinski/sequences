import React from "react";
import css from "classnames";
import "./Editor.scss";
import Sidebar from "../../organisms/Sidebar/Sidebar";
import { Segment } from "semantic-ui-react";
import SequenceEditor from "../../organisms/SequenceEditor/SequenceEditor";
import { connect } from "react-redux";
import { RootState } from "../../../store/store";
import { Dispatch } from "redux";
import { PluginModel } from "sequences-types";

type Props = {
    plugins: PluginModel[];
};

const Editor = (props: Props) => {
    const { plugins } = props;

    return (
        <div className={css("wrapper")}>
            <Sidebar />
            <Segment className="segment" raised>
                <SequenceEditor sequence={{ name: "Example", actions: [] }} plugins={plugins} />
            </Segment>
        </div>
    );
};

const map = {
    state: (state: RootState) => ({
        plugins: state.plugins.model,
    }),
    dispatch: (dispatch: Dispatch) => ({}),
};

export default connect(map.state, map.dispatch)(Editor);
