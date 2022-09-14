import React, { ReactNode, useEffect, useState } from "react";
import styles from "./HeightPreservingItem.module.scss";
import cx from "classnames/bind";

const css = cx.bind(styles);

interface Props {
    children?: ReactNode;
    "data-known-size": number;
}

const HeightPreservingItem = (props: Props) => {
    const [size, setSize] = useState(0);
    const { children } = props;
    const knownSize = props["data-known-size"];
    useEffect(() => {
        setSize((prevSize) => {
            return knownSize == 0 ? prevSize : knownSize;
        });
    }, [knownSize]);
    return (
        <div
            {...props}
            className={css("height-preserving-container")}
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            style={{ "--child-height": `${size}px` }}
        >
            {children}
        </div>
    );
};

export default HeightPreservingItem;
