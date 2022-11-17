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
    playSequence: (id: string) => void;
    pauseSequence: (id: string) => void;
    resumeSequence: (id: string) => void;
    stopSequence: (id: string) => void;
    restartSequence: (id: string) => void;
    pluginActive: boolean;
};

const PlayoutControls = (props: Props) => {
    const {
        sequence,
        playSequence,
        pauseSequence,
        resumeSequence,
        stopSequence,
        restartSequence,
        pluginActive,
    } = props;

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
                        trigger={
                            <Button
                                cy-role="pasue"
                                onClick={() => pauseSequence(sequence.id)}
                                icon="pause"
                            />
                        }
                    />
                ) : (
                    <Button
                        cy-role="play"
                        disabled={!pluginActive}
                        onClick={() =>
                            sequence.playoutStatus.state === "STOPPED"
                                ? playSequence(sequence.id)
                                : resumeSequence(sequence.id)
                        }
                        icon="play"
                        color="green"
                    />
                )}

                <Tooltip
                    content="Restart"
                    trigger={
                        <Button
                            cy-role="restart"
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
                            cy-role="stop"
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
        playSequence: (id: string) => dispatch(sequencePlay(id)),
        pauseSequence: (id: string) => dispatch(sequencePause(id)),
        resumeSequence: (id: string) => dispatch(sequenceResume(id)),
        stopSequence: (id: string) => dispatch(sequenceStop(id)),
        restartSequence: (id: string) => dispatch(sequenceRestart(id)),
    }),
};

export default connect(undefined, map.dispatch)(PlayoutControls);
