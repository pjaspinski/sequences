import React, { useMemo, useState } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { Button, Dropdown, DropdownItemProps, Input, Modal } from "semantic-ui-react";
import { PluginModel, PluginStatus } from "sequences-types";
import { RootState } from "../../../store/store";
import LabeledInput from "../../molecules/LabeledInput/LabeledInput";
import "./SequenceCreationModal.scss";

type Props = {
    onHide: () => void;
    onSave: (name: string) => void;
    plugins: PluginModel[];
};

const SequenceCreationModal = (props: Props) => {
    const { onHide, onSave, plugins } = props;

    const [name, setName] = useState("New sequence");
    const [plugin, setPlugin] = useState<undefined | number>();

    const options = useMemo(
        () =>
            plugins.reduce<DropdownItemProps[]>(
                (acc, plugin) =>
                    plugin.status === PluginStatus.RUNNING
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

    return (
        <Modal onClose={onHide} open>
            <Modal.Header>Create sequence</Modal.Header>
            <Modal.Content>
                <LabeledInput label="Name" className="input">
                    <Input error={!name} value={name} onChange={(e, { value }) => setName(value)} />
                </LabeledInput>
                <LabeledInput label="Plugin" className="input">
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
                    onClick={() => onSave(name)}
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
    dispatch: (dispatch: Dispatch) => ({}),
};

export default connect(map.state, map.dispatch)(SequenceCreationModal);
