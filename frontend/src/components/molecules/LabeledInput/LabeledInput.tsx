import React, { ReactElement } from "react";
import { Header } from "semantic-ui-react";
import "./LabeledInput.scss";
import css from "classnames";

type Props = {
    label: string;
    children: ReactElement;
    className?: string;
};

const LabeledInput = (props: Props) => {
    const { label, children, className } = props;

    return (
        <div className={css("labeled-input", className)}>
            <Header as="h5">{label}</Header>
            {children}
        </div>
    );
};

export default LabeledInput;
