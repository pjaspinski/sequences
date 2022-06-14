import React from "react";
import { Link } from "react-router-dom";
import { Button, Header, Icon, Label, List, Segment } from "semantic-ui-react";
import { PluginModel, Sequence } from "sequences-types";
import PlaybackControls from "../PlaybackControls/PlaybackControls";
import { getDurationString } from "./helpers";
import "./SequenceListItem.scss";

type Props = {
    sequence: Sequence;
    plugin: PluginModel;
};

const SequenceListItem = (props: Props) => {
    const { sequence, plugin } = props;

    return (
        <Segment color="red" className="sequence-list-item">
            <Header as="h3">
                {sequence.name}
                <Label>
                    <Icon name="plug" />
                    {plugin.name}
                </Label>
                <Button icon onClick={() => {}} className="delete-btn" floated="right">
                    <Icon name="trash" />
                </Button>
                <Link to={`/editor/${sequence.id}`}>
                    <Button floated="right">
                        <Icon name="edit" />
                        Edit
                    </Button>
                </Link>
            </Header>
            <div className="row">
                <List>
                    <List.Item>
                        <List.Icon name="list ol" className="list-icon" />
                        <List.Content>Actions: {sequence.actions.length}</List.Content>
                    </List.Item>
                    <List.Item>
                        <List.Icon name="time" />
                        <List.Content>Duration: {getDurationString(sequence.actions)}</List.Content>
                    </List.Item>
                </List>
                <PlaybackControls sequenceId={sequence.id} />
            </div>
        </Segment>
    );
};

export default SequenceListItem;
