import React from "react";
import css from "classnames";
import "./Navbar.scss";
import { ReactComponent as Logo } from "../resources/img/logo_vertical_light.svg";
import { Link } from "react-router-dom";

type Props = {};

const Navbar = (props: Props) => {
    return (
        <div className={css("navbar")}>
            <Logo className={css("logo")} />
            <Link className={css("link")} to={"/editor"}>
                Editor
            </Link>
            <Link className={css("link")} to={"/settings"}>
                Settings
            </Link>
        </div>
    );
};

export default Navbar;
