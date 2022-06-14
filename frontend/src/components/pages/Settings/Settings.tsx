import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { Segment } from "semantic-ui-react";
import { pluginsFetchInit } from "../../../store/plugins/plugins.actions";
import { RootState } from "../../../store/store";
import PluginsManager from "../../organisms/PluginsManager/PluginsManager";
import "./Settings.scss";
import { PluginModel } from "sequences-types";

type Props = {
    plugins: PluginModel[];
    getPlugins: () => void;
};

const Settings = (props: Props) => {
    const { plugins, getPlugins } = props;

    useEffect(() => {
        getPlugins();
    }, []);

    return (
        <div className="wrapper">
            <Segment className="segment" raised>
                <PluginsManager plugins={plugins} />
            </Segment>
        </div>
    );
};

const map = {
    state: (state: RootState) => ({
        plugins: state.plugins.model,
    }),
    dispatch: (dispatch: Dispatch) => ({
        getPlugins: () => dispatch(pluginsFetchInit()),
    }),
};

export default connect(map.state, map.dispatch)(Settings);
