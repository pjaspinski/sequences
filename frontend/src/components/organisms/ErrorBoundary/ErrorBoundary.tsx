import React, { Component, ErrorInfo, ReactElement } from "react";
import { Button, Header } from "semantic-ui-react";
import styles from "./ErrorBoundary.module.scss";
import cx from "classnames/bind";

const css = cx.bind(styles);

interface Props {
    children: ReactElement[];
}

interface State {
    hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(_error: Error, errorInfo: ErrorInfo) {
        console.error(errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className={css("wrapper")}>
                    <Header className={css("header")} as="h1">
                        Something went wrong :c
                    </Header>
                    <Button size="big" color="red" onClick={() => location.reload()}>
                        Refresh
                    </Button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
