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
import styles from "./PlayoutControls.module.scss";
import cx from "classnames/bind";
import { Sequence } from "sequences-types";

const css = cx.bind(styles);

type Props = {
    sequence: Sequence;
    playSequence: (id: number) => void;
};

const PlayoutControls = (props: Props) => {
    const { sequence, playSequence } = props;

    return (
        <div className={css("playback-controls")}>
            <Header as="h5">
                Playout:{" "}
                <span className={css(`status-${sequence.playoutStatus.state.toLowerCase()}`)}>
                    {sequence.playoutStatus.state}
                </span>
                {sequence.playoutStatus.state !== "STOPPED" && (
                    <span>
                        {sequence.playoutStatus.current}/{sequence.playoutStatus.total}
                    </span>
                )}
            </Header>
            <div>
                {sequence.playoutStatus.state === "RUNNING" ? (
                    <Popup
                        inverted
                        content="Pause"
                        position="top center"
                        trigger={<Button onClick={() => playSequence(sequence.id)} icon="pause" />}
                    />
                ) : (
                    <Popup
                        inverted
                        content="Play"
                        position="top center"
                        trigger={
                            <Button
                                onClick={() => playSequence(sequence.id)}
                                icon="play"
                                color="green"
                            />
                        }
                    />
                )}

                <Popup
                    inverted
                    content="Restart"
                    position="top center"
                    trigger={
                        <Button
                            disabled={sequence.playoutStatus.state === "STOPPED"}
                            onClick={() => playSequence(sequence.id)}
                            icon="redo alternate"
                        />
                    }
                />
                <Popup
                    inverted
                    content="Stop"
                    position="top center"
                    trigger={
                        <Button
                            disabled={sequence.playoutStatus.state === "STOPPED"}
                            onClick={() => playSequence(sequence.id)}
                            icon="stop"
                            color="red"
                        />
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

export default connect(undefined, map.dispatch)(PlayoutControls);
