import React, { ReactNode } from "react";
import { Popup } from "semantic-ui-react";

interface Props {
    content: string;
    trigger: ReactNode;
    disabled?: boolean;
}

const Tooltip = (props: Props) => {
    const { content, trigger, disabled } = props;
    return (
        <Popup
            inverted
            disabled={disabled}
            content={content}
            position="top center"
            trigger={trigger}
        />
    );
};

export default Tooltip;
