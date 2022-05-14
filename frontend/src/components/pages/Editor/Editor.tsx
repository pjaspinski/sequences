import React from "react";
import css from "classnames";
import "./Editor.scss";
import Sidebar from "../../organisms/Sidebar/Sidebar";

type Props = {};

const Editor = (props: Props) => {
    return (
        <div className={css("wrapper")}>
            <Sidebar />
        </div>
    );
};

export default Editor;
