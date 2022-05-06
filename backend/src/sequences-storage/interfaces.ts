import { Low } from "lowdb/lib";

export interface Sequence {
    _comment: string;
    name: string;
}

export interface SequencesStorage {
    add: (name: string) => void;
    remove: (name: string) => void;
    sequences: Low<Sequence>[];
}
