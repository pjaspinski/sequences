import React, { useMemo, useState } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { Button, Dropdown, DropdownItemProps, Input, Modal } from "semantic-ui-react";
import { PluginModel, PluginStatus } from "sequences-types";
import { sequenceCreateInit } from "../../../store/sequences/sequences.actions";
import { RootState } from "../../../store/store";
import LabeledInput from "../../molecules/LabeledInput/LabeledInput";
import styles from "./SequenceCreationModal.module.scss";
import cx from "classnames/bind";

const css = cx.bind(styles);

type Props = {
    onHide: () => void;
    createSequence: (name: string, pluginId: number) => void;
    plugins: PluginModel[];
};

const SequenceCreationModal = (props: Props) => {
    const { onHide, plugins, createSequence } = props;

    const [name, setName] = useState("New sequence");
    const [plugin, setPlugin] = useState<undefined | number>();

    const options = useMemo(
        () =>
            plugins.reduce<DropdownItemProps[]>(
                (acc, plugin) =>
                    plugin.status === "RUNNING"
                        ? [
                              ...acc,
                              {
                                  text: plugin.name,
                                  value: plugin.id,
                              },
                          ]
                        : acc,
                []
            ),
        [JSON.stringify(plugins)]
    );

    const onSave = () => {
        plugin !== undefined && createSequence(name, plugin);
        onHide();
    };

    return (
        <Modal onClose={onHide} open>
            <Modal.Header>Create sequence</Modal.Header>
            <Modal.Content>
                <LabeledInput label="Name" className={css("input")}>
                    <Input error={!name} value={name} onChange={(e, { value }) => setName(value)} />
                </LabeledInput>
                <LabeledInput label="Plugin" className={css("input")}>
                    <Dropdown
                        placeholder="Select plugin"
                        fluid
                        error={plugin === undefined}
                        selection
                        options={options}
                        onChange={(e, { value }) =>
                            value !== undefined && setPlugin(value as number)
                        }
                        value={plugin}
                    />
                </LabeledInput>
            </Modal.Content>
            <Modal.Actions>
                <Button onClick={onHide}>Cancel</Button>
                <Button
                    content="Create"
                    labelPosition="right"
                    icon="checkmark"
                    onClick={onSave}
                    color="red"
                    disabled={!name || plugin === undefined}
                />
            </Modal.Actions>
        </Modal>
    );
};

const map = {
    state: (state: RootState) => ({
        plugins: state.plugins.model,
    }),
    dispatch: (dispatch: Dispatch) => ({
        createSequence: (name: string, pluginId: number) =>
            dispatch(sequenceCreateInit(pluginId, name)),
    }),
};

export default connect(map.state, map.dispatch)(SequenceCreationModal);
