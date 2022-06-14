import React from "react";
import "./App.scss";
import Layout from "./components/layout/Layout";
import { Routes, Route, Navigate } from "react-router-dom";
import Editor from "./components/pages/Editor/Editor";
import Settings from "./components/pages/Settings/Settings";
import SequenceEditorPage from "./components/pages/SequenceEditorPage/SequenceEditorPage";

function App() {
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
        </div>
    );
}

export default App;
