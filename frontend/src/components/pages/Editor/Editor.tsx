import React from "react";
import css from "classnames";
import "./Editor.scss";
import Sidebar from "../../organisms/Sidebar/Sidebar";
import { Segment } from "semantic-ui-react";
import SequenceEditor from "../../organisms/SequenceEditor/SequenceEditor";

type Props = {};

const Editor = (props: Props) => {
    return (
        <div className={css("wrapper")}>
            <Sidebar />
            <Segment className="segment" raised>
                <SequenceEditor sequence={{ name: "Example" }} />
            </Segment>
        </div>
    );
};

export default Editor;
