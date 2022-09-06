import React from "react";
import "./App.module.scss";
import "./App.scss";
import Layout from "./components/layout/Layout";
import { Routes, Route, Navigate } from "react-router-dom";
import Editor from "./components/pages/Editor/Editor";
import Settings from "./components/pages/Settings/Settings";
import SequenceEditorPage from "./components/pages/SequenceEditorPage/SequenceEditorPage";
import Notification from "./components/molecules/Notification/Notification";
import { Dimmer, Loader } from "semantic-ui-react";
import { Dispatch } from "redux";
import { RootState } from "./store/store";
import { connect } from "react-redux";

interface Props {
    loader: boolean;
}

function App(props: Props) {
    const { loader } = props;

    return (
        <div className="app">
            <Layout>
                <Routes>
                    <Route path="/" element={<Navigate to="/editor" replace={true} />} />
                    <Route path="/editor" element={<Editor />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/editor/:id" element={<SequenceEditorPage />} />
                </Routes>
            </Layout>
            <Notification />
            <Dimmer active={loader}>
                <Loader />
            </Dimmer>
        </div>
    );
}

const map = {
    state: (state: RootState) => ({
        loader:
            state.loaders.isFetchingActions ||
            state.loaders.isFetchingPlugins ||
            state.loaders.isFetchingSequences,
    }),
    dispatch: (dispatch: Dispatch) => ({}),
};

export default connect(map.state, map.dispatch)(App);
