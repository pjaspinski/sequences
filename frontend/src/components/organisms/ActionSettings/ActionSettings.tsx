import React from "react";
import { Button, Header, Icon, Input, Segment } from "semantic-ui-react";
import { Action, ActionSettings as ActionSettingsType } from "sequences-types";
import LabeledInput from "../../molecules/LabeledInput/LabeledInput";
import { generateInput } from "../PluginSettingsModal/helpers";
import { ValueType } from "../PluginSettingsModal/PluginSettingsModal";
import styles from "./ActionSettings.module.scss";
import cx from "classnames/bind";

const css = cx.bind(styles);

interface Props {
    template: Action;
    delay: number;
    setDelay: (delay: number) => void;
    settings: ActionSettingsType;
    setSettings: (settings: ActionSettingsType) => void;
    deleteAction: () => void;
    provided: any;
}

const ActionSettings = (props: Props) => {
    const { template, settings, delay, setSettings, setDelay, deleteAction, provided } = props;

    const onChange = (inputId: string, value: ValueType) => {
        setSettings({ ...settings, [inputId]: value });
    };

    return (
        <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            style={{ ...provided.draggableProps.style, paddingBottom: "8px", paddingRight: "1rem" }}
        >
            <Segment color="red" className={css("action-settings")}>
                <Header as="h3">
                    {template.name}
                    <Button
                        icon
                        onClick={deleteAction}
                        className={css("delete-btn")}
                        floated="right"
                    >
                        <Icon name="trash" />
                    </Button>
                </Header>
                <div className={css("inputs-container")}>
                    <LabeledInput label="Delay (ms)" className={css("input-container")}>
                        <Input
                            className={css("input")}
                            type="number"
                            error={delay < 0}
                            value={delay}
                            onChange={(e, { value }) => setDelay(parseInt(value))}
                        />
                    </LabeledInput>
                    {template.settingsInputs.map((input) =>
                        generateInput(input, onChange, settings, styles)
                    )}
                </div>
            </Segment>
        </div>
    );
};

export default ActionSettings;
