import { Input as InputType } from "sequences-types";
import React from "react";
import { Values, ValueType } from "./PluginSettingsModal";
import { Checkbox, Dropdown, Input } from "semantic-ui-react";
import "./PluginSettingsModal.scss";
import LabeledInput from "../../molecules/LabeledInput/LabeledInput";

export const generateInput = (
    input: InputType,
    onChange: (inputId: string, value: ValueType) => void,
    values: Values
) => {
    const value = values[input.id];
    const error = !validateValue(input, value);

    switch (input.type) {
        case "TEXT": {
            return (
                <LabeledInput label={input.label} className={"input-container"}>
                    <Input
                        error={error}
                        value={value}
                        onChange={(e, { value }) => onChange(input.id, value)}
                    />
                </LabeledInput>
            );
        }
        case "NUMBER": {
            return (
                <LabeledInput label={input.label} className={"input-container"}>
                    <Input
                        type="number"
                        error={error}
                        value={value}
                        onChange={(e, { value }) => onChange(input.id, value)}
                    />
                </LabeledInput>
            );
        }
        case "CHECKBOX": {
            return (
                <Checkbox
                    className="checkbox"
                    label={input.label}
                    onChange={(e, { checked }) =>
                        checked !== undefined && onChange(input.id, checked)
                    }
                />
            );
        }
        case "DROPDOWN": {
            return (
                <LabeledInput label={input.label} className={"input-container"}>
                    <Dropdown
                        placeholder="Select plugin"
                        fluid
                        error={error}
                        selection
                        options={input.options}
                        onChange={(e, { value }) =>
                            value !== undefined &&
                            onChange(input.id, value as ValueType)
                        }
                        value={value}
                    />
                </LabeledInput>
            );
        }
    }
};

export const validateValues = (
    inputs: InputType[],
    values: Values
): boolean => {
    return inputs.some((input) => {
        const value = values[input.id];
        return !validateValue(input, value);
    });
};

const validateValue = (input: InputType, value: ValueType): boolean => {
    switch (input.type) {
        case "TEXT": {
            const regex = input.regex && new RegExp(input.regex);
            const regexTest = !regex || regex.test(value as string);
            const requiredTest = !input.required || !!(value as string).length;
            return regexTest && requiredTest;
        }
        case "NUMBER": {
            const minTest = input.min === undefined || value >= input.min;
            const maxTest = input.max === undefined || value <= input.max;
            const requiredTest = !input.required || value !== null;
            return minTest && maxTest && requiredTest;
        }
        default:
            return !input.required || !!value;
    }
};