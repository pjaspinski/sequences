import { Sequence } from "sequences-types";

export interface StoredSequence extends Omit<Sequence, "id" | "playoutStatus"> {
    _filename: string;
    _comment: string;
}

export interface SequencesStorage {
    add: (name: string, pluginId: number) => Promise<Sequence>;
    remove: (id: number) => void;
    getAll: () => Sequence[];
    getById: (id: number) => Sequence;
    update: (id: number, sequence: Partial<Omit<Sequence, "id">>) => Promise<Sequence>;
}
