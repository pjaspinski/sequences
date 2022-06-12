import React, { useMemo } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { Button, Dropdown, DropdownItemProps, Icon } from "semantic-ui-react";
import { ActionsModel } from "sequences-types";
import { RootState } from "../../../../store/store";

type Props = {
    actions: ActionsModel[];
    selectedAction?: string;
    setSelectedAction: (action: string) => void;
};

const ActionPicker = (props: Props) => {
    const { actions, selectedAction, setSelectedAction } = props;

    const options = useMemo(() => {
        return actions.reduce<DropdownItemProps[]>((acc, plugin) => {
            return [
                ...acc,
                ...plugin.actions.map((action) => ({
                    value: action.name,
                    text: `${plugin.name} - ${action.name}`,
                })),
            ];
        }, []);
    }, [JSON.stringify(actions)]);

    console.log(options);

    return (
        <div className="inline">
            <Dropdown
                placeholder="Select action"
                fluid
                search
                selection
                options={options}
                onChange={(e, { value }) => setSelectedAction(value as string)}
                value={selectedAction}
                scrolling
            />
            <Button
                className="add-action-btn"
                icon
                disabled={selectedAction === undefined}
                labelPosition="left"
                onClick={() => {}}
            >
                <Icon name="add" />
                Add action
            </Button>
        </div>
    );
};

const map = {
    state: (state: RootState) => ({
        actions: state.actions.model,
    }),
    dispatch: (dispatch: Dispatch) => ({}),
};

export default connect(map.state, map.dispatch)(ActionPicker);
