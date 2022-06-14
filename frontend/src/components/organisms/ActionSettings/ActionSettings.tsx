import React from "react";
import { Button, Header, Icon, Input, Segment } from "semantic-ui-react";
import { Action, ActionSettings as ActionSettingsType } from "sequences-types";
import LabeledInput from "../../molecules/LabeledInput/LabeledInput";
import { generateInput } from "../PluginSettingsModal/helpers";
import { ValueType } from "../PluginSettingsModal/PluginSettingsModal";
import "./ActionSettings.scss";

type Props = {
    template: Action;
    delay: number;
    setDelay: (delay: number) => void;
    settings: ActionSettingsType;
    setSettings: (settings: ActionSettingsType) => void;
};

const ActionSettings = (props: Props) => {
    const { template, settings, delay, setSettings, setDelay } = props;

    const onChange = (inputId: string, value: ValueType) => {
        setSettings({ ...settings, [inputId]: value });
    };

    console.log(template);
    return (
        <Segment color="red" className="action-settings">
            <Header as="h3">
                {template.name}
                <Button icon onClick={() => {}} className="delete-btn" floated="right">
                    <Icon name="trash" />
                </Button>
            </Header>
            <div className="inputs-container">
                <LabeledInput label="Delay (ms)" className={"input-container"}>
                    <Input
                        type="number"
                        error={delay < 0}
                        value={delay}
                        onChange={(e, { value }) => setDelay(parseInt(value))}
                    />
                </LabeledInput>
                {template.settingsInputs.map((input) => generateInput(input, onChange, settings))}
            </div>
        </Segment>
    );
};

export default ActionSettings;
