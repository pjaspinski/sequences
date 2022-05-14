import React from "react";
import { Segment } from "semantic-ui-react";
import PluginsManager from "../../organisms/PluginsManager/PluginsManager";
import "./Settings.scss";

type Props = {};

const Settings = (props: Props) => {
    return (
        <div className="wrapper">
            <Segment className="segment" raised>
                <PluginsManager />
            </Segment>
        </div>
    );
};

export default Settings;
