import React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { Button, Header, Popup } from "semantic-ui-react";
import {
    sequencePause,
    sequencePlay,
    sequenceRestart,
    sequenceResume,
    sequenceStop,
} from "../../../store/sequences/sequences.actions";
import styles from "./PlaybackControls.module.scss";
import cx from "classnames/bind";

const css = cx.bind(styles);

type Props = {
    sequenceId: number;
    playSequence: (id: number) => void;
};

const PlaybackControls = (props: Props) => {
    const { sequenceId, playSequence } = props;

    return (
        <div className={css("playback-controls")}>
            <Header as="h5">Playback controls</Header>
            <div>
                <Popup
                    inverted
                    content="Play"
                    position="top center"
                    trigger={
                        <Button
                            onClick={() => playSequence(sequenceId)}
                            icon="play"
                            color="green"
                        />
                    }
                />
                <Popup
                    inverted
                    content="Pause"
                    position="top center"
                    trigger={<Button onClick={() => playSequence(sequenceId)} icon="pause" />}
                />
                <Popup
                    inverted
                    content="Restart"
                    position="top center"
                    trigger={
                        <Button onClick={() => playSequence(sequenceId)} icon="redo alternate" />
                    }
                />
                <Popup
                    inverted
                    content="Stop"
                    position="top center"
                    trigger={
                        <Button onClick={() => playSequence(sequenceId)} icon="stop" color="red" />
                    }
                />
            </div>
        </div>
    );
};

const map = {
    dispatch: (dispatch: Dispatch) => ({
        playSequence: (id: number) => dispatch(sequencePlay(id)),
        pauseSequence: (id: number) => dispatch(sequencePause(id)),
        resumeSequence: (id: number) => dispatch(sequenceResume(id)),
        stopSequence: (id: number) => dispatch(sequenceStop(id)),
        restartSequence: (id: number) => dispatch(sequenceRestart(id)),
    }),
};

export default connect(undefined, map.dispatch)(PlaybackControls);
