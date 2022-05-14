import React from "react";
import Framed from "../../atoms/Framed/Framed";
import PluginsManager from "../../organisms/PluginsManager/PluginsManager";

type Props = {};

const Settings = (props: Props) => {
    return (
        <div>
            <Framed>
                <PluginsManager />
            </Framed>
        </div>
    );
};

export default Settings;
