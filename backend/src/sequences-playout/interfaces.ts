import { PlayoutStatus } from "sequences-types";

export interface SequencesPlayout {
    play: (sequenceId: number) => void;
    stop: (sequenceId: number) => void;
    pause: (sequenceId: number) => void;
    resume: (sequenceId: number) => void;
    restart: (sequenceId: number) => void;
    getStatus: (sequenceId: number, totalActions: number) => PlayoutStatus;
}
