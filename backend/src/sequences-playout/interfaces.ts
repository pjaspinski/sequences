import { PlayoutStatus } from "sequences-types";

export interface SequencesPlayout {
    play: (sequenceId: string) => void;
    stop: (sequenceId: string) => void;
    pause: (sequenceId: string) => void;
    resume: (sequenceId: string) => void;
    restart: (sequenceId: string) => void;
    getStatus: (sequenceId: string, totalActions: number) => PlayoutStatus;
}
