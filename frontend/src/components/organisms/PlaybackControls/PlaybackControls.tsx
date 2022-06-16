import React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { Button, Header } from "semantic-ui-react";
import { sequencePlay } from "../../../store/sequences/sequences.actions";
import "./PlaybackControls.scss";

type Props = {
    sequenceId: number;
    playSequence: (id: number) => void;
};

const PlaybackControls = (props: Props) => {
    const { sequenceId, playSequence } = props;

    return (
        <div className="playback-controls">
            <Header as="h5">Playback controls</Header>
            <Button onClick={() => playSequence(sequenceId)} icon="play" color="green" />
        </div>
    );
};

const map = {
    dispatch: (dispatch: Dispatch) => ({
        playSequence: (id: number) => dispatch(sequencePlay(id)),
    }),
};

export default connect(undefined, map.dispatch)(PlaybackControls);
