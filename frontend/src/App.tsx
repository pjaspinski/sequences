import React from "react";
import logo from "./logo.svg";
import "./App.scss";
import css from "classnames";
import Layout from "./components/Layout";
import { Routes, Route, Navigate } from "react-router-dom";

function App() {
    const test: TestType = "test1";
    return (
        <div className="App">
            {test}
            <Layout>
                <Routes>
                    <Route
                        path="/"
                        element={<Navigate to="/editor" replace={true} />}
                    />
                    <Route path="/editor" element={<div />} />
                    <Route path="/settings" element={<div />} />
                </Routes>
            </Layout>
        </div>
    );
}

export default App;
