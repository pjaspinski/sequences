import React, { useState } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { Button, Modal } from "semantic-ui-react";
import { PluginModel } from "sequences-types";
import { pluginsSaveSettingsInit, restartPlugin } from "../../../store/plugins/plugins.actions";
import { generateInput, validateValues } from "./helpers";
import styles from "./PluginSettingsModal.module.scss";
import cx from "classnames/bind";

const css = cx.bind(styles);

export enum Mode {
    START = "START",
    RESTART = "RESTART",
    SETUP = "SETUP",
}

type Props = {
    plugin: PluginModel;
    onHide: () => void;
    mode: Mode;
    savePluginSettings: (pluginId: number, settings: Values) => void;
    restartPlugin: (pluginId: number, settings: Values) => void;
};

export type Values = { [index: string]: ValueType };

export type ValueType = string | number | boolean;

const PluginSettingsModal = (props: Props) => {
    const { onHide, mode, savePluginSettings, plugin, restartPlugin } = props;

    const [values, setValues] = useState<Values>(
        plugin.settingsInputs.reduce(
            (agg, input) => ({
                ...agg,
                [input.id]: mode === "SETUP" ? input.value : plugin.lastSettings[input.id],
            }),
            {}
        )
    );
    const [disableSave, setDisableSave] = useState<boolean>(
        validateValues(plugin.settingsInputs, values)
    );

    const updateValue = (inputId: string, value: ValueType) => {
        const newValues = { ...values, [inputId]: value };
        setDisableSave(validateValues(plugin.settingsInputs, newValues));
        setValues(newValues);
    };

    const onSave = () => {
        if (mode === "RESTART") {
            restartPlugin(plugin.id, values);
        }
        if (["SETUP", "START"].includes(mode)) savePluginSettings(plugin.id, values);
        onHide();
    };

    return (
        <Modal onClose={onHide} open>
            <Modal.Header>Plugin setup - {plugin.name}</Modal.Header>
            <div className={css("inputs-container")}>
                {plugin.settingsInputs.map((input) =>
                    generateInput(input, updateValue, values, styles)
                )}
            </div>
            <Modal.Actions>
                <Button onClick={onHide}>Cancel</Button>
                <Button
                    content="Save"
                    labelPosition="right"
                    icon="checkmark"
                    onClick={onSave}
                    color="red"
                    disabled={disableSave}
                />
            </Modal.Actions>
        </Modal>
    );
};

const map = {
    dispatch: (dispatch: Dispatch) => ({
        savePluginSettings: (pluginId: number, settings: Values) =>
            dispatch(pluginsSaveSettingsInit(pluginId, settings)),
        restartPlugin: (pluginId: number, settings: Values) =>
            dispatch(restartPlugin(pluginId, settings)),
    }),
};

export default connect(undefined, map.dispatch)(PluginSettingsModal);
