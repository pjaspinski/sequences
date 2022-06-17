import React, { useState } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { Button, Modal } from "semantic-ui-react";
import { Input } from "sequences-types";
import { pluginsSaveSettingsInit } from "../../../store/plugins/plugins.actions";
import { generateInput, validateValues } from "./helpers";
import styles from "./PluginSettingsModal.module.scss";
import cx from "classnames/bind";

const css = cx.bind(styles);

export enum Mode {
    EDIT = "EDIT",
    SETUP = "SETUP",
}

type Props = {
    pluginId: number;
    name: string;
    inputs: Input[];
    onHide: () => void;
    mode: Mode;
    savePluginSettings: (pluginId: number, settings: Values) => void;
};

export type Values = { [index: string]: ValueType };

export type ValueType = string | number | boolean;

const PluginSettingsModal = (props: Props) => {
    const { onHide, mode, name, inputs, savePluginSettings, pluginId } = props;

    const [values, setValues] = useState<Values>(
        inputs.reduce((agg, input) => ({ ...agg, [input.id]: input.value }), {})
    );
    const [disableSave, setDisableSave] = useState<boolean>(validateValues(inputs, values));

    const updateValue = (inputId: string, value: ValueType) => {
        const newValues = { ...values, [inputId]: value };
        setDisableSave(validateValues(inputs, newValues));
        setValues(newValues);
    };

    const onSave = () => {
        savePluginSettings(pluginId, values);
        onHide();
    };

    return (
        <Modal onClose={onHide} open>
            <Modal.Header>
                {mode === Mode.EDIT ? "Plugin setup " : "Plugin settings"} - {name}
            </Modal.Header>
            <div className={css("inputs-container")}>
                {inputs.map((input) => generateInput(input, updateValue, values))}
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
    }),
};

export default connect(undefined, map.dispatch)(PluginSettingsModal);
