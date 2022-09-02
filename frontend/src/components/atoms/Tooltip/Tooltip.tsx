import React, { ReactNode } from "react";
import { Popup } from "semantic-ui-react";

interface Props {
    content: string;
    trigger: ReactNode;
}

const Tooltip = (props: Props) => {
    const { content, trigger } = props;
    return <Popup inverted content={content} position="top center" trigger={trigger} />;
};

export default Tooltip;
