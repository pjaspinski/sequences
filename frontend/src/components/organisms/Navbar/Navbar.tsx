import React from "react";
import { ReactComponent as Logo } from "../../../resources/img/logo_vertical_light.svg";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.scss";
import cx from "classnames/bind";

const css = cx.bind(styles);

type Props = {};

const Navbar = (props: Props) => {
    return (
        <div className={css("navbar")}>
            <Logo className={css("logo")} />
            <Link className={css("link")} to={"/editor"}>
                Playout
            </Link>
            <Link className={css("link")} to={"/settings"}>
                Settings
            </Link>
        </div>
    );
};

export default Navbar;
