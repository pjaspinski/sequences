import React, { useMemo, useState } from "react";
import { Button, Dropdown, DropdownItemProps, Icon } from "semantic-ui-react";
import { Action } from "sequences-types";

type Props = {
    actions: Action[];
    onSave: (id: number) => void;
};

const ActionPicker = (props: Props) => {
    const { actions, onSave } = props;

    const [selectedAction, setSelectedAction] = useState<number>(-1);

    const options = useMemo(() => {
        return actions.reduce<DropdownItemProps[]>((acc, action) => {
            return [
                ...acc,
                {
                    value: action.id,
                    text: action.name,
                },
            ];
        }, []);
    }, [JSON.stringify(actions)]);

    const handleSave = () => {
        selectedAction !== undefined && onSave(selectedAction);
        setSelectedAction(-1);
    };

    return (
        <div className="inline">
            <Dropdown
                placeholder="Select action"
                fluid
                search
                selection
                options={options}
                onChange={(e, { value }) => setSelectedAction(value as number)}
                value={selectedAction}
                scrolling
            />
            <Button
                className="add-action-btn"
                icon
                disabled={selectedAction === -1}
                labelPosition="left"
                onClick={handleSave}
            >
                <Icon name="add" />
                Add action
            </Button>
        </div>
    );
};

export default ActionPicker;
