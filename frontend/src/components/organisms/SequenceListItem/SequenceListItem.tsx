import React from "react";
import { Link } from "react-router-dom";
import { Button, Header, Icon, Label, List, Segment } from "semantic-ui-react";
import { PluginModel, Sequence } from "sequences-types";
import PlayoutControls from "../PlayoutControls/PlayoutControls";
import { getDurationString } from "./helpers";
import styles from "./SequenceListItem.module.scss";
import cx from "classnames/bind";

const css = cx.bind(styles);

type Props = {
    sequence: Sequence;
    plugin: PluginModel;
};

const SequenceListItem = (props: Props) => {
    const { sequence, plugin } = props;

    return (
        <Segment color="red" className={css("wrapper")}>
            <Header as="h3">
                {sequence.name}
                <Label>
                    <Icon name="plug" />
                    {plugin.name}
                </Label>
                <Button icon onClick={() => {}} className={css("delete-btn")} floated="right">
                    <Icon name="trash" />
                </Button>
                <Link to={`/editor/${sequence.id}`}>
                    <Button floated="right">
                        <Icon name="edit" />
                        Edit
                    </Button>
                </Link>
            </Header>
            <div className={css("row")}>
                <List>
                    <List.Item>
                        <List.Icon name="list ol" className={css("list-icon")} />
                        <List.Content>Actions: {sequence.actions.length}</List.Content>
                    </List.Item>
                    <List.Item>
                        <List.Icon name="time" />
                        <List.Content>Duration: {getDurationString(sequence.actions)}</List.Content>
                    </List.Item>
                </List>
                <PlayoutControls sequence={sequence} />
            </div>
        </Segment>
    );
};

export default SequenceListItem;
