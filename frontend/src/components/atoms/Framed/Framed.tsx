import React from "react";
import css from "classnames";
import "./Framed.scss";

type Props = {
    children: React.ReactNode;
};

const Framed = (props: Props) => {
    const { children } = props;

    return <div className={css("frame")}>{children}</div>;
};

export default Framed;
