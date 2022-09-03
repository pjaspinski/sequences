import React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { Button, Header } from "semantic-ui-react";
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
import Tooltip from "../../atoms/Tooltip/Tooltip";

const css = cx.bind(styles);

type Props = {
    sequence: Sequence;
    playSequence: (id: number) => void;
    pauseSequence: (id: number) => void;
    resumeSequence: (id: number) => void;
    stopSequence: (id: number) => void;
    restartSequence: (id: number) => void;
};

const PlayoutControls = (props: Props) => {
    const { sequence, playSequence, pauseSequence, resumeSequence, stopSequence, restartSequence } =
        props;

    return (
        <div className={css("playback-controls")}>
            <Header as="h5">
                Playout:{" "}
                <span className={css(`status-${sequence.playoutStatus.state.toLowerCase()}`)}>
                    {sequence.playoutStatus.state}
                </span>
                {sequence.playoutStatus.state !== "STOPPED" && (
                    <span>
                        {" "}
                        {sequence.playoutStatus.current}/{sequence.playoutStatus.total}
                    </span>
                )}
            </Header>
            <div className={css("buttons-container")}>
                {sequence.playoutStatus.state === "RUNNING" ? (
                    <Tooltip
                        content="Pause"
                        trigger={<Button onClick={() => pauseSequence(sequence.id)} icon="pause" />}
                    />
                ) : (
                    <Tooltip
                        content="Play"
                        trigger={
                            <Button
                                onClick={() =>
                                    sequence.playoutStatus.state === "STOPPED"
                                        ? playSequence(sequence.id)
                                        : resumeSequence(sequence.id)
                                }
                                icon="play"
                                color="green"
                            />
                        }
                    />
                )}

                <Tooltip
                    content="Restart"
                    trigger={
                        <Button
                            disabled={sequence.playoutStatus.state === "STOPPED"}
                            onClick={() => restartSequence(sequence.id)}
                            icon="redo alternate"
                        />
                    }
                />
                <Tooltip
                    content="Stop"
                    trigger={
                        <Button
                            disabled={sequence.playoutStatus.state === "STOPPED"}
                            onClick={() => stopSequence(sequence.id)}
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
