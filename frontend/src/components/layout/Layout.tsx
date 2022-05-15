import React from "react";
import Navbar from "../organisms/Navbar/Navbar";

type Props = {
    children: React.ReactNode;
};

const Layout = (props: Props) => {
    const { children } = props;
    return (
        <>
            <Navbar />
            {children}
        </>
    );
};

export default Layout;
